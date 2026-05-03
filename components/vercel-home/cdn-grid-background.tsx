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
  { surface: 'floor', offset: 0.19, speed: 0.27, color: '56, 189, 248', length: 245, width: 18, delay: 0 },
  { surface: 'ceiling', offset: 0.71, speed: 0.24, color: '45, 212, 191', length: 215, width: 16, delay: 0.42 },
  { surface: 'right', offset: 0.44, speed: 0.21, color: '96, 165, 250', length: 172, width: 14, delay: 0.78 },
  { surface: 'ceiling', offset: 0.29, speed: 0.33, color: '248, 113, 113', length: 148, width: 13, delay: 1.15 },
  { surface: 'left', offset: 0.55, speed: 0.18, color: '167, 139, 250', length: 135, width: 12, delay: 1.65 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function pointOnLine(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
}

export function CdnGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf: number
    let start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawLine = (a: { x: number; y: number }, b: { x: number; y: number }, alpha = 0.1) => {
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
      gradient.addColorStop(0.18, `rgba(${color},${opacity * 0.16})`)
      gradient.addColorStop(0.5, `rgba(${color},${opacity})`)
      gradient.addColorStop(0.82, `rgba(${color},${opacity * 0.19})`)
      gradient.addColorStop(1, `rgba(${color},0)`)

      ctx.shadowColor = `rgba(${color},${opacity * 0.9})`
      ctx.shadowBlur = 38
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
      const top = h * 0.04
      const outerW = Math.min(w * 0.88, 1140)
      const outerH = Math.min(h * 0.79, 730)

      const outerLeft = cx - outerW / 2
      const outerRight = cx + outerW / 2
      const outerTop = top + 26
      const outerBottom = outerTop + outerH

      const backW = outerW * 0.49
      const backH = outerH * 0.43
      const backLeft = cx - backW / 2
      const backRight = cx + backW / 2
      const backTop = outerTop + outerH * 0.255
      const backBottom = backTop + backH

      const oTL = { x: outerLeft, y: outerTop }
      const oTR = { x: outerRight, y: outerTop }
      const oBL = { x: outerLeft, y: outerBottom }
      const oBR = { x: outerRight, y: outerBottom }

      const bTL = { x: backLeft, y: backTop }
      const bTR = { x: backRight, y: backTop }
      const bBL = { x: backLeft, y: backBottom }
      const bBR = { x: backRight, y: backBottom }

      // === GRID LINES (дуже делікатні та рівні) ===
      // Основні стіни
      ;[
        [oTL, oTR], [oTR, oBR], [oBR, oBL], [oBL, oTL],
        [bTL, bTR], [bTR, bBR], [bBR, bBL], [bBL, bTL],
        [oTL, bTL], [oTR, bTR], [oBL, bBL], [oBR, bBR],
      ].forEach(([a, b]) => drawLine(a, b, 0.115))

      // Back wall grid
      for (let i = 1; i < 7; i++) {
        const x = lerp(backLeft, backRight, i / 7)
        drawLine({ x, y: backTop }, { x, y: backBottom }, 0.082)
      }
      for (let i = 1; i < 4; i++) {
        const y = lerp(backTop, backBottom, i / 4)
        drawLine({ x: backLeft, y }, { x: backRight, y }, 0.082)
      }

      // Perspective lines
      for (let i = 1; i < 9; i++) {
        const pTop = pointOnLine(oTL, oTR, i / 9)
        const pBackTop = pointOnLine(bTL, bTR, i / 9)
        const pBot = pointOnLine(oBL, oBR, i / 9)
        const pBackBot = pointOnLine(bBL, bBR, i / 9)
        drawLine(pTop, pBackTop, 0.068)
        drawLine(pBot, pBackBot, 0.078)
      }

      // Side walls
      for (let i = 1; i < 5; i++) {
        const leftF = pointOnLine(oTL, oBL, i / 5)
        const leftB = pointOnLine(bTL, bBL, i / 5)
        const rightF = pointOnLine(oTR, oBR, i / 5)
        const rightB = pointOnLine(bTR, bBR, i / 5)
        drawLine(leftF, leftB, 0.072)
        drawLine(rightF, rightB, 0.072)
      }

      // === BEAMS ===
      beams.forEach((beam) => {
        const raw = (t * beam.speed + beam.delay) % 1
        const fade = Math.max(0, Math.sin(raw * Math.PI))

        let a = oBL, b = bBL, angle = -0.15

        if (beam.surface === 'floor') {
          a = pointOnLine(oBL, oBR, beam.offset)
          b = pointOnLine(bBL, bBR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        } else if (beam.surface === 'ceiling') {
          a = pointOnLine(oTL, oTR, beam.offset)
          b = pointOnLine(bTL, bTR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        } else if (beam.surface === 'left') {
          a = pointOnLine(oTL, oBL, beam.offset)
          b = pointOnLine(bTL, bBL, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        } else if (beam.surface === 'right') {
          a = pointOnLine(oTR, oBR, beam.offset)
          b = pointOnLine(bTR, bBR, beam.offset)
          angle = Math.atan2(b.y - a.y, b.x - a.x)
        }

        const p = pointOnLine(a, b, raw)
        const depthScale = lerp(1.28, 0.36, raw)

        drawBeam(p.x, p.y, angle, beam.length * depthScale, beam.width * depthScale, beam.color, fade * 0.93)
      })

      // === SOFT CENTRAL DARK PLATE (головне покращення) ===
      const plate = ctx.createRadialGradient(cx, h * 0.445, 120, cx, h * 0.445, 620)
      plate.addColorStop(0, 'rgba(0,0,0,0.96)')
      plate.addColorStop(0.48, 'rgba(0,0,0,0.83)')
      plate.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = plate
      ctx.fillRect(0, 0, w, h)

      // === VIGNETTE ===
      const vignette = ctx.createRadialGradient(cx, h * 0.44, 80, cx, h * 0.44, Math.max(w, h) * 0.78)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(0.62, 'rgba(0,0,0,0.22)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.97)')

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
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
