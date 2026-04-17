import { useEffect, useState } from 'react'
import './App.css'

type Project = {
  title: string
  stack: string
  description: string
  href: string
}

const projects: Project[] = [
  {
    title: 'Brutal Commerce',
    stack: 'React · Vite · Stripe',
    description: 'E-commerce UI with sharp cards, thick borders, and punchy CTAs.',
    href: '#contact',
  },
  {
    title: 'Signal Notes',
    stack: 'TypeScript · PWA',
    description: 'Fast note app focused on contrast, hierarchy, and keyboard flows.',
    href: '#projects',
  },
  {
    title: 'Orbit Hiring',
    stack: 'API · Dashboard',
    description: 'Recruitment dashboard with neo-brutalist status labels and metrics.',
    href: '#about',
  },
]

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const themes = [
  { id: 'default', label: 'Brutal Orange', dot: '#ff4911' },
  { id: 'ocean', label: 'Ocean Dive', dot: '#0055ee' },
  { id: 'jungle', label: 'Toxic Jungle', dot: '#00bb00' },
  { id: 'candy', label: 'Candy Pop', dot: '#ee0088' },
  { id: 'solar', label: 'Solar Flare', dot: '#ff8800' },
]

type VoidMenu = {
  id: string
  title: string
  color: string
  items: { label: string; desc: string }[]
}

const voidMenus: VoidMenu[] = [
  {
    id: 'components',
    title: '01 — Example Components',
    color: '#7dff8f',
    items: [
      { label: 'Button Primary', desc: 'Example: main CTA with accent background, thick border, and hard offset shadow. Lifts +3px on hover, presses to 1px on active.' },
      { label: 'Button Secondary', desc: 'Example: white background version of the primary button. Same border thickness and shadow treatment. Yellow glow on hover.' },
      { label: 'Card', desc: 'Example: content block with thick border, flat color background, and a bounce pop entrance animation (cardPop keyframe).' },
      { label: 'Pill Tag', desc: 'Example: small badge with border and a continuous pulsing glow animation (glowPulse). Used for section labels and metadata.' },
      { label: 'Nav Link', desc: 'Example: bordered navigation item. Hover lifts shadow by 3px; active press reduces it to 1px. Entrance staggered by index.' },
      { label: 'Text Link', desc: 'Example: inline anchor with bold weight. No border — reserved for secondary navigation and back-to-top links.' },
    ],
  },
  {
    id: 'typography',
    title: '02 — Typography Scale',
    color: '#ffe96a',
    items: [
      { label: 'Display H1 — Example Headline', desc: 'clamp(2rem, 5vw, 4rem) · Archivo Black · Line-height 1 · Used once per page as the primary visual anchor.' },
      { label: 'Display H2 — Example Section Title', desc: 'clamp(1.5rem, 3.5vw, 3rem) · Archivo Black · Line-height 1.05 · Opens each major section.' },
      { label: 'Heading H3 — Example Card Title', desc: '1.15rem · Archivo Black · Default weight. Used inside cards and feature items for sub-level hierarchy.' },
      { label: 'Lead Text — Example Introduction Copy', desc: 'Max 60ch · ink-soft color (#2f2f39) · Line-height 1.45 · Directly follows H1 to provide context.' },
      { label: 'Body — Example Paragraph Content', desc: 'Inter · 1rem · Line-height 1.45 · Standard content text used in cards, lists, and descriptions.' },
      { label: 'Tag Label — EXAMPLE · STACK · BADGE', desc: '0.82rem · 700 weight · White background, thick border. Used as metadata badges on cards and list items.' },
    ],
  },
  {
    id: 'interactions',
    title: '03 — Interaction States',
    color: '#85d9ff',
    items: [
      { label: 'Hover Lift (Example: hover any button)', desc: 'Shadow offset increases from 5px to 8px on both X and Y. No blur, no spread — just a hard offset shift that feels physical.' },
      { label: 'Active Press (Example: click any button)', desc: 'Shadow collapses to 1px on mousedown. Simulates pressing a raised button into a surface. Released on mouseup.' },
      { label: 'Focus Ring (Example: tab to any link)', desc: '3px solid --ink outline with 2px offset. Always visible for keyboard users. Never overridden or removed.' },
      { label: 'Scroll Reveal (Example: scroll down)', desc: 'Each section starts at opacity 0 and translateY(18px). On IntersectionObserver trigger (12% visible), transitions to full opacity and Y=0 over 0.45s.' },
      { label: 'Card Pop Entrance (Example: the project cards)', desc: 'Uses cardPop keyframe: translateY(28px) scale(0.88) → bounce up → settle. cubic-bezier(0.34, 1.56, 0.64, 1) gives the overshoot feel. Staggered 120ms per card.' },
      { label: 'Reduced Motion (Example: OS setting)', desc: 'All animations are disabled when prefers-reduced-motion: reduce is set. Elements become visible immediately without transitions.' },
    ],
  },
  {
    id: 'colors',
    title: '04 — Color Palette',
    color: '#ffa7cd',
    items: [
      { label: 'Accent — Example: #ff4911 (default)', desc: 'High-saturation primary. Used exclusively for CTAs, the feature number labels, and primary button background. One per theme.' },
      { label: 'Sky — Example: #85d9ff (default)', desc: 'Hero section background. Vibrant pastel that contrasts with the white dot grid. Changes with each theme.' },
      { label: 'Yellow — Example: #ffe96a (default)', desc: 'Sticky topbar background and About section. Warm and attention-grabbing at the top of the viewport.' },
      { label: 'Green — Example: #7dff8f (default)', desc: 'Pill label badge and third project card. Saturated enough to vibrate against black borders.' },
      { label: 'Pink — Example: #ffa7cd (default)', desc: 'First project card background. Warm punchy hue that anchors the project grid.' },
      { label: 'Lavender — Example: #c7b7ff (default)', desc: 'Process section and second project card. Cooler accent that provides visual relief between louder colors.' },
    ],
  },
]

