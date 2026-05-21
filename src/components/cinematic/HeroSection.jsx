import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Particles from './Particles'
import { ChevronDown } from 'lucide-react'

const words = 'UN SERVICE PROCHE DE VOUS'.split(' ')

function Word({ w, delay }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >{w}</motion.span>
    </span>
  )
}

const services = [
  'Particuliers', 'Chauffeurs & Taxis',
  'Entreprises', 'Établissements scolaires',
  'Infrastructures & chantiers', 'Familles',
]

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const yText  = useTransform(scrollYProgress, [0, 1], [0, -70])
  const fadeOut= useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section id="hero" ref={ref} style={{ position: 'relative', height: '100vh', minHeight: '680px', overflow: 'hidden' }}>
      {/* Background - dégradé navy inspiré du logo */}
      <motion.div style={{
        position: 'absolute', inset: 0, scale,
        background: `
          radial-gradient(ellipse 90% 70% at 65% 35%, #1A3460 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 15% 80%, rgba(91,179,240,0.12) 0%, transparent 55%),
          linear-gradient(160deg, #0D1F3C 0%, #111E38 45%, #0D1F3C 100%)
        `,
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(91,179,240,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(91,179,240,0.035) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />

      {/* Glow orb right */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', right: '5%', top: '5%',
          width: '52vw', height: '52vw', maxWidth: 700, maxHeight: 700,
          background: 'radial-gradient(ellipse, rgba(46,125,212,0.32) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />

      <Particles count={50} r={168} g={216} b={248} opacity={0.45} />

      {/* Diagonal accent line */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }} viewBox="0 0 1440 900" preserveAspectRatio="none">
        <line x1="900" y1="0" x2="1440" y2="900" stroke="#5BB3F0" strokeWidth="1" />
        <line x1="1100" y1="0" x2="1440" y2="500" stroke="#5BB3F0" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <motion.div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px', margin: '0 auto',
        padding: '0 3rem',
        height: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
        opacity: fadeOut, y: yText,
      }}>
        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'rgba(91,179,240,0.08)',
              border: '1px solid rgba(91,179,240,0.22)',
              borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '2rem',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sky)', boxShadow: '0 0 8px var(--sky)' }} />
            <span style={{ fontSize: '0.68rem', color: 'var(--sky-pale)', letterSpacing: '0.18em', fontWeight: 400 }}>
              OPTIMUM ASSUR PRO — SÉNÉGAL
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.8rem)',
            fontWeight: 300, lineHeight: 1.02,
            color: '#fff', marginBottom: '2rem', letterSpacing: '-0.01em',
          }}>
            {words.map((w, i) => <Word key={i} w={w} delay={0.5 + i * 0.11} />)}
          </h1>

          {/* Services list */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.78rem', color: 'rgba(168,216,248,0.7)', letterSpacing: '0.12em', marginBottom: '0.9rem' }}>
              PROTECTION PREMIUM POUR :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem 1.5rem' }}>
              {services.map((s, i) => (
                <motion.div key={s}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.8rem', color: 'rgba(200,225,248,0.75)' }}
                >
                  <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--sky)', flexShrink: 0 }} />
                  {s}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <motion.a href="tel:+221778628648"
              whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(91,179,240,0.45)' }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2.2rem',
                background: 'linear-gradient(135deg, var(--royal) 0%, var(--sky) 100%)',
                color: '#fff', borderRadius: '10px', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em',
                boxShadow: '0 4px 24px rgba(46,125,212,0.4)',
              }}
            >Nous contacter</motion.a>
            <motion.a href="#vehicles"
              whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.9rem 2.2rem',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(200,225,248,0.9)', borderRadius: '10px', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: 400, letterSpacing: '0.05em',
                transition: 'background 0.3s',
              }}
            >Découvrir</motion.a>
          </motion.div>
        </div>

        {/* Right: PDG image with halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
        >
          {/* Floor glow */}
          <div style={{
            position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
            width: '70%', height: '30px',
            background: 'radial-gradient(ellipse, rgba(91,179,240,0.5) 0%, transparent 70%)',
            filter: 'blur(16px)', pointerEvents: 'none',
          }} />
          {/* Atmospheric halo */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: '75%', height: '75%',
              background: 'radial-gradient(ellipse, rgba(46,125,212,0.4) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(28px)', bottom: '5%',
            }}
          />
          <motion.img
            src="/pdg.png" alt="PDG — Optimum Assur Pro"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative', zIndex: 1,
              maxHeight: '540px', maxWidth: '100%', objectFit: 'contain',
              filter: 'drop-shadow(0 24px 60px rgba(10,40,90,0.85))',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 10 }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: 'rgba(168,216,248,0.5)' }}>DÉFILER</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={16} color="rgba(91,179,240,0.6)" />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero > div > div { grid-template-columns: 1fr !important; padding: 0 1.5rem !important; }
          #hero > div > div > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
