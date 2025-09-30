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

interface CtaProps {
  // You can add props here if needed
}

function Begin({}: CtaProps) {
  const ctaHeadlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    // CTA headline animation
    if (ctaHeadlineRef.current) {
      const splitHeadline = new SplitText(ctaHeadlineRef.current, { 
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
            trigger: ctaHeadlineRef.current,
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
    <div className="py-16 md:py-24 bg-[#e9d8c9] relative z-10 overflow-hidden">
      <div className='absolute z-0 top-[0] items-center left-[-200px] opacity-35'>
        <img src="/yoga.png" alt="" />
      </div>
      <div className='absolute z-0 top-[0] items-center right-[-200px] opacity-35'>
        <img className='max-sm:opacity-0' src="/yoga.png" alt="" />
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 ref={ctaHeadlineRef} className="text-3xl md:text-4xl font-light text-[#333] mb-6 font-serif">Ready to Begin Your Journey?</h2>
        <p className="text-xl text-[#555] mb-10 max-w-3xl mx-auto font-sans">
          Let&apos;s work together to develop a practice that brings balance, strength, and peace into your life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#c37f67] hover:bg-[#c76947] text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Book a Session
          </button>
          <button className="border border-[#c76947] text-[#c76947] hover:bg-[#c37f67] hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Begin;