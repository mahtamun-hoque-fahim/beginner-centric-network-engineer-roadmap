'use client'

import { useEffect, useRef } from 'react'

/**
 * HeroBackground — procedural WebGL topographic-line background.
 * Colors match the locked academic-line palette (BRAIN.md / DESIGN_GUIDE.md):
 * near-black base, mint accent lines. Not used anywhere but the landing
 * page hero — this is decorative, not part of the shared design system.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced-motion: render a single static frame instead of
    // looping requestAnimationFrame indefinitely.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float depth = 1.0 / (uv.y + 1.15);
        vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.12);

        float n = noise(gridUv * 3.5);
        float ripples = sin(gridUv.y * 18.0 + n * 8.0 + u_time * 0.4);

        float topoLine = smoothstep(0.03, 0.0, abs(ripples));

        // Brand palette: --color-bg (#070807) base, --color-accent (#3DF49A) lines
        vec3 baseColor = vec3(0.027, 0.031, 0.027);
        vec3 accentDim = vec3(0.09, 0.14, 0.11);
        vec3 neonColor = vec3(0.24, 0.96, 0.60);

        vec3 finalColor = mix(baseColor, accentDim, n * 0.5);
        finalColor += topoLine * neonColor * depth * 0.35;

        float fade = smoothstep(0.1, -1.0, uv.y);
        finalColor *= (1.0 - length(uv) * 0.45) * (1.0 - fade);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()!
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const posAttrib = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posAttrib)
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const resLoc = gl.getUniformLocation(program, 'u_resolution')

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
        canvas.width = clientWidth
        canvas.height = clientHeight
        gl.viewport(0, 0, clientWidth, clientHeight)
      }
    }

    const drawFrame = (time: number) => {
      resize()
      gl.uniform1f(timeLoc, time * 0.001)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    if (prefersReducedMotion) {
      drawFrame(0)
      return
    }

    let animationFrameId: number
    const render = (time: number) => {
      drawFrame(time)
      animationFrameId = requestAnimationFrame(render)
    }
    animationFrameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block"
    />
  )
}
