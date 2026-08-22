import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './CandleStage.module.css';

// ── Single-tier Cake Candle SVG matching Screenshot 1 ─────────────────────────
function Candle({ lit, flickerIntensity = 0, airflow = 0, smoke = false }) {
  return (
    <g>
      {/* Candle stick */}
      <rect x="47" y="24" width="6" height="32" rx="2" fill="#5C101D" />
      <rect x="48" y="24" width="2" height="32" rx="1" fill="#8B1D2E" opacity="0.6" />
      {/* Wick */}
      <line x1="50" y1="18" x2="50" y2="24" stroke="#222" strokeWidth="1.2" />

      {/* Flame */}
      {lit && (
        <motion.g
          animate={{
            rotate: airflow > 0 ? [-6 - airflow * 30, -3 - airflow * 20, -10 - airflow * 25] : [-1, 2, -1],
            scaleY: airflow > 0 ? [1 - airflow * 0.45, 0.85 - airflow * 0.35, 1 - airflow * 0.45] : [1, 1.08, 0.96, 1],
            scaleX: airflow > 0 ? [1.15 + airflow * 0.4, 1.05 + airflow * 0.3, 1.15] : [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 0.22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 20px' }}
        >
          {/* Flame Glow */}
          <circle cx="50" cy="14" r="14" fill="#FFC107" opacity="0.35" style={{ filter: 'blur(3px)' }} />
          {/* Outer flame */}
          <ellipse cx="50" cy="14" rx="5.5" ry="9.5" fill="#FF9800" />
          {/* Inner flame */}
          <ellipse cx="50" cy="15" rx="3.5" ry="6" fill="#FFD54F" />
          {/* Core */}
          <ellipse cx="50" cy="17" rx="1.8" ry="3" fill="#FFF" />
        </motion.g>
      )}

      {/* Rising Smoke puff after flame is extinguished */}
      {smoke && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx="50"
              cy="16"
              rx={3 + i * 2}
              ry={4 + i * 2}
              fill="#ddd"
              initial={{ opacity: 0.8, y: 0, scale: 0.6, x: 0 }}
              animate={{
                opacity: [0.8, 0.4, 0],
                y: -35 - i * 15,
                x: (i % 2 === 0 ? 1 : -1) * (8 + i * 6),
                scale: 2.2 + i * 0.5,
              }}
              transition={{ duration: 1.4, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}
        </g>
      )}
    </g>
  );
}

function BirthdayCake({ lit, flickerIntensity, airflow, smoke, dimmed = false }) {
  return (
    <svg width="240" height="200" viewBox="0 0 100 130" className={styles.cakeSvg} style={dimmed ? { filter: 'brightness(0.5) contrast(0.95)' } : {}}>
      {/* Plate (White Oval) */}
      <ellipse cx="50" cy="116" rx="46" ry="8" fill={dimmed ? '#8A7B7A' : '#EBEBEB'} />
      <ellipse cx="50" cy="115" rx="40" ry="6" fill={dimmed ? '#9E8E8D' : '#F7F7F7'} />

      {/* Cake Body (Chocolate Layer) */}
      <path
        d="M16 68 
           Q24 76 33 68 
           Q42 78 50 68 
           Q58 76 67 68 
           Q75 78 84 68
           L84 100
           Q50 112 16 100 Z"
        fill={dimmed ? '#2D160E' : '#4A2619'}
      />

      {/* Cream Frosting Layer (White Wavy Top Icing) */}
      <path
        d="M16 68 
           Q24 76 33 68 
           Q42 78 50 68 
           Q58 76 67 68 
           Q75 78 84 68
           L84 54
           Q50 42 16 54 Z"
        fill={dimmed ? '#9C9690' : '#FFFDF7'}
      />

      {/* Top Oval Cream Rim */}
      <ellipse cx="50" cy="53" rx="34" ry="11" fill={dimmed ? '#99938D' : '#FFFBF2'} />
      <ellipse cx="50" cy="54" rx="32" ry="9" fill={dimmed ? '#A19B95' : '#FFFDF8'} />

      {/* Candle */}
      <Candle lit={lit} flickerIntensity={flickerIntensity} airflow={airflow} smoke={smoke} />
    </svg>
  );
}

// ── Single Effort Blow Detection algorithm ──────────────────────────────────────
async function startMicDetection({ onLevel, onProgress, onBlow, onError }) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.2;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    let running = true;
    let frameCount = 0;
    let baselineSum = 0;
    let baselineAvg = 0.1; // Default ambient noise floor
    let blowScore = 0;
    const targetScore = 5;

    const tick = () => {
      if (!running) return;
      analyser.getByteFrequencyData(data);

      // Low frequency bins (0 to 14) catch wind turbulence when blowing into mic
      let lowSum = 0;
      const lowCount = Math.min(14, data.length);
      for (let i = 0; i < lowCount; i++) lowSum += data[i];
      const lowAvg = (lowSum / lowCount) / 255;

      // Ambient baseline calibration during initial 10 ticks (~150ms)
      if (frameCount < 10) {
        frameCount++;
        baselineSum += lowAvg;
        baselineAvg = baselineSum / frameCount;
        requestAnimationFrame(tick);
        return;
      }

      // Airflow intensity above room ambient baseline
      const relativeBlow = Math.max(0, lowAvg - baselineAvg);
      onLevel(relativeBlow * 2.5);

      // Single blow effort detection: fills progress 0% -> 100% smoothly in 1 effort!
      if (relativeBlow > 0.16 || lowAvg > 0.26) {
        blowScore += Math.max(1, relativeBlow * 6);
        const pct = Math.min(100, Math.round((blowScore / targetScore) * 100));
        onProgress(pct);

        if (blowScore >= targetScore) {
          running = false;
          onBlow();
          stream.getTracks().forEach(t => t.stop());
          ctx.close();
          return;
        }
      }
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      running = false;
      stream.getTracks().forEach(t => t.stop());
      ctx.close();
    };
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

export default function CandleStage({ onNext }) {
  const [phase, setPhase] = useState('idle'); // idle | listening | blown
  const [micLevel, setMicLevel] = useState(0);
  const [blowProgress, setBlowProgress] = useState(0);
  const [blown, setBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showWishScreen, setShowWishScreen] = useState(false);
  const stopMicRef = useRef(null);

  useEffect(() => {
    return () => { if (stopMicRef.current) stopMicRef.current(); };
  }, []);

  const triggerExtinguish = () => {
    if (blown) return;
    setBlown(true);
    setShowSmoke(true);
    setMicLevel(0);
    setBlowProgress(100);
    if (stopMicRef.current) stopMicRef.current();

    // Smoke rises -> show "Close your eyes & make a wish" screen for 5 seconds -> continue next
    setTimeout(() => {
      setShowSmoke(false);
      setShowWishScreen(true);
      setTimeout(onNext, 5000);
    }, 600);
  };

  const handlePillButtonClick = () => {
    if (blown) return;

    if (phase === 'idle') {
      // 1. First click: activate microphone listening
      setPhase('listening');
      startMicDetection({
        onLevel: (l) => setMicLevel(l),
        onProgress: (p) => setBlowProgress(p),
        onBlow: () => triggerExtinguish(),
        onError: () => {
          // If mic permissions denied, clicking acts as direct fallback
          triggerExtinguish();
        },
      }).then(stop => {
        stopMicRef.current = stop;
      });
    } else if (phase === 'listening') {
      // 2. Tapping button again while listening acts as direct fallback
      triggerExtinguish();
    }
  };

  const flickerIntensity = phase === 'listening' ? micLevel * 1.8 : 0;

  return (
    <div className={`${styles.screen} ${showWishScreen ? styles.screenDarkened : ''}`}>
      {/* Floating hearts */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="float-heart" style={{ left: `${12 + i * 18}%`, top: `${10 + (i%3)*22}%`, animationDelay: `${i*0.4}s` }}>🩷</div>
      ))}

      <AnimatePresence mode="wait">
        {!showWishScreen ? (
          <motion.div
            key="candle-lit-view"
            className={styles.stageContent}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {birthdayData.candleTitle}
            </motion.h2>

            {/* Cake Container */}
            <motion.div
              className={styles.cakeArea}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 180, damping: 14 }}
            >
              <BirthdayCake lit={!blown} flickerIntensity={flickerIntensity} airflow={micLevel} smoke={showSmoke} />
            </motion.div>

            {/* Clean Pill Button matching Screenshot 1 with Progress Load Fill */}
            <div className={styles.actionArea}>
              {!blown && (
                <motion.button
                  id="blow-mic-btn"
                  className={styles.pillButton}
                  onClick={handlePillButtonClick}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Progress load fill bar */}
                  {phase === 'listening' && (
                    <div
                      className={styles.pillProgressFill}
                      style={{ width: `${blowProgress}%` }}
                    />
                  )}

                  <span className={styles.windIcon}>
                    {phase === 'listening' ? (blowProgress > 0 ? '💨' : '🎤') : '💨'}
                  </span>
                  <span className={styles.pillText}>
                    {phase === 'listening'
                      ? blowProgress > 0
                        ? `Blowing... ${blowProgress}%`
                        : 'Listening... Blow into mic!'
                      : 'Blow into the mic'}
                  </span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Full screen "Close your eyes & make a wish" view matching attached screenshot */
          <motion.div
            key="wish-screen-view"
            className={styles.wishScreenView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Dimmed Cake in background */}
            <div className={styles.dimmedCakeArea}>
              <BirthdayCake lit={false} flickerIntensity={0} airflow={0} smoke={false} dimmed={true} />
            </div>

            {/* Overlay Text across the cake center */}
            <div className={styles.wishTextOverlay}>
              <motion.h1
                className={styles.wishMainText}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Close your eyes<br />& make a wish
              </motion.h1>
            </div>

            {/* Bottom Pink Text */}
            <motion.p
              className={styles.wishBottomText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Make a wish...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
