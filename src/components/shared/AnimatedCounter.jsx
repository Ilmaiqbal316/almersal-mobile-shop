import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/** @param {{ target: number, suffix?: string, label: string, duration?: number }} props */
export default function AnimatedCounter({ target, suffix = '', label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-bold gold-gradient-text">
        {count}{suffix}
      </div>
      <div className="mt-2 text-black/50 text-sm font-mono tracking-wider uppercase">
        {label}
      </div>
    </motion.div>
  );
}