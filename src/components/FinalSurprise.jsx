import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './FinalSurprise.module.css';

// Confetti burst
const CONFETTI_COLORS = ['#FF9AC1','#FFD700','#87CEEB','#98FB98','#DDA0DD','#FF6B9D','#FFC0CB','#B0E0E6'];

const FINAL_CONFETTI_PIECES = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${((i * 7.3 + 5) % 96)}%`,
  size: `${6 + (i % 5) * 1.5}px`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  borderRadius: i % 2 === 0 ? '50%' : '2px',
  rotate: i % 2 === 0 ? 540 : -540,
  duration: 2.5 + (i % 5) * 0.4,
  delay: (i * 0.08) % 1.2,
}));

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div className={styles.confettiField} aria-hidden>
      {FINAL_CONFETTI_PIECES.map((piece) => {
        return (
          <motion.div
            key={piece.id}
            className={styles.confettiPiece}
            style={{
              left: piece.left,
              top: '-10px',
              width: piece.size,
              height: piece.size,
              background: piece.color,
              borderRadius: piece.borderRadius,
            }}
            animate={{
              y: ['0px', '110vh'],
              rotate: [0, piece.rotate],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}

// Gift Box SVG for Screenshot 1
function GiftBox({ shaking, onClick }) {
  return (
    <motion.div
      className={styles.giftWrapper}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      animate={shaking ? {
        rotate: [0, -8, 8, -8, 8, 0],
        scale: [1, 1.1, 1.05, 1.1, 1],
      } : {
        y: [0, -8, 0],
      }}
      transition={shaking ? { duration: 0.5 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {/* Glow */}
        <circle cx="60" cy="65" r="45" fill="#FFB6C1" opacity="0.3" />
        {/* Box Base */}
        <rect x="25" y="45" width="70" height="55" rx="8" fill="#FF9AC1" stroke="#E91E8C" strokeWidth="2.5" />
        <rect x="25" y="45" width="70" height="18" rx="4" fill="#FFB6C1" stroke="#E91E8C" strokeWidth="2" />
        {/* Box Lid */}
        <rect x="20" y="38" width="80" height="14" rx="5" fill="#FFAEC9" stroke="#E91E8C" strokeWidth="2.5" />
        {/* Ribbon Vertical */}
        <rect x="53" y="38" width="14" height="62" fill="#FFF0F5" stroke="#E91E8C" strokeWidth="1.5" />
        {/* Ribbon Horizontal */}
        <rect x="25" y="62" width="70" height="12" fill="#FFF0F5" stroke="#E91E8C" strokeWidth="1.5" />
        {/* Bow Left */}
        <ellipse cx="44" cy="30" rx="14" ry="10" fill="#FFF0F5" stroke="#E91E8C" strokeWidth="2" transform="rotate(-20 44 30)" />
        {/* Bow Right */}
        <ellipse cx="76" cy="30" rx="14" ry="10" fill="#FFF0F5" stroke="#E91E8C" strokeWidth="2" transform="rotate(20 76 30)" />
        {/* Bow Center Knot */}
        <circle cx="60" cy="34" r="6" fill="#FF69B4" stroke="#E91E8C" strokeWidth="2" />
        {/* Sparkles */}
        <circle cx="22" cy="28" r="3" fill="#FFD700" />
        <circle cx="98" cy="42" r="2.5" fill="#FFD700" />
        <circle cx="90" cy="85" r="3" fill="#FFD700" />
      </svg>
    </motion.div>
  );
}

// Bear + Bunny SVG characters for Screenshot 3 (Line Friends style, no bouquet)
function FinalCharacters() {
  return (
    <div className={styles.characters}>
      {/* Bunny with gentle sway */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="95" height="120" viewBox="0 0 90 120" fill="none">
          {/* Long ears */}
          <ellipse cx="30" cy="20" rx="9" ry="22" fill="white" stroke="#ddd" strokeWidth="1.5"/>
          <ellipse cx="30" cy="20" rx="5" ry="16" fill="#ffb6c1"/>
          <ellipse cx="60" cy="20" rx="9" ry="22" fill="white" stroke="#ddd" strokeWidth="1.5"/>
          <ellipse cx="60" cy="20" rx="5" ry="16" fill="#ffb6c1"/>
          {/* Body */}
          <ellipse cx="45" cy="85" rx="28" ry="30" fill="white" stroke="#eee" strokeWidth="1.5"/>
          {/* Head */}
          <circle cx="45" cy="54" r="26" fill="white" stroke="#eee" strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="37" cy="50" r="5" fill="#222"/>
          <circle cx="53" cy="50" r="5" fill="#222"/>
          <circle cx="38" cy="49" r="1.8" fill="white"/>
          <circle cx="54" cy="49" r="1.8" fill="white"/>
          {/* Nose */}
          <ellipse cx="45" cy="57" rx="3.5" ry="2.5" fill="#FF9AC1"/>
          {/* Mouth */}
          <path d="M40 60 Q45 65 50 60" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Blush */}
          <ellipse cx="30" cy="57" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
          <ellipse cx="60" cy="57" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
          {/* Party hat */}
          <polygon points="45,28 34,50 56,50" fill="#FF9AC1"/>
          <circle cx="45" cy="28" r="3" fill="#FFD700"/>
          {/* Cake the bunny holds */}
          <rect x="34" y="80" width="22" height="18" rx="4" fill="#c0392b"/>
          {[36,41,46,51].map((x, i) => (
            <ellipse key={i} cx={x} cy="80" rx="2.5" ry="3" fill="white" opacity="0.9"/>
          ))}
          <rect x="38" y="74" width="14" height="8" rx="3" fill="#e74c3c"/>
          <line x1="45" y1="68" x2="45" y2="76" stroke="#333" strokeWidth="1"/>
          <ellipse cx="45" cy="66" rx="4" ry="5" fill="#FFD700" opacity="0.85"/>
        </svg>
      </motion.div>

      {/* Brown Bear with gentle sway */}
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <svg width="95" height="120" viewBox="0 0 90 120" fill="none">
          {/* Ears */}
          <circle cx="22" cy="30" r="14" fill="#8B4513"/>
          <circle cx="22" cy="30" r="9" fill="#A0522D"/>
          <circle cx="68" cy="30" r="14" fill="#8B4513"/>
          <circle cx="68" cy="30" r="9" fill="#A0522D"/>
          {/* Body */}
          <ellipse cx="45" cy="88" rx="28" ry="30" fill="#A0522D"/>
          {/* Tummy */}
          <ellipse cx="45" cy="90" rx="16" ry="18" fill="#CD853F"/>
          {/* Head */}
          <circle cx="45" cy="56" r="26" fill="#CD853F"/>
          {/* Muzzle */}
          <ellipse cx="45" cy="63" rx="14" ry="10" fill="#D2691E"/>
          {/* Eyes */}
          <circle cx="37" cy="51" r="5" fill="#fff"/>
          <circle cx="53" cy="51" r="5" fill="#fff"/>
          <circle cx="37" cy="52" r="3" fill="#111"/>
          <circle cx="53" cy="52" r="3" fill="#111"/>
          <circle cx="38" cy="51" r="1" fill="#fff"/>
          <circle cx="54" cy="51" r="1" fill="#fff"/>
          {/* Nose */}
          <ellipse cx="45" cy="60" rx="5" ry="3.5" fill="#5c1a00"/>
          {/* Mouth */}
          <path d="M40 65 Q45 70 50 65" stroke="#5c1a00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Blush */}
          <ellipse cx="30" cy="62" rx="6" ry="4" fill="#FF9999" opacity="0.5"/>
          <ellipse cx="60" cy="62" rx="6" ry="4" fill="#FF9999" opacity="0.5"/>
          {/* Party hat */}
          <polygon points="45,30 34,52 56,52" fill="#87CEEB"/>
          <circle cx="45" cy="30" r="3" fill="#FFD700"/>
          {/* Gift box bear holds */}
          <rect x="30" y="92" width="30" height="22" rx="4" fill="#e91e8c"/>
          <rect x="30" y="92" width="30" height="7" rx="2" fill="#c0006c"/>
          {/* Ribbon */}
          <line x1="45" y1="92" x2="45" y2="114" stroke="#FFD700" strokeWidth="2"/>
          <line x1="30" y1="98" x2="60" y2="98" stroke="#FFD700" strokeWidth="2"/>
          <circle cx="45" cy="92" r="4" fill="#FFD700"/>
        </svg>
      </motion.div>
    </div>
  );
}

export default function FinalSurprise({ onReplay }) {
  const [stageState, setStageState] = useState('gift_prompt'); // 'gift_prompt' | 'countdown' | 'final_card'
  const [countdownNum, setCountdownNum] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleGiftClick = () => {
    if (stageState !== 'gift_prompt') return;
    setShaking(true);
    setStageState('countdown');
    setCountdownNum(3);

    // Countdown sequence: 3 -> 2 -> 1 -> Reveal Final Card
    setTimeout(() => {
      setCountdownNum(2);
      setTimeout(() => {
        setCountdownNum(1);
        setTimeout(() => {
          setStageState('final_card');
          setConfetti(true);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className={styles.screen}>
      <Confetti active={confetti} />

      {/* Background floating hearts */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="float-heart" style={{
          left: `${5 + i * 12}%`, top: `${5 + (i % 4) * 20}%`,
          animationDelay: `${i * 0.3}s`, fontSize: `${0.9 + (i % 3) * 0.4}rem`,
        }}>🩷</div>
      ))}

      {/* PHASE 1: "One Last Thing..." + Gift box (Screenshot 1) */}
      <AnimatePresence mode="wait">
        {(stageState === 'gift_prompt' || stageState === 'countdown') && (
          <motion.div
            key="gift-screen"
            className={styles.giftScreenContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.oneLastThingTitle}>One Last Thing...</h2>
            <p className={styles.tapGiftSubtitle}>Tap the gift</p>

            <GiftBox shaking={shaking} onClick={handleGiftClick} />

            {/* Countdown animation 3, 2, 1 */}
            {stageState === 'countdown' && countdownNum !== null && (
              <motion.div
                key={countdownNum}
                className={styles.countdownNumber}
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: [0.3, 1.4, 1], opacity: 1 }}
                exit={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {countdownNum}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* PHASE 2: Final Character Card + Love Message (Screenshot 3) */}
        {stageState === 'final_card' && (
          <motion.div
            key="final-screen"
            className={styles.finalScreenContent}
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 170, damping: 14 }}
          >
            {/* Main Character Card */}
            <div className={styles.card}>
              {/* Heart badge at top right corner (Screenshot 3) */}
              <div className={styles.heartBadge}>💗</div>

              {/* Characters */}
              <FinalCharacters />
            </div>

            {/* Message below card (Screenshot 3) */}
            <motion.div
              className={styles.loveBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className={styles.loveText}>
                {birthdayData.finalLove}
              </p>
              <p className={styles.wishText}>
                Once again, Happy Birthday<br />{birthdayData.name}!
              </p>

              {/* Replay button */}
              <motion.button
                id="replay-btn"
                className={styles.replayBtn}
                onClick={onReplay}
                whileTap={{ scale: 0.94 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 14 }}
              >
                ↺ Replay
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
