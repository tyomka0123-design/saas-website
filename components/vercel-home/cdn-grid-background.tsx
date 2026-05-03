'use client'

import { useEffect, useRef } from 'react'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function point(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  }
}

export function CdnGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const render = (now: number) => {
      const time = (now - start) / 1000
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const cx = w / 2

      ctx.clearRect(0, 0, w, h)

      const outerW = Math.min(w * 1.04, 1380)
      const outerH = Math.min(h * 0.88, 780)

      const outerLeft = cx - outerW / 2
      const outerRight = cx + outerW / 2
      const outerTop = h * 0.17
      const outerBottom = outerTop + outerH

      const backW = outerW * 0.56
      const backH = outerH * 0.48

      const backLeft = cx - backW / 2
      const backRight = cx + backW / 2
      const backTop = outerTop + outerH * 0.24
      const backBottom = backTop + backH

      const outerTL = { x: outerLeft, y: outerTop }
      const outerTR = { x: outerRight, y: outerTop }
      const outerBL = { x: outerLeft, y: outerBottom }
      const outerBR = { x: outerRight, y: outerBottom }

      const backTL = { x: backLeft, y: backTop }
      const backTR = { x: backRight, y: backTop }
      const backBL = { x: backLeft, y: backBottom }
      const backBR = { x: backRight, y: backBottom }

      const centerW = 820
      const centerH = 420
      const centerLeft = cx - centerW / 2
      const centerRight = cx + centerW / 2
      const centerTop = h * 0.5 - centerH / 2
      const centerBottom = centerTop + centerH

      const line = (
        a: { x: number; y: number },
        b: { x: number; y: number },
        alpha = 0.18
      ) => {
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = 1.05
        ctx.stroke()
      }

      const beam = (
        x: number,
        y: number,
        angle: number,
        length: number,
        width: number,
        color: string,
        opacity: number
      ) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)

        const gradient = ctx.createLinearGradient(-length / 2, 0, length / 2, 0)
        gradient.addColorStop(0, `rgba(${color},0)`)
        gradient.addColorStop(0.25, `rgba(${color},${opacity * 0.35})`)
        gradient.addColorStop(0.5, `rgba(${color},${opacity})`)
        gradient.addColorStop(0.75, `rgba(${color},${opacity * 0.4})`)
        gradient.addColorStop(1, `rgba(${color},0)`)

        ctx.shadowColor = `rgba(${color},${opacity})`
        ctx.shadowBlur = 24
        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.roundRect(-length / 2, -width / 2, length, width, 2)
        ctx.fill()

        ctx.restore()
      }

      // main room frame
      ;[
        [outerTL, outerTR],
        [outerTR, outerBR],
        [outerBR, outerBL],
        [outerBL, outerTL],
        [backTL, backTR],
        [backTR, backBR],
        [backBR, backBL],
        [backBL, backTL],
        [outerTL, backTL],
        [outerTR, backTR],
        [outerBL, backBL],
        [outerBR, backBR],
      ].forEach(([a, b]) => line(a, b, 0.2))

      // back wall grid
      for (let i = 1; i < 6; i++) {
        const x = lerp(backLeft, backRight, i / 6)
        line({ x, y: backTop }, { x, y: backBottom }, 0.15)
      }

      for (let i = 1; i < 4; i++) {
        const y = lerp(backTop, backBottom, i / 4)
        line({ x: backLeft, y }, { x: backRight, y }, 0.15)
      }

      // ceiling and floor depth lines
      for (let i = 1; i < 8; i++) {
        line(point(outerTL, outerTR, i / 8), point(backTL, backTR, i / 8), 0.16)
        line(point(outerBL, outerBR, i / 8), point(backBL, backBR, i / 8), 0.18)
      }

      // ceiling/floor horizontal layers
      for (let i = 1; i < 5; i++) {
        line(point(outerTL, backTL, i / 5), point(outerTR, backTR, i / 5), 0.14)
        line(point(outerBL, backBL, i / 5), point(outerBR, backBR, i / 5), 0.17)
      }

      // side wall horizontal lines
      for (let i = 1; i < 6; i++) {
        line(point(outerTL, outerBL, i / 6), point(backTL, backBL, i / 6), 0.15)
        line(point(outerTR, outerBR, i / 6), point(backTR, backBR, i / 6), 0.15)
      }

      // side wall vertical subdivision lines
      for (let i = 1; i < 4; i++) {
        line(point(outerTL, backTL, i / 4), point(outerBL, backBL, i / 4), 0.13)
        line(point(outerTR, backTR, i / 4), point(outerBR, backBR, i / 4), 0.13)
      }

      // soft black center block mask, aligned with Hero
      const centerFade = ctx.createLinearGradient(0, centerTop, 0, centerBottom)
      centerFade.addColorStop(0, 'rgba(0,0,0,0.78)')
      centerFade.addColorStop(0.2, 'rgba(0,0,0,0.94)')
      centerFade.addColorStop(0.8, 'rgba(0,0,0,0.94)')
      centerFade.addColorStop(1, 'rgba(0,0,0,0.78)')

      ctx.fillStyle = centerFade
      ctx.fillRect(centerLeft, centerTop, centerW, centerH)

      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.strokeRect(centerLeft, centerTop, centerW, centerH)

      const beams = [
        {
          a: point(outerBL, outerBR, 0.12),
          b: point(backBL, backBR, 0.24),
          color: '56,189,248',
          length: 250,
          width: 15,
          speed: 0.38,
          delay: 0,
        },
        {
          a: point(outerTL, outerTR, 0.72),
          b: point(backTL, backTR, 0.65),
          color: '45,212,191',
          length: 230,
          width: 15,
          speed: 0.34,
          delay: 0.35,
        },
        {
          a: point(outerTR, outerBR, 0.42),
          b: point(backTR, backBR, 0.42),
          color: '96,165,250',
          length: 180,
          width: 13,
          speed: 0.4,
          delay: 0.58,
        },
        {
          a: point(outerTL, outerTR, 0.34),
          b: point(backTL, backTR, 0.38),
          color: '248,113,113',
          length: 160,
          width: 13,
          speed: 0.32,
          delay: 0.78,
        },
      ]

      beams.forEach((b) => {
        const t = (time * b.speed + b.delay) % 1
        const fade = Math.sin(t * Math.PI)
        const p = point(b.a, b.b, t)
        const angle = Math.atan2(b.b.y - b.a.y, b.b.x - b.a.x)
        const scale = lerp(1.12, 0.58, t)

        beam(p.x, p.y, angle, b.length * scale, b.width * scale, b.color, fade * 0.9)
      })

      // global vignette
      const vignette = ctx.createRadialGradient(cx, h * 0.48, 0, cx, h * 0.48, Math.max(w, h) * 0.75)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(0.55, 'rgba(0,0,0,0.12)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.96)')

      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
