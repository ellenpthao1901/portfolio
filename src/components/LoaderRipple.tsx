import { useEffect, useRef } from 'react'

interface LoaderRippleProps {
  active: boolean
  durationMs: number
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_startTime;
  uniform float u_duration;
  varying vec2 v_uv;

  float easeOutCubic(float t) {
    return 1.0 - pow(1.0 - t, 3.0);
  }

  void main() {
    float t = clamp((u_time - u_startTime) / u_duration, 0.0, 1.0);
    float eased = easeOutCubic(t);

    vec2 p = v_uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    float dist = length(p);
    float radius = eased * 1.18;
    float edge = dist - radius;

    float front = exp(-pow(edge * 26.0, 2.0));
    float wake = exp(-abs(edge) * 12.0);
    float wave = sin(edge * 118.0 - t * 14.0) * 0.5 + 0.5;
    float shimmer = pow(max(0.0, sin((dist + t * 0.2) * 84.0)), 4.0) * wake;
    float fade = 1.0 - smoothstep(0.82, 1.0, t);

    float alpha = (front * 0.42 + wave * wake * 0.13 + shimmer * 0.17) * fade;
    vec3 color = mix(vec3(0.45, 0.58, 0.62), vec3(1.0, 0.98, 0.9), front);

    gl_FragColor = vec4(color, alpha);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Loader ripple shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export default function LoaderRipple({ active, durationMs }: LoaderRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Loader ripple program error:', gl.getProgramInfoLog(program))
      return
    }

    const positionBuffer = gl.createBuffer()
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ])

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(canvas.offsetWidth * dpr))
      canvas.height = Math.max(1, Math.round(canvas.offsetHeight * dpr))
    }

    syncSize()
    const resizeObserver = new ResizeObserver(syncSize)
    resizeObserver.observe(canvas)

    const startTime = performance.now() / 1000
    const duration = durationMs / 1000
    let frameId = 0

    const uniform = (name: string) => gl.getUniformLocation(program, name)

    const render = () => {
      const now = performance.now() / 1000

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)

      gl.uniform2f(uniform('u_resolution'), canvas.width, canvas.height)
      gl.uniform1f(uniform('u_time'), now)
      gl.uniform1f(uniform('u_startTime'), startTime)
      gl.uniform1f(uniform('u_duration'), duration)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      if (now - startTime < duration + 0.35) {
        frameId = requestAnimationFrame(render)
      }
    }

    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [active, durationMs])

  return <canvas ref={canvasRef} className="site-loader-ripple" aria-hidden="true" />
}
