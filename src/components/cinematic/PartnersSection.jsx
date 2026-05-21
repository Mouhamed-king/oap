import React from 'react'
import { motion } from 'framer-motion'

const partners = [
  { name: 'DJOLOF ASSUR SA',      image: '/djolof.png',    main: true  },
  { name: 'ASKIA Assurances',     image: '/askia.png',     main: false },
  { name: 'SAAR Assurances',      image: '/saar.png',      main: false },
  { name: 'Providence Assurances',image: '/providence.png',main: false },
]

export default function PartnersSection() {
  const main = partners.find(p => p.main)
  const rest = partners.filter(p => !p.main)

  return (
    <section id="partners" style={{ padding: '7rem 2rem', background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--sky)', marginBottom: '0.8rem' }}>
            NOS PARTENAIRES DE CONFIANCE
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300, color: '#fff', lineHeight: 1.1,
          }}>Un écosystème d'excellence</h2>
        </motion.div>

        {/* Featured partner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(91,179,240,0.2)',
            borderRadius: '24px', padding: '3rem 4rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 60px rgba(46,125,212,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(46,125,212,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <motion.img
              src={main.image} alt={main.name}
              animate={{ filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ height: 110, maxWidth: 300, objectFit: 'contain', filter: 'brightness(1.05)' }}
            />

          </div>
        </motion.div>

        {/* Other partners */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
          {rest.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, background: 'rgba(255,255,255,0.09)', boxShadow: '0 12px 40px rgba(46,125,212,0.15)' }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(91,179,240,0.12)',
                borderRadius: '16px', padding: '2.5rem 2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                cursor: 'default', transition: 'all 0.35s ease',
              }}
            >
              <img src={p.image} alt={p.name}
                style={{ height: 85, maxWidth: 220, objectFit: 'contain', filter: 'brightness(0.9) grayscale(0.2)' }} />
              <div style={{ fontSize: '0.72rem', color: 'rgba(168,216,248,0.5)', letterSpacing: '0.08em', textAlign: 'center' }}>
                {p.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '5rem' }}
        >
          {/* Divider */}
          <div style={{
            width: 60, height: 1, margin: '0 auto 2rem',
            background: 'linear-gradient(90deg, transparent, rgba(91,179,240,0.4), transparent)',
          }} />
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
            fontWeight: 300, color: 'rgba(168,216,248,0.7)', lineHeight: 1.5, maxWidth: 560, margin: '0 auto',
          }}>
            Des compagnies d'assurance de premier plan,<br/>
            <span style={{ color: '#fff' }}>pour une couverture sans compromis.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
