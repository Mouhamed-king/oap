import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles from './Particles'

/* ── SVG Drone inline ── */
function DroneSVG() {
  return (
    <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arms */}
      {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i)=>(
        <line key={i}
          x1={140} y1={80}
          x2={140 + sx*90} y2={80 + sy*38}
          stroke="#5BB3F0" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"
        />
      ))}
      {/* Rotor hubs */}
      {[[50,42],[230,42],[50,118],[230,118]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={18} fill="rgba(13,31,60,0.95)" stroke="#2E7DD4" strokeWidth="1.5"/>
      ))}
      {/* Spinning blades */}
      {[[50,42],[230,42],[50,118],[230,118]].map(([cx,cy],i)=>(
        <motion.ellipse key={i} cx={cx} cy={cy} rx={20} ry={3.5}
          fill={`rgba(91,179,240,${0.35+i*0.05})`}
          animate={{ rotate: i%2===0 ? 360 : -360 }}
          transition={{ duration: 0.25+i*0.04, repeat: Infinity, ease:'linear' }}
          style={{ originX: cx+'px', originY: cy+'px' }}
        />
      ))}
      {/* Body */}
      <rect x={60} y={65} width={160} height={30} rx={10} fill="rgba(10,22,45,0.97)" stroke="#2E7DD4" strokeWidth="1.5"/>
      <rect x={65} y={68} width={150} height={11} rx={5} fill="rgba(91,179,240,0.1)"/>
      {/* LED strip */}
      <line x1={75} y1={80} x2={205} y2={80} stroke="#5BB3F0" strokeWidth="0.8" opacity="0.4"/>
      {/* Camera */}
      <ellipse cx={140} cy={98} rx={14} ry={8} fill="rgba(8,18,40,0.95)" stroke="#1E4D9A" strokeWidth="1.5"/>
      <motion.circle cx={140} cy={98} r={5} fill="#5BB3F0"
        animate={{ opacity: [0.5,1,0.5] }} transition={{ duration:1.8, repeat: Infinity }}/>
      {/* Package */}
      <rect x={118} y={104} width={44} height={30} rx={5} fill="rgba(8,18,40,0.95)" stroke="#C9A84C" strokeWidth="1.5"/>
      <line x1={140} y1={104} x2={140} y2={134} stroke="#C9A84C" strokeWidth={1} opacity="0.5"/>
      <line x1={118} y1={119} x2={162} y2={119} stroke="#C9A84C" strokeWidth={1} opacity="0.5"/>
      {/* Glow under */}
      <ellipse cx={140} cy={140} rx={55} ry={7} fill="rgba(46,125,212,0.2)" />
    </svg>
  )
}

const phases = [
  {
    title: 'Plus besoin de vous déplacer.',
    sub: null,
    tag: 'INNOVATION EXCLUSIVE',
    tagColor: 'var(--sky)',
  },
  {
    title: 'Votre assurance arrive jusqu\'à vous',
    sub: 'Livraison de contrats, renouvellements et documents urgents directement à votre porte, partout au Sénégal.',
    tag: 'LIVRAISON PAR DRONE',
    tagColor: 'var(--gold)',
  },
  {
    title: 'Offre exclusive',
    sub: 'Livraison par drone gratuite pendant vos 2 premiers mois. Un service proche de vous.',
    tag: 'GRATUIT 2 MOIS',
    tagColor: 'var(--sky)',
    highlight: true,
  },
]

export default function DroneSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const droneX = useTransform(scrollYProgress, [0, 0.5, 1], ['-40vw', '0vw', '45vw'])
  const droneY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['8vh', '-6vh', '2vh', '-8vh', '-2vh'])
  const droneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 0, 8])

  const getPhaseOpacity = (i) => {
    const start = i / phases.length
    const mid   = start + 0.18
    const end   = (i + 1) / phases.length
    return useTransform(scrollYProgress, [start, mid, end - 0.08, end], [0, 1, 1, 0])
  }

  return (
    <section id="drone" ref={ref} style={{ position: 'relative', height: '400vh' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: 'linear-gradient(165deg, #0D1F3C 0%, #111E3A 50%, #0D1F3C 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Particles count={40} r={91} g={179} b={240} opacity={0.3} />

        {/* Horizon glow */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0,
          height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,179,240,0.2), transparent)',
        }} />

        {/* Background radial */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(30,77,154,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Drone */}
        <motion.div style={{
          position: 'absolute', top: '38%', left: '50%', marginLeft: -140,
          zIndex: 10, x: droneX, y: droneY, rotate: droneRotate,
        }}>
          <DroneSVG />
          {/* Beam below drone */}
          <div style={{
            position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
            width: 70, height: 30,
            background: 'radial-gradient(ellipse, rgba(46,125,212,0.4) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }} />
        </motion.div>

        {/* Phase texts */}
        {phases.map((p, i) => {
          const opacity = getPhaseOpacity(i)
          return (
            <motion.div key={i} style={{
              opacity, position: 'absolute',
              textAlign: 'center', padding: '0 2rem', maxWidth: 700,
              pointerEvents: 'none',
            }}>
              <div style={{
                fontSize: '0.65rem', letterSpacing: '0.25em',
                color: p.tagColor, marginBottom: '1.2rem',
                display: 'inline-block',
                padding: '0.3rem 1rem',
                border: `1px solid ${p.tagColor}40`,
                borderRadius: 100,
              }}>{p.tag}</div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                fontWeight: p.highlight ? 500 : 300,
                color: p.highlight ? 'transparent' : '#fff',
                background: p.highlight
                  ? 'linear-gradient(135deg, var(--sky-pale), var(--gold-light))'
                  : undefined,
                WebkitBackgroundClip: p.highlight ? 'text' : undefined,
                WebkitTextFillColor: p.highlight ? 'transparent' : undefined,
                backgroundClip: p.highlight ? 'text' : undefined,
                lineHeight: 1.1, marginBottom: '1.2rem',
                letterSpacing: '-0.01em',
              }}>{p.title}</h2>

              {p.sub && (
                <p style={{ fontSize: '1rem', color: 'rgba(168,216,248,0.7)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
                  {p.sub}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
