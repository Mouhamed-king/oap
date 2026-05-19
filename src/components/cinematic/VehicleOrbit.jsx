import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const vehicles = [
  {
    id: 'vp', image: '/vp.png',
    headline: 'Véhicules particuliers',
    sub: 'Protection complète, confort absolu. De 1 à 12 mois.',
    accent: '#2E7DD4',
    tag: 'PARTICULIERS',
    services: ['Assurance 1 à 12 mois', 'Assistance 24h/24', 'Suivi dossiers complet', 'Accompagnement accidents', 'Gestion administrative', 'Assistance humaine immédiate'],
  },
  {
    id: 'taxi', image: '/taxi.png',
    headline: 'Taxis & chauffeurs professionnels',
    sub: 'Parce que votre métier mérite le meilleur.',
    accent: '#1E4D9A',
    tag: 'PROFESSIONNELS',
    services: ['Assurance taxi', 'Assistance accidents', 'Gestion des dossiers', 'Livraison rapide documents', 'Accompagnement pro'],
  },
  {
    id: 'moto', image: '/moto.png',
    headline: 'Motos & tricycles',
    sub: 'Sur deux ou trois roues, couvert à chaque instant.',
    accent: '#5BB3F0',
    tag: 'DEUX-ROUES',
    services: ['Assurance moto', 'Assistance rapide', 'Protection conducteur', 'Gestion sinistres', 'Couverture 12 mois'],
  },
  {
    id: 'camion', image: '/camion.png',
    headline: 'Flottes & transport de marchandises',
    sub: 'L\'industrie protégée, le business assuré.',
    accent: '#0D1F3C',
    tag: 'TRANSPORT',
    services: ['Assurance flotte', 'Protection marchandises', 'Assistance professionnelle', 'Suivi administratif', 'Accompagnement entreprises'],
  },
]

function ServicePill({ label, accent }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
      padding: '0.35rem 0.85rem',
      background: `${accent}0D`,
      border: `1px solid ${accent}25`,
      borderRadius: '100px',
      fontSize: '0.73rem', color: accent, fontWeight: 400,
    }}>
      <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent, flexShrink: 0 }} />
      {label}
    </div>
  )
}

export default function VehicleOrbit() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const rawIdx = useTransform(scrollYProgress, [0, 1], [0, vehicles.length - 0.001])
  const [idx, setIdx] = useState(0)

  useEffect(() => rawIdx.on('change', v => setIdx(Math.min(vehicles.length - 1, Math.floor(v)))), [rawIdx])

  const v = vehicles[idx]

  return (
    <section id="vehicles" ref={sectionRef} style={{ position: 'relative', height: `${vehicles.length * 100}vh` }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: 'var(--off-white)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center',
        transition: 'background 0.6s ease',
      }}>

        {/* Left: info panel */}
        <motion.div
          key={idx + '-info'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '0 5vw 0 8vw', zIndex: 5 }}
        >
          {/* Tag */}
          <div style={{
            display: 'inline-block', fontSize: '0.6rem', letterSpacing: '0.22em',
            color: v.accent, marginBottom: '1rem',
            padding: '0.25rem 0.8rem',
            border: `1px solid ${v.accent}35`,
            borderRadius: '4px', background: `${v.accent}08`,
          }}>
            {v.tag}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
            {vehicles.map((_, i) => (
              <div key={i} style={{
                height: 3, width: i === idx ? 28 : 8,
                borderRadius: 2,
                background: i === idx ? v.accent : `${v.accent}30`,
                transition: 'all 0.5s ease',
              }} />
            ))}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 3.8rem)',
            fontWeight: 400, color: 'var(--text-dark)',
            lineHeight: 1.1, marginBottom: '1rem',
          }}>{v.headline}</h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted-light)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 380 }}>
            {v.sub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {v.services.map(s => <ServicePill key={s} label={s} accent={v.accent} />)}
          </div>

          {/* Divider accent */}
          <div style={{
            marginTop: '2.5rem', width: 50, height: 3,
            background: `linear-gradient(90deg, ${v.accent}, transparent)`,
            borderRadius: 2, transition: 'background 0.5s ease',
          }} />
        </motion.div>

        {/* Right: vehicle image stage */}
        <div style={{
          position: 'relative', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Gradient backdrop */}
          <motion.div
            key={idx + '-bg'}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse 80% 70% at 55% 55%, ${v.accent}12 0%, transparent 70%)`,
            }}
          />

          {/* Floor line */}
          <div style={{
            position: 'absolute', bottom: '22%', left: '10%', right: '10%',
            height: 1, background: `linear-gradient(90deg, transparent, ${v.accent}40, transparent)`,
          }} />

          {/* Floor reflection glow */}
          <div style={{
            position: 'absolute', bottom: '18%', left: '15%', right: '15%',
            height: '18%',
            background: `linear-gradient(to top, ${v.accent}10, transparent)`,
            transition: 'background 0.6s ease',
          }} />

          {/* Vehicle */}
          {vehicles.map((veh, i) => (
            <motion.div key={veh.id}
              animate={{
                opacity: i === idx ? 1 : 0,
                scale: i === idx ? 1 : 0.88,
                x: i === idx ? 0 : (i < idx ? -80 : 80),
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', inset: 0, padding: '10%' }}
            >
              <motion.img
                src={veh.image} alt={veh.headline}
                animate={{ y: i === idx ? [0, -10, 0] : 0 }}
                transition={{ duration: 5, repeat: i === idx ? Infinity : 0, ease: 'easeInOut' }}
                style={{
                  maxHeight: '58vh', maxWidth: '90%', objectFit: 'contain',
                  filter: `drop-shadow(0 20px 50px ${veh.accent}44)`,
                }}
              />
            </motion.div>
          ))}

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
          }}>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: `${v.accent}80`, writingMode: 'vertical-rl' }}>DÉFILER</div>
            <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${v.accent}60, transparent)` }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #vehicles > div > div { grid-template-columns: 1fr !important; }
          #vehicles > div > div > div:last-child { height: 50vh !important; }
        }
      `}</style>
    </section>
  )
}
