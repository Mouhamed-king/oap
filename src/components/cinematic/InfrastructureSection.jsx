import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const scenes = [
  {
    id: 'school', image: '/campus_baobab.png',
    tag: 'ÉTABLISSEMENTS SCOLAIRES',
    headline: 'Protection des élèves et établissements',
    sub: 'La sécurité comme fondation de l\'avenir.',
    accent: '#2E7DD4',
    services: ['Couverture des élèves', 'Assistance immédiate', 'Gestion administrative', 'Support par appel', 'Prise en charge rapide'],
  },
  {
    id: 'chantier', image: '/chantier.jpeg',
    tag: 'CHANTIERS & BTP',
    headline: 'Protection chantiers & travaux',
    sub: 'Chaque ouvrier mérite une couverture solide.',
    accent: '#C9A84C',
    services: ['Protection ouvriers', 'Couverture accidents', 'Assurance équipements', 'Assistance chantier'],
  },
  {
    id: 'enterprise', image: '/entreprise.jpg',
    tag: 'ENTREPRISES',
    headline: 'Assurance entreprises & activités professionnelles',
    sub: 'Votre business protégé, votre croissance sécurisée.',
    accent: '#1E4D9A',
    services: ['Assurance employés', 'Assurance locaux', 'Assurance flotte', 'Protection activités', 'Accompagnement administratif'],
  },
]

export default function InfrastructureSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(scenes.length - 1) * 100}%`])

  return (
    <section id="infra" ref={ref} style={{ position: 'relative', height: `${scenes.length * 100}vh` }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', background: 'var(--navy)',
      }}>
        {/* Top label */}
        <div style={{
          position: 'absolute', top: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 20, textAlign: 'center',
        }}>
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'rgba(168,216,248,0.45)' }}>
            INFRASTRUCTURES & ENTREPRISES
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div style={{ display: 'flex', width: `${scenes.length * 100}%`, height: '100%', x }}>
          {scenes.map((scene, i) => (
            <div key={scene.id} style={{
              width: `${100 / scenes.length}%`, height: '100%',
              position: 'relative', overflow: 'hidden', flexShrink: 0,
            }}>
              {/* BG image */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${scene.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'brightness(0.22) saturate(0.5)',
              }} />

              {/* Accent overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(145deg, ${scene.accent}18 0%, rgba(10,20,45,0.55) 100%)`,
              }} />

              {/* Bottom gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                background: 'linear-gradient(to top, rgba(10,20,45,0.97) 0%, transparent 100%)',
              }} />

              {/* Left accent bar */}
              <div style={{
                position: 'absolute', left: 0, top: '20%', bottom: '20%',
                width: 3, background: `linear-gradient(to bottom, transparent, ${scene.accent}, transparent)`,
              }} />

              {/* Content */}
              <div style={{ position: 'absolute', bottom: '9%', left: '7%', right: '7%', zIndex: 5 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.6rem', letterSpacing: '0.22em', color: scene.accent,
                  marginBottom: '1rem',
                  padding: '0.25rem 0.8rem',
                  border: `1px solid ${scene.accent}40`,
                  borderRadius: 4, background: `${scene.accent}0A`,
                }}>
                  {scene.tag}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.2vw, 3.5rem)',
                  fontWeight: 400, color: '#fff',
                  lineHeight: 1.12, marginBottom: '0.8rem', maxWidth: 560,
                }}>{scene.headline}</h3>

                <p style={{ fontSize: '0.85rem', color: 'rgba(168,216,248,0.65)', marginBottom: '1.5rem' }}>
                  {scene.sub}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {scene.services.map(s => (
                    <div key={s} style={{
                      fontSize: '0.72rem', color: 'rgba(200,225,248,0.7)',
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: 4,
                    }}>{s}</div>
                  ))}
                </div>
              </div>

              {/* Scene number */}
              <div style={{
                position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)', fontSize: 'clamp(6rem,12vw,10rem)',
                fontWeight: 300, color: `${scene.accent}10`, lineHeight: 1, userSelect: 'none',
              }}>0{i + 1}</div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 2, transformOrigin: 'left',
          background: `linear-gradient(90deg, var(--royal), var(--sky))`,
          scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
          width: '100%',
        }} />
      </div>
    </section>
  )
}
