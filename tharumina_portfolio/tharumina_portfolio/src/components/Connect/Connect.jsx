import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import './Connect.css';

export default function Connect() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual form submission logic (e.g. EmailJS, Formspree)
    setStatus('sent');
  };

  const contactItems = [
    {
      icon: <FiMail size={20} />,
      label: 'EMAIL',
      value: 'your@email.com',
      href: 'mailto:your@email.com',
      iconBg: 'linear-gradient(135deg, #be185d, #9333ea)',
    },
    {
      icon: <FiPhone size={20} />,
      label: 'PHONE',
      value: '+94 76 000 0000',
      href: 'tel:+94760000000',
      iconBg: 'linear-gradient(135deg, #0d9488, #0ea5e9)',
    },
    {
      icon: <FiMapPin size={20} />,
      label: 'LOCATION',
      value: 'Colombo, Sri Lanka',
      href: null,
      iconBg: 'linear-gradient(135deg, #16a34a, #14b8a6)',
    },
  ];

  return (
    <section id="connect" className="connect" ref={ref}>
      <div className="connect__bg-glow" />

      <div className="connect__inner">
        {/* Header */}
        <motion.div
          className="connect__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="connect__title">Get In Touch</h2>
          <div className="connect__title-line" />
          <p className="connect__sub">Let's connect and build something amazing together</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="connect__grid">
          {/* Left — Contact Information */}
          <motion.div
            className="connect__info-card"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="connect__card-title">Contact Information</h3>

            <div className="connect__info-list">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="connect__info-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
                >
                  <div
                    className="connect__info-icon"
                    style={{ background: item.iconBg }}
                  >
                    {item.icon}
                  </div>
                  <div className="connect__info-text">
                    <span className="connect__info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="connect__info-value connect__info-link">
                        {item.value}
                      </a>
                    ) : (
                      <span className="connect__info-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Send Message */}
          <motion.div
            className="connect__form-card"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h3 className="connect__card-title">Send Message</h3>

            <form className="connect__form" onSubmit={handleSubmit}>
              <div className="connect__field">
                <label className="connect__label">YOUR NAME</label>
                <input
                  type="text"
                  name="name"
                  className="connect__input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="connect__field">
                <label className="connect__label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  className="connect__input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="connect__field">
                <label className="connect__label">YOUR MESSAGE</label>
                <textarea
                  name="message"
                  className="connect__textarea"
                  placeholder="Tell me about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`connect__btn ${status === 'sent' ? 'connect__btn--sent' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiSend size={16} />
                {status === 'sent' ? 'Message Sent!' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}