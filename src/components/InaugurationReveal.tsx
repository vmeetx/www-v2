import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface InaugurationRevealProps {
  onComplete?: () => void;
  mainColor?: string;
  accentColor?: string;
  messageTitle?: string;
  messageSubtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  enableAccessibilityMode?: boolean;
}

const InaugurationReveal: React.FC<InaugurationRevealProps> = ({
  onComplete,
  mainColor = '#8a1538',
  accentColor = '#ffcc00',
  messageTitle = 'Welcome to Our Sugar Web 2.0!',
  messageSubtitle = 'We are excited launch our Revamped Sugar Web 2.0.',
  backgroundImage,
  buttonText,
  onButtonClick,
  enableAccessibilityMode = false,
}) => {
  const [stage, setStage] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [curtainsReady, setCurtainsReady] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Generate color variations
  const getColorVariations = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return {
      darker: `rgba(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)}, 1)`,
      lighter: `rgba(${Math.min(255, r + 25)}, ${Math.min(255, g + 25)}, ${Math.min(255, b + 25)}, 1)`,
      transparent: `rgba(${r}, ${g}, ${b}, 0.85)`,
      shadow: `rgba(${Math.max(0, r - 75)}, ${Math.max(0, g - 75)}, ${Math.max(0, b - 75)}, 0.7)`,
      highlight: `rgba(${Math.min(255, r + 70)}, ${Math.min(255, g + 70)}, ${Math.min(255, b + 70)}, 0.9)`,
      semiTransparent: `rgba(${r}, ${g}, ${b}, 0.6)`,
      ultraLight: `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, 1)`,
      veryDark: `rgba(${Math.max(0, r - 90)}, ${Math.max(0, g - 90)}, ${Math.max(0, b - 90)}, 1)`,
      shimmer: `rgba(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)}, 0.95)`,
    };
  };

  const mainColorVars = getColorVariations(mainColor);
  const accentColorVars = getColorVariations(accentColor);

  // Gold color for royal decoration
  const goldColor = '#d4af37';
  const goldColorVars = getColorVariations(goldColor);

  // Silver color for additional sparkle
  const silverColor = '#C0C0C0';
  const silverColorVars = getColorVariations(silverColor);

  const durationMultiplier = prefersReducedMotion ? 0.5 : 1;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches || enableAccessibilityMode);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches || enableAccessibilityMode);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableAccessibilityMode]);

  // Handle curtain opening
  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => {
        setCurtainsReady(true);
        setStage(3);
      }, 800 * durationMultiplier);

      return () => clearTimeout(timer);
    }

    if (stage !== 2 && stage !== 3) {
      setCurtainsReady(false);
    }
  }, [stage, durationMultiplier]);

  // Animation sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      setStage(3);
      setCurtainsReady(true);

      const quickHideTimeout = setTimeout(() => {
        if (onComplete) onComplete();
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(quickHideTimeout);
    }

    const sequence = [
      { stage: 1, delay: 500 * durationMultiplier },
      { stage: 2, delay: 1800 * durationMultiplier },
      { stage: 3, delay: 5000 * durationMultiplier },
      { stage: 4, delay: 1200 * durationMultiplier },
      { stage: 5, delay: 1200 * durationMultiplier },
    ];

    let totalDelay = 0;
    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach((item, index) => {
      totalDelay += index > 0 ? sequence[index - 1].delay : 0;

      const timeout = setTimeout(() => {
        setStage(item.stage);
        if (index === sequence.length - 1) {
          setTimeout(() => {
            if (onComplete) onComplete();
            setIsVisible(false);
          }, item.delay - 200);
        }
      }, totalDelay);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [onComplete, durationMultiplier, prefersReducedMotion]);

  // Shimmer effect animation
  useEffect(() => {
    if (prefersReducedMotion || !curtainsReady) return;

    const addShimmerToElements = () => {
      const shimmerElements = document.querySelectorAll('.curtain-shimmer');
      shimmerElements.forEach((element) => {
        const shimmerAnimation = () => {
          if (!element) return;

          const htmlElement = element as HTMLElement;
          htmlElement.style.opacity = '0';
          htmlElement.style.transition = 'opacity 0s';

          setTimeout(() => {
            htmlElement.style.left = `${Math.random() * 100}%`;
            htmlElement.style.top = `${Math.random() * 100}%`;
            htmlElement.style.opacity = '1';
            htmlElement.style.transition = `opacity 1.5s ease-in-out`;

            setTimeout(() => {
              htmlElement.style.opacity = '0';
              htmlElement.style.transition = `opacity 2s ease-in-out`;
            }, 300);
          }, 50);
        };

        shimmerAnimation();
        return setInterval(shimmerAnimation, 3000);
      });
    };

    const shimmerInterval = setTimeout(addShimmerToElements, 1000);

    return () => {
      clearTimeout(shimmerInterval);
    };
  }, [curtainsReady, prefersReducedMotion]);

  // Enhanced confetti launcher with more color variations
  const launchConfetti = () => {
    if (!confettiCanvasRef.current || prefersReducedMotion) return;

    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Helper for random value in range
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    // Define confetti shapes
    const shapes: confetti.Shape[] = ['circle', 'square', 'star'];

    // Enhanced color palette with more variations
    const colors = [
      // Main brand colors with variations
      mainColor,
      mainColorVars.lighter,
      mainColorVars.darker,
      mainColorVars.ultraLight,
      mainColorVars.veryDark,
      accentColor,
      accentColorVars.lighter,
      accentColorVars.ultraLight,
      accentColorVars.darker,

      // Gold and silver with variations for luxury feel
      goldColor,
      goldColorVars.lighter,
      goldColorVars.shimmer,
      goldColorVars.darker,
      silverColor,
      silverColorVars.lighter,
      silverColorVars.shimmer,

      // Whites and neutrals for contrast and sparkle
      '#ffffff',
      '#f5f5f5',
      '#e0e0e0',
      '#f8f8ff',

      // Semi-transparent versions for layered effect
      mainColorVars.semiTransparent,
      accentColorVars.semiTransparent,
      goldColorVars.semiTransparent,
    ];

    // Initial center burst
    myConfetti({
      particleCount: 150,
      spread: 80,
      startVelocity: 40,
      decay: 0.94,
      origin: { y: 0.6, x: 0.5 },
      shapes,
      colors,
      scalar: randomInRange(0.9, 1.5),
    });

    // Side bursts
    setTimeout(() => {
      myConfetti({
        particleCount: 90,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.55 },
        shapes,
        colors,
        scalar: randomInRange(0.9, 1.5),
      });
    }, 500);

    setTimeout(() => {
      myConfetti({
        particleCount: 90,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.55 },
        shapes,
        colors,
        scalar: randomInRange(0.9, 1.5),
      });
    }, 750);

    // Top corners
    setTimeout(() => {
      myConfetti({
        particleCount: 60,
        angle: 130,
        spread: 50,
        origin: { x: 0.1, y: 0.1 },
        shapes,
        colors,
        gravity: 1.2,
      });
    }, 1000);

    setTimeout(() => {
      myConfetti({
        particleCount: 60,
        angle: 50,
        spread: 50,
        origin: { x: 0.9, y: 0.1 },
        shapes,
        colors,
        gravity: 1.2,
      });
    }, 1200);

    // Continuous slow falling confetti
    const interval = setInterval(() => {
      // Only continue if component is still mounted
      if (!confettiCanvasRef.current) {
        clearInterval(interval);
        return;
      }

      myConfetti({
        particleCount: 5,
        angle: 90,
        spread: 100,
        origin: { x: randomInRange(0.2, 0.8), y: -0.1 },
        shapes,
        colors,
        gravity: 0.6,
        scalar: randomInRange(0.8, 1.2),
        drift: randomInRange(-0.5, 0.5),
        ticks: 300,
      });
    }, 200);

    // Clean up after 5 seconds
    setTimeout(() => clearInterval(interval), 5000);

    // Final burst with special colors
    setTimeout(() => {
      // Create a special color set for grand finale that emphasizes brand colors
      const finaleColors = [
        mainColor,
        accentColor,
        goldColor,
        silverColor,
        '#ffffff',
        mainColorVars.ultraLight,
        accentColorVars.ultraLight,
        goldColorVars.shimmer,
      ];

      myConfetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.65, x: 0.5 },
        shapes,
        colors: finaleColors,
        gravity: 0.8,
      });
    }, 1500);
  };

  // Trigger confetti when curtains are ready
  useEffect(() => {
    if (stage === 3 && curtainsReady && !prefersReducedMotion) {
      launchConfetti();
    }
  });

  // Remove from DOM when animation complete
  if (!isVisible) {
    return null;
  }

  // Royal curtain texture
  const curtainTexture = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpattern id='pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M10,1.5 L5,9.5 L15,9.5 Z' fill='%23ffffff20'/%3E%3Cpath d='M10,18.5 L5,10.5 L15,10.5 Z' fill='%23ffffff15'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23pattern)'/%3E%3C/svg%3E")`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reveal-title"
      aria-describedby="reveal-description"
    >
      {/* Main container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1200px',
          background: backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : undefined,
        }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 0 ? 0 : stage === 5 ? 0 : 0.85,
          }}
          transition={{ duration: 1 * durationMultiplier, ease: 'easeInOut' }}
        />

        {/* Curtain container */}
        <div className="absolute inset-0 overflow-hidden z-30">
          {/* Curtain rail/valance */}
          <div
            className="absolute top-0 left-0 right-0 z-40"
            style={{
              background: `linear-gradient(to bottom, ${goldColor}, ${mainColorVars.darker})`,
              height: '30px',
              boxShadow: `0 2px 10px rgba(0,0,0,0.4), inset 0 -2px 0 ${goldColorVars.darker}`,
              borderBottom: `2px solid ${goldColorVars.lighter}`,
            }}
          >
            {/* Decorative elements on valance */}
            <div className="absolute left-0 right-0 bottom-0 flex justify-center">
              {[...Array(9)].map((_, i) => (
                <div
                  key={`valance-gem-${i}`}
                  className="mx-4"
                  style={{
                    width: '12px',
                    height: '12px',
                    background: `${goldColorVars.lighter}`,
                    borderRadius: '50%',
                    boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    transform: 'translateY(50%)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
            initial={{ x: 0 }}
            animate={{
              x:
                stage < 2
                  ? 0
                  : stage === 2
                    ? '-65%'
                    : stage === 3
                      ? '-65%'
                      : stage === 4
                        ? '-100%'
                        : '-100%',
            }}
            transition={{
              duration:
                stage === 2
                  ? 1.6 * durationMultiplier
                  : 1.2 * durationMultiplier,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${mainColorVars.darker} 0%, ${mainColor} 50%, ${mainColorVars.lighter} 100%)`,
                boxShadow: `inset -10px 0 20px ${mainColorVars.shadow}`,
              }}
            >
              {/* Fabric texture */}
              <div
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: curtainTexture }}
              />

              {/* Fabric folds */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`left-fold-${i}`}
                  className="absolute top-0 h-full opacity-60"
                  style={{
                    left: `${i * 12}%`,
                    width: '2px',
                    background: `linear-gradient(to bottom, transparent, ${mainColorVars.shadow}, transparent)`,
                  }}
                />
              ))}

              {/* Tassels at bottom */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={`tassel-left-${i}`}
                  className="absolute bottom-0"
                  style={{
                    left: `${(i + 1) * 14 - 5}%`,
                    width: '10px',
                    height: '120px',
                    background: `linear-gradient(to bottom, ${goldColor}, transparent)`,
                    transformOrigin: 'top center',
                    transform: `rotate(${Math.sin(i) * 5}deg)`,
                    zIndex: 5,
                    opacity: 0.9,
                  }}
                >
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: goldColorVars.lighter,
                      borderRadius: '50%',
                      boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    }}
                  />
                </div>
              ))}

              {/* Decorative border trim */}
              <div
                className="absolute top-0 bottom-0 right-0"
                style={{
                  width: '20px',
                  background: `linear-gradient(to left, transparent, ${goldColorVars.transparent}, transparent)`,
                  zIndex: 4,
                }}
              >
                {/* Vertical decorative pattern */}
                {[...Array(40)].map((_, i) => (
                  <div
                    key={`trim-dot-left-${i}`}
                    style={{
                      position: 'absolute',
                      top: `${i * 2.5}%`,
                      right: '5px',
                      width: '10px',
                      height: '10px',
                      background:
                        i % 2 === 0 ? goldColorVars.lighter : goldColor,
                      transform: 'rotate(45deg)',
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>

              {/* Shimmer effects */}
              <div
                className="curtain-shimmer absolute"
                style={{
                  width: '50px',
                  height: '50px',
                  background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                  borderRadius: '50%',
                  opacity: 0,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              />
              <div
                className="curtain-shimmer absolute"
                style={{
                  width: '30px',
                  height: '30px',
                  background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                  borderRadius: '50%',
                  opacity: 0,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              />

              {/* Wave pattern */}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    45deg, 
                    transparent, 
                    transparent 40px, 
                    ${goldColorVars.transparent} 40px, 
                    ${goldColorVars.transparent} 42px
                  )`,
                  opacity: 0.4,
                  zIndex: 3,
                }}
              />
            </div>
          </motion.div>

          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
            initial={{ x: 0 }}
            animate={{
              x:
                stage < 2
                  ? 0
                  : stage === 2
                    ? '65%'
                    : stage === 3
                      ? '65%'
                      : stage === 4
                        ? '100%'
                        : '100%',
            }}
            transition={{
              duration:
                stage === 2
                  ? 1.6 * durationMultiplier
                  : 1.2 * durationMultiplier,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to left, ${mainColorVars.darker} 0%, ${mainColor} 50%, ${mainColorVars.lighter} 100%)`,
                boxShadow: `inset 10px 0 20px ${mainColorVars.shadow}`,
              }}
            >
              {/* Fabric texture */}
              <div
                className="absolute inset-0 opacity-40"
                style={{ backgroundImage: curtainTexture }}
              />

              {/* Fabric folds */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`right-fold-${i}`}
                  className="absolute top-0 h-full opacity-60"
                  style={{
                    right: `${i * 12}%`,
                    width: '2px',
                    background: `linear-gradient(to bottom, transparent, ${mainColorVars.shadow}, transparent)`,
                  }}
                />
              ))}

              {/* Tassels at bottom */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={`tassel-right-${i}`}
                  className="absolute bottom-0"
                  style={{
                    right: `${(i + 1) * 14 - 5}%`,
                    width: '10px',
                    height: '120px',
                    background: `linear-gradient(to bottom, ${goldColor}, transparent)`,
                    transformOrigin: 'top center',
                    transform: `rotate(${Math.sin(i) * -5}deg)`,
                    zIndex: 5,
                    opacity: 0.9,
                  }}
                >
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    style={{
                      width: '14px',
                      height: '14px',
                      background: goldColorVars.lighter,
                      borderRadius: '50%',
                      boxShadow: `0 0 5px ${goldColorVars.highlight}`,
                    }}
                  />
                </div>
              ))}

              {/* Decorative border trim */}
              <div
                className="absolute top-0 bottom-0 left-0"
                style={{
                  width: '20px',
                  background: `linear-gradient(to right, transparent, ${goldColorVars.transparent}, transparent)`,
                  zIndex: 4,
                }}
              >
                {/* Vertical decorative pattern */}
                {[...Array(40)].map((_, i) => (
                  <div
                    key={`trim-dot-right-${i}`}
                    style={{
                      position: 'absolute',
                      top: `${i * 2.5}%`,
                      left: '5px',
                      width: '10px',
                      height: '10px',
                      background:
                        i % 2 === 0 ? goldColorVars.lighter : goldColor,
                      transform: 'rotate(45deg)',
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>

              {/* Shimmer effects */}
              <div
                className="curtain-shimmer absolute"
                style={{
                  width: '50px',
                  height: '50px',
                  background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                  borderRadius: '50%',
                  opacity: 0,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              />
              <div
                className="curtain-shimmer absolute"
                style={{
                  width: '30px',
                  height: '30px',
                  background: `radial-gradient(circle, ${goldColorVars.highlight}, transparent)`,
                  borderRadius: '50%',
                  opacity: 0,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              />

              {/* Wave pattern */}
              <div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    135deg, 
                    transparent, 
                    transparent 40px, 
                    ${goldColorVars.transparent} 40px, 
                    ${goldColorVars.transparent} 42px
                  )`,
                  opacity: 0.4,
                  zIndex: 3,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Reveal content */}
        <AnimatePresence mode="wait">
          {curtainsReady && stage === 3 && (
            <motion.div
              className="relative z-40 max-w-lg mx-auto w-90%"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0, transition: { duration: 0.3 } }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
            >
              <div
                className="bg-white rounded-lg shadow-2xl px-6 py-8 md:px-16 md:py-12 text-center"
                style={{
                  boxShadow: `0 5px 30px rgba(0,0,0,0.3), 0 0 50px ${accentColorVars.transparent}, 0 0 80px ${goldColorVars.transparent}`,
                  background: `white`,
                  border: `2px solid ${goldColor}`,
                }}
              >
                {/* Decorative header accent */}
                <div
                  style={{
                    height: '4px',
                    width: '80%',
                    margin: '-4px auto 12px',
                    background: `linear-gradient(to right, transparent, ${goldColor}, transparent)`,
                    borderRadius: '2px',
                  }}
                />

                <h1
                  id="reveal-title"
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{
                    color: mainColor,
                    fontFamily: 'serif',
                  }}
                >
                  {messageTitle}
                </h1>

                <p
                  id="reveal-description"
                  className="text-xl md:text-2xl text-gray-700"
                  style={{
                    fontFamily: 'serif',
                  }}
                >
                  {messageSubtitle}
                </p>

                {/* Call to action button if provided */}
                {buttonText && onButtonClick && (
                  <motion.button
                    className="mt-8 px-6 py-3 rounded-lg text-white font-medium"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 10px ${accentColorVars.shadow}`,
                      border: `1px solid ${goldColor}`,
                    }}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: 0.4 }}
                    onClick={onButtonClick}
                  >
                    {buttonText}
                  </motion.button>
                )}

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{
                    background: `linear-gradient(to right, ${goldColor}, ${accentColor}, ${goldColor})`,
                  }}
                />

                {/* Corner decorations */}
                <div
                  className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2"
                  style={{ borderColor: goldColor }}
                />
                <div
                  className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2"
                  style={{ borderColor: goldColor }}
                />
                <div
                  className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2"
                  style={{ borderColor: goldColor }}
                />
                <div
                  className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2"
                  style={{ borderColor: goldColor }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti canvas */}
        <canvas
          ref={confettiCanvasRef}
          className="pointer-events-none fixed inset-0 z-50"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default InaugurationReveal;