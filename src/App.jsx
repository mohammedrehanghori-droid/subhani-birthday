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
  const audioRef = useRef(null);
  const audioStarted = useRef(false);

  const advance = (next) => {
    setStage(next || STAGES[STAGES.indexOf(stage) + 1]);
  };

  // Start background music on first user interaction
  const startAudio = () => {
    if (audioStarted.current) return;
    audioStarted.current = true;
    try {
      const audio = new Audio('/assets/audio/bg-music.mp3');
      audio.loop = true;
      audio.volume = 0.35;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } catch (_) {}
  };

  useEffect(() => {
    const handler = () => startAudio();
    window.addEventListener('pointerdown', handler, { once: true });
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  const goToFinal = () => setStage('final');

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--pink-bg)' }}>
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
            <Memories onNext={() => advance('letter')} />
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
