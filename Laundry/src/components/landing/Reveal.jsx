import { motion } from 'framer-motion';

const MotionComponents = { div: motion.div, span: motion.span, li: motion.li };

export default function Reveal({ children, delay = 0, className = '', as = 'div', y = 16 }) {
  const Comp = MotionComponents[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
