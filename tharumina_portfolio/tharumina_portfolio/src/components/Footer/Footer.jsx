import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
  ];

  const moreLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const contactLinks = [
    { label: 'GitHub', href: 'https://github.com/rehenisurutharumina' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rehenisuru-tharumina-182642374/' },
    { label: 'Email Me', href: 'mailto:your@email.com' },
  ];

  return (
    <>
      <motion.footer
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="footer__divider" />

        <div className="footer__inner">
          {/* Brand Column */}
          <motion.div className="footer__brand" variants={itemVariants}>
            <div className="footer__logo-row">
              <div className="footer__logo-icon">
                <span>&lt;/&gt;</span>
              </div>
              <span className="footer__logo" onClick={scrollTop}>
                Tharumina
              </span>
            </div>

            <p className="footer__tagline">
              Full Stack Developer passionate about crafting clean,<br />
              innovative web experiences. From backend APIs to<br />
              polished UIs — I build solutions that matter.
            </p>

            <div className="footer__socials">
              <a
                href="https://github.com/rehenisurutharumina"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                aria-label="GitHub Profile"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/rehenisuru-tharumina-182642374/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin size={18} />
              </a>
              <a
                href="mailto:your@email.com"
                className="footer-icon-btn"
                aria-label="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Navigation</h4>
            <ul className="footer__col-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__col-link">
                    <span className="footer__col-dot" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Column */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">More</h4>
            <ul className="footer__col-links">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__col-link">
                    <span className="footer__col-dot" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__col-links">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer__col-link"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="footer__col-dot" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="footer__bottom" variants={itemVariants}>
          <p className="footer__copy">
            © 2026 · Made with{' '}
            <FiHeart className="heart-icon" style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
            by{' '}
            <a
              href="https://www.linkedin.com/in/rehenisuru-tharumina-182642374/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__copy-link"
            >
              A V G R Tharumina
            </a>
          </p>
          <p className="footer__made">Built with React, Tailwind &amp; Framer Motion</p>
        </motion.div>
      </motion.footer>

      <motion.button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Back to top"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </>
  );
}