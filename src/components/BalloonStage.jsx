import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BalloonStage.module.css';

const BALLOON_CONFIG = [
  { id: 0, color: '#a8d8f0', shine: '#d4eef8', string: '#7bb3cc', x: '12%', top: '30px', word: 'You', label: 'blue' },
  { id: 1, color: '#f4b8cb', shine: '#fad6e2', string: '#d48a9e', x: '55%', top: '30px', word: 'are', label: 'pink' },
  { id: 2, color: '#98d4a3', shine: '#c6e9ca', string: '#6aab76', x: '12%', top: '210px', word: 'so', label: 'green' },
  { id: 3, color: '#c5a8e8', shine: '#dfd0f5', string: '#9e7dc7', x: '55%', top: '210px', word: 'special', label: 'purple' },
];

function RevealedWord({ word, x, top }) {
  return (
    <motion.div
      className={styles.revealedWordWrap}
      style={{ left: x, top }}
      initial={{ opacity: 0, scale: 0.4, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.35 },
        scale: { duration: 0.45, type: 'spring', stiffness: 220, damping: 14 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
      }}
    >
      <span className={styles.revealedWordText}>{word}</span>
    </motion.div>
  );
}

function Balloon({ config, onPop, popped }) {
  const [animating, setAnimating] = useState(false);

  const handlePop = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (popped || animating) return;
    setAnimating(true);

    // Pop sound
    try {
      const audio = new Audio('/assets/audio/pop.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {});
    } catch (_) {}

    setTimeout(() => onPop(config.id), 240);
  };

  // Independent floating timing parameters per balloon
  const floatDuration = 2.8 + config.id * 0.4;
  const swayX = (config.id % 2 === 0 ? 1 : -1) * (5 + config.id * 2);
  const rotDeg = (config.id % 2 === 0 ? 1 : -1) * 3;

  return (
    <>
      {!popped && (
        <motion.div
          className={styles.balloonWrap}
          style={{ left: config.x, top: config.top }}
          initial={{ opacity: 0, y: 70, scale: 0.6 }}
          animate={animating
            ? { scale: [1, 1.22, 1.4, 0], opacity: [1, 1, 0.8, 0] }
            : { opacity: 1, y: [0, -14, 0], x: [0, swayX, 0], rotate: [0, rotDeg, -rotDeg, 0], scale: 1 }
          }
          transition={animating
            ? { duration: 0.24, ease: [0.175, 0.885, 0.32, 1.275] }
            : { y: { repeat: Infinity, duration: floatDuration, ease: 'easeInOut' },
                x: { repeat: Infinity, duration: floatDuration * 1.2, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: floatDuration * 1.5, ease: 'easeInOut' },
                opacity: { duration: 0.5 }, scale: { duration: 0.5 } }
          }
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
          onClick={handlePop}
          onTouchStart={handlePop}
          whileTap={{ scale: 1.15 }}
        >
          {/* Balloon SVG */}
          <svg width="110" height="148" viewBox="0 0 110 148" className={styles.balloonSvg}>
            {/* Main balloon body */}
            <ellipse cx="55" cy="60" rx="46" ry="56" fill={config.color}/>
            {/* Shine highlights */}
            <ellipse cx="38" cy="32" rx="14" ry="20" fill={config.shine} opacity="0.75"/>
            <ellipse cx="48" cy="24" rx="6" ry="10" fill="white" opacity="0.6"/>
            {/* Knot */}
            <ellipse cx="55" cy="116" rx="6" ry="5" fill={config.color}/>
            {/* Ribbon decoration */}
            <path d="M48 116 Q40 124 44 130 Q48 136 52 130 Q55 124 55 116" fill={config.string} opacity="0.65"/>
            <path d="M62 116 Q70 124 66 130 Q62 136 58 130 Q55 124 55 116" fill={config.string} opacity="0.65"/>
            {/* String */}
            <path d="M55 121 Q52 132 56 148" stroke={config.string} strokeWidth="1.5" fill="none"/>
          </svg>

          {/* Pop burst particles */}
          {animating && (
            <div className={styles.popParticles}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles.particle} style={{
                  '--angle': `${i * 36}deg`,
                  background: config.color,
                }} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

export default function BalloonStage({ onNext }) {
  const [popped, setPopped] = useState(new Set());
  const [showSpecialCard, setShowSpecialCard] = useState(false);
  const total = BALLOON_CONFIG.length;

  const handlePop = (id) => {
    setPopped(prev => {
      const next = new Set(prev);
      next.add(id);

      // When all 4 balloons pop: reveal full screen message for 2 seconds, then continue
      if (next.size === total) {
        setTimeout(() => {
          setShowSpecialCard(true);
          setTimeout(() => {
            onNext();
          }, 2000);
        }, 500);
      }
      return next;
    });
  };

  return (
    <div className={styles.screen}>
      {/* Floating hearts background */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="float-heart" style={{
          left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`,
          fontSize: '1rem', animationDelay: `${i * 0.4}s`,
          animationDuration: `${2.8 + i * 0.3}s`,
        }}>🩷</div>
      ))}

      <AnimatePresence mode="wait">
        {!showSpecialCard ? (
          <motion.div
            key="balloon-view"
            className={styles.stageContent}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Pop all {total} balloons 🎈
            </motion.h2>

            <div className={styles.balloonGrid}>
              {BALLOON_CONFIG.map(cfg => {
                const isPopped = popped.has(cfg.id);
                return (
                  <div key={cfg.id}>
                    <Balloon
                      config={cfg}
                      onPop={handlePop}
                      popped={isPopped}
                    />
                    {isPopped && (
                      <RevealedWord word={cfg.word} x={cfg.x} top={cfg.top} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Full screen "You are so ... special" view matching the attached screenshot */
          <motion.div
            key="special-card-view"
            className={styles.specialCardView}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.h1
              className={styles.specialTopText}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              You are so
            </motion.h1>

            <motion.h1
              className={styles.specialBottomText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              special
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
