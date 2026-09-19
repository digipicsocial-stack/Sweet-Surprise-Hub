import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function MaskedLines({ lines, className = "", delay = 0.25 }) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.15, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Reveal({ children, delay = 0, y = 36, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({ src, alt = "", className = "", speed = 0.12 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="h-full w-full scale-[1.25] object-cover will-change-transform"
      />
    </div>
  );
}