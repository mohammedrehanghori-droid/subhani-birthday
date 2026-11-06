import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Opening from './components/Opening';
import BalloonStage from './components/BalloonStage';
import CandleStage from './components/CandleStage';
import Memories from './components/Memories';
import HeartMessage from './components/HeartMessage';
import FinalSurprise from './components/FinalSurprise';

const STAGES = ['opening', 'balloon', 'candle', 'memories', 'letter', 'final'];

const pageVariants = {
  initial: { opacity: 0, y: 60, scale: 0.96 },
  animate: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -40, scale: 0.96, transition: { duration: 0.35, ease: 'easeIn' } },
};

export default function App() {
  const [stage, setStage] = useState('opening');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const advance = (next) => {
    setStage(next || STAGES[STAGES.indexOf(stage) + 1]);
  };

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio('/assets/audio/bg-music.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      // Seamlessly repeat even after completing
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  // Start background music on first user interaction
  const startAudio = () => {
    const audio = getAudio();
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleAudio = (e) => {
    if (e) e.stopPropagation();
    const audio = getAudio();
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const handler = () => startAudio();
    window.addEventListener('pointerdown', handler, { once: true });
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--pink-bg)' }}>
      {/* Floating Corner Music / Play Button */}
      <motion.button
        id="global-music-btn"
        onClick={toggleAudio}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        title={isPlaying ? "Pause music" : "Play music"}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1.5px solid rgba(255, 182, 193, 0.7)',
          boxShadow: '0 4px 14px rgba(180, 50, 80, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          outline: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span style={{
          fontSize: isPlaying ? '1.15rem' : '1.05rem',
          marginLeft: isPlaying ? '0px' : '2px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}>
          {isPlaying ? '🎵' : '▶'}
        </span>
      </motion.button>

      <AnimatePresence mode="wait">
        {stage === 'opening' && (
          <motion.div key="opening" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <Opening onNext={() => advance('balloon')} />
          </motion.div>
        )}
        {stage === 'balloon' && (
          <motion.div key="balloon" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <BalloonStage onNext={() => advance('candle')} />
          </motion.div>
        )}
        {stage === 'candle' && (
          <motion.div key="candle" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <CandleStage onNext={() => advance('memories')} />
          </motion.div>
        )}
        {stage === 'memories' && (
          <motion.div key="memories" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <Memories onNext={() => advance('letter')} onBack={() => setStage('candle')} />
          </motion.div>
        )}
        {stage === 'letter' && (
          <motion.div key="letter" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <HeartMessage onNext={() => advance('final')} />
          </motion.div>
        )}
        {stage === 'final' && (
          <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ position: 'absolute', inset: 0 }}>
            <FinalSurprise onReplay={() => setStage('opening')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
