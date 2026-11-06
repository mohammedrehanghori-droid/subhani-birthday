import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './Opening.module.css';

// Confetti colors matching reference pastel palette
const CONFETTI_COLORS = ['#FF9AC1','#FFD700','#87CEEB','#98FB98','#DDA0DD','#FF6B9D','#FFC0CB','#B0E0E6'];

const STATIC_CONFETTI_PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${((i * 3.7 + 12) % 100)}%`,
  delay: `${(i * 0.12) % 3}s`,
  duration: `${3.5 + (i % 5) * 0.5}s`,
  size: `${6 + (i % 4) * 2}px`,
  shape: i % 2 === 0 ? '50%' : '2px',
}));

function Confetti() {
  return (
    <>
      {STATIC_CONFETTI_PIECES.map((p) => {
        return (
          <div
            key={p.id}
            className="confetti-particle"
            style={{
              left: p.left,
              top: '-10px',
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.shape,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        );
      })}
    </>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${8 + i * 11}%`,
    top: `${10 + (i % 3) * 25}%`,
    delay: `${i * 0.5}s`,
    duration: `${2.5 + i * 0.3}s`,
    size: `${0.9 + (i % 3) * 0.4}rem`,
  }));
  return (
    <>
      {hearts.map(h => (
        <div
          key={h.id}
          className="float-heart"
          style={{
            left: h.left, top: h.top,
            animationDuration: h.duration,
            animationDelay: h.delay,
            fontSize: h.size,
          }}
        >🩷</div>
      ))}
    </>
  );
}

