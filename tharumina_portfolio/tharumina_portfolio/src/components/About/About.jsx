import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FiMail, FiPhone, FiMapPin,
  FiCode, FiServer, FiDatabase, FiSmartphone,
  FiCloud, FiGitBranch,
  FiGithub, FiLinkedin, FiAward, FiZap,
} from 'react-icons/fi';
import './About.css';

const contacts = [
  { icon: <FiMail size={15} />,   label: 'Email',    value: 'tharumina@email.com' },
  { icon: <FiPhone size={15} />,  label: 'Phone',    value: '076 000 0000' },
  { icon: <FiMapPin size={15} />, label: 'Location', value: 'Sri Lanka' },
];

const interests = [
  { icon: <FiCode size={16} />,       name: 'Frontend Dev',    sub: 'React, Next.js & modern UI' },
  { icon: <FiServer size={16} />,     name: 'Backend Systems', sub: 'Node.js, Spring Boot & APIs' },
  { icon: <FiDatabase size={16} />,   name: 'Databases',       sub: 'SQL, MongoDB & data design' },
  { icon: <FiSmartphone size={16} />, name: 'Mobile Dev',      sub: 'Cross-platform applications' },
  { icon: <FiCloud size={16} />,      name: 'Cloud & DevOps',  sub: 'CI/CD, Docker & deployment' },
  { icon: <FiGitBranch size={16} />,  name: 'Open Source',     sub: 'Collaboration & contribution' },
];

const education = [
  {
    degree: 'BSc (Hons) in Computer Science',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2023 – Present',
    status: 'ongoing',
  },
  {
    degree: 'G.C.E. Advanced Level — Physical Science',
    institution: 'Local Government School, Sri Lanka',
    period: '2020 – 2022',
    status: 'completed',
  },
];

const skills = [
  { label: 'React / Next.js',   pct: 78 },
  { label: 'Node & Express',    pct: 65 },
  { label: 'Java / Spring Boot',pct: 55 },
  { label: 'MySQL / MongoDB',   pct: 70 },
];

const fadeUp   = (d = 0) => ({ initial: { opacity: 0, y: 28 },  animate: { opacity: 1, y: 0 },  transition: { duration: 0.6, delay: d } });
const fadeLeft = (d = 0) => ({ initial: { opacity: 0, x: -36 }, animate: { opacity: 1, x: 0 },  transition: { duration: 0.7, delay: d } });

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const go     = (p) => ({ initial: p.initial, animate: inView ? p.animate : {}, transition: p.transition });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about__inner">

        {/* header */}
        <motion.div className="section-header" {...go(fadeUp(0))}>
          <span className="section-tag">About Me</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </motion.div>

        <motion.p className="about__subtitle" {...go(fadeUp(0.1))}>
          Where <span className="accent">Passion</span> meets{' '}
          <span className="accent2">Precision</span> in code
        </motion.p>

        <div className="about__layout">

          {/* ── LEFT: profile ── */}
          <motion.div className="profile-card glass-card" {...go(fadeLeft(0.15))}>
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-inner">
                <span className="profile-initials">AVT</span>
              </div>
            </div>

            <p className="profile-name">A V G R Tharumina</p>

            <div className="profile-badge">
              <span className="profile-badge-dot" />
              Software Engineer
            </div>

            <div className="profile-contacts">
              {contacts.map(({ icon, label, value }) => (
                <div className="contact-row" key={label}>
                  <div className="contact-icon">{icon}</div>
                  <div>
                    <p className="contact-label">{label}</p>
                    <p className="contact-value">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-socials">
              <a href="https://github.com/rehenisurutharumina" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
                <FiGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/rehenisuru-tharumina-182642374/" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <FiLinkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT ── */}
          <div className="about__right">

            {/* Bio */}
            <motion.div className="bio-card glass-card" {...go(fadeUp(0.2))}>
              <p className="bio-text">
                I'm a passionate <span className="accent">software engineer</span> and
                3rd-year Computer Science student at SLIIT, driven by a deep curiosity for
                how systems are built and how they can be made better. I specialise in
                designing and shipping full-stack applications that are both technically
                sound and genuinely enjoyable to use.
              </p>
              <p className="bio-text">
                I bring a <span className="accent2">problem-first mindset</span> to every
                project — thinking through architecture, performance, and user experience
                before writing a single line of code. I'm always exploring new technologies,
                contributing to collaborative work, and pushing myself to grow as an engineer.
              </p>
            </motion.div>

            {/* Core interests — 3×2 grid */}
            <motion.div className="interests-card glass-card" {...go(fadeUp(0.3))}>
              <p className="card-section-label">Core Interests</p>
              <div className="interests-grid">
                {interests.map(({ icon, name, sub }) => (
                  <motion.div
                    key={name}
                    className="interest-item"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="interest-icon">{icon}</div>
                    <div>
                      <p className="interest-name">{name}</p>
                      <p className="interest-sub">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education + Skills side by side */}
            <div className="about__bottom">

              {/* Education */}
              <motion.div className="edu-card glass-card" {...go(fadeUp(0.4))}>
                <div className="card-header">
                  <div className="card-header-icon"><FiAward size={17} /></div>
                  <div>
                    <p className="card-section-label" style={{ marginBottom: 2 }}>Education</p>
                    <p className="card-header-sub">Academic Journey</p>
                  </div>
                </div>

                {education.map(({ degree, institution, period, status }, i) => (
                  <div className="edu-entry" key={i}>
                    <div className="edu-dot-col">
                      <div className={`edu-dot ${status === 'ongoing' ? 'edu-dot--active' : ''}`} />
                      {i < education.length - 1 && <div className="edu-line" />}
                    </div>
                    <div>
                      <p className="edu-degree">{degree}</p>
                      <p className="edu-institution">{institution}</p>
                      <span className="edu-period">
                        <span className="edu-period-dot" />
                        {period}
                        {status === 'ongoing' && <span className="edu-ongoing">Ongoing</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Skills progress */}
              <motion.div className="skills-card glass-card" {...go(fadeUp(0.5))}>
                <div className="card-header">
                  <div className="card-header-icon"><FiZap size={17} /></div>
                  <div>
                    <p className="card-section-label" style={{ marginBottom: 2 }}>Tech Skills</p>
                    <p className="card-header-sub">Current Proficiency</p>
                  </div>
                </div>

                <div className="skills-list">
                  {skills.map(({ label, pct }, i) => (
                    <div className="skill-item" key={label}>
                      <div className="skill-header">
                        <span className="skill-label">{label}</span>
                        <span className="skill-pct">{pct}%</span>
                      </div>
                      <div className="skill-track">
                        <motion.div
                          className="skill-fill"
                          initial={{ scaleX: 0 }}
                          animate={inView ? { scaleX: 1 } : {}}
                          transition={{ duration: 0.9, delay: 0.65 + i * 0.1, ease: 'easeOut' }}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}