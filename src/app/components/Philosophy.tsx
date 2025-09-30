/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
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
    <div ref={philosophyRef} className="py-12 md:py-24 bg-[#e9d8c9] relative z-10 overflow-hidden">
      <div className='absolute z-0 top-[0] items-center left-[-200px] opacity-35'>
        <img src="/yoga.png" alt="" />
      </div>
      <div className='absolute z-0 top-[0] items-center right-[-200px] opacity-35'>
        <img className='max-sm:opacity-0' src="/yoga.png" alt="" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header for desktop */}
        <div className="hidden md:block text-center">
          <h2 ref={philosophyHeadlineRef} className="text-3xl md:text-4xl font-light text-[#333] mb-8 font-serif">My Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl font-light text-[#555] italic mb-8 font-serif">
            &quot;True wellness comes from harmony between body, mind, and spirit—not from perfection.&quot;
          </blockquote>
          <p className="text-lg text-[#555] max-w-3xl mx-auto font-sans">
            I believe that everyone&apos;s journey to health is unique. My approach focuses on sustainable practices 
            that integrate seamlessly into your life, helping you build resilience, find balance, and connect 
            with your inner strength.
          </p>
        </div>

        {/* Mobile compact version */}
        <div className="md:hidden">
          <h2 ref={philosophyHeadlineRef} className="text-2xl font-light text-[#333] mb-6 font-serif text-center">My Philosophy</h2>
          
          <blockquote className="text-xl font-light text-[#555] italic mb-6 font-serif text-center px-4">
            &quot;True wellness comes from harmony between body, mind, and spirit—not from perfection.&quot;
          </blockquote>

          {/* Compact summary */}
          <p className="text-[#555] text-sm text-center mt-6 font-sans leading-relaxed">
            Everyone&apos;s health journey is unique. I focus on sustainable practices that build resilience and balance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Philosophy;