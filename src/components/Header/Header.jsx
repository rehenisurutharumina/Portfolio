import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import './Header.css';

const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Connect',  href: '#connect' },
];

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('#hero');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Load Dancing Script from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />

      <motion.header
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="header__inner">

          {/* Logo */}
          <a className="header__logo" onClick={() => handleNav('#hero')}>
            <span className="logo-name">Tharumina</span>
          </a>

          {/* Desktop nav + CV button */}
          <div className="header__right">
            <nav className="header__nav">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className={`nav-link ${active === link.href ? 'nav-link--active' : ''}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span className="nav-underline" layoutId="underline" />
                  )}
                </a>
              ))}
            </nav>

            <motion.a
              href="/cv/A_V_G_R_Tharumina_CV.pdf"
              download
              className="cv-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiDownload size={14} />
              Download CV
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            className="header__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="header__mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className={`mobile-link ${active === link.href ? 'mobile-link--active' : ''}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/cv/Tharumina_CV.pdf"
                download
                className="mobile-cv-btn"
              >
                <FiDownload size={15} />
                Download CV
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}