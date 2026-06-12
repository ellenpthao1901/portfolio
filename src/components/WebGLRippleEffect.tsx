import { useRef, useEffect } from 'react'

interface WebGLRippleEffectProps {
  imageUrl: string
  amplitude?: number
  frequency?: number
  decay?: number
  speed?: number
}

export function WebGLRippleEffect({
  imageUrl,
  amplitude = 0.02,
  frequency = 15.0,
  decay = 8.0,
  speed = 1200.0,
}: WebGLRippleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) { console.error('WebGL not supported'); return }

    // ── Shaders ─────────────────────────────────────────────────────────────
    const VS = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;
      varying vec2 v_position;
      void main() {
        vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clip * vec2(1, -1), 0, 1);
        v_texCoord  = a_texCoord;
        v_position  = a_position / u_resolution;
      }
    `
    const FS = `
      precision highp float;
      uniform sampler2D u_image;
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
        vec2 uv = v_texCoord;
        vec2 distortion = vec2(0.0);
        float totalAmt = 0.0;
        float aspect = u_resolution.x / u_resolution.y;

        for (int i = 0; i < 10; i++) {
          if (i >= u_rippleCount) break;
          vec2  rPos  = u_ripples[i].xy;
          float rTime = u_time - u_ripples[i].z;
          if (rTime < 0.0) continue;
          vec2  diff = v_position - rPos;
          diff.x *= aspect;
          float dist = length(diff);
          float delay = dist * u_speed / 100.0;
          rTime = max(0.0, rTime - delay);
          float amt = u_amplitude * sin(u_frequency * rTime) * exp(-u_decay * rTime);
          if (dist > 0.0) {
            vec2 dir = normalize(diff);
            dir.x /= aspect;
            distortion += amt * dir;
          }
          totalAmt += abs(amt);
        }

        // Strong image warping
        vec2 distUV = uv + distortion;
        distUV = clamp(distUV, 0.0, 1.0);
        vec4 color = texture2D(u_image, distUV);

        // Bright wave-crest specular: tight highlight on normals facing light
        float dLen = length(distortion);
        if (dLen > 0.0005) {
          vec3 n      = normalize(vec3(-distortion.x, 0.15, -distortion.y));
          vec3 lDir   = normalize(vec3(0.2, 1.0, 0.4));
          vec3 vDir   = vec3(0.0, 0.0, 1.0);
          vec3 h      = normalize(lDir + vDir);
          float spec  = pow(max(0.0, dot(n, h)), 80.0);
          float spec2 = pow(max(0.0, dot(n, h)), 8.0);
          // bright ring highlight + wide glow
          color.rgb += spec  * 2.5;
          color.rgb += spec2 * 0.4;
          // brightness at wave crests
          color.rgb += dLen * 1.5;
        }

        gl_FragColor = color;
      }
    `

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
      console.error(gl.getProgramInfoLog(prog))

    // ── Texture ──────────────────────────────────────────────────────────────
    const tex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([30, 30, 30, 255]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    }
    img.src = imageUrl

    // ── Geometry (full-screen quad, updated on resize) ────────────────────
    const posBuf = gl.createBuffer()!
    const uvBuf  = gl.createBuffer()!

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([0,0, 1,0, 0,1, 0,1, 1,0, 1,1]),
      gl.STATIC_DRAW)

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = Math.max(1, Math.round(canvas.offsetWidth  * dpr))
      const h = Math.max(1, Math.round(canvas.offsetHeight * dpr))
      canvas.width  = w
      canvas.height = h
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([0,0, w,0, 0,h, 0,h, w,0, w,h]),
        gl.DYNAMIC_DRAW)
    }
    syncSize()
    // re-sync after layout settles
    setTimeout(syncSize, 0)
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)

    // ── Ripple state ──────────────────────────────────────────────────────
    type Ripple = { x: number; y: number; time: number }
    const ripples: Ripple[] = []

    const onSectionClick = (e: MouseEvent) => {
      const section = canvas.parentElement?.parentElement
      if (!section) return
      const rect = section.getBoundingClientRect()
      ripples.push({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
        time: performance.now() / 1000,
      })
      if (ripples.length > 10) ripples.shift()
    }
    // attach to the section (canvas parent's parent) so click fires through text too
    const section = canvas.parentElement?.parentElement
    section?.addEventListener('click', onSectionClick)

    // ── Attribute locations ───────────────────────────────────────────────
    const aPos = gl.getAttribLocation(prog, 'a_position')
    const aTex = gl.getAttribLocation(prog, 'a_texCoord')

    // ── Render loop ───────────────────────────────────────────────────────
    let raf = 0
    const render = () => {
      const w = canvas.width, h = canvas.height
      gl.viewport(0, 0, w, h)
      gl.clearColor(0.067, 0.067, 0.067, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(prog)

      // attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
      gl.enableVertexAttribArray(aTex)
      gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0)

      // uniforms
      const u = (n: string) => gl.getUniformLocation(prog, n)
      gl.uniform2f(u('u_resolution'), w, h)
      gl.uniform1f(u('u_time'),       performance.now() / 1000)
      gl.uniform1f(u('u_amplitude'),  amplitude)
      gl.uniform1f(u('u_frequency'),  frequency)
      gl.uniform1f(u('u_decay'),      decay)
      gl.uniform1f(u('u_speed'),      speed)

      const data = new Float32Array(30)
      ripples.forEach((r, i) => {
        data[i * 3] = r.x; data[i * 3 + 1] = r.y; data[i * 3 + 2] = r.time
      })
      gl.uniform3fv(u('u_ripples'),     data)
      gl.uniform1i( u('u_rippleCount'), ripples.length)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.uniform1i(u('u_image'), 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      section?.removeEventListener('click', onSectionClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
