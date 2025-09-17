'use client';

import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

// Placeholder for cn utility - UPDATED TO HANDLE OBJECTS
type ClassValue = string | Record<string, boolean | undefined> | null | undefined;

const cn = (...args: ClassValue[]) => {
  const classes: string[] = [];
  args.forEach(arg => {
    if (typeof arg === 'string' && arg) {
      classes.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  });
  return classes.filter(Boolean).join(' ');
};

// ACTUAL Marquee component implementation
interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  [key: string]: any; // Allow other props like [--duration]
}

const Marquee: React.FC<MarqueeProps> = ({ children, reverse, pauseOnHover, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:30s] [--gap:1rem] space-x-[var(--gap)]",
        {
          "flex-row-reverse": reverse,
          "hover:[animation-play-state:paused]": pauseOnHover,
        },
        className,
      )}
    >
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            // IMPORTANT: Added whitespace-nowrap here to ensure content stays on one line for scrolling
            className={cn("flex shrink-0 justify-around [--gap:1rem] space-x-[var(--gap)] whitespace-nowrap", {
              "animate-marquee": !reverse,
              "animate-marquee-reverse": reverse,
            })}
          >
            {children}
          </div>
        ))}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }
        @keyframes marquee-reverse {
          from {
            transform: translateX(calc(-100% - var(--gap)));
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--duration) linear infinite;
        }
      `}</style>
    </div>
  );
};


gsap.registerPlugin(SplitText, ScrollTrigger); // Removed useGSAP as it's a hook, not a plugin to register

// Retreat Data
const retreatData = {
  bannerImage: "/retreat-banner.jpeg", // Changed banner image
  overview: "Immerse yourself in 3–5 day transformative experiences designed to reconnect you with nature, community, and self. Our retreats combine mindfulness practices, outdoor activities, and expert guidance to facilitate deep personal growth.",
  upcomingRetreats: [
    { id: 1, date: "June 15-18, 2023", location: "Sedona, Arizona", available: true, price: "$1,299", image: "/retreat.png" },
    { id: 2, date: "July 20-24, 2023", location: "Catskills, New York", available: true, price: "$1,499", image: "/retreat-upcoming-2.jpg" },
    { id: 3, date: "August 12-16, 2023", location: "Big Sur, California", available: false, price: "$1,799", image: "/retreat-upcoming-3.jpg" },
    { id: 4, date: "September 8-12, 2023", location: "Asheville, North Carolina", available: true, price: "$1,399", image: "/retreat-upcoming-4.jpg" },
  ],
  pastRetreatImages: [ // Changed past retreat images
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png",
    "/retreat.png", // Added more for a longer marquee effect
    "/retreat.png",
  ],
  benefits: [
    { title: "Mindfulness", description: "Daily meditation and mindfulness sessions", icon: "🧘‍♀️" },
    { title: "Nature Immersion", description: "Guided hikes and outdoor activities", icon: "🌲" },
    { title: "Healthy Nutrition", description: "Gourmet plant-based meals", icon: "🥗" },
    { title: "Community", description: "Connect with like-minded individuals", icon: "👥" },
  ]
};

// Testimonial Data for the CircularTestimonials component
const testimonialsData = [
  {
    quote: "This retreat was a life-changing experience. I felt completely rejuvenated and reconnected with myself. The guidance was exceptional, and the natural setting was breathtaking.",
    name: "Sarah J.",
    designation: "Marketing Manager",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "An incredible journey of self-discovery. The mindfulness practices and outdoor activities were perfectly balanced. I left feeling refreshed and inspired.",
    name: "David L.",
    designation: "Software Engineer",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "From the healthy meals to the supportive community, every aspect of this retreat exceeded my expectations. Highly recommend for anyone seeking peace and growth.",
    name: "Emily R.",
    designation: "Yoga Instructor",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "I've attended several retreats, and this one stands out. The attention to detail and the genuine care from the organizers made it truly special.",
    name: "Michael B.",
    designation: "Entrepreneur",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Helper function for CircularTestimonials
function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// CircularTestimonials Component (integrated)
interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb"; // Corrected variable name
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    // const zIndex = testimonialsLength - Math.abs(offset);
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Images */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              className="testimonial-image"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>
        {/* Content */}
        <div className="testimonial-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="name"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>
              <p
                className="designation"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>
              <motion.p
                className="quote"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className="arrow-buttons">
            <button
              className="arrow-button prev-button"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg, // Corrected variable name
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
            >
              {/* SVG for left arrow */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke={colorArrowFg}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="arrow-button next-button"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
            >
              {/* SVG for right arrow */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke={colorArrowFg}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 2rem;
          margin: 0 auto; /* Center the container */
        }
        .testimonial-grid {
          display: grid;
          gap: 5rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 24rem;
          perspective: 1000px;
        }
        .testimonial-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .testimonial-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .name {
          font-weight: bold;
          margin-bottom: 0.25rem;
        }
        .designation {
          margin-bottom: 2rem;
        }
        .quote {
          line-height: 1.75;
        }
        .arrow-buttons {
          display: flex;
          gap: 1.5rem;
          padding-top: 3rem;
        }
        .arrow-button {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
          border: none;
        }
        .word {
          display: inline-block;
        }
        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }
          .arrow-buttons {
            padding-top: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Component to display a single past retreat image in the marquee
const PastRetreatImageCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-64 w-80 md:w-96 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border p-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <Image
        src={img}
        alt="Past Retreat"
        fill
        className="object-cover rounded-lg"
      />
    </figure>
  );
};


function RetreatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subTitleRef = useRef<HTMLParagraphElement | null>(null);
  const overviewHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const overviewTextRef = useRef<HTMLParagraphElement | null>(null);
  const benefitsRef = useRef<HTMLDivElement | null>(null);
  const upcomingHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const retreatsGridRef = useRef<HTMLDivElement | null>(null);
  const pastRetreatsHeadingRef = useRef<HTMLHeadingElement | null>(null);
  // const carouselRef = useRef<HTMLDivElement | null>(null); // No longer needed for marquee
  const testimonialsSectionRef = useRef<HTMLDivElement | null>(null); // Ref for testimonials section

  // Split past retreat images for two marquee rows
  const firstRowPastRetreats = retreatData.pastRetreatImages.slice(0, retreatData.pastRetreatImages.length / 2);
  const secondRowPastRetreats = retreatData.pastRetreatImages.slice(retreatData.pastRetreatImages.length / 2);


  useGSAP(
    () => {
      if (!sectionRef.current) return;

      document.fonts.ready.then(() => {
        // Animation for the main title in the banner
        if (titleRef.current) {
          const splitTitle = new SplitText(titleRef.current, {
            type: 'lines',
            linesClass: 'line-inner',
          });

          gsap.set(splitTitle.lines, {
            yPercent: 100,
            autoAlpha: 0,
            transformOrigin: '50% 100%',
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }).to(splitTitle.lines, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        }

        // Animation for the subtitle under the banner
        if (subTitleRef.current) {
          gsap.fromTo(subTitleRef.current,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: subTitleRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Animation for Overview section heading and text
        if (overviewHeadingRef.current && overviewTextRef.current) {
          const tlOverview = gsap.timeline({
            scrollTrigger: {
              trigger: overviewHeadingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
          tlOverview.fromTo(overviewHeadingRef.current,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
          );
          tlOverview.fromTo(overviewTextRef.current,
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // Animation for Benefits section
        if (benefitsRef.current) {
          gsap.fromTo(benefitsRef.current.children,
            { y: 40, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: benefitsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Animation for Upcoming Retreats section heading and grid
        if (upcomingHeadingRef.current && retreatsGridRef.current) {
          const tlUpcoming = gsap.timeline({
            scrollTrigger: {
              trigger: upcomingHeadingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
          tlUpcoming.fromTo(upcomingHeadingRef.current,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out' }
          );
          
          gsap.fromTo(retreatsGridRef.current.children,
            { y: 50, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: retreatsGridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Animation for Past Retreats section heading (carouselRef is no longer used for children animation)
        if (pastRetreatsHeadingRef.current) {
          gsap.fromTo(pastRetreatsHeadingRef.current,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: pastRetreatsHeadingRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Animation for Testimonials section heading
        if (testimonialsSectionRef.current) {
          gsap.fromTo(testimonialsSectionRef.current.children[0], // Assuming the heading is the first child
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: testimonialsSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    // Added overflow-x-hidden to the main section to prevent horizontal scrollbars
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Banner */}
      <div className="relative h-[60vh] md:h-[70vh] w-full mb-16 md:mb-24 overflow-hidden">
        <Image
          src={retreatData.bannerImage}
          alt="Retreat in nature"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center w-full px-4 max-w-5xl">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
            Transformative Retreats
          </h2>
          <p ref={subTitleRef} className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/90">
            Reconnect with nature and yourself through immersive wellness experiences
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Overview */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h3 ref={overviewHeadingRef} className="text-3xl md:text-4xl font-light mb-6 text-center text-gray-800">
            Retreat Overview
          </h3>
          <p ref={overviewTextRef} className="text-lg md:text-xl font-light leading-relaxed text-gray-600 text-center">
            {retreatData.overview}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-light mb-12 text-center text-gray-800">
            What to Expect
          </h3>
          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {retreatData.benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-medium mb-2 text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Retreats */}
        <div className="mb-20">
          <h3 ref={upcomingHeadingRef} className="text-3xl md:text-4xl font-light mb-12 text-center text-gray-800">
            Upcoming Retreats
          </h3>
          <div ref={retreatsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {retreatData.upcomingRetreats.map((retreat) => (
              <div
                key={retreat.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={retreat.image}
                    alt={retreat.location}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${retreat.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {retreat.available ? 'Available' : 'Fully booked'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-medium text-gray-800">{retreat.date}</h4>
                      <p className="text-gray-600">{retreat.location}</p>
                    </div>
                    <span className="text-xl font-bold text-green-700">{retreat.price}</span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${retreat.available ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!retreat.available}
                  >
                    {retreat.available ? 'Book Now' : 'Join Waitlist'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Retreats Marquee */}
        <div className="mb-20">
          <h3 ref={pastRetreatsHeadingRef} className="text-3xl md:text-4xl font-light mb-12 text-center text-gray-800">
            Memories from Past Retreats
          </h3>
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s]"> {/* Adjusted duration */}
              {firstRowPastRetreats.map((img, index) => (
                <PastRetreatImageCard key={index} img={img} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s]"> {/* Adjusted duration */}
              {secondRowPastRetreats.map((img, index) => (
                <PastRetreatImageCard key={index} img={img} />
              ))}
            </Marquee>
            {/* Gradient overlays for fade effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50 to-transparent dark:from-white"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50 to-transparent dark:from-white"></div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div ref={testimonialsSectionRef} className="pb-16">
          <h3 className="text-3xl md:text-4xl font-light mb-12 text-center text-gray-800">
            What Our Participants Say
          </h3>
          <CircularTestimonials testimonials={testimonialsData} autoplay={true} />
        </div>
      </div>
    </section>
  );
}

export default RetreatsSection;