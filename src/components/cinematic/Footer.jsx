import React from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  ['Accueil', '#hero'], ['Services', '#vehicles'], ['Livraison Drone', '#drone'],
  ['Entreprises', '#infra'], ['Équipe', '#team'], ['Partenaires', '#partners'],
]

const services = [
  'Assurance véhicules', 'Assurance moto', 'Assurance flotte',
  'Assurance entreprises', 'Assurance scolaire', 'Livraison par drone',
  'Assurance habitation', 'Assurance voyage',
]

const contacts = [
  { icon: '📞', label: '+221 77 862 86 48', href: 'tel:+221778628648' },
  { icon: '✉', label: 'contact@optimumassur.sn', href: 'mailto:contact@optimumassur.sn' },
  { icon: '📍', label: 'Dakar, Sénégal', href: '#' },
]

const socials = [
  { label: 'Facebook',  href: '#', letter: 'f' },
  { label: 'Instagram', href: '#', letter: 'in' },
  { label: 'LinkedIn',  href: '#', letter: 'li' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      {/* Top rule */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(91,179,240,0.3), transparent)',
      }} />

      {/* CTA band */}
      <div style={{
        padding: '5rem 3rem',
        background: 'linear-gradient(135deg, var(--navy-mid) 0%, rgba(30,77,154,0.4) 100%)',
        borderBottom: '1px solid rgba(91,179,240,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '2rem',
        maxWidth: 1280, margin: '0 auto',
      }}>
        <div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'var(--sky)', marginBottom: '0.8rem' }}>CONTACTEZ-NOUS</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 300, color: '#fff', lineHeight: 1.1,
          }}>
            Prêt à être bien assuré ?
          </h2>
        </div>
        <motion.a href="tel:+221778628648"
          whileHover={{ scale: 1.04, boxShadow: '0 8px 40px rgba(91,179,240,0.4)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, var(--royal), var(--sky))',
            color: '#fff', borderRadius: 10, textDecoration: 'none',
            fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.05em',
            boxShadow: '0 4px 24px rgba(46,125,212,0.4)',
            flexShrink: 0,
          }}
        >Nous contacter maintenant</motion.a>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 3rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="Optimum Assur Pro"
              style={{ height: 50, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: '1.2rem', display: 'block' }} />
            <p style={{ fontSize: '0.8rem', color: 'rgba(168,216,248,0.55)', lineHeight: 1.7, maxWidth: 230, marginBottom: '1.2rem' }}>
              Protection premium pour particuliers, professionnels et entreprises au Sénégal.
            </p>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: '0.88rem', color: 'var(--sky)',
            }}>"UN SERVICE PROCHE DE VOUS"</div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(168,216,248,0.45)', marginBottom: '1.2rem' }}>NAVIGATION</h4>
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} style={{
                display: 'block', fontSize: '0.8rem', color: 'rgba(168,216,248,0.6)',
                textDecoration: 'none', marginBottom: '0.55rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(168,216,248,0.6)'}
              >{label}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(168,216,248,0.45)', marginBottom: '1.2rem' }}>NOS SERVICES</h4>
            {services.map(s => (
              <div key={s} style={{ fontSize: '0.78rem', color: 'rgba(168,216,248,0.55)', marginBottom: '0.5rem' }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(168,216,248,0.45)', marginBottom: '1.2rem' }}>CONTACT</h4>
            {contacts.map(c => (
              <a key={c.label} href={c.href} style={{
                display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
                fontSize: '0.78rem', color: 'rgba(168,216,248,0.6)',
                textDecoration: 'none', marginBottom: '0.8rem', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(168,216,248,0.6)'}
              >
                <span>{c.icon}</span>
                {c.label}
              </a>
            ))}

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
              {socials.map(s => (
                <motion.a key={s.label} href={s.href} title={s.label}
                  whileHover={{ y: -2, background: 'rgba(91,179,240,0.2)' }}
                  style={{
                    width: 36, height: 36,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(91,179,240,0.15)',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(168,216,248,0.6)', textDecoration: 'none',
                    fontSize: '0.7rem', fontWeight: 600, letterSpacing: 0,
                    transition: 'background 0.3s',
                  }}
                >{s.letter}</motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(91,179,240,0.08)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(168,216,248,0.35)' }}>
            © 2025 Optimum Assur Pro. Tous droits réservés.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Mentions légales', 'Confidentialité', 'CGU'].map(l => (
              <a key={l} href="#" style={{
                fontSize: '0.7rem', color: 'rgba(168,216,248,0.35)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'rgba(168,216,248,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(168,216,248,0.35)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
