import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion'
import CampaignsCinematic from './components/CampaignsCinematic.jsx'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  PackageCheck,
  Phone,
  Plane,
  SearchCheck,
  WalletCards,
  X,
} from 'lucide-react'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN
const OAP_COORDINATES = [-17.443043, 14.753011]
const OAP_MAP_LINK = 'https://maps.app.goo.gl/1a8v16SjjTCp9efW9'

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Drone', href: '#drone' },
  { label: 'Courtage', href: '#courtage' },
  { label: 'Sinistres', href: '#sinistres' },
  { label: 'Campagnes', href: '#campagnes' },
  { label: 'Localisation', href: '#localisation' },
]

const partners = [
  { name: 'DJOLOF ASSUR SA', image: '/djolof.png', main: true },
  { name: 'Askia Assurances', image: '/askia.png' },
  { name: 'Assurances La Providence', image: '/providence.png' },
  { name: 'SAAR Assurances', image: '/saar-fixed.png' },
]

const team = [
  { name: 'Direction générale', role: 'Vision, réseau compagnies et qualité du conseil', image: '/pdg.png' },
  { name: 'Direction opérationnelle', role: 'Contrats, renouvellements et suivi administratif', image: '/dg.png' },
  { name: 'Ressources humaines', role: 'Organisation interne et expérience client', image: '/drh.png' },
  { name: 'Développement commercial', role: 'Conseil, fidélisation et accompagnement terrain', image: '/seo.png' },
]

const process = [
  {
    icon: SearchCheck,
    title: 'Diagnostic',
    text: 'On comprend votre profil, vos risques, vos contraintes et les contrats que vous avez déjà.',
  },
  {
    icon: WalletCards,
    title: 'Comparaison',
    text: 'On rapproche les garanties, exclusions, franchises et budgets pour éviter les mauvaises surprises.',
  },
  {
    icon: FileCheck2,
    title: 'Souscription',
    text: 'On vous accompagne sur les pièces, attestations, renouvellements et formalités importantes.',
  },
  {
    icon: LifeBuoy,
    title: 'Suivi',
    text: 'En cas de sinistre, OAP reste l’interlocuteur qui relance, clarifie et protège vos intérêts.',
  },
]

const droneScenarios = [
  {
    tag: 'Distance',
    title: 'Le client est loin de l’agence.',
    text: 'Quand venir récupérer une attestation prend trop de temps, OAP prépare le document et organise une livraison plus directe.',
  },
  {
    tag: 'Circulation',
    title: 'Dakar vous retient sur la route.',
    text: 'Embouteillages, rendez-vous serrés, imprévus: le drone devient un raccourci utile pour les documents prioritaires.',
  },
  {
    tag: 'Renouvellement',
    title: 'Assurance renouvelée, document à récupérer.',
    text: 'Le client règle son renouvellement, OAP finalise les pièces, puis la livraison évite un déplacement inutile.',
  },
  {
    tag: 'Urgence',
    title: 'Un dossier doit arriver vite.',
    text: 'Contrat, attestation ou pièce urgente: la livraison par drone donne une signature moderne au service de proximité.',
  },
]

