import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, X } from 'lucide-react'

const members = [
  { image: '/pdg.png', name: 'Directeur général', role: 'DG', desc: 'Vision stratégique, réseau compagnies & qualité du conseil', phone: '+221 77 429 75 54', accent: '#1E4D9A', delay: 0 },
  { image: '/dg.png',  name: 'Directeur des opérations et du développement', role: 'DOD', desc: 'Développement commercial, pilotage et grands comptes', phone: '+221 77 862 86 48', accent: '#2E7DD4', delay: 0.1 },
  { image: '/drh.png', name: 'Assistant administratif', role: 'AA', desc: 'Contrats, renouvellements et suivi administratif', phone: '+221 77 492 75 54', accent: '#5BB3F0', delay: 0.2 },
  { image: '/seo.png', name: 'Directrice adjointe', role: 'DA', desc: 'Organisation interne, pilotage et expérience client', phone: '+221 77 709 84 68', accent: '#C9A84C', delay: 0.3 },
]

function TeamContact({ phone, accent }) {
  const [isOpen, setIsOpen] = useState(false)
  const cleanPhone = phone.replace(/\s+/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}`
  const telUrl = `tel:${cleanPhone}`

  return (
    <div 
      className="team-contact-container" 
      style={{ marginTop: '1.2rem', width: '100%' }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="team-contact-trigger"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 16px',
              borderRadius: '24px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(13, 31, 60, 0.03)',
              '--member-accent': accent || 'var(--blue)'
            }}
          >
            <span>Contacter</span>
            <ArrowRight size={15} />
          </motion.button>
        ) : (
          <motion.div
            key="options"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="team-contact-options"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              width: '100%',
            }}
          >
            <motion.a
              href={telUrl}
              className="team-contact-icon-btn tel"
              title="Appel direct"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flex: 1,
                height: '38px',
                background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
                color: '#fff',
                borderRadius: '24px',
                boxShadow: `0 4px 12px ${accent}30`,
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: '700',
              }}
            >
              <Phone size={14} />
              <span>Appeler</span>
            </motion.a>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="team-contact-icon-btn whatsapp"
              title="WhatsApp"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flex: 1,
                height: '38px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff',
                borderRadius: '24px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: '700',
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.419 9.86-9.86.002-2.63-1.023-5.101-2.885-6.966a9.782 9.782 0 0 0-6.96-2.879C5.976.056 1.557 4.478 1.555 9.92c-.001 1.63.452 3.22 1.312 4.675l-.979 3.57 3.659-.96c1.475.804 3.008 1.229 4.51 1.229zm9.066-6.152c-.287-.143-1.697-.838-1.959-.933-.261-.096-.451-.143-.641.143-.19.285-.736.933-.903 1.122-.166.19-.332.214-.618.071-.285-.143-1.207-.444-2.299-1.419-.848-.758-1.422-1.694-1.588-1.98-.166-.285-.018-.44.125-.581.128-.127.287-.333.43-.5.143-.166.19-.285.286-.476.095-.19.048-.357-.024-.5-.071-.143-.641-1.544-.878-2.115-.23-.555-.463-.48-.641-.489-.166-.008-.356-.01-.546-.01-.19 0-.5.071-.76.357-.261.285-.998.976-.998 2.38 0 1.405 1.022 2.761 1.164 2.952.143.19 2.012 3.073 4.874 4.312.68.295 1.212.47 1.626.601.683.218 1.305.187 1.797.114.548-.082 1.697-.693 1.937-1.362.24-.669.24-1.242.167-1.362-.072-.12-.266-.19-.553-.333z" />
              </svg>
              <span>WhatsApp</span>
            </motion.a>

            <motion.button
              onClick={() => setIsOpen(false)}
              className="team-contact-close"
              title="Retour"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                background: 'rgba(0, 0, 0, 0.05)',
                color: 'var(--muted)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={12} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
              <div style={{ padding: '1.4rem 1.6rem 1.6rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 280px)' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                  fontWeight: 500, color: 'var(--text-dark)',
                  marginBottom: '0.4rem', lineHeight: 1.2,
                }}>{m.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted-light)', lineHeight: 1.6, marginBottom: 'auto' }}>{m.desc}</p>
                {m.phone && <TeamContact phone={m.phone} accent={m.accent} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
