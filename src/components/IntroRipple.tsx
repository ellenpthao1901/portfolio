import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

export interface IntroRippleHandle {
  addRipple: (xFrac: number, yFrac: number) => void
}

interface RippleData {
  x: number
  y: number
  time: number  // performance.now() / 1000 at spawn
  id: number
}

// ── Shaders (ported directly from WebGLRippleEffect.tsx in the POC) ──────────

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  varying vec2 v_position;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    v_texCoord = a_texCoord;
    v_position = zeroToOne;
  }
`

// Fragment shader: same water-distortion + sunlight-glint logic as the POC,
// but instead of sampling an image texture we render the dark background colour
// and show only the glint / brightness ripple on top.
const FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec3  u_ripples[10];
  uniform int   u_rippleCount;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform float u_decay;
  uniform float u_speed;

  varying vec2 v_texCoord;
  varying vec2 v_position;

  void main() {
    vec2 distortion = vec2(0.0);

    for (int i = 0; i < 10; i++) {
      if (i >= u_rippleCount) break;

      vec2  ripplePos  = u_ripples[i].xy;
      float rippleTime = u_time - u_ripples[i].z;
      if (rippleTime < 0.0) continue;

      vec2  diff     = v_position - ripplePos;
      float distance = length(diff);

      // propagation delay identical to POC
      float delay = distance * u_speed / 100.0;
      rippleTime = max(0.0, rippleTime - delay);

      // same wave equation as POC: amplitude * sin(freq * t) * e^(-decay * t)
      float rippleAmt = u_amplitude * sin(u_frequency * rippleTime) * exp(-u_decay * rippleTime);

      if (distance > 0.0) {
        distortion += rippleAmt * normalize(diff);
      }
    }

    // Dark background base — matches --color-bg: #111111
    vec3 baseColor = vec3(0.067, 0.067, 0.067);

    // Subtle brightness ring (same as POC)
    float brightness = length(distortion) * 2.0;
    baseColor += brightness * 0.25;

    // Sunlight glint — the most visible part of the effect on a dark surface
    // (exact same logic as POC)
    if (length(distortion) > 0.001) {
      vec3  normal   = normalize(vec3(-distortion.x, 0.2, -distortion.y));
      vec3  lightDir = normalize(vec3(-0.3, 1.0, 0.3));
      float glint    = pow(max(0.0, dot(normal, lightDir)), 60.0);
      baseColor += glint * 0.6;
    }

    gl_FragColor = vec4(baseColor, 1.0);
  }
`

// ── Component ─────────────────────────────────────────────────────────────────

const IntroRipple = forwardRef<IntroRippleHandle>(function IntroRipple(_props, ref) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const stateRef   = useRef<{
    gl:       WebGLRenderingContext | null
    program:  WebGLProgram | null
    ripples:  RippleData[]
    rafId:    number
  }>({ gl: null, program: null, ripples: [], rafId: 0 })

  useImperativeHandle(ref, () => ({
    addRipple(xFrac: number, yFrac: number) {
      const id = Date.now()
      stateRef.current.ripples.push({ x: xFrac, y: yFrac, time: performance.now() / 1000, id })
      // auto-evict after 5 s
      setTimeout(() => {
        stateRef.current.ripples = stateRef.current.ripples.filter(r => r.id !== id)
      }, 5000)
    },
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Init WebGL ──────────────────────────────────────────────────────────
    const gl = canvas.getContext('webgl')
    if (!gl) return
    stateRef.current.gl = gl

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s))
        return null
      }
      return s
    }

    const vs = compileShader(gl.VERTEX_SHADER,   VERTEX_SHADER)
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(prog))
      return
    }
    stateRef.current.program = prog

    // ── Geometry (full-screen quad) ─────────────────────────────────────────
    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = Math.round(canvas.offsetWidth  * dpr)
      canvas.height = Math.round(canvas.offsetHeight * dpr)

      const w = canvas.width, h = canvas.height
      const positions = new Float32Array([0,0, w,0, 0,h, 0,h, w,0, w,h])
      const texCoords = new Float32Array([0,0, 1,0, 0,1, 0,1, 1,0, 1,1])

      const posBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

      const aPos = gl.getAttribLocation(prog, 'a_position')
      gl.enableVertexAttribArray(aPos)
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      const texBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuf)
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

      const aTex = gl.getAttribLocation(prog, 'a_texCoord')
      gl.enableVertexAttribArray(aTex)
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuf)
      gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0)
    }

    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    // ── Render loop ─────────────────────────────────────────────────────────
    const render = () => {
      const { gl: g, program: p, ripples } = stateRef.current
      if (!g || !p) return

      const w = canvas.width, h = canvas.height
      g.viewport(0, 0, w, h)
      g.clearColor(0.067, 0.067, 0.067, 1)
      g.clear(g.COLOR_BUFFER_BIT)
      g.useProgram(p)

      const loc = (name: string) => g.getUniformLocation(p, name)

      g.uniform2f(loc('u_resolution'), w, h)
      g.uniform1f(loc('u_time'),       performance.now() / 1000)
      g.uniform1f(loc('u_amplitude'),  0.02)
      g.uniform1f(loc('u_frequency'),  15.0)
      g.uniform1f(loc('u_decay'),      8.0)
      g.uniform1f(loc('u_speed'),      1200.0)

      // pack up to 10 ripples into vec3 array (x, y, spawnTime)
      const active = ripples.slice(-10)
      const rippleData = new Float32Array(30)
      active.forEach((r, i) => {
        rippleData[i * 3]     = r.x
        rippleData[i * 3 + 1] = r.y
        rippleData[i * 3 + 2] = r.time
      })
      g.uniform3fv(loc('u_ripples'),     rippleData)
      g.uniform1i(loc('u_rippleCount'), active.length)

      g.drawArrays(g.TRIANGLES, 0, 6)

      stateRef.current.rafId = requestAnimationFrame(render)
    }

    stateRef.current.rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(stateRef.current.rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
})

export default IntroRipple