const servicePages = [
  {
    slug: 'vehicules',
    icon: Car,
    accent: '#0f6fa8',
    title: 'Assurance véhicules',
    short: 'Auto, moto, taxi, flotte et transport avec suivi complet.',
    hero: 'Vos véhicules assurés, vos documents suivis, vos urgences traitées.',
    visual: 'vehicles',
    image: '/vp.png',
    intro: 'OAP accompagne les particuliers, chauffeurs, entreprises et transporteurs sur les contrats automobiles. Nous suivons aussi les renouvellements, attestations et dossiers accident.',
    categories: [
      ['Véhicules particuliers', 'Responsabilité civile, tous risques, vol, incendie, bris de glace et assistance selon formule.', '/vp.png'],
      ['Taxis et chauffeurs', 'Contrats adaptés aux professionnels qui roulent chaque jour et ont besoin de continuité.', '/taxi.png'],
      ['Motos et tricycles', 'Solutions pour deux-roues avec garanties obligatoires, conducteur et assistance.', '/moto.png'],
      ['Flottes et utilitaires', 'Gestion groupée pour véhicules d’entreprise, utilitaires, camions et renouvellements multiples.', '/camion.png'],
    ],
    guarantees: ['Responsabilité civile', 'Dommages collision', 'Vol et incendie', 'Assistance accident', 'Gestion des attestations', 'Suivi sinistre'],
    documents: ['Carte grise', 'Permis de conduire', 'Ancienne attestation si renouvellement', 'Pièce d’identité', 'Informations d’usage du véhicule'],
    drone: 'Très utile pour les renouvellements d’attestation auto, surtout quand le client est loin, bloqué dans la circulation ou déjà pris par son activité.',
  },
  {
    slug: 'habitation',
    icon: Home,
    accent: '#3f7d57',
    title: 'Assurance habitation',
    short: 'Logement, contenu, responsabilité locative et protection familiale.',
    hero: 'Votre maison protégée contre les imprévus du quotidien.',
    visual: 'property',
    image: '/maison.jpg',
    intro: 'Nous aidons propriétaires, locataires et familles à construire une couverture claire pour le logement, les biens et la responsabilité civile.',
    categories: [
      ['Propriétaires', 'Protection du bâtiment, des biens et de la responsabilité liée au logement.'],
      ['Locataires', 'Responsabilité locative, dégâts des eaux, incendie et garanties utiles au bail.'],
      ['Familles', 'Protection du contenu, assistance et couverture des incidents du quotidien.'],
      ['Biens professionnels à domicile', 'Analyse des risques quand l’activité et l’habitation se croisent.'],
    ],
    guarantees: ['Incendie', 'Dégâts des eaux', 'Vol', 'Bris de glace', 'Responsabilité civile', 'Assistance'],
    documents: ['Adresse du logement', 'Statut locataire ou propriétaire', 'Valeur approximative du contenu', 'Ancien contrat si disponible'],
    drone: 'Pratique pour envoyer une attestation habitation ou récupérer rapidement une pièce de dossier.',
  },
  {
    slug: 'ecoles',
    icon: GraduationCap,
    accent: '#2e7d6f',
    title: 'Assurance écoles',
    short: 'Établissements scolaires, élèves, personnel et responsabilité.',
    hero: 'Protéger vos élèves, votre personnel et votre établissement.',
    visual: 'school',
    image: '/campus_baobab.png',
    intro: 'OAP accompagne les établissements scolaires sur les contrats adaptés à la protection des élèves, du personnel et des infrastructures éducatives.',
    categories: [
      ['Établissements scolaires', 'Protection des locaux, du matériel pédagogique et des infrastructures éducatives.'],
      ['Élèves et étudiants', 'Couverture accidents scolaires, sorties pédagogiques et activités sportives.'],
      ['Personnel éducatif', 'Responsabilité civile professionnelle et protection du personnel enseignant et administratif.'],
      ['Transport scolaire', 'Assurance des véhicules de transport scolaire et des trajets quotidiens.'],
    ],
    guarantees: ['Responsabilité civile', 'Accidents scolaires', 'Protection du personnel', 'Locaux et matériel', 'Transport scolaire', 'Sorties pédagogiques'],
    documents: ['Autorisation d’ouverture', 'Nombre d’élèves', 'Liste du personnel', 'Adresse de l’établissement', 'Contrats existants'],
    drone: 'Pratique pour transmettre rapidement les attestations d’assurance scolaire aux familles ou récupérer des pièces administratives.',
  },
  {
    slug: 'sante',
    icon: HeartPulse,
    accent: '#bf4f5f',
    title: 'Assurance santé',
    short: 'Santé individuelle, famille, salariés et dispositifs collectifs.',
    hero: 'Des garanties santé lisibles pour votre famille ou votre équipe.',
    visual: 'people',
    image: '/santé.jpg',
    intro: 'OAP compare les couvertures santé pour que les garanties restent compréhensibles: consultations, hospitalisation, pharmacie, famille ou collectif.',
    categories: [
      ['Individuelle', 'Couverture personnelle selon votre âge, vos besoins et votre budget.'],
      ['Famille', 'Contrats pensés pour le conjoint, les enfants et les dépenses fréquentes.'],
      ['Entreprise', 'Dispositifs pour équipes, dirigeants et collaborateurs.'],
      ['Complémentaire', 'Analyse de contrats existants pour combler les manques importants.'],
    ],
    guarantees: ['Consultations', 'Hospitalisation', 'Pharmacie', 'Analyses', 'Maternité selon formule', 'Evacuation selon contrat'],
    documents: ['Pièces d’identité', 'Liste des bénéficiaires', 'Ages ou dates de naissance', 'Besoin de couverture souhaité'],
    drone: 'Utile pour faire parvenir des documents contractuels ou récupérer des pièces sans déplacement.',
  },
  {
    slug: 'voyage',
    icon: Plane,
    accent: '#8b6f2f',
    title: 'Assurance voyage',
    short: 'Visa, mission, études, déplacement professionnel et assistance.',
    hero: 'Voyager avec une attestation prête, claire et conforme.',
    visual: 'travel',
    image: '/voyage.jpg',
    intro: 'Pour visa, études, mission ou vacances, nous vous orientons vers une assurance voyage adaptée à la destination, la durée et les exigences du dossier.',
    categories: [
      ['Voyage court séjour', 'Garanties médicales, assistance et rapatriement selon destination.'],
      ['Etudes et expatriation', 'Couvertures longues durées pour étudiants et séjours prolongés.'],
      ['Missions professionnelles', 'Solutions pour collaborateurs en déplacement ou dirigeants.'],
      ['Dossiers visa', 'Attestation et accompagnement sur les pièces demandées.'],
    ],
    guarantees: ['Frais médicaux', 'Rapatriement', 'Assistance', 'Bagages selon formule', 'Responsabilité civile à l’étranger', 'Attestation visa'],
    documents: ['Passeport', 'Destination', 'Dates de voyage', 'Exigence du visa si connue'],
    drone: 'Très pertinent quand l’attestation doit partir vite avant un rendez-vous visa ou un départ.',
  },
  {
    slug: 'entreprises',
    icon: Building2,
    accent: '#204f9a',
    title: 'Assurance entreprises',
    short: 'Multirisque pro, RC, salariés, locaux, matériel et continuité.',
    hero: 'Protéger votre activité sans compliquer votre gestion.',
    visual: 'business',
    image: '/business.jpg',
    intro: 'Nous analysons votre activité pour proposer des garanties utiles: responsabilité civile, locaux, matériel, flotte, salariés et risques spécifiques.',
    categories: [
      ['Multirisque professionnelle', 'Locaux, équipements, marchandises, incendie, dégât des eaux et exploitation.'],
      ['Responsabilité civile pro', 'Protection contre les dommages causés aux tiers dans le cadre de l’activité.'],
      ['Protection salariés', 'Santé, accidents, prévoyance ou couverture collective selon besoin.'],
      ['Audit de contrats', 'Lecture des garanties existantes pour repérer doublons, trous de couverture et exclusions.'],
    ],
    guarantees: ['RC professionnelle', 'Locaux', 'Matériel', 'Marchandises', 'Santé collective', 'Flotte automobile'],
    documents: ['RCCM ou NINEA', 'Activité détaillée', 'Adresse des locaux', 'Valeur du matériel', 'Contrats existants'],
    drone: 'Utile pour transmettre rapidement attestations, avenants ou documents demandés par un client ou un marché.',
  },
  {
    slug: 'chantiers',
    icon: HardHat,
    accent: '#b0732e',
    title: 'Assurance chantier',
    short: 'BTP, infrastructure, responsabilité, matériel et équipes.',
    hero: 'Des chantiers couverts avant que les risques ne coûtent cher.',
    visual: 'construction',
    image: '/chantier.jpeg',
    intro: 'OAP accompagne les entreprises BTP, maîtres d’ouvrage et prestataires sur les garanties liées aux travaux, au matériel et aux équipes.',
    categories: [
      ['Tous risques chantier', 'Protection des ouvrages, dommages matériels et risques pendant les travaux.'],
      ['Responsabilité chantier', 'Dommages causés aux tiers, voisinage ou intervenants selon contrat.'],
      ['Matériel et engins', 'Couverture des équipements, machines et matériels de chantier.'],
      ['Cautions et marchés', 'Accompagnement sur les garanties souvent demandées pour certains marchés.'],
    ],
    guarantees: ['Tous risques chantier', 'Responsabilité civile', 'Accidents de travail', 'Matériel', 'Engins', 'Caution selon dossier'],
    documents: ['Description du chantier', 'Durée des travaux', 'Montant du marché', 'Liste du matériel', 'Intervenants concernés'],
    drone: 'Peut accélérer l’envoi d’attestations chantier ou documents de marché quand le site est éloigné.',
  },
]

