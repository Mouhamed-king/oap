import React from 'react'
import { motion } from 'framer-motion'

const cards = [
  { label: 'Assurance maladie',       img: null, accent: '#C94A4A', description: 'Couverture médicale complète pour vous et vos proches.' },
  { label: 'Assurance habitation',    img: null, accent: '#2E7DD4', description: 'Protégez votre logement contre tous les imprévus.' },
  { label: 'Assurance voyage',        img: null, accent: '#1E9A8A', description: 'Voyagez serein, en toute sécurité.' },
  { label: 'Assurance santé familiale', img: null, accent: '#C9844A', description: 'La santé de votre famille, notre priorité.' },
  { label: 'Assurance commerce',      img: null, accent: '#6B4AC9', description: 'Votre activité commerciale, protégée de A à Z.' },
  { label: 'Responsabilité civile',   img: null, accent: '#1E4D9A', description: 'Soyez couvert face aux tiers.' },
  { label: 'Assurance multirisque',   img: null, accent: '#C9A84C', description: 'Une protection globale, pensée pour vous.' },
]

/* Decorative SVG shape per card */
function Shape({ accent, index }) {
  const shapes = [
    // Circle + ring
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <circle cx="40" cy="40" r="28" fill={`${accent}18`}/>
      <circle cx="40" cy="40" r="20" fill={`${accent}25`}/>
      <circle cx="40" cy="40" r="10" fill={`${accent}45`}/>
      <circle cx="40" cy="40" r="28" stroke={accent} strokeWidth="1" opacity="0.4" strokeDasharray="4 4"/>
    </svg>,
    // Square tilted
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <rect x="20" y="20" width="40" height="40" rx="6" fill={`${accent}18`} transform="rotate(15 40 40)"/>
      <rect x="25" y="25" width="30" height="30" rx="4" fill={`${accent}30`} transform="rotate(30 40 40)"/>
      <rect x="30" y="30" width="20" height="20" rx="3" fill={`${accent}50`} transform="rotate(45 40 40)"/>
    </svg>,
    // Triangle stack
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <polygon points="40,8 72,68 8,68" fill={`${accent}15`}/>
      <polygon points="40,20 62,58 18,58" fill={`${accent}28`}/>
      <polygon points="40,32 54,52 26,52" fill={`${accent}45`}/>
    </svg>,
    // Cross/plus
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <rect x="32" y="8" width="16" height="64" rx="8" fill={`${accent}25`}/>
      <rect x="8" y="32" width="64" height="16" rx="8" fill={`${accent}25`}/>
      <rect x="36" y="36" width="8" height="8" rx="2" fill={accent} opacity="0.6"/>
    </svg>,
    // Diamond
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <polygon points="40,6 74,40 40,74 6,40" fill={`${accent}15`}/>
      <polygon points="40,18 62,40 40,62 18,40" fill={`${accent}28`}/>
      <polygon points="40,30 52,40 40,52 28,40" fill={`${accent}50`}/>
    </svg>,
    // Hexagon
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <polygon points="40,6 70,23 70,57 40,74 10,57 10,23" fill={`${accent}15`}/>
      <polygon points="40,18 60,29 60,51 40,62 20,51 20,29" fill={`${accent}28`}/>
      <polygon points="40,30 50,35 50,45 40,50 30,45 30,35" fill={`${accent}55`}/>
    </svg>,
    // Wave / arc
    <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
      <path d="M10 50 Q40 10 70 50" stroke={accent} strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M10 58 Q40 18 70 58" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.3"/>
      <path d="M15 66 Q40 26 65 66" stroke={accent} strokeWidth="1" fill="none" opacity="0.2"/>
      <circle cx="40" cy="32" r="8" fill={`${accent}35`}/>
      <circle cx="40" cy="32" r="4" fill={`${accent}60`}/>
    </svg>,
  ]
  return shapes[index % shapes.length]
}

export default function InsuranceCards() {
  return (
    <section style={{ padding: '7rem 2rem', background: 'var(--white)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--blue)', marginBottom: '0.7rem' }}>
              NOS AUTRES PROTECTIONS
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400, color: 'var(--text-dark)', lineHeight: 1.08,
            }}>
              Une couverture complète<br/>pour chaque aspect de votre vie
            </h2>
          </div>
          <div style={{ width: 60, height: 3, background: 'linear-gradient(90deg, var(--royal), var(--sky))', borderRadius: 2 }} />
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.2rem',
        }}>
          {cards.map((card, i) => (
            <motion.div key={card.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${card.accent}18` }}
              style={{
                background: 'var(--off-white)',
                border: '1px solid rgba(46,125,212,0.1)',
                borderRadius: '16px', padding: '1.8rem 1.6rem',
                cursor: 'default', transition: 'all 0.35s ease',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${card.accent}35`
                e.currentTarget.style.background = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = '1px solid rgba(46,125,212,0.1)'
                e.currentTarget.style.background = 'var(--off-white)'
              }}
            >
              {/* Decorative shape */}
              <div style={{ marginBottom: '1.2rem' }}>
                <Shape accent={card.accent} index={i} />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem', fontWeight: 500,
                color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: '0.6rem',
              }}>{card.label}</h3>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted-light)', lineHeight: 1.65 }}>
                {card.description}
              </p>

              {/* Accent bar bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${card.accent}, transparent)`,
                borderRadius: '0 0 16px 16px',
                opacity: 0, transition: 'opacity 0.3s ease',
              }} className={`card-bar-${i}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
