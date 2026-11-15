import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scroll reveal — content rises into place the first time it enters the viewport.
 * `as` picks the element (div, li, article, figure…), `delay` staggers siblings.
 */
export const Reveal = ({ as = 'div', delay = 0, y = 26, className, children, ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

/** Entrance on page load (hero) — no scroll needed. */
export const Rise = ({ as = 'div', delay = 0, y = 22, className, children, ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
};
