import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Hero.css';

const TITLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'CS Student @ SLIIT',
];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-glow hero__bg-glow--left"   />
      <div className="hero__bg-glow hero__bg-glow--right"  />
      <div className="hero__bg-glow hero__bg-glow--center" />
      <div className="hero__grid" />

      <div className="hero__inner">

        {/* ── Content ── */}
        <div className="hero__content">

          <motion.div className="hero__badge" {...fadeUp(0.1)}>
            <span className="hero__badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.p className="hero__greeting" {...fadeUp(0.18)}>
            Hello, I'm
          </motion.p>

          <motion.h1 className="hero__name" {...fadeUp(0.25)}>
            A V G R
            <span className="hero__name--accent">Tharumina</span>
          </motion.h1>

          <motion.div className="hero__title-wrap" {...fadeUp(0.35)}>
            <span className="hero__title-prefix">I'm a</span>
            <span className="hero__title">{displayed}</span>
            <span className="hero__cursor" />
          </motion.div>

          <motion.p className="hero__intro" {...fadeUp(0.45)}>
            Passionate about crafting modern, performant, and user-friendly digital
            experiences. I bridge the gap between clean design and robust engineering
            — from pixel-perfect frontends to scalable backend systems.
          </motion.p>

          {/* Actions */}
          <motion.div className="hero__actions" {...fadeUp(0.58)}>
            <button className="btn btn--primary" onClick={() => scrollTo('projects')}>
              View Projects <FiArrowRight size={16} />
            </button>
            <a
              className="btn btn--outline"
              href="/cv/A_V_G_R_Tharumina_CV.pdf"
              download="A_V_G_R_Tharumina_CV.pdf"
            >
              Download CV <FiDownload size={16} />
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div className="hero__socials" {...fadeUp(0.65)}>
            <a href="https://github.com/rehenisurutharumina" target="_blank" rel="noreferrer" className="hero__social-btn" aria-label="GitHub">
              <FiGithub size={17} />
            </a>
            <a href="https://www.linkedin.com/in/rehenisuru-tharumina-182642374/" target="_blank" rel="noreferrer" className="hero__social-btn" aria-label="LinkedIn">
              <FiLinkedin size={17} />
            </a>
          </motion.div>
        </div>

        {/* ── Image ── */}
        <motion.div
          className="hero__image-wrap"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="hero__image-ring hero__image-ring--outer" />
          <div className="hero__image-ring hero__image-ring--inner" />

          {/* Replace with your actual image */}
          <img
            src="/images/profile.jpg"
            alt="A V G R Tharumina"
            className="hero__image"
          />
          <div className="hero__image-glow" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
}