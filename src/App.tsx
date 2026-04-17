import { useEffect } from 'react'
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
            <li>Luxury palette — Albâtre white (#F4F4F0), deep ink (#0A0A0A) and Oxblood accent (#4A0404).</li>
            <li>Flat, fully shadowless interface — zero drop-shadow, zero gradients, zero border-radius.</li>
            <li>Monumental grotesque typography at oversized scale; structure as decoration.</li>
            <li>Refined motion — reveal eases, colour-swap hover states, reduced-motion fallback.</li>
          </ul>
        </section>

        <section id="contact" className="section contact" data-reveal>
          <h2>Contact</h2>
          <p>Need this style for your product? Let’s build your brutal portfolio.</p>
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
      <div className="void" />
    </div>
  )
}

export default App
