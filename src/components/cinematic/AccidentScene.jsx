import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AccidentScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Vehicle approach
  const leftX  = useTransform(scrollYProgress, [0, 0.2], ['-55vw', '-8vw'])
  const rightX = useTransform(scrollYProgress, [0, 0.2], ['55vw', '8vw'])

  // Impact shake
  const shakeX = useTransform(scrollYProgress, [0.2, 0.22, 0.24, 0.26, 0.28], [0, -12, 10, -7, 0])
  const flash  = useTransform(scrollYProgress, [0.19, 0.215, 0.24], [0, 0.85, 0])

  // Camera pull back
  const sceneScale = useTransform(scrollYProgress, [0.25, 0.5], [1, 1.05])

  // Text phases
  const t1 = useTransform(scrollYProgress, [0.3, 0.38, 0.47, 0.53], [0, 1, 1, 0])
  const t2 = useTransform(scrollYProgress, [0.53, 0.6, 0.7, 0.76], [0, 1, 1, 0])
  const t3 = useTransform(scrollYProgress, [0.76, 0.83, 0.93, 1], [0, 1, 1, 0])

  // Warm light
  const warmOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 0.5])

  return (
    <section ref={ref} style={{ position: 'relative', height: '500vh' }}>
      <motion.div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        scale: sceneScale,
        background: 'linear-gradient(170deg, #0D1F3C 0%, #0E1C38 60%, #0D1F3C 100%)',
      }}>
        {/* Road */}
        <div style={{
          position: 'absolute', bottom: '18%', left: 0, right: 0, height: 130,
          background: 'linear-gradient(180deg, #0C1526 0%, #0A1220 100%)',
          borderTop: '1px solid rgba(91,179,240,0.12)',
          borderBottom: '1px solid rgba(91,179,240,0.06)',
        }} />
        {/* Road dashes */}
        {[...Array(9)].map((_,i) => (
          <div key={i} style={{
            position: 'absolute', bottom: 'calc(18% + 62px)',
            left: `${i * 12}%`, width: '7%', height: 3,
            background: 'rgba(255,255,255,0.1)', borderRadius: 2,
          }} />
        ))}
        {/* Asphalt reflection */}
        <div style={{
          position: 'absolute', bottom: '14%', left: '20%', right: '20%',
          height: '6%',
          background: 'radial-gradient(ellipse, rgba(46,125,212,0.12) 0%, transparent 70%)',
        }} />

        {/* Vehicle Left (Taxi) */}
        <motion.div style={{
          position: 'absolute', bottom: '19%', left: '50%', marginLeft: -220,
          x: leftX, zIndex: 5,
        }}>
          <img src="/taxi.png" alt="Taxi"
            style={{ height: 160, objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))' }}
          />
        </motion.div>

        {/* Vehicle Right (VP) */}
        <motion.div style={{
          position: 'absolute', bottom: '19%', right: '50%', marginRight: -220,
          x: rightX, zIndex: 5,
        }}>
          <img src="/vp.png" alt="VP"
            style={{ height: 160, objectFit: 'contain', transform: 'scaleX(-1)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))' }}
          />
        </motion.div>

        {/* Impact flash */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,1)',
          opacity: flash, pointerEvents: 'none', zIndex: 20,
        }} />

        {/* Warm recovery overlay */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)',
          opacity: warmOpacity, pointerEvents: 'none', zIndex: 3,
        }} />

        {/* Text overlays */}
        {[
          { opacity: t1, content: (
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,5rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              "Dans ce genre de situation,<br/><em style={{ color: 'var(--sky)', fontStyle: 'italic' }}>un seul appel suffit."</em>
            </h2>
          )},
          { opacity: t2, content: (
            <>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--sky)', marginBottom: '1rem' }}>NOTRE PROMESSE</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,4rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
                Vous rentrez tranquillement<br/>chez vous. <em style={{ fontStyle: 'italic', color: 'rgba(168,216,248,0.8)' }}>On s'occupe du reste.</em>
              </h2>
            </>
          )},
          { opacity: t3, content: (
            <>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--gold)', marginBottom: '1.2rem' }}>NOTRE ENGAGEMENT</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3.5vw,3.5rem)', fontWeight: 400, color: '#fff', lineHeight: 1.25, marginBottom: '2rem' }}>
                Suivi complet de vos dossiers<br/>jusqu'au remboursement.
              </h2>
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Confiance', 'Soutien', 'Réactivité', 'Proximité humaine'].map(w => (
                  <div key={w} style={{
                    padding: '0.4rem 1.1rem',
                    background: 'rgba(91,179,240,0.1)',
                    border: '1px solid rgba(91,179,240,0.22)',
                    borderRadius: 100, fontSize: '0.75rem',
                    color: 'var(--sky-pale)', letterSpacing: '0.05em',
                  }}>{w}</div>
                ))}
              </div>
            </>
          )},
        ].map((phase, i) => (
          <motion.div key={i} style={{
            opacity: phase.opacity, position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', textAlign: 'center', padding: '0 3rem',
            pointerEvents: 'none',
          }}>
            {phase.content}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
