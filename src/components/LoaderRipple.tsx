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
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_startTime;
  uniform float u_duration;
  varying vec2 v_uv;

  void main() {
    float t = clamp((u_time - u_startTime) / u_duration, 0.0, 1.0);

    vec2 p = v_uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    float dist = max(length(p), 0.0001);
    vec2 dir = p / dist;
    float radius = t * 1.18;
    float edge = dist - radius;

    float front = exp(-pow(edge * 24.0, 2.0));
    float wake = exp(-abs(edge) * 7.0);
    float innerWake = exp(-abs(edge + 0.13) * 7.2);
    float outerWake = exp(-abs(edge - 0.055) * 10.0);
    float damping = exp(-t * 0.52);
    float fade = 1.0 - smoothstep(0.9, 1.0, t);

    float pressure = sin(edge * 62.0 - t * 0.72) * wake;
    float velocity = cos(edge * 62.0 - t * 0.72) * wake;
    float spring = sin((edge + 0.13) * 86.0 - t * 0.58) * innerWake * 0.42;
    float capillary = sin((dist + dot(dir, vec2(0.36, -0.22)) * 0.02) * 118.0 - t * 0.65) * front * 0.1;
    float height = (pressure + spring + capillary) * damping * fade;

    float grad = (
      cos(edge * 62.0 - t * 0.72) * 62.0 * wake +
      cos((edge + 0.13) * 86.0 - t * 0.58) * 36.12 * innerWake +
      cos((dist + dot(dir, vec2(0.36, -0.22)) * 0.02) * 118.0 - t * 0.65) * 11.8 * front
    ) * 0.013 * damping * fade;

    vec3 normal = normalize(vec3(-dir.x * grad, 0.38, -dir.y * grad));
    vec3 lightDir = normalize(vec3(-0.42, 0.86, 0.28));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    vec3 reflected = reflect(-viewDir, normal);

    float lambert = clamp(dot(normal, lightDir), 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    float specular = pow(max(dot(normal, halfDir), 0.0), 105.0) * front * 0.78;
    float broadReflection = pow(max(reflected.y * 0.5 + 0.5, 0.0), 2.4) * outerWake;
    float trough = smoothstep(0.02, 0.35, -height);
    float crest = smoothstep(0.015, 0.34, height);
    float refraction = (velocity * 0.5 + pressure * 0.28) * damping * wake;
    float caustic = pow(max(0.0, sin(dist * 92.0 - t * 0.7 + height * 1.4)), 6.0) * wake * damping;

    vec3 shadowColor = vec3(0.018, 0.018, 0.017);
    vec3 displacementColor = vec3(0.18, 0.18, 0.17);
    vec3 reflectionColor = vec3(0.74, 0.72, 0.66);
    vec3 highlightColor = vec3(1.0, 0.96, 0.86);

    vec3 color = displacementColor;
    color = mix(color, shadowColor, trough * 0.68 + max(-refraction, 0.0) * 0.36);
    color = mix(color, reflectionColor, broadReflection * 0.34 + fresnel * front * 0.2);
    color = mix(color, highlightColor, crest * 0.28 + specular);
    color += highlightColor * caustic * 0.12;
    color += vec3(0.08, 0.075, 0.065) * lambert * front;

    float alpha = (
      front * 0.38 +
      abs(refraction) * 0.42 +
      broadReflection * 0.3 +
      caustic * 0.16 +
      specular * 0.58
    ) * fade;

    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.72));
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
