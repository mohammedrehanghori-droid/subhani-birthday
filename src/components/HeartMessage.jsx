import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './HeartMessage.module.css';

// Typewriter hook
function useTypewriter(text, speed = 28, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

export default function HeartMessage({ onNext }) {
  const [phase, setPhase] = useState('envelope'); // envelope | opening | letter
  const [isSkipped, setIsSkipped] = useState(false);
  const { displayed, done: typeDone } = useTypewriter(
    birthdayData.letter,
    16,
    phase === 'letter' ? 0 : 99999
  );

  const handleEnvelopeClick = () => {
    if (phase === 'envelope') setPhase('opening');
    setTimeout(() => setPhase('letter'), 900);
  };

  const textToDisplay = isSkipped ? birthdayData.letter : displayed;
  const isFinished = typeDone || isSkipped;

  return (
    <div className={styles.screen}>
      {/* Floating hearts */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="float-heart" style={{
          left: `${8 + i * 20}%`, top: `${8 + (i % 3) * 20}%`,
          animationDelay: `${i * 0.4}s`, fontSize: '1rem',
        }}>🩷</div>
      ))}

      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {birthdayData.letterTitle}
      </motion.h2>

      {/* Elegant Envelope matching Screenshot 1 (No extra sparkles or side images) */}
      <AnimatePresence mode="wait">
        {(phase === 'envelope' || phase === 'opening') && (
          <motion.div
            key="envelope"
            className={styles.envelopeWrap}
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{
              scale: 1, opacity: 1,
              y: phase === 'envelope' ? [0, -6, 0] : 0
            }}
            exit={{ scale: 0.85, opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }}
            transition={phase === 'envelope'
              ? { y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }, scale: { duration: 0.6, type: 'spring', stiffness: 180 } }
              : { duration: 0.4 }
            }
            whileTap={{ scale: 0.96 }}
            onClick={handleEnvelopeClick}
          >
            <div className={styles.envelopeContainer}>
              <svg width="280" height="190" viewBox="0 0 280 190" className={styles.envelopeSvg}>
                <defs>
                  {/* Metallic Gold Gradient */}
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D77F" />
                    <stop offset="50%" stopColor="#C9972C" />
                    <stop offset="100%" stopColor="#E5C158" />
                  </linearGradient>

                  {/* Cream Body Fill */}
                  <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF8" />
                    <stop offset="100%" stopColor="#F7F1E5" />
                  </linearGradient>

                  {/* Pink Flap Fill matching Screenshot 1 */}
                  <linearGradient id="pinkFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F8ACB9" />
                    <stop offset="100%" stopColor="#EE91A3" />
                  </linearGradient>
                </defs>

                {/* Base Cream Envelope Body */}
                <rect x="6" y="6" width="268" height="178" rx="8" fill="url(#creamGrad)" stroke="url(#goldGrad)" strokeWidth="3" />

                {/* Fold lines */}
                <path d="M6,184 L105,100 M274,184 L175,100" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

                {/* Smooth V-Flap with Gold Border (Flips open on tap) */}
                <path
                  d="M6,6 Q140,118 274,6 Z"
                  fill="url(#pinkFlapGrad)"
                  stroke="url(#goldGrad)"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className={`${styles.svgFlap} ${phase === 'opening' ? styles.svgFlapOpen : ''}`}
                />
              </svg>

              <p className={styles.envelopeHint}>
                {phase === 'envelope' ? 'Tap to open ✉️' : 'Opening...'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Letter Paper */}
        {phase === 'letter' && (
          <motion.div
            key="letter"
            className={styles.letterWrap}
            initial={{ scale: 0.75, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.65, type: 'spring', stiffness: 170, damping: 15 }}
          >
            <div className={styles.letter} onClick={() => setIsSkipped(true)}>
              {/* Typewriter text */}
              <div className={styles.letterText}>
                {textToDisplay.split('\n').map((line, i) => (
                  <span key={i}>
                    {line || '\u00A0'}
                    <br />
                  </span>
                ))}
                {!isFinished && <span className={styles.cursor}>|</span>}
              </div>
            </div>

            {/* Continue button */}
            <AnimatePresence>
              {isFinished && (
                <motion.button
                  id="letter-continue-btn"
                  className={styles.continueBtn}
                  onClick={onNext}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
                  whileTap={{ scale: 0.94 }}
                >
                  One Last Surprise ✨
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
