import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import styles from './Memories.module.css';

const PLACEHOLDER_GRADIENT = [
  'linear-gradient(135deg, #ffd6e8 0%, #ffc0d4 100%)',
  'linear-gradient(135deg, #d6eeff 0%, #c0d4f8 100%)',
  'linear-gradient(135deg, #d6ffe8 0%, #b0f0cc 100%)',
  'linear-gradient(135deg, #f0d6ff 0%, #ddb0f8 100%)',
];

const PLACEHOLDER_EMOJI = ['🌟', '❤️', '✨', '🎊'];

function PhotoCard({ photo, index, total, isActive, onNext, onPrev, onClickCard }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.3, 0.7, 1, 0.7, 0.3]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60) onNext();
    else if (info.offset.x > 60) onPrev();
    else x.set(0);
  };

  return (
    <motion.div
      className={styles.cardWrap}
      style={{ x, rotate, opacity, zIndex: isActive ? 10 : 5 }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
      dragElastic={0.4}
      onClick={onClickCard}
      whileTap={{ scale: 0.96 }}
    >
      <div className={styles.card}>
        {/* Photo / placeholder */}
        <div className={styles.photoFrame}>
          <img
            src={photo.src}
            alt={photo.caption}
            className={styles.photo}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div
            className={styles.placeholder}
            style={{ background: PLACEHOLDER_GRADIENT[index % PLACEHOLDER_GRADIENT.length], display: 'none' }}
          >
            <span className={styles.placeholderEmoji}>{PLACEHOLDER_EMOJI[index % PLACEHOLDER_EMOJI.length]}</span>
            <p className={styles.placeholderText}>Photo {index + 1}</p>
            <p className={styles.placeholderSub}>Add your photo to<br/>/public/assets/photos/photo{index + 1}.jpg</p>
          </div>
        </div>
        {/* Caption */}
        <p className={styles.caption}>{photo.caption}</p>
      </div>
    </motion.div>
  );
}

export default function Memories({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const photos = birthdayData.photos;
  const total = photos.length;

  const goNext = () => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };
  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  };

  const handleCardClick = () => {
    goNext();
  };

  const cardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 320 : dir < 0 ? -320 : 0,
      y: dir === 0 ? 30 : 0,
      opacity: 0,
      scale: 0.88,
      rotate: dir > 0 ? 10 : dir < 0 ? -10 : 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -320 : 320,
      opacity: 0,
      scale: 0.88,
      rotate: dir > 0 ? -12 : 12,
      transition: { duration: 0.38, ease: [0.32, 0, 0.67, 0] },
    }),
  };

  return (
    <div className={styles.screen}>
      {/* Floating hearts */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="float-heart" style={{
          left: `${8 + i * 18}%`, top: `${8 + (i % 3) * 20}%`,
          fontSize: '1rem', animationDelay: `${i * 0.35}s`,
        }}>🩷</div>
      ))}

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>{birthdayData.memoriesTitle}</h2>
      </motion.div>

      {/* Card stack */}
      <div className={styles.cardArea}>
        {/* Background cards (stack effect) */}
        {[2, 1].map(offset => {
          const idx = Math.min(current + offset, total - 1);
          if (idx === current || idx < 0) return null;
          return (
            <div
              key={`bg-${offset}`}
              className={styles.bgCard}
              style={{
                transform: `translateY(${offset * 8}px) scale(${1 - offset * 0.04}) rotate(${offset % 2 === 0 ? 2 : -2}deg)`,
                zIndex: 3 - offset,
                opacity: 0.5,
              }}
            />
          );
        })}

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            className={styles.activeCardWrap}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <PhotoCard
              photo={photos[current]}
              index={current}
              total={total}
              isActive={true}
              onNext={goNext}
              onPrev={goPrev}
              onClickCard={handleCardClick}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Continue button — shows after last photo */}
      <AnimatePresence>
        {current === total - 1 && (
          <motion.button
            id="memories-continue-btn"
            className={styles.continueBtn}
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue ✨
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
