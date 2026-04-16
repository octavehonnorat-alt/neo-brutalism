import { useEffect, useRef } from 'react'
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

function App() {
  const magneticRefs = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const cleanups = magneticRefs.current.map((el) => {
      const onMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.12}px)`
      }

      const onLeave = () => {
        el.style.transform = 'translate(0, 0)'
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
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
    return () => observer.disconnect()
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
              className="btn btn-primary magnetic"
              ref={(el) => {
                if (el) magneticRefs.current[0] = el
              }}
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
          <p>Need this style for your product? Let’s build your brutal portfolio.</p>
          <div className="actions">
            <a
              href="mailto:hello@example.com"
              className="btn btn-primary magnetic"
              ref={(el) => {
                if (el) magneticRefs.current[1] = el
              }}
            >
              hello@example.com
            </a>
            <a
              href="https://neubrutali-portfolio-d4gmydmg.sites.blink.new/"
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Reference website
            </a>
          </div>
        </section>
      </main>

      <footer className="footer" data-reveal>
        <p>© Neo Brutalism Studio</p>
        <a href="#home" className="text-link">
          Back to top ↑
        </a>
      </footer>
    </div>
  )
}

export default App
