import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const campaigns = [
  {
    src: '/affichevp.png',
    alt: 'Campagne assurance véhicules particuliers',
    title: 'Véhicules particuliers',
    size: 'large',
    side: 'left',
    variant: 'billboard',
    start: 0.08,
    end: 0.28,
    parallax: 28,
  },
  {
    src: '/affichevp2.png',
    alt: 'Campagne auto Optimum Assur Pro',
    title: 'Protection auto',
    size: 'medium',
    side: 'right',
    variant: 'float',
    start: 0.18,
    end: 0.38,
    parallax: 42,
  },
  {
    src: '/affiche.jpeg',
    alt: 'Affiche communication Optimum Assur Pro',
    title: 'Communication OAP',
    size: 'xlarge',
    side: 'center',
    variant: 'billboard',
    start: 0.3,
    end: 0.52,
    parallax: 18,
  },
  {
    src: '/mural.png',
    alt: 'Mural publicitaire Optimum Assur Pro',
    title: 'Mural & visibilité',
    size: 'large',
    side: 'left',
    variant: 'billboard',
    start: 0.44,
    end: 0.64,
    parallax: 34,
  },
  {
    src: '/vitrophaniee.png',
    alt: 'Vitrophanie agence Optimum Assur Pro',
    title: 'Vitrophanie agence',
    size: 'medium',
    side: 'right',
    variant: 'float',
    start: 0.56,
    end: 0.76,
    parallax: 48,
  },
  {
    src: '/affichemoto.png',
    alt: 'Campagne assurance moto',
    title: 'Assurance moto',
    size: 'medium',
    side: 'left',
    variant: 'float',
    start: 0.68,
    end: 0.92,
    parallax: 36,
  },
]

function CampaignPoster({ progress, poster, index }) {
  const { start, end, parallax, side, size, variant } = poster
  const fadeIn = start + 0.04
  const fadeOut = end - 0.04

  const opacity = useTransform(progress, [start, fadeIn, fadeOut, end], [0, 1, 1, 0])
  const y = useTransform(progress, [start, end], [parallax + 20, -parallax])
  const x = useTransform(
    progress,
    [start, end],
    side === 'center'
      ? ['-50%', '-50%']
      : [side === 'left' ? -48 : 48, 0]
  )
  const scale = useTransform(progress, [start, fadeIn], [0.9, 1])
  const rotateY = useTransform(
    progress,
    [start, end],
    [side === 'left' ? 8 : side === 'right' ? -8 : 0, 0]
  )
  const glowOpacity = useTransform(progress, [fadeIn, fadeIn + 0.06], [0, 1])
  const blurAmount = useTransform(progress, [start, fadeIn], [6, 0])
  const motionBlur = useTransform(blurAmount, (v) => `blur(${v}px)`)

  return (
    <motion.article
      className={`campaign-poster campaign-poster--${size} campaign-poster--${side} campaign-poster--${variant}`}
      style={{
        opacity,
        y,
        x,
        scale,
        rotateY,
        zIndex: 10 + index,
        filter: motionBlur,
      }}
    >
      <motion.div className="campaign-poster-glow" style={{ opacity: glowOpacity }} aria-hidden="true" />
      <motion.div
        className="campaign-poster-frame"
        whileHover={{ scale: 1.03, rotateX: -2, rotateY: side === 'left' ? 3 : side === 'right' ? -3 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="campaign-poster-shine" aria-hidden="true" />
        <img src={poster.src} alt={poster.alt} loading="lazy" decoding="async" />
        <motion.span
          className="campaign-poster-label"
          initial={false}
          style={{ opacity: glowOpacity }}
        >
          {poster.title}
        </motion.span>
      </motion.div>
    </motion.article>
  )
}

export default function CampaignsCinematic() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [1, 1, 1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -24])
  const roadScale = useTransform(scrollYProgress, [0, 1], [0.12, 1])
  const roadGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.7, 0.4])
  const ambientShift = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '18%', '32%'])
  const cameraHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], ['4vh', '-6vh'])

  return (
    <section className="campaigns-story" id="campagnes" ref={ref} aria-label="Campagnes et actualités">
      <motion.div
        className="campaigns-ambient"
        style={{ y: ambientShift }}
        aria-hidden="true"
      />

      <motion.div className="campaigns-road-glow" style={{ opacity: roadGlow }} aria-hidden="true" />

      <div className="campaigns-sticky">
        <motion.header className="campaigns-header" style={{ opacity: headerOpacity, y: headerY }}>
          <p className="eyebrow dark">Campagnes & Annonces</p>
          <h2>Campagnes & Actualités</h2>
          <p>
            Découvrez nos dernières campagnes, promotions et communications visuelles.
          </p>
        </motion.header>

        <motion.div className="campaigns-road" style={{ scaleX: roadScale }} aria-hidden="true">
          <span className="campaigns-road-dash" />
        </motion.div>

        <motion.div className="campaigns-road-light" style={{ opacity: roadGlow }} aria-hidden="true" />

        <motion.div
          className="campaigns-camera-hint"
          style={{ opacity: cameraHintOpacity }}
          aria-hidden="true"
        >
          <span />
          Défilez pour parcourir la route
        </motion.div>

        <motion.div className="campaigns-stage" style={{ y: stageY }}>
          {campaigns.map((poster, index) => (
            <CampaignPoster key={poster.src} progress={scrollYProgress} poster={poster} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
