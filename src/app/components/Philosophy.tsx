import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface PhilosophyProps {
  // You can add props here if needed
}

function Philosophy({}: PhilosophyProps) {
  const philosophyRef = useRef<HTMLDivElement | null>(null);
  const philosophyHeadlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // Animation for philosophy section
    if (philosophyRef.current) {
      gsap.fromTo(philosophyRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Philosophy headline animation
    if (philosophyHeadlineRef.current) {
      const splitHeadline = new SplitText(philosophyHeadlineRef.current, { 
        type: 'lines', 
        linesClass: 'line' 
      });
      
      gsap.fromTo(splitHeadline.lines,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: philosophyHeadlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={philosophyRef} className="py-16 md:py-24 bg-[#1b4629] relative z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 ref={philosophyHeadlineRef} className="text-3xl md:text-4xl font-light text-white mb-8 font-serif">My Philosophy</h2>
        <blockquote className="text-2xl md:text-3xl font-light text-white italic mb-8 font-serif">
          "True wellness comes from harmony between body, mind, and spirit—not from perfection."
        </blockquote>
        <p className="text-lg text-white max-w-3xl mx-auto font-sans">
          I believe that everyone's journey to health is unique. My approach focuses on sustainable practices 
          that integrate seamlessly into your life, helping you build resilience, find balance, and connect 
          with your inner strength.
        </p>
      </div>
    </div>
  );
}

export default Philosophy;