// Panda + Bear SVG characters (matching the reference) with idle floating/breathing animation
function PandaBearChar() {
  return (
    <div className={styles.characterArea}>
      {/* Bunting flags with sway */}
      <motion.div
        className={styles.bunting}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {['#FF9AC1','#87CEEB','#98FB98','#DDA0DD','#FFD700','#FF9AC1','#87CEEB'].map((c, i) => (
          <motion.div
            key={i}
            className={styles.flag}
            style={{ background: c }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className={styles.characters}>
        {/* Brown Bear with gentle floating motion */}
        <motion.div
          className={styles.bear}
          animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
            {/* ears */}
            <circle cx="18" cy="28" r="13" fill="#A0522D"/>
            <circle cx="18" cy="28" r="8" fill="#CD853F"/>
            <circle cx="72" cy="28" r="13" fill="#A0522D"/>
            <circle cx="72" cy="28" r="8" fill="#CD853F"/>
            {/* body */}
            <ellipse cx="45" cy="80" rx="30" ry="28" fill="#A0522D"/>
            {/* head */}
            <circle cx="45" cy="45" r="30" fill="#CD853F"/>
            {/* face */}
            <ellipse cx="45" cy="52" rx="16" ry="10" fill="#D2691E"/>
            {/* eyes */}
            <circle cx="36" cy="39" r="5" fill="#fff"/>
            <circle cx="54" cy="39" r="5" fill="#fff"/>
            <circle cx="37" cy="40" r="3" fill="#2c1810"/>
            <circle cx="55" cy="40" r="3" fill="#2c1810"/>
            <circle cx="38" cy="39" r="1" fill="#fff"/>
            <circle cx="56" cy="39" r="1" fill="#fff"/>
            {/* nose */}
            <ellipse cx="45" cy="49" rx="5" ry="3.5" fill="#8B4513"/>
            {/* mouth */}
            <path d="M40 54 Q45 59 50 54" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* blush */}
            <ellipse cx="30" cy="50" rx="6" ry="4" fill="#FF9999" opacity="0.5"/>
            <ellipse cx="60" cy="50" rx="6" ry="4" fill="#FF9999" opacity="0.5"/>
            {/* party hat */}
            <polygon points="45,8 32,32 58,32" fill="#FF9AC1"/>
            <polygon points="45,8 32,32 58,32" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,2"/>
            <circle cx="45" cy="8" r="3" fill="#FFD700"/>
            {/* tummy */}
            <ellipse cx="45" cy="80" rx="16" ry="14" fill="#D2691E"/>
            {/* arms */}
            <ellipse cx="18" cy="78" rx="10" ry="14" fill="#A0522D" transform="rotate(-15 18 78)"/>
            <ellipse cx="72" cy="78" rx="10" ry="14" fill="#A0522D" transform="rotate(15 72 78)"/>
          </svg>
        </motion.div>

        {/* Birthday Cake between them */}
        <motion.div
          className={styles.cakeBetween}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        >
          <svg width="64" height="72" viewBox="0 0 64 72" fill="none">
            {/* plate */}
            <ellipse cx="32" cy="65" rx="30" ry="5" fill="#eee"/>
            {/* bottom tier */}
            <rect x="6" y="42" width="52" height="22" rx="6" fill="#e91e8c"/>
            {/* text on cake */}
            <text x="32" y="57" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="Nunito">HAPPY</text>
            <text x="32" y="64" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" fontFamily="Nunito">BIRTHDAY</text>
            {/* top tier */}
            <rect x="14" y="24" width="36" height="20" rx="5" fill="#ff6fb0"/>
            {/* icing drips */}
            {[16,22,28,34,40,44].map((x,i) => (
              <ellipse key={i} cx={x} cy="24" rx="3.5" ry="4" fill="white" opacity="0.9"/>
            ))}
            {[16,22,30,38,44].map((x,i) => (
              <ellipse key={i} cx={x} cy="42" rx="3.5" ry="4" fill="white" opacity="0.9"/>
            ))}
            {/* candle flame flicker */}
            <rect x="29" y="14" width="6" height="12" rx="2" fill="#e91e63"/>
            <motion.ellipse
              cx="32" cy="11" rx="7" ry="8" fill="#FFD700" opacity="0.9"
              animate={{ scale: [1, 1.15, 0.95, 1.1, 1], y: [0, -1, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <motion.ellipse
              cx="32" cy="13" rx="4" ry="5" fill="#FF8C00" opacity="0.8"
              animate={{ scale: [1, 1.2, 0.9, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <line x1="32" y1="14" x2="32" y2="18" stroke="#fff" strokeWidth="1"/>
          </svg>
        </motion.div>

        {/* White Panda with gentle floating motion */}
        <motion.div
          className={styles.panda}
          animate={{ y: [0, -8, 0], rotate: [1.5, -1.5, 1.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        >
          <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
            {/* ears */}
            <circle cx="18" cy="28" r="13" fill="#222"/>
            <circle cx="18" cy="28" r="7" fill="#444"/>
            <circle cx="72" cy="28" r="13" fill="#222"/>
            <circle cx="72" cy="28" r="7" fill="#444"/>
            {/* body */}
            <ellipse cx="45" cy="80" rx="30" ry="28" fill="#f5f5f5"/>
            {/* head */}
            <circle cx="45" cy="45" r="30" fill="#fff"/>
            {/* eye patches */}
            <ellipse cx="34" cy="38" rx="10" ry="8" fill="#222" transform="rotate(-10 34 38)"/>
            <ellipse cx="56" cy="38" rx="10" ry="8" fill="#222" transform="rotate(10 56 38)"/>
            {/* eyes */}
            <circle cx="34" cy="39" r="5" fill="#fff"/>
            <circle cx="56" cy="39" r="5" fill="#fff"/>
            <circle cx="34" cy="40" r="3" fill="#111"/>
            <circle cx="56" cy="40" r="3" fill="#111"/>
            <circle cx="35" cy="39" r="1" fill="#fff"/>
            <circle cx="57" cy="39" r="1" fill="#fff"/>
            {/* muzzle */}
            <ellipse cx="45" cy="52" rx="14" ry="9" fill="#f0f0f0"/>
            {/* nose */}
            <ellipse cx="45" cy="49" rx="4" ry="2.5" fill="#333"/>
            {/* mouth */}
            <path d="M40 54 Q45 59 50 54" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* blush */}
            <ellipse cx="28" cy="51" rx="6" ry="4" fill="#FF9AC1" opacity="0.5"/>
            <ellipse cx="62" cy="51" rx="6" ry="4" fill="#FF9AC1" opacity="0.5"/>
            {/* party hat */}
            <polygon points="45,8 32,32 58,32" fill="#87CEEB"/>
            <polygon points="45,8 32,32 58,32" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,2"/>
            <circle cx="45" cy="8" r="3" fill="#FFD700"/>
            {/* tummy patch */}
            <ellipse cx="45" cy="80" rx="16" ry="14" fill="#eee"/>
            {/* arms */}
            <ellipse cx="18" cy="78" rx="10" ry="14" fill="#333" transform="rotate(-15 18 78)"/>
            <ellipse cx="72" cy="78" rx="10" ry="14" fill="#333" transform="rotate(15 72 78)"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export default function Opening({ onNext }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [yesPressed, setYesPressed] = useState(false);
  const noRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [showChar, setShowChar] = useState(false);
  const [showBtns, setShowBtns] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 200);
    const t2 = setTimeout(() => setShowChar(true), 600);
    const t3 = setTimeout(() => setShowBtns(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const runNo = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = noRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();

    const maxDeltaX = Math.min(120, parentRect.width / 2 - 40);
    const maxDeltaY = 70;

    const dx = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * maxDeltaX);
    const dy = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * maxDeltaY);
    const randomRot = (Math.random() - 0.5) * 20;

    const currentX = noPos.x || 0;
    const currentY = noPos.y || 0;

    let targetX = currentX + dx;
    let targetY = currentY + dy;

    // Keep within parent boundaries
    if (targetX > parentRect.width / 2 - 40) targetX = -parentRect.width / 4;
    if (targetX < -parentRect.width / 2 + 40) targetX = parentRect.width / 4;
    if (targetY > 80) targetY = -60;
    if (targetY < -80) targetY = 60;

    setNoPos({ x: targetX, y: targetY, rotate: randomRot });
  }, [noPos]);

  const handleYesClick = () => {
    if (yesPressed) return;
    setYesPressed(true);
    // Short anticipation press delay before scene exit
    setTimeout(() => {
      onNext();
    }, 280);
  };

  return (
    <div className={styles.screen}>
      <Confetti />
      <FloatingHearts />

      <div className={styles.content}>
        <AnimatePresence>
          {showTitle && (
            <motion.div
              className={styles.titleBlock}
              initial={{ opacity: 0, y: -30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className={styles.title}>{birthdayData.openingTitle}</h1>
              <h1 className={styles.titleName}>{birthdayData.openingName}</h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 180, damping: 14 }}
            >
              <PandaBearChar />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBtns && (
            <motion.div
              className={styles.bottomBlock}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.question}>{birthdayData.openingQuestion}</p>
              <div className={styles.btnRow} style={{ position: 'relative', minHeight: '60px' }}>
                <motion.button
                  id="yes-btn"
                  className={styles.yesBtn}
                  onClick={handleYesClick}
                  animate={yesPressed ? { scale: [1, 0.9, 1.08, 1], boxShadow: '0 0 25px rgba(233,30,140,0.7)' } : {}}
                  transition={{ duration: 0.28 }}
                  whileTap={{ scale: 0.92 }}
                >
                  Yes 💕
                </motion.button>

                <motion.button
                  id="no-btn"
                  ref={noRef}
                  className={styles.noBtn}
                  animate={{ x: noPos.x, y: noPos.y, rotate: noPos.rotate }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  onMouseEnter={runNo}
                  onTouchStart={runNo}
                  onClick={runNo}
                >
                  No 🙈
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
