import React, { useEffect, useRef } from 'react'

export default function Particles({ count = 40, r = 255, g = 255, b = 255, opacity = 0.4, style = {} }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 1.5 + 0.4,
      phase: Math.random() * Math.PI * 2,
    }))

    let raf, t = 0
    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0
        const a = (Math.sin(t + p.phase) * 0.35 + 0.65) * opacity
        ctx.beginPath()
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [count, r, g, b, opacity])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', ...style,
    }} />
  )
}
