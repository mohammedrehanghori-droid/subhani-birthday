import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BalloonStage.module.css';

const BALLOON_CONFIG = [
  {
    id: 0,
    shine: '#EBF8FF',
    color: '#63B3ED',
    accent: '#3182CE',
    ribbonColor: '#4299E1',
    darkRibbon: '#2B6CB0',
    x: '10%',
    top: '15px',
    word: 'You',
    label: 'blue',
  },
  {
    id: 1,
    shine: '#FFF5F7',
    color: '#F687B3',
    accent: '#ED64A6',
    ribbonColor: '#F687B3',
    darkRibbon: '#D53F8C',
    x: '53%',
    top: '15px',
    word: 'are',
    label: 'pink',
  },
  {
    id: 2,
    shine: '#F0FFF4',
    color: '#68D391',
    accent: '#38A169',
    ribbonColor: '#48BB78',
    darkRibbon: '#2F855A',
    x: '10%',
    top: '205px',
    word: 'so',
    label: 'green',
  },
  {
    id: 3,
    shine: '#FAF5FF',
    color: '#B794F4',
    accent: '#805AD5',
    ribbonColor: '#9F7AEA',
    darkRibbon: '#6B46C1',
    x: '53%',
    top: '205px',
    word: 'special',
    label: 'purple',
  },
];

const CONFETTI_COLORS = ['#F687B3', '#F6AD55', '#68D391', '#B794F4', '#ECC94B', '#ED64A6', '#63B3ED'];

// Ultra-Shiny 3D Glassmorphism Balloon SVG matching exact reference screenshot
function ShinyGlassBalloonSVG({ config }) {
  const { color, shine, accent, ribbonColor, darkRibbon } = config;
  const gradId = `sphere-${config.id}`;
  const glossId = `gloss-${config.id}`;
  const rimGradId = `rim-${config.id}`;

  return (
    <svg width="135" height="185" viewBox="0 0 135 185" className={styles.balloonSvg}>
      <defs>
        {/* Multi-stop Glass Sphere Radial Gradient */}
        <radialGradient id={gradId} cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="20%" stopColor={shine} stopOpacity="0.9" />
          <stop offset="55%" stopColor={color} stopOpacity="0.82" />
          <stop offset="85%" stopColor={accent} stopOpacity="0.88" />
          <stop offset="100%" stopColor={darkRibbon} stopOpacity="0.95" />
        </radialGradient>

        {/* Specular Glare Top-Left Gradient */}
        <linearGradient id={glossId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>

        {/* Bottom Backlight Rim Gradient */}
        <linearGradient id={rimGradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* String extending down */}
      <path
        d="M67 120 Q64 138 69 158 Q74 172 67 185"
        stroke={darkRibbon}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Main Shiny Glass Sphere Body */}
      <ellipse cx="67" cy="64" rx="50" ry="56" fill={`url(#${gradId})`} />

      {/* Inner Translucent Liquid Reflection Ring */}
      <ellipse cx="67" cy="64" rx="46" ry="52" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />

      {/* Glass Top-Left Curved Crescent Glare */}
      <path
        d="M 32 32 A 40 44 0 0 1 85 28 A 46 50 0 0 0 38 52 Z"
        fill={`url(#${glossId})`}
        opacity="0.85"
      />

      {/* Bright Specular Oval Spotlight Reflection */}
      <ellipse cx="44" cy="30" rx="15" ry="8" fill="#FFFFFF" opacity="0.8" transform="rotate(-28 44 30)" />

      {/* Bottom Right Curved Glass Rim Reflection */}
      <path
        d="M 85 88 A 46 50 0 0 1 45 114 A 48 52 0 0 0 95 82 Z"
        fill={`url(#${rimGradId})`}
        opacity="0.6"
      />

      {/* Knot at Base of Sphere */}
      <ellipse cx="67" cy="116" rx="7" ry="5" fill={darkRibbon} />

      {/* Center Tap Badge: White Circle with ✋ Icon */}
      <g transform="translate(67, 64)">
        <circle cx="0" cy="0" r="14" fill="#FFFFFF" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))" />
        <text x="0" y="4.5" textAnchor="middle" fontSize="13">✋</text>
      </g>

      {/* Satin Ribbon Bow & Flowing Ribbon Tails */}
      <g transform="translate(67, 117)">
        {/* Left Loop */}
        <path d="M0 0 C-20 -14 -30 2 -13 11 C-4 13 0 0 0 0 Z" fill={ribbonColor} stroke={darkRibbon} strokeWidth="0.8" />
        {/* Right Loop */}
        <path d="M0 0 C20 -14 30 2 13 11 C4 13 0 0 0 0 Z" fill={ribbonColor} stroke={darkRibbon} strokeWidth="0.8" />
        {/* Center Knot */}
        <ellipse cx="0" cy="2" rx="4.5" ry="4" fill={darkRibbon} />
        {/* Left Flowing Ribbon Tail */}
        <path d="M-2 4 C-13 18 -26 26 -20 42 C-15 50 -24 60 -28 68" stroke={ribbonColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M-2 4 C-13 18 -26 26 -20 42 C-15 50 -24 60 -28 68" stroke={darkRibbon} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.45" />
        {/* Right Flowing Ribbon Tail */}
        <path d="M2 4 C13 18 26 26 20 42 C15 50 24 60 28 68" stroke={ribbonColor} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M2 4 C13 18 26 26 20 42 C15 50 24 60 28 68" stroke={darkRibbon} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.45" />
      </g>
    </svg>
  );
}

