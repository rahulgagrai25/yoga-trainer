import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animation for the about section
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animation for highlights
    if (highlightsRef.current) {
      const highlights = highlightsRef.current.querySelectorAll('.highlight-item');
      gsap.fromTo(highlights,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: highlightsRef.current,
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-white" id="about">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left: Aaron's Portrait */}
          <div ref={imageRef} className="w-full md:w-2/5">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100/30 rounded-2xl -z-10 transform rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Aaron - Holistic Health Coach" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">About Aaron</h2>
            
            <div className="space-y-5 text-gray-600 font-light">
              <p className="text-lg leading-relaxed">
                As a holistic dad with over <span className="text-green-600 font-medium">10+ years of experience</span>, 
                I've dedicated my life to helping others find balance and wellness through natural, sustainable practices.
              </p>
              
              <p className="text-lg leading-relaxed">
                My journey began when I discovered the transformative power of holistic health practices 
                while balancing parenthood and a demanding career. Now, I bring these practices to busy professionals, 
                parents, and leaders seeking sustainable wellness solutions.
              </p>
            </div>

            {/* Highlights */}
            <div ref={highlightsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="highlight-item p-6 bg-green-50/50 rounded-xl border border-green-100 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Yoga</h3>
                <p className="text-gray-600">Integrating mind, body and spirit through mindful movement</p>
              </div>

              <div className="highlight-item p-6 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Mobility</h3>
                <p className="text-gray-600">Restoring natural movement patterns for lifelong freedom</p>
              </div>

              <div className="highlight-item p-6 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Breathwork</h3>
                <p className="text-gray-600">Harnessing the power of breath for energy and calm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;