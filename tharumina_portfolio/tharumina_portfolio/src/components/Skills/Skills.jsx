import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiCode, FiServer, FiTool, FiLayout,
  FiZap, FiGlobe, FiWifi, FiTerminal, FiAlertCircle,
  FiCloud, FiDatabase, FiCoffee,
} from 'react-icons/fi';
import {
  SiReact, SiJavascript, SiTailwindcss, SiFramer,
  SiGreensock, SiMui, SiDotnet, SiPython,
  SiSpringboot, SiMysql, SiMongodb, SiJsonwebtokens,
  SiGit, SiDocker, SiFigma,
  SiSelenium, SiPostman, SiVercel,
} from 'react-icons/si';
import './Skills.css';

const categories = [
  {
    icon: <FiCode size={20} />,
    title: 'Frontend Development',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.15)',
    skills: [
      { name: 'React',         icon: <SiReact />,       dot: '#61dafb' },
      { name: 'JavaScript',    icon: <SiJavascript />,  dot: '#f7df1e' },
      { name: 'Material-UI',   icon: <SiMui />,         dot: '#007fff' },
      { name: 'Framer Motion', icon: <SiFramer />,      dot: '#a855f7' },
      { name: 'GSAP',          icon: <SiGreensock />,   dot: '#88ce02' },
      { name: 'Tailwind CSS',  icon: <SiTailwindcss />, dot: '#38bdf8' },
    ],
  },
  {
    icon: <FiServer size={20} />,
    title: 'Backend Development',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.15)',
    skills: [
      { name: '.NET',        icon: <SiDotnet />,       dot: '#512bd4' },
      { name: 'Python',      icon: <SiPython />,       dot: '#3b82f6' },
      { name: 'Java',        icon: <FiCoffee />,       dot: '#ef4444' },
      { name: 'Spring Boot', icon: <SiSpringboot />,   dot: '#6db33f' },
      { name: 'JWT',         icon: <SiJsonwebtokens />,dot: '#f59e0b' },
      { name: 'MySQL',       icon: <SiMysql />,        dot: '#00758f' },
      { name: 'MongoDB',     icon: <SiMongodb />,      dot: '#47a248' },
    ],
  },
  {
    icon: <FiTool size={20} />,
    title: 'Tools & Technologies',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.15)',
    skills: [
      { name: 'Git',      icon: <SiGit />,      dot: '#f05032' },
      { name: 'Docker',   icon: <SiDocker />,   dot: '#2496ed' },
      { name: 'AWS',      icon: <FiCloud />,    dot: '#f59e0b' },
      { name: 'Figma',    icon: <SiFigma />,    dot: '#a855f7' },
      { name: 'Azure',    icon: <FiDatabase />, dot: '#0078d4' },
      { name: 'Selenium', icon: <SiSelenium />, dot: '#43b02a' },
      { name: 'Postman',  icon: <SiPostman />,  dot: '#ef4444' },
      { name: 'Vercel',   icon: <SiVercel />,   dot: '#e2e8f0' },
    ],
  },
  {
    icon: <FiLayout size={20} />,
    title: 'Design & Other',
    color: '#14b8a6',
    bg: 'rgba(20,184,166,0.15)',
    skills: [
      { name: 'UI/UX Design',     icon: <FiLayout />,      dot: '#ec4899' },
      { name: 'Responsive Design', icon: <FiGlobe />,      dot: '#22c55e' },
      { name: 'REST APIs',         icon: <FiWifi />,       dot: '#3b82f6' },
      { name: 'Testing',           icon: <FiAlertCircle />,dot: '#f59e0b' },
      { name: 'Arduino',           icon: <FiTerminal />,   dot: '#3b82f6' },
    ],
  },
];

const ticker = [
  'Docker','AWS','Git','Figma','Framer Motion',
  'GSAP','Tailwind CSS','Node.js','Express','React',
  'Spring Boot','MySQL','MongoDB','.NET','Vercel',
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (j) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.3, delay: j * 0.05 },
  }),
};

function SkillPill({ skill, inView, j }) {
  return (
    <motion.div
      className="skill-pill"
      custom={j}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={pillVariants}
      whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
    >
      <span className="skill-pill__icon">{skill.icon}</span>
      <span className="skill-pill__name">{skill.name}</span>
      <span className="skill-pill__dot" style={{ background: skill.dot }} />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills__bg-glow" />
      <div className="skills__inner">

        {/* ── Header ── */}
        <motion.div
          className="skills__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="skills__title">Skills &amp; Expertise</h2>
          <div className="skills__title-line" />
          <p className="skills__sub">
            {'A comprehensive toolkit for turning '}
            <span className="skills__sub--teal">ideas</span>
            {' into '}
            <span className="skills__sub--light">impactful solutions</span>
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="skills__grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="skill-category"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="skill-category__header">
                <div className="skill-category__icon-wrap" style={{ background: cat.bg }}>
                  <span className="skill-category__icon-inner" style={{ color: cat.color }}>
                    {cat.icon}
                  </span>
                </div>
                <div>
                  <h3 className="skill-category__title">{cat.title}</h3>
                  <span className="skill-category__count">
                    <FiZap size={11} style={{ color: cat.color }} />
                    {` ${cat.skills.length} skills`}
                  </span>
                </div>
              </div>

              <div className="skill-pills">
                {cat.skills.map((skill, j) => (
                  <SkillPill key={j} skill={skill} inView={inView} j={j} />
                ))}
              </div>

              <div className="skill-category__corner-dot" style={{ background: cat.color }} />
            </motion.div>
          ))}
        </div>

        {/* ── Ticker ── */}
        <motion.div
          className="skills__ticker-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="skills__ticker-title">Featured Technologies</p>
          <p className="skills__ticker-sub">Core technologies I frequently work with</p>
          <div className="skills__ticker">
            <motion.div
              className="skills__ticker-track"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {[...ticker, ...ticker].map((name, i) => (
                <span key={i} className="skills__ticker-item">
                  <span className="skills__ticker-dot" />{name}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}