import React from 'react'
import { motion } from 'framer-motion'

const members = [
  { image: '/pdg.png', name: 'Directeur Général', role: 'PDG', desc: 'Vision stratégique & leadership', accent: '#1E4D9A', delay: 0 },
  { image: '/dg.png',  name: 'Directeur des Opérations', role: 'DG', desc: 'Excellence opérationnelle & développement', accent: '#2E7DD4', delay: 0.1 },
  { image: '/drh.png', name: 'Directrice RH', role: 'DRH', desc: 'Capital humain & bien-être des équipes', accent: '#5BB3F0', delay: 0.2 },
  { image: '/seo.png', name: 'Responsable Commercial', role: 'SEO', desc: 'Relations clients & expansion', accent: '#C9A84C', delay: 0.3 },
]

export default function TeamSection() {
  return (
    <section id="team" style={{ padding: '7rem 2rem', background: 'var(--warm-white)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--blue)', marginBottom: '0.7rem' }}>
            NOTRE ÉQUIPE
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.08,
          }}>Des experts à votre service</h2>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted-light)', maxWidth: 480, margin: '1rem auto 0' }}>
            Une équipe dédiée, disponible pour vous accompagner à chaque étape.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {members.map(m => (
            <motion.div key={m.role}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: m.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              style={{
                background: '#fff', borderRadius: '20px',
                border: '1px solid rgba(46,125,212,0.1)',
                overflow: 'hidden', cursor: 'default',
                boxShadow: '0 2px 20px rgba(13,31,60,0.06)',
                transition: 'box-shadow 0.4s ease, border 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 20px 50px ${m.accent}22`
                e.currentTarget.style.border = `1px solid ${m.accent}35`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 20px rgba(13,31,60,0.06)'
                e.currentTarget.style.border = '1px solid rgba(46,125,212,0.1)'
              }}
            >
              {/* Image area */}
              <div style={{
                height: 280, position: 'relative', overflow: 'hidden',
                background: `linear-gradient(160deg, ${m.accent}10 0%, ${m.accent}05 100%)`,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              }}>
                {/* Subtle gradient BG */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 100%, ${m.accent}18 0%, transparent 65%)`,
                }} />
                <motion.img
                  src={m.image} alt={m.role}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    maxHeight: 260, maxWidth: '100%', objectFit: 'contain', position: 'relative', zIndex: 1,
                    filter: `drop-shadow(0 8px 30px ${m.accent}33)`,
                  }}
                />
                {/* Role badge */}
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: m.accent, color: '#fff',
                  fontSize: '0.6rem', letterSpacing: '0.15em', fontWeight: 600,
                  padding: '0.25rem 0.7rem', borderRadius: 4,
                }}>{m.role}</div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.4rem 1.6rem 1.6rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                  fontWeight: 500, color: 'var(--text-dark)',
                  marginBottom: '0.4rem', lineHeight: 1.2,
                }}>{m.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted-light)', lineHeight: 1.6 }}>{m.desc}</p>
                <div style={{
                  marginTop: '1.1rem', width: 36, height: 3,
                  background: m.accent, borderRadius: 2,
                  boxShadow: `0 0 8px ${m.accent}60`,
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
