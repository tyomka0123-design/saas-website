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

    const line = (
      a: { x: number; y: number },
      b: { x: number; y: number },
      alpha = 0.13
    ) => {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`
      ctx.lineWidth = 1
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
      gradient.addColorStop(0.28, `rgba(${color},${opacity * 0.4})`)
      gradient.addColorStop(0.5, `rgba(${color},${opacity})`)
      gradient.addColorStop(0.72, `rgba(${color},${opacity * 0.45})`)
      gradient.addColorStop(1, `rgba(${color},0)`)

      ctx.shadowColor = `rgba(${color},${opacity})`
      ctx.shadowBlur = 18
      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.roundRect(-length / 2, -width / 2, length, width, 2)
      ctx.fill()

      ctx.restore()
    }

    const render = (now: number) => {
      const time = (now - start) / 1000
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2

      const outerW = Math.min(w * 0.86, 1120)
      const outerH = Math.min(h * 0.73, 650)

      const outerLeft = cx - outerW / 2
      const outerRight = cx + outerW / 2
      const outerTop = h * 0.12
      const outerBottom = outerTop + outerH

      const backW = outerW * 0.56
      const backH = outerH * 0.48

      const backLeft = cx - backW / 2
      const backRight = cx + backW / 2
      const backTop = outerTop + outerH * 0.21
      const backBottom = backTop + backH

      const outerTL = { x: outerLeft, y: outerTop }
      const outerTR = { x: outerRight, y: outerTop }
      const outerBL = { x: outerLeft, y: outerBottom }
      const outerBR = { x: outerRight, y: outerBottom }

      const backTL = { x: backLeft, y: backTop }
      const backTR = { x: backRight, y: backTop }
      const backBL = { x: backLeft, y: backBottom }
      const backBR = { x: backRight, y: backBottom }

      // main room
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
      ].forEach(([a, b]) => line(a, b, 0.14))

      // back wall vertical
      for (let i = 1; i < 6; i++) {
        const x = lerp(backLeft, backRight, i / 6)
        line({ x, y: backTop }, { x, y: backBottom }, 0.105)
      }

      // back wall horizontal
      for (let i = 1; i < 4; i++) {
        const y = lerp(backTop, backBottom, i / 4)
        line({ x: backLeft, y }, { x: backRight, y }, 0.105)
      }

      // ceiling + floor depth lines
      for (let i = 1; i < 8; i++) {
        line(point(outerTL, outerTR, i / 8), point(backTL, backTR, i / 8), 0.1)
        line(point(outerBL, outerBR, i / 8), point(backBL, backBR, i / 8), 0.12)
      }

      // floor / ceiling horizontal layers
      for (let i = 1; i < 5; i++) {
        line(point(outerTL, backTL, i / 5), point(outerTR, backTR, i / 5), 0.09)
        line(point(outerBL, backBL, i / 5), point(outerBR, backBR, i / 5), 0.115)
      }

      // side wall horizontal lines
      for (let i = 1; i < 5; i++) {
        line(point(outerTL, outerBL, i / 5), point(backTL, backBL, i / 5), 0.1)
        line(point(outerTR, outerBR, i / 5), point(backTR, backBR, i / 5), 0.1)
      }

      const beams = [
        {
          a: point(outerBL, outerBR, 0.1),
          b: point(backBL, backBR, 0.22),
          color: '56,189,248',
          length: 240,
          width: 17,
          speed: 0.2,
          delay: 0,
        },
        {
          a: point(outerTL, outerTR, 0.72),
          b: point(backTL, backTR, 0.65),
          color: '45,212,191',
          length: 210,
          width: 16,
          speed: 0.18,
          delay: 0.35,
        },
        {
          a: point(outerTR, outerBR, 0.42),
          b: point(backTR, backBR, 0.42),
          color: '96,165,250',
          length: 170,
          width: 15,
          speed: 0.22,
          delay: 0.58,
        },
        {
          a: point(outerTL, outerTR, 0.28),
          b: point(backTL, backTR, 0.34),
          color: '248,113,113',
          length: 150,
          width: 14,
          speed: 0.16,
          delay: 0.78,
        },
      ]

      beams.forEach((b) => {
        const t = (time * b.speed + b.delay) % 1
        const fade = Math.sin(t * Math.PI)
        const p = point(b.a, b.b, t)
        const angle = Math.atan2(b.b.y - b.a.y, b.b.x - b.a.x)
        const scale = lerp(1.15, 0.55, t)

        beam(p.x, p.y, angle, b.length * scale, b.width * scale, b.color, fade * 0.9)
      })

      // center darkness WITHOUT visible square
      const center = ctx.createRadialGradient(cx, h * 0.45, 0, cx, h * 0.45, 520)
      center.addColorStop(0, 'rgba(0,0,0,0.96)')
      center.addColorStop(0.38, 'rgba(0,0,0,0.84)')
      center.addColorStop(0.68, 'rgba(0,0,0,0.42)')
      center.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = center
      ctx.fillRect(0, 0, w, h)

      // global vignette
      const vignette = ctx.createRadialGradient(cx, h * 0.44, 0, cx, h * 0.44, Math.max(w, h) * 0.72)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(0.58, 'rgba(0,0,0,0.2)')
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