function ThemePicker({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  const [open, setOpen] = useState(false)
  const current = themes.find((t) => t.id === theme) ?? themes[0]

  return (
    <div className="theme-picker">
      <button
        className="theme-toggle"
        style={{ background: current.dot }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        aria-expanded={open}
        title={`Theme: ${current.label}`}
      />
      {open && (
        <div className="theme-dropdown" role="menu" aria-label="Theme options">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-dot${t.id === theme ? ' is-active' : ''}`}
              style={{ background: t.dot }}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              role="menuitem"
              title={t.label}
              aria-label={t.label}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState('default')
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced) {
      const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="void"])'))
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
            }
          })
        },
        { threshold: 0.12 },
      )
      items.forEach((item) => observer.observe(item))

      const voidEl = document.querySelector<HTMLElement>('[data-reveal="void"]')
      const voidObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
            }
          })
        },
        { threshold: 0.01, rootMargin: '0px 0px 80px 0px' },
      )
      if (voidEl) voidObserver.observe(voidEl)

      const replaySection = (hash: string) => {
        if (!hash) return
        const target = document.querySelector<HTMLElement>(hash)
        if (!target || !target.hasAttribute('data-reveal')) return
        target.classList.remove('is-visible')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            target.classList.add('is-visible')
          })
        })
      }

      const handleHashChange = () => replaySection(window.location.hash)
      window.addEventListener('hashchange', handleHashChange)

      return () => {
        observer.disconnect()
        voidObserver.disconnect()
        window.removeEventListener('hashchange', handleHashChange)
      }
    } else {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible')
      })
    }
  }, [])

  return (
    <div className="site" id="home">
      <header className="topbar" data-reveal>
        <a className="brand" href="#home">N/BRUTAL</a>
        <nav aria-label="Primary" className="nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <ThemePicker theme={theme} setTheme={setTheme} />
      </header>

      <main>
        <section className="hero section" data-reveal>
          <p className="pill">Neo-Brutal Visual System</p>
          <h1>
            Bold blocks, hard shadows,
            <br />
            zero visual compromise.
          </h1>
          <p className="lead">
            Recreation focused on vibrant flats, strict outlines, magnetic buttons,
            and high-impact interaction dynamics.
          </p>
          <div className="actions">
            <a
              href="#projects"
              className="btn btn-primary"
            >
              Explore projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Start a project
            </a>
          </div>
        </section>

        <section id="projects" className="section" data-reveal>
          <div className="section-head">
            <h2>Projects</h2>
            <a href="#contact" className="text-link">
              View all ↗
            </a>
          </div>
          <div className="grid">
            {projects.map((project) => (
              <article key={project.title} className="card">
                <p className="tag">{project.stack}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.href} className="card-link">
                  Open case →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about" data-reveal>
          <h2>Design Dynamics</h2>
          <ul>
            <li>High contrast palette with #FF4911 as primary attention color.</li>
            <li>Thick borders and hard offset shadows for all actionable elements.</li>
            <li>State-driven interactions: hover lift, active press, and visible focus.</li>
            <li>Entrance reveal and motion-safe behavior with reduced-motion fallback.</li>
          </ul>
        </section>

        <section id="contact" className="section contact" data-reveal>
          <h2>Contact</h2>
          <p>Need this style for your product? Let's build your brutal portfolio.</p>
          <div className="actions">
            <a
              href="mailto:hello@example.com"
              className="btn btn-primary"
            >
              hello@example.com
            </a>
          </div>
        </section>

        <section className="section features" data-reveal>
          <div className="section-head">
            <h2>Why Neo-Brutalism</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-number">01</span>
              <h3>Radical Clarity</h3>
              <p>No shadows that blend. No rounded corners that soften. Every element is deliberate and visible.</p>
            </div>
            <div className="feature-item">
              <span className="feature-number">02</span>
              <h3>Uncompromising Contrast</h3>
              <p>Black on white. White on black. Flat color on flat color. Legibility is non-negotiable.</p>
            </div>
            <div className="feature-item">
              <span className="feature-number">03</span>
              <h3>Honest Interaction</h3>
              <p>Hover states are explicit. Active states are dramatic. The interface tells you exactly what it is doing.</p>
            </div>
            <div className="feature-item">
              <span className="feature-number">04</span>
              <h3>Typographic Power</h3>
              <p>Type is the primary visual asset. Weight, size, and spacing do the heavy lifting.</p>
            </div>
          </div>
        </section>

        <section className="section process" data-reveal>
          <h2>Process</h2>
          <ol className="process-list">
            <li>
              <strong>Define the grid.</strong> Start with a rigid layout system — columns, gutters, and a baseline grid that everything snaps to.
            </li>
            <li>
              <strong>Choose one accent.</strong> A single high-saturation color used sparingly for maximum impact.
            </li>
            <li>
              <strong>Draw the borders.</strong> Every interactive element gets a thick, solid border. No hairlines.
            </li>
            <li>
              <strong>Add the shadow.</strong> Hard offset shadows at 45 degrees. No blur. No spread. Just offset.
            </li>
            <li>
              <strong>Write for hierarchy.</strong> Headlines are big. Labels are bold. Body copy is lean.
            </li>
          </ol>
        </section>
      </main>

      <footer className="footer" data-reveal>
        <p>© Neo Brutalism Studio</p>
        <a href="#home" className="text-link">
          Back to top ↑
        </a>
      </footer>

      <div className="void" data-reveal="void">
        <div className="void-inner">
          <div className="void-header">
            <span className="void-eyebrow">⚠ EXAMPLE CONTENT ONLY</span>
            <h2 className="void-title">Design System Showcase</h2>
            <p className="void-subtitle">
              All labels, descriptions, and values below are for demonstration purposes. Click any menu to expand it.
            </p>
          </div>
          <div className="void-menus">
            {voidMenus.map((menu) => (
              <div
                key={menu.id}
                className={`void-menu${openMenus[menu.id] ? ' is-open' : ''}`}
                style={{ '--menu-color': menu.color } as React.CSSProperties}
              >
                <button
                  className="void-menu-header"
                  onClick={() => toggleMenu(menu.id)}
                  aria-expanded={!!openMenus[menu.id]}
                >
                  <span className="void-menu-title">{menu.title}</span>
                  <span className="void-menu-toggle" aria-hidden="true">
                    {openMenus[menu.id] ? '−' : '+'}
                  </span>
                </button>
                <div className="void-menu-body" aria-hidden={!openMenus[menu.id]}>
                  {menu.items.map((item) => (
                    <div key={item.label} className="void-menu-item">
                      <strong className="void-item-label">{item.label}</strong>
                      <p className="void-item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="void-footer-note">— All content above is example / placeholder data —</p>
        </div>
      </div>
    </div>
  )
}

export default App