function RevealedWord({ word, x, top }) {
  return (
    <motion.div
      className={styles.revealedWordWrap}
      style={{ left: x, top }}
      initial={{ opacity: 0, scale: 0.3, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.45, type: 'spring', stiffness: 240, damping: 14 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className={styles.revealedWordText}>{word}</span>
    </motion.div>
  );
}

// Synthesize realistic pop sound using Web Audio API
function playPopSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (err) {
    void err;
  }
}

function Balloon({ config, onPop, popped }) {
  const [animating, setAnimating] = useState(false);

  const handlePop = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (popped || animating) return;
    setAnimating(true);

    // Play synthesized pop sound
    playPopSound();

    setTimeout(() => onPop(config.id), 260);
  };

  // Independent floating parameters
  const floatDuration = 2.8 + config.id * 0.4;
  const swayX = (config.id % 2 === 0 ? 1 : -1) * (5 + config.id * 2);
  const rotDeg = (config.id % 2 === 0 ? 1 : -1) * 3;

  return (
    <>
      {!popped && (
        <motion.div
          className={styles.balloonWrap}
          style={{ left: config.x, top: config.top }}
          initial={{ opacity: 0, y: 60, scale: 0.6 }}
          animate={
            animating
              ? { scale: [1, 1.2, 0.85, 1.4, 0], opacity: [1, 1, 0.9, 0.7, 0] }
              : { opacity: 1, y: [0, -14, 0], x: [0, swayX, 0], rotate: [0, rotDeg, -rotDeg, 0], scale: 1 }
          }
          transition={
            animating
              ? { duration: 0.28, ease: [0.175, 0.885, 0.32, 1.275] }
              : {
                  y: { repeat: Infinity, duration: floatDuration, ease: 'easeInOut' },
                  x: { repeat: Infinity, duration: floatDuration * 1.2, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: floatDuration * 1.5, ease: 'easeInOut' },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                }
          }
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
          onClick={handlePop}
          onTouchStart={handlePop}
          whileTap={{ scale: 1.12 }}
        >
          <ShinyGlassBalloonSVG config={config} />

          {/* Satisfying Confetti & Sparkles Pop Explosion */}
          {animating && (
            <>
              <div className={styles.popRing} />
              <div className={styles.popParticles}>
                {[...Array(20)].map((_, i) => {
                  const angle = (i * 18) * (Math.PI / 180);
                  const dist = 60 + (i % 3) * 25;
                  const dx = `${Math.cos(angle) * dist}px`;
                  const dy = `${Math.sin(angle) * dist + (i % 2 === 0 ? 15 : -15)}px`;
                  const rot = `${(i * 45) % 360}deg`;
                  const bg = CONFETTI_COLORS[i % CONFETTI_COLORS.length];

                  return (
                    <div
                      key={i}
                      className={styles.confettiPiece}
                      style={{
                        '--dx': dx,
                        '--dy': dy,
                        '--rot': rot,
                        background: bg,
                      }}
                    />
                  );
                })}
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60 + 30) * (Math.PI / 180);
                  const dist = 45 + (i % 2) * 20;
                  const dx = `${Math.cos(angle) * dist}px`;
                  const dy = `${Math.sin(angle) * dist}px`;
                  return (
                    <div
                      key={`sp-${i}`}
                      className={styles.sparkleParticle}
                      style={{
                        '--dx': dx,
                        '--dy': dy,
                      }}
                    >
                      {i % 2 === 0 ? '✨' : '⭐'}
                    </div>
                  );
                })}
              </div>
            </>
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
    setPopped((prev) => {
      const next = new Set(prev);
      next.add(id);

      // When all 4 balloons pop: reveal full screen popup for 2.2 seconds, then continue
      if (next.size === total) {
        setTimeout(() => {
          setShowSpecialCard(true);
          setTimeout(() => {
            onNext();
          }, 2400);
        }, 600);
      }
      return next;
    });
  };

  return (
    <div className={styles.screen}>
      {/* Floating hearts background */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="float-heart" style={{
          left: `${10 + i * 15}%`, top: `${12 + (i % 3) * 25}%`,
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
              Pop all 4 balloons
            </motion.h2>

            <div className={styles.balloonGrid}>
              {BALLOON_CONFIG.map((cfg) => {
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
          /* Full screen "You are so ... special" Popup View */
          <motion.div
            key="special-card-view"
            className={styles.specialCardView}
            initial={{ opacity: 0, scale: 0.9 }}
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
              special ❤️
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
