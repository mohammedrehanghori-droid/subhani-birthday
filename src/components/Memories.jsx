import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './Memories.module.css';

// SVG Heart Tree Component matching exact reference screenshot
function HeartTree({ side = 'left' }) {
  const isLeft = side === 'left';
  // Array of heart positions forming a dense tree canopy
  const heartLeaves = [
    { x: 30, y: 65, size: 16, rotate: -15, color: '#F48FB1', opacity: 0.9 },
    { x: 15, y: 85, size: 14, rotate: -30, color: '#F06292', opacity: 0.85 },
    { x: 45, y: 50, size: 18, rotate: 10,  color: '#EC407A', opacity: 0.95 },
    { x: 65, y: 40, size: 20, rotate: -5,  color: '#F48FB1', opacity: 0.9 },
    { x: 85, y: 35, size: 17, rotate: 20,  color: '#F8BBD0', opacity: 0.85 },
    { x: 105, y: 45, size: 19, rotate: -10, color: '#EC407A', opacity: 0.95 },
    { x: 125, y: 60, size: 16, rotate: 25,  color: '#F06292', opacity: 0.9 },
    { x: 135, y: 80, size: 14, rotate: -20, color: '#F48FB1', opacity: 0.85 },
    { x: 40, y: 80, size: 15, rotate: 15,  color: '#E91E63', opacity: 0.9 },
    { x: 60, y: 70, size: 18, rotate: -12, color: '#F8BBD0', opacity: 0.95 },
    { x: 80, y: 65, size: 21, rotate: 5,   color: '#F48FB1', opacity: 0.9 },
    { x: 100, y: 75, size: 16, rotate: -18, color: '#EC407A', opacity: 0.85 },
    { x: 115, y: 95, size: 15, rotate: 12,  color: '#F06292', opacity: 0.9 },
    { x: 25, y: 105, size: 14, rotate: -8,  color: '#F8BBD0', opacity: 0.85 },
    { x: 50, y: 100, size: 16, rotate: 22,  color: '#F48FB1', opacity: 0.9 },
    { x: 75, y: 95, size: 18, rotate: -25, color: '#EC407A', opacity: 0.9 },
    { x: 95, y: 105, size: 15, rotate: 10,  color: '#F06292', opacity: 0.85 },
    { x: 70, y: 20, size: 16, rotate: 0,   color: '#F8BBD0', opacity: 0.9 },
  ];

  return (
    <div className={isLeft ? styles.heartTreeLeft : styles.heartTreeRight}>
      <svg viewBox="0 0 160 220" className={styles.heartTreeSvg}>
        {/* Tree Trunk & Spreading Branches */}
        <path
          d="M80 220 
             C80 180 75 140 60 110 
             C50 90 35 75 20 65 
             M60 110 
             C70 85 85 65 80 40 
             M80 160 
             C95 130 110 100 125 75 
             C135 60 150 50 160 40 
             M110 105 
             C100 75 105 55 115 35"
          stroke="#7D4E5B"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Trunk Base */}
        <path
          d="M65 220 
             C75 180 72 140 60 110 
             C75 130 100 130 110 105 
             C98 140 95 180 100 220 Z"
          fill="#7D4E5B"
        />

        {/* Canopy of Pink Hearts */}
        <g>
          {heartLeaves.map((leaf, idx) => (
            <g
              key={idx}
              transform={`translate(${isLeft ? leaf.x : 160 - leaf.x}, ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.size / 15})`}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={leaf.color}
                opacity={leaf.opacity}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

// Floating Rose Petals Component
function FloatingPetals() {
  const petals = Array.from({ length: 10 });
  return (
    <div className={styles.petalsContainer}>
      {petals.map((_, i) => {
        const leftPos = (i * 10 + (i % 3) * 5) % 95;
        const duration = 7 + (i % 4) * 2;
        const delay = i * 0.7;
        const size = 16 + (i % 3) * 6;

        return (
          <motion.div
            key={i}
            className={styles.petal}
            style={{ left: `${leftPos}%`, top: '-40px' }}
            initial={{ y: -40, opacity: 0, rotate: 0, x: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              opacity: [0, 0.85, 0.85, 0],
              rotate: [0, 180, 360],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4.5C8.5 4.5 5.5 7.5 5.5 11C5.5 15.5 12 20 12 20C12 20 18.5 15.5 18.5 11C18.5 7.5 15.5 4.5 12 4.5Z"
                fill="#E91E63"
                opacity="0.75"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Memories({ onNext, onBack }) {

  const messages = (birthdayData.bouquetMessages || []).map(m => ({
    ...m,
    isHighlight: m.pos === 'midRight',
  }));

  return (
    <div className={styles.screen}>
      {/* Background Floating Petals */}
      <FloatingPetals />

      {/* Top Header Bar matching exact screenshot */}
      <div className={styles.topBar}>
        <button
          className={styles.backBtn}
          onClick={onBack || (() => window.history.back())}
        >
          <span>←</span> Back
        </button>

        <h1 className={styles.pageTitle}>
          Your Rose Bouquet 🌹
        </h1>

        {/* Spacer for symmetrical header title, global audio button floats above */}
        <div style={{ width: 42, height: 42, pointerEvents: 'none' }} />
      </div>

      {/* Main Rose Bouquet Stage */}
      <div className={styles.mainStage}>
        {/* Heart Trees at Bottom Left and Right */}
        <HeartTree side="left" />
        <HeartTree side="right" />

        {/* Central Rose Bouquet with Entrance Animation */}
        <div className={styles.bouquetWrapper}>
          <motion.div
            className={styles.glowingAura}
            animate={{
              scale: [0.95, 1.1, 0.95],
              opacity: [0.65, 0.9, 0.65],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.img
            src="/assets/rose_bouquet_clean.png"
            alt="Rose Bouquet"
            className={styles.bouquetImg}
            initial={{ opacity: 0, scale: 0.4, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.1 },
              scale: { type: 'spring', stiffness: 140, damping: 14, delay: 0.1 },
              y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
            }}
          />
        </div>

        {/* Sequential Popups of Romantic Speech Bubbles (Screenshot 2 phase) */}
        {messages.map((bubble, i) => {
          const positionClass = styles[bubble.pos] || styles.topLeft;
          const delay = 0.95 + i * 0.28; // Appears right after bouquet presents!

          return (
            <motion.div
              key={bubble.id}
              className={`${styles.bubble} ${positionClass}`}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 0.4, delay },
                scale: { type: 'spring', stiffness: 220, damping: 16, delay },
                y: {
                  duration: 3 + (i % 3) * 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay + 0.5,
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className={bubble.isHighlight ? styles.bubbleTextHighlight : styles.bubbleText}>
                {bubble.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action / Continue Button matching exact screenshot */}
      <div className={styles.bottomArea}>
        <motion.button
          id="bouquet-continue-btn"
          className={styles.continueBtn}
          onClick={onNext}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.94 }}
        >
          Continue →
        </motion.button>
      </div>
    </div>
  );
}
