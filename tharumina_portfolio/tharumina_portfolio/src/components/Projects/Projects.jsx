import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiGithub, FiImage } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'PathFinder',
    description:
      'A modern platform designed to connect students and companies efficiently with useful career-related features.',
    image: '/images/pathfinder.png',
    tags: ['React', 'C#', 'SQL', '.NET'],
    demo: 'https://pathfinder-frontend-navy.vercel.app/',
    github: 'https://github.com/rehenisurutharumina',
  },
  {
    id: 2,
    title: 'Palmbeach Resort',
    description:
      'A resort-related web project with a modern interface focused on hospitality and user experience.',
    image: '/images/palmbeach.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 'MySQL', 'React+Vite'],
    demo: 'https://frontend-palmbeachresort.vercel.app/',
    github: 'https://github.com/rehenisurutharumina',
  },
  {
    id: 3,
    title: 'GreenLeaf',
    description:
      'A project related to sustainability/business management with a clean and engaging digital experience.',
    image: '/images/greenleaf.jpg',
    tags: ['React', 'C#', '.NET', 'SQL'],
    demo: '#',
    github: 'https://github.com/rehenisurutharumina',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.14,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.06 },
  }),
};

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      className="project-card glass-card"
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Image / Screenshot area */}
      <div className="project-card__image-wrap">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="project-card__image-fallback">
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiImage size={36} />
          </motion.div>
          <span>Add project screenshot</span>
        </div>
        <div className="project-card__overlay" />

        {/* Hover shine sweep */}
        <div className="project-card__shine" />
      </div>

      {/* Body */}
      <div className="project-card__body">
        <motion.h3
          className="project-card__title"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.14 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="project-card__desc"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.14 }}
        >
          {project.description}
        </motion.p>

        <div className="project-card__tags">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="project-tag"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={tagVariants}
              whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="project-card__actions">
          <motion.a
            href={project.github}
            className="project-btn project-btn--ghost"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <FiGithub size={15} /> GitHub
          </motion.a>
          <motion.a
            href={project.demo}
            className="project-btn project-btn--primary"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <FiExternalLink size={15} /> View Project
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="projects" ref={ref}>
      {/* Ambient glow */}
      <div className="projects__glow projects__glow--left" />
      <div className="projects__glow projects__glow--right" />

      <div className="projects__inner">
        {/* Header */}
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects__title">Featured Projects</h2>
          <div className="projects__title-line" />
        </motion.div>

        {/* Grid */}
        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}