const serviceLookup = new Map(servicePages.map((service) => [`service-${service.slug}`, service]))

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace('#', '') || 'home')

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Navbar({ serviceMode = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoSrc = (scrolled || serviceMode) ? "/logo.png" : "/logoOAP.png";

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : 'transparent'}`}>
      <a className="brand" href="#home" aria-label="Optimum Assur Pro accueil">
        <img src={logoSrc} alt="Logo Optimum Assur Pro" className="brand-logo" />
      </a>

      <nav className="desktop-links" aria-label="Navigation principale">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="desktop-actions">
        <a className="icon-link" href="tel:+221338001234" aria-label="Appeler Optimum Assur Pro">
          <Phone size={18} />
        </a>
        <a className="button button-primary" href="mailto:contact@optimumassur.sn?subject=Demande%20de%20devis">
          <Mail size={18} />
          Devis
        </a>
      </div>

      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Ouvrir le menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <motion.nav className="mobile-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="button button-primary" href="mailto:contact@optimumassur.sn?subject=Demande%20de%20devis">
            <Mail size={18} />
            Demander un devis
          </a>
        </motion.nav>
      )}
    </header>
  )
}

function HeroCinematic() {
  const words = ['Courtier', 'proche,', 'service', 'premium,', 'drone', 'exclusif.']

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-motion-line" />
      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Optimum Assur Pro depuis 2009</p>
          <h1>
            {words.map((word, index) => (
              <span className="word-mask" key={word}>
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.18 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <p className="hero-text">
            Comme DJOLOF ASSUR SA, notre partenaire principal, nous sommes une société de courtage en assurance.
            Notre différence: une relation client suivie, des catégories claires, et la livraison par drone pour les documents urgents.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#services">
              <ClipboardCheck size={19} />
              Explorer les assurances
            </a>
            <a className="button button-ghost" href="#drone">
              Voir le drone
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-cards-stack"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stage-card partner-focus">
            <span>Partenaire principal</span>
            <img src="/djolof.png" alt="DJOLOF ASSUR SA" />
            <strong>DJOLOF ASSUR SA</strong>
          </div>
          <div className="stage-card client-proof">
            <strong>150+</strong>
            <span>clients fidèles dont nous gérons les assurances</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesHub() {
  return (
    <section className="section services-hub" id="services">
      <div className="section-heading">
        <FadeIn>
          <p className="eyebrow dark">Services détaillés</p>
          <h2>Chaque assurance mérite sa propre histoire, ses garanties et ses documents.</h2>
          <p>
            Les catégories sont séparées pour que le client comprenne vite ce qu’il peut assurer, ce qu’il doit fournir et comment OAP l’accompagne.
          </p>
        </FadeIn>
      </div>

      <div className="service-grid">
        {servicePages.map((service, index) => {
          const Icon = service.icon
          return (
            <FadeIn className="service-card" key={service.slug} delay={index * 0.04}>
              <a href={`#service-${service.slug}`} style={{ '--accent': service.accent }}>
                <div className="service-thumb">
                  <ServiceVisual service={service} compact />
                </div>
                <div className="service-card-body">
                  <Icon size={24} />
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span>
                    Ouvrir la page
                    <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}

