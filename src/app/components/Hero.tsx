'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Headline animation
    if (headlineRef.current) {
      const splitHeadline = new SplitText(headlineRef.current, { 
        type: 'lines', 
        linesClass: 'line' 
      });
      
      tl.fromTo(splitHeadline.lines, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
      );
    }

    // Subtext animation
    if (subtextRef.current) {
      tl.fromTo(subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    // CTA buttons animation
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('button');
      tl.fromTo(buttons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.3'
      );
    }

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('/hero.png')", 
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6"
        >
          Holistic Health & Mobility Coaching for Sustainable Wellness.
        </h1>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-xl md:text-2xl font-light mb-10 text-white/90 max-w-2xl mx-auto"
        >
          Helping busy professionals, parents & leaders build lifelong balance.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
            Book Coaching
          </button>
          <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
            Explore Retreats
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;