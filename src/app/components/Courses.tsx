'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      defaults: { ease: 'power3.out' }
    });

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

    // Cards animation
    if (cardsRef.current) {
      // Explicitly cast cardsRef.current to HTMLElement
      const cards = (cardsRef.current as HTMLElement).querySelectorAll('.course-card');
      tl.fromTo(cards,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
        '-=0.3'
      );
    }

    // CTA button animation
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
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
      className="relative py-20 w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-white mb-6"
        >
          Courses & Resources
        </h2>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-xl md:text-2xl font-light text-center text-white/80 mb-16 max-w-3xl mx-auto"
        >
          Expert-led online learning to transform your health & mobility
        </p>

        {/* Course Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Video Courses Card */}
          <div className="course-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">Video Courses</h3>
              <p className="text-white/70">In-depth programs for mobility, yoga, and breathwork practices</p>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Mobility Foundations
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Yoga for Busy Professionals
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Breathwork Mastery
              </li>
            </ul>
          </div>

          {/* Free Guides Card */}
          <div className="course-card bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">Free Guides</h3>
              <p className="text-white/70">Practical resources to implement healthy habits immediately</p>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Weekly Meal Prep Guide
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                15-Minute Mobility Routines
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Stress Management Techniques
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            ref={ctaRef}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            Access Resources
          </button>
        </div>
      </div>
    </section>
  );
}

export default Courses;