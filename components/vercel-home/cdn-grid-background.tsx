'use client'

import { useEffect, useRef } from 'react'

type Beam = {
  surface: 'floor' | 'ceiling' | 'left' | 'right'
  offset: number
  speed: number
  color: string
  length: number
  width: number
  delay: number
}

const beams: Beam[] = [
  {
    surface: 'floor',
    offset: 0.18,
    speed: 0.28,
    color: '56, 189, 248',
    length: 210,
    width: 18,
    delay: 0,
  },
  {
    surface: 'ceiling',
    offset: 0.72,
    speed: 0.24,
    color: '45, 212, 191',
    length: 190,
    width: 16,
    delay: 0.34,
  },
  {
    surface: 'right',
    offset: 0.44,
    speed: 0.22,
    color: '96, 165, 250',
    length: 150,
    width: 14,
    delay: 0.62,
  },
  {
    surface: 'ceiling',
    offset: 0.28,
    speed: 0.18,
    color: '248, 113, 113',
    length: 130,
    width: 13,
    delay: 0.82,
  },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function pointOnLine(
  a: { x: number; y: number },
  b: { x: number; y: number },
  t: number
) {
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
    let start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawLine = (
      a: { x: number; y: number },
      b: { x: number; y: number },
      alpha = 0.09
    ) => {
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const drawBeam = (
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
      gradient.addColorStop(0.22, `rgba(${color},${opacity * 0.16})`)
      gradient.addColorStop(0.5, `rgba(${color},${opacity})`)
      gradient.addColorStop(0.78, `rgba(${color},${opacity * 0.2})`)
      gradient.addColorStop(1, `rgba(${color},0)`)

      ctx.shadowColor = `rgba(${color},${opacity * 0.85})`
      ctx.shadowBlur = 30
      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.roundRect(-length / 2, -width / 2, length, width, width / 2)
      ctx.fill()

      ctx.restore()
    }

    const render = (now: number) => {
      const t = (now - start) / 1000
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const top = h * 0.03
      const bottom = h * 0.96

      const outerW = Math.min(w * 0.82, 1080)
      const outerH = Math.min(h * 0.75, 670)

      const outerLeft = cx - outerW / 2
      const outerRight = cx + outerW / 2
      const outerTop = top + 35
      const outerBottom = outerTop + outerH

      const backW = outerW * 0.52
      const backH = outerH * 0.46

      const backLeft = cx - backW / 2
      const backRight = cx + backW / 2
      const backTop = outerTop + outerH * 0.23
      const backBottom = backTop + backH

      const outerTL = { x: outerLeft, y: outerTop }
      const outerTR = { x: outerRight, y: outerTop }
      const outerBL = { x: outerLeft, y: outerBottom }
      const outerBR = { x: outerRight, y: outerBottom }

      const backTL = { x: backLeft, y: backTop }
      const backTR = { x: backRight, y: backTop }
      const backBL = { x: backLeft, y: backBottom }
      const backBR = { x: backRight, y: backBottom }

      // outer + back boxes
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
      ].forEach(([a, b]) => drawLine(a, b, 0.105))

      // back wall grid
      for (let i = 1; i < 5; i++) {
        const x = lerp(backLeft, backRight, i / 5)
        drawLine({ x, y: backTop }, { x, y: backBottom }, 0.075)
      }

      for (let i = 1; i < 3; i++) {
        const y = lerp(backTop, backBottom, i / 3)
        drawLine({ x: backLeft, y }, { x: backRight, y }, 0.075)
      }

      // floor / ceiling perspective grid
      for (let i = 1; i < 7; i++) {
        const pTop = pointOnLine(outerTL, outerTR, i / 7)
        const pBackTop = pointOnLine(backTL, backTR, i / 7)
        const pBottom = pointOnLine(outerBL, outerBR, i / 7)
        const pBackBottom = pointOnLine(backBL, backBR, i / 7)

        drawLine(pTop, pBackTop, 0.065)
        drawLine(pBottom, pBackBottom, 0.075)
      }

      for (let i = 1; i < 4; i++) {
        const lt = pointOnLine(outerTL, backTL, i / 4)
        const rt = pointOnLine(outerTR, backTR, i / 4)
        const lb = pointOnLine(outerBL, backBL, i / 4)
        const rb = pointOnLine(outerBR, backBR, i / 4)

        drawLine(lt, rt, 0.06)
        drawLine(lb, rb, 0.07)
      }

      // side wall grid
      for (let i = 1; i < 4; i++) {
        const l1 = pointOnLine(outerTL, outerBL, i / 4)
        const l2 = pointOnLine(backTL, backBL, i / 4)
        const r1 = pointOnLine(outerTR, outerBR, i / 4)
        const r2 = pointOnLine(backTR, backBR, i / 4)

        drawLine(l1, l2, 0.07)
        drawLine(r1, r2, 0.07)
      }

      // beams locked to room surfaces
      beams.forEach((beam) => {
        const raw = (t * beam.speed + beam.delay) % 1
        const fade = Math.sin(raw * Math.PI)

        let a = outerBL
        let b = backBL
        let angle = -0.16

        if (beam.surface === 'floor') {
          a = pointOnLine(outerBL, outerBR, beam.offset)
          b = pointOnLine(backBL, backBR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        }

        if (beam.surface === 'ceiling') {
          a = pointOnLine(outerTL, outerTR, beam.offset)
          b = pointOnLine(backTL, backTR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        }

        if (beam.surface === 'left') {
          a = pointOnLine(outerTL, outerBL, beam.offset)
          b = pointOnLine(backTL, backBL, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        }

        if (beam.surface === 'right') {
          a = pointOnLine(outerTR, outerBR, beam.offset)
          b = pointOnLine(backTR, backBR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        }

        const p = pointOnLine(a, b, raw)
        const depthScale = lerp(1.15, 0.42, raw)

        drawBeam(
          p.x,
          p.y,
          angle,
          beam.length * depthScale,
          beam.width * depthScale,
          beam.color,
          fade * 0.9
        )
      })

      // dark center plate for text readability
      const plateGradient = ctx.createRadialGradient(cx, h * 0.42, 0, cx, h * 0.42, 470)
      plateGradient.addColorStop(0, 'rgba(0,0,0,0.96)')
      plateGradient.addColorStop(0.42, 'rgba(0,0,0,0.78)')
      plateGradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = plateGradient
      ctx.fillRect(0, 0, w, h)

      // vignette
      const vignette = ctx.createRadialGradient(cx, h * 0.42, 0, cx, h * 0.42, Math.max(w, h) * 0.7)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(0.65, 'rgba(0,0,0,0.2)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.95)')

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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
