import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#vehicles' },
  { label: 'Livraison Drone', href: '#drone' },
  { label: 'Entreprises', href: '#infra' },
  { label: 'Équipe', href: '#team' },
  { label: 'Partenaires', href: '#partners' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textSecondary = scrolled ? 'var(--text-muted-light)' : 'rgba(200,220,255,0.8)'
  const textColor = scrolled ? 'var(--text-dark)' : '#fff'

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 3rem', height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(13,31,60,0.08)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(91,179,240,0.12)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <motion.a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} whileHover={{ scale: 1.02 }}>
          <img
            src="/logo.png"
            alt="Optimum Assur Pro"
            style={{
              height: '44px', width: 'auto', objectFit: 'contain',
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 0.5s ease',
            }}
          />
        </motion.a>

        <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }} className="desktop-nav">
          {links.map((l, i) => (
            <motion.a key={l.label} href={l.href}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06 }}
              style={{ color: textSecondary, textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.06em', fontWeight: 400, transition: 'color 0.25s' }}
              onMouseEnter={e => e.target.style.color = textColor}
              onMouseLeave={e => e.target.style.color = textSecondary}
            >{l.label}</motion.a>
          ))}
          <motion.a href="tel:+221338001234"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.5rem 1.4rem',
              background: scrolled ? 'linear-gradient(135deg, var(--royal), var(--sky))' : 'rgba(255,255,255,0.15)',
              backdropFilter: !scrolled ? 'blur(8px)' : 'none',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.35)',
              color: 'white', borderRadius: '8px', textDecoration: 'none',
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em',
              boxShadow: scrolled ? '0 4px 20px rgba(46,125,212,0.3)' : 'none',
              transition: 'all 0.4s ease',
            }}
          >Nous contacter</motion.a>
        </div>

        <button onClick={() => setOpen(!open)} className="burger-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: '0.5rem', transition: 'color 0.3s' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
              padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
              boxShadow: '0 20px 40px rgba(13,31,60,0.1)',
            }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                style={{ color: 'var(--text-mid)', textDecoration: 'none', fontSize: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(91,179,240,0.15)' }}>
                {l.label}
              </a>
            ))}
            <a href="tel:+221338001234"
              style={{ marginTop: '0.5rem', padding: '0.7rem', background: 'linear-gradient(135deg, var(--royal), var(--sky))', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500, textAlign: 'center' }}>
              Nous contacter
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .burger-btn { display: none !important; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
          nav { padding: 0 1.5rem !important; }
        }
      `}</style>
    </>
  )
}