function ServiceVisual({ service, compact = false }) {
  if (service.visual === 'vehicles') {
    return (
      <div className={compact ? 'vehicle-image compact' : 'vehicle-image'}>
        <img src="/voitures.png" alt="Assurances véhicules Optimum Assur Pro" />
      </div>
    )
  }

  return (
    <div className={compact ? 'image-visual compact' : 'image-visual'}>
      <img src={service.image} alt={service.title} />
    </div>
  )
}

function DroneSVG() {
  return (
    <img className="drone-svg" src="/drone.png" alt="" aria-hidden="true" />
  )
}

function DronePhase({ progress, index, phase }) {
  const total = droneScenarios.length
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0])
  const y = useTransform(progress, [start, end], [22, -22])

  return (
    <motion.div className="drone-phase" style={{ opacity, y }}>
      <span>{phase.tag}</span>
      <h3>{phase.title}</h3>
      <p>{phase.text}</p>
    </motion.div>
  )
}

function DroneDeliveryStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const droneX = useTransform(scrollYProgress, [0, 0.32, 0.66, 1], ['-38vw', '-6vw', '12vw', '38vw'])
  const droneY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['9vh', '-8vh', '2vh', '-6vh', '5vh'])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-7, 0, 8])
  const pathScale = useTransform(scrollYProgress, [0, 1], [0.08, 1])

  return (
    <section className="drone-story" id="drone" ref={ref}>
      <div className="drone-sticky">
        <div className="drone-copy">
          <p className="eyebrow">Exclusivité OAP</p>
          <h2>La livraison par drone transforme le courtage en service qui vient vers le client.</h2>
          <p>
            Ce n’est pas un gadget: c’est une réponse à la distance, aux embouteillages, aux renouvellements rapides et aux documents urgents.
          </p>
        </div>

        <motion.div className="drone-path" style={{ scaleX: pathScale }} />

        <motion.div className="drone-flight" style={{ x: droneX, y: droneY, rotate }}>
          <DroneSVG />
          <div className="drone-shadow" />
        </motion.div>

        {droneScenarios.map((phase, index) => (
          <DronePhase key={phase.tag} progress={scrollYProgress} index={index} phase={phase} />
        ))}
      </div>
    </section>
  )
}

function BrokerageFlow() {
  return (
    <section className="section section-light" id="courtage">
      <div className="section-grid two-columns">
        <FadeIn className="section-copy">
          <p className="eyebrow dark">Notre rôle de courtier</p>
          <h2>OAP ne vend pas seulement un contrat. OAP garde le dossier vivant.</h2>
          <p>
            Nous travaillons comme intermédiaire de confiance entre le client et les compagnies: conseil, comparaison, souscription, renouvellement et accompagnement sinistre.
          </p>
          <div className="trust-list">
            <span><CheckCircle2 size={18} /> DJOLOF ASSUR SA comme partenaire principal</span>
            <span><CheckCircle2 size={18} /> Plus de 150 clients fidèles suivis</span>
            <span><CheckCircle2 size={18} /> Démarrage de l’activité en 2009</span>
          </div>
        </FadeIn>

        <div className="process-grid">
          {process.map(({ icon: Icon, title, text }, index) => (
            <FadeIn className="process-card" key={title} delay={index * 0.06}>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClaimsCinematic() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Phase 1 & 2: Cars coming in from left, Taxi is visibly faster than VP.
  // Both cars are positioned at left: 50%.
  // Due to transparent padding in the PNGs, we overlap their bounding boxes by ~40% so they visually touch.
  // At 0.35, VP is at -20%, Taxi is at -80%.
  // From 0.35 to 0.45, VP is pushed forward strongly to 30%, Taxi brakes to -60%.
  const taxiX = useTransform(scrollYProgress, [0, 0.35, 0.45], ['-350%', '-80%', '-60%'])
  const carX = useTransform(scrollYProgress, [0, 0.35, 0.45], ['-120%', '-20%', '30%'])

  // Phase 2: Impact (0.35)
  const shockOpacity = useTransform(scrollYProgress, [0.34, 0.35, 0.45], [0, 1, 0])
  const flashOpacity = useTransform(scrollYProgress, [0.34, 0.35, 0.4], [0, 0.9, 0])
  const impactScale = useTransform(scrollYProgress, [0.34, 0.35, 0.45], [1, 1.15, 1])

  // Phase 3: Emojis burst delayed (0.39 to 0.55) -> don't burst immediately
  const emojisOpacity = useTransform(scrollYProgress, [0.39, 0.43, 0.55, 0.6], [0, 1, 1, 0])
  const emojisScale = useTransform(scrollYProgress, [0.39, 0.45], [0.2, 1])

  // Phase 4: Stage blurs (0.6 to 0.7)
  const stageBlur = useTransform(scrollYProgress, [0.55, 0.7], ['blur(0px)', 'blur(16px)'])
  const stageOpacity = useTransform(scrollYProgress, [0.55, 0.7], [1, 0.4])

  // Phase 5: Solution text appears (0.7 to 0.8)
  const solutionOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.65, 0.8], [60, 0])

  return (
    <section className="claim-story" id="sinistres" ref={ref}>
      <div className="claim-sticky">

        <motion.div className="claim-stage" style={{ filter: stageBlur, opacity: stageOpacity }}>
          <div className="road-line-full" />

          <motion.div className="claim-vehicles" style={{ scale: impactScale }}>
            <motion.img className="claim-taxi" src="/taxi.png" alt="Taxi assuré" style={{ left: '50%', x: taxiX }} />
            <motion.img className="claim-car" src="/vp.png" alt="Voiture assurée" style={{ left: '50%', x: carX }} />

            <motion.div className="impact-flash" style={{ opacity: flashOpacity, left: '50%', x: '-50%' }} />
          </motion.div>

          <motion.div className="shock-ring shock-ring-one" style={{ opacity: shockOpacity, left: '50%', x: '-50%' }} />
          <motion.div className="shock-ring shock-ring-two" style={{ opacity: shockOpacity, left: '50%', x: '-50%' }} />

          <motion.div className="panic-emojis full-width-emojis" style={{ opacity: emojisOpacity, scale: emojisScale }}>
            {['😰', '😱', '😵', '🤯'].map((emoji, index) => {
              const angle = (index / 8) * Math.PI * 2;
              const distance = 150 + Math.random() * 150;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.span
                  key={emoji + index}
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '60%',
                    x: x,
                    y: y,
                    marginLeft: '-25px',
                    marginTop: '-25px'
                  }}
                >
                  {emoji}
                </motion.span>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div className="solution-overlay" style={{ opacity: solutionOpacity, y: solutionY }}>
          <div className="solution-box">
            <p className="eyebrow">Sinistre et assistance</p>
            <h2>Après le choc, OAP reprend le fil: un seul dossier, un suivi humain.</h2>
            <p>
              Déclaration, pièces, relances, lecture des garanties et retour au client. Le courtier rend le processus moins opaque.
            </p>
            <ol className="claim-steps">
              <li>Déclarer et collecter les pièces utiles.</li>
              <li>Ouvrir le dossier auprès de la compagnie.</li>
              <li>Relancer, clarifier et suivre les délais.</li>
              <li>Accompagner jusqu’à la clôture ou l’indemnisation.</li>
            </ol>
            <a className="button button-primary" href="tel:+221338001234">
              <Phone size={18} />
              Appeler OAP
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


function PartnersAndTeam() {
  return (
    <section className="section partners-section" id="partenaires">
      <div className="section-heading compact">
        <FadeIn>
          <p className="eyebrow dark">Réseau et équipe</p>
          <h2>Un partenaire principal fort, une équipe OAP qui garde le lien client.</h2>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="orbital-stage">
          <div className="orbital-track" />

          <div className="orbital-center">
            <img src="/djolof.png" alt="DJOLOF ASSUR SA" />
            <span>Partenaire Principal</span>
          </div>

          {partners.filter(p => !p.main).map((partner, index, arr) => {
            const angle = (360 / arr.length) * index;
            return (
              <div
                className="orbital-item"
                key={partner.name}
                style={{ '--start-angle': `${angle}deg` }}
              >
                <div className="orbital-item-inner">
                  <img src={partner.image} alt={partner.name} title={partner.name} />
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>

      <div className="team-grid">
        {team.map((member, index) => (
          <FadeIn className="team-card" key={member.name} delay={index * 0.06}>
            <article>
              <div className="team-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-content">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <a href="mailto:contact@optimumassur.sn" className="team-contact-link">
                  <span>Contacter</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function MapboxMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: OAP_COORDINATES,
      zoom: 12.3,
      pitch: 32,
      bearing: -12,
    })

    map.current.scrollZoom.disable()
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

    const marker = document.createElement('div')
    marker.className = 'map-marker'
    marker.setAttribute('aria-label', 'Optimum Assur Pro à Dakar')

    const popup = new mapboxgl.Popup({ offset: 28, closeButton: false }).setHTML(
      '<strong>Optimum Assur Pro</strong><span>Dakar, Sénégal</span>'
    )

    new mapboxgl.Marker(marker).setLngLat(OAP_COORDINATES).setPopup(popup).addTo(map.current)
    map.current.on('load', () => popup.addTo(map.current))

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  return <div className="map-panel" ref={mapContainer} aria-label="Carte Mapbox Optimum Assur Pro" />
}

function Location() {
  return (
    <section className="section location-section" id="localisation">
      <div className="section-grid two-columns">
        <FadeIn className="location-copy">
          <p className="eyebrow dark">Nous trouver</p>
          <h2>Le service proche de vous commence ici, puis peut venir jusqu’à vous.</h2>
          <p>
            Contactez-nous pour un devis, un renouvellement, une déclaration de sinistre ou un audit de vos contrats existants.
          </p>
          <div className="contact-stack">
            <a href="tel:+221338001234"><Phone size={18} /> +221 33 800 12 34</a>
            <a href="mailto:contact@optimumassur.sn"><Mail size={18} /> contact@optimumassur.sn</a>
            <span><MapPin size={18} /> Dakar, Sénégal</span>
          </div>
          <div className="location-actions">
            <a className="button button-primary" href="mailto:contact@optimumassur.sn?subject=Demande%20de%20devis">
              <MessageCircle size={18} />
              Ecrire à OAP
            </a>
            <a className="button button-secondary" href={OAP_MAP_LINK} target="_blank" rel="noreferrer">
              <Navigation size={18} />
              Itinéraire
            </a>
          </div>
        </FadeIn>

        <FadeIn className="map-shell" delay={0.1}>
          <MapboxMap />
        </FadeIn>
      </div>
    </section>
  )
}

function ServicePage({ service }) {
  const Icon = service.icon

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [service.slug])

  return (
    <>
      <Navbar serviceMode />
      <main className="service-page" style={{ '--accent': service.accent }}>
        <section className="service-hero">
          <div className="service-hero-copy">
            <a className="back-link" href="#services">
              <ArrowLeft size={17} />
              Retour aux services
            </a>
            <p className="eyebrow dark">
              <Icon size={18} />
              Page détaillée
            </p>
            <h1>{service.title}</h1>
            <p>{service.hero}</p>
            <div className="service-hero-actions">
              <a className="button button-primary" href="mailto:contact@optimumassur.sn?subject=Demande%20de%20devis">
                <Mail size={18} />
                Demander un devis
              </a>
              <a className="button button-secondary" href="#service-drone-note">
                <PackageCheck size={18} />
                Livraison possible
              </a>
            </div>
          </div>
          <motion.div
            className="service-hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ServiceVisual service={service} />
          </motion.div>
        </section>

        <section className="service-detail-section">
          <div className="service-intro">
            <p className="eyebrow dark">Comment OAP accompagne</p>
            <h2>{service.intro}</h2>
          </div>

          <div className="detail-grid">
            {service.categories.map(([title, text, image], index) => (
              <FadeIn className="detail-card" key={title} delay={index * 0.04}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {image && (
                  <div className="detail-card-image">
                    <img src={image} alt={title} />
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="service-columns">
          <FadeIn className="check-panel">
            <h2>Garanties possibles</h2>
            <div className="chip-list">
              {service.guarantees.map((item) => (
                <span key={item}><CheckCircle2 size={16} /> {item}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="check-panel" delay={0.08}>
            <h2>Documents à préparer</h2>
            <div className="chip-list">
              {service.documents.map((item) => (
                <span key={item}><FileCheck2 size={16} /> {item}</span>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="drone-note" id="service-drone-note">
          <div>
            <p className="eyebrow">Livraison par drone</p>
            <h2>Quand récupérer un document devient une contrainte, OAP peut rapprocher le service du client.</h2>
            <p>{service.drone}</p>
          </div>
          <motion.div
            className="mini-drone"
            animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DroneSVG />
          </motion.div>
        </section>

        <section className="next-services">
          <p className="eyebrow dark">Autres catégories</p>
          <div>
            {servicePages.filter((item) => item.slug !== service.slug).slice(0, 5).map((item) => (
              <a key={item.slug} href={`#service-${item.slug}`} style={{ '--accent': item.accent }}>
                {item.title}
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/logo.png" alt="Logo Optimum Assur Pro" className="footer-logo" />
        <span>Un service proche de vous.</span>
      </div>
      <div className="footer-links">
        <a href="#services">Services</a>
        <a href="#drone">Drone</a>
        <a href="#courtage">Courtage</a>
        <a href="#campagnes">Campagnes</a>
        <a href="#localisation">Contact</a>
      </div>
      <p>© 2026 Optimum Assur Pro. Tous droits réservés.</p>
    </footer>
  )
}

function HomePage() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id || id.startsWith('service-')) return

    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroCinematic />
        <ServicesHub />
        <DroneDeliveryStory />
        <BrokerageFlow />
        <ClaimsCinematic />
        <CampaignsCinematic />
        <PartnersAndTeam />
        <Location />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const route = useHashRoute()
  const activeService = useMemo(() => serviceLookup.get(route), [route])

  if (activeService) {
    return <ServicePage service={activeService} />
  }

  return <HomePage />
}
