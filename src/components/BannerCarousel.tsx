import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BannerSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
}

const BannerCarousel = ({ slides }: BannerCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-secondary" style={{ aspectRatio: "16/7" }}>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <h2 className="text-lg font-bold text-card md:text-2xl tracking-display">
              {slides[current].title}
            </h2>
            <p className="mt-1 text-xs text-card/80 md:text-sm">
              {slides[current].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - desktop */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card/20 p-2 backdrop-blur-sm transition-colors hover:bg-card/40 md:flex"
      >
        <ChevronLeft className="h-5 w-5 text-card" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card/20 p-2 backdrop-blur-sm transition-colors hover:bg-card/40 md:flex"
      >
        <ChevronRight className="h-5 w-5 text-card" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-primary" : "w-1.5 bg-card/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
