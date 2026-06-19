import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiChevronDown,
  FiChevronUp,
  FiImage,
} from 'react-icons/fi';
import projects, { FILTER_TABS } from './projectsData';
import './Projects.css';

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, delay: i * 0.04 },
  }),
};

function ProjectCard({ project, index, inView }) {
  const [showFeatures, setShowFeatures] = useState(false);
  const hasGithub = project.github && project.github !== '#';
  const hasDemo = project.demo && project.demo !== '#';

  return (
    <motion.div
      className="project-card glass-card"
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      exit="exit"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      layout
    >
      {/* Media area */}
      {(project.video || project.image) && (
        <div className="project-card__image-wrap">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="project-card__image"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="project-card__image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          )}
          {!project.video && (
            <div className="project-card__image-fallback">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FiImage size={36} />
              </motion.div>
              <span>Screenshot unavailable</span>
            </div>
          )}
          <div className="project-card__overlay" />
          <div className="project-card__shine" />
        </div>
      )}

      {/* Category badge */}
      <div className="project-card__category-bar">
        <FiLayers size={12} />
        <span>{project.category}</span>
      </div>

      {/* Body */}
      <div className="project-card__body">
        <motion.h3
          className="project-card__title"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="project-card__desc"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          {project.description}
        </motion.p>

        {/* Tech stack tags */}
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

        {/* Key features — collapsible */}
        {project.features && project.features.length > 0 && (
          <div className="project-card__features-section">
            <button
              className="project-card__features-toggle"
              onClick={() => setShowFeatures((prev) => !prev)}
              aria-expanded={showFeatures}
            >
              Key Features
              {showFeatures ? (
                <FiChevronUp size={14} />
              ) : (
                <FiChevronDown size={14} />
              )}
            </button>
            <AnimatePresence>
              {showFeatures && (
                <motion.ul
                  className="project-card__features-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {project.features.map((feat, i) => (
                    <li key={i} className="project-card__feature-item">
                      <span className="project-card__feature-dot" />
                      {feat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Actions */}
        <div className="project-card__actions">
          {hasGithub && (
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
          )}
          {!hasGithub && (
            <span className="project-btn project-btn--ghost project-btn--disabled">
              <FiGithub size={15} /> Private
            </span>
          )}
          {hasDemo && (
            <motion.a
              href={project.demo}
              className="project-btn project-btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <FiExternalLink size={15} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.filters.includes(activeFilter)),
    [activeFilter],
  );

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
          <span className="section-tag">Portfolio</span>
          <h2 className="projects__title">Featured Projects</h2>
          <div className="projects__title-line" />
          <p className="projects__subtitle">
            A curated selection of <span className="accent">{projects.length}</span> projects
            spanning full-stack, IoT, parallel computing &amp; more
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {FILTER_TABS.map((tab) => {
            const count =
              tab.key === 'all'
                ? projects.length
                : projects.filter((p) => p.filters.includes(tab.key)).length;
            return (
              <motion.button
                key={tab.key}
                className={`projects__filter-btn${activeFilter === tab.key ? ' projects__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(tab.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {tab.label}
                <span className="projects__filter-count">{count}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}