'use client';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  once?: boolean;
}

export default function AnimatedSection({ children, className, delay = 0, direction = 'up', once = true }: AnimatedSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: once });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : direction === 'up' ? 30 : 0, x: inView ? 0 : direction === 'left' ? -30 : direction === 'right' ? 30 : 0 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }: { children: React.ReactNode; className?: string; staggerDelay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
      {children}
    </motion.div>
  );
}
