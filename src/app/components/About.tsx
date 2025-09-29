import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// ===================== ABOUT SECTION =====================
function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const journeyHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hero-like animation for the about header
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Headline animation with SplitText
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

    // Animation for the about section content
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
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
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Journey headline animation
    if (journeyHeadlineRef.current) {
      gsap.fromTo(journeyHeadlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: journeyHeadlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animation for highlights - modified for mobile horizontal layout
    if (highlightsRef.current) {
      const highlights = highlightsRef.current.querySelectorAll('.highlight-item');
      
      // Different animation for mobile vs desktop
      const mm = gsap.matchMedia();
      
      mm.add("(max-width: 767px)", () => {
        // Mobile: horizontal animation
        gsap.fromTo(highlights,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
      
      mm.add("(min-width: 768px)", () => {
        // Desktop: vertical animation
        gsap.fromTo(highlights,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden" id="about">
      <div className='palmleaf'>
        <img className='absolute h-[35%] w-auto right-[-70px] top-[-3px] z-30 max-sm:opacity-0' src="/palm.png" alt="" />
      </div>

      <div className="py-12 md:py-24 relative">
        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
          <div className='elementp absolute opacity-25 left-[-40px] top-[-30px] max-sm:top-[0px] max-sm:left-[0px]'> <img src="/yoga.png" alt="" /></div>
          <h1
            ref={headlineRef}
            className="text-3xl md:text-5xl font-light text-[#333] mb-4 md:mb-6 font-serif"
          >
            Meet Aaron
          </h1>
          <p
            ref={subtextRef}
            className="text-lg md:text-xl text-[#555] max-w-3xl mx-auto font-sans px-2"
          >
            Holistic Health Coach & Yoga Instructor dedicated to helping you find
            balance, strength, and peace through mindful practices.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full bg-white relative">
        {/* Emerald Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
            `,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="py-12 md:py-24 relative z-10">
          <div className='palmleaf'>
            <img className='absolute h-[40%] w-auto left-[0px] bottom-[0px] z-30 max-sm:opacity-0 max-sm:z-0' src="/palm2.png" alt="" />     
          </div>
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {/* Left: Aaron's Portrait */}
              <div ref={imageRef} className="w-full md:w-2/5">
                <div className="relative group">
                  <div className="absolute -inset-2 md:-inset-4 bg-[#ADf0E8] rounded-2xl -z-10 transform rotate-2 transition-all duration-500 group-hover:rotate-0 group-hover:bg-[#55D0C7]/20"></div>
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1740102074734-ba03d00a8796?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="Aaron - Holistic Health Coach" 
                      className="rounded-2xl w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div ref={contentRef} className="w-full md:w-3/5">
                <h2 ref={journeyHeadlineRef} className="text-2xl md:text-4xl font-light text-[#333] mb-4 md:mb-6 font-serif">Aaron S. Murray</h2>
                
                <div className="space-y-4 md:space-y-5 text-[#555] font-light font-sans">
                  <p className="text-base md:text-lg leading-relaxed">
                    As a holistic dad with over <span className="text-[#55D0C7] font-medium">10+ years of experience</span>, 
                    I've dedicated my life to helping others find balance and wellness through natural, sustainable practices.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed">
                    My journey began when I discovered the transformative power of holistic health practices 
                    while balancing parenthood and a demanding career. Now, I bring these practices to busy professionals, 
                    parents, and leaders seeking sustainable wellness solutions.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed">
                    I'm certified in Hatha, Vinyasa, and Yin yoga traditions, and continually expand my knowledge through 
                    ongoing training in mindfulness, meditation, and functional movement.
                  </p>
                </div>

                {/* Highlights - Mobile Horizontal Scroll */}
                <div className="mt-8 md:mt-10">
                  {/* Mobile Horizontal Scroll Container */}
                  <div className="md:hidden relative">
                    <div 
                      ref={scrollContainerRef}
                      className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <div ref={highlightsRef} className="flex gap-4">
                        <div className="highlight-item flex-shrink-0 w-[85vw] snap-center p-4 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                          <div className="w-10 h-10 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#55D0C7] transition-colors duration-300">
                            <svg className="w-5 h-5 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Yoga</h3>
                          <p className="text-[#555] text-sm">Integrating mind, body and spirit through mindful movement</p>
                        </div>

                        <div className="highlight-item flex-shrink-0 w-[85vw] snap-center p-4 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                          <div className="w-10 h-10 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#55D0C7] transition-colors duration-300">
                            <svg className="w-5 h-5 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Mobility</h3>
                          <p className="text-[#555] text-sm">Restoring natural movement patterns for lifelong freedom</p>
                        </div>

                        <div className="highlight-item flex-shrink-0 w-[85vw] snap-center p-4 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                          <div className="w-10 h-10 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#55D0C7] transition-colors duration-300">
                            <svg className="w-5 h-5 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Breathwork</h3>
                          <p className="text-[#555] text-sm">Harnessing the power of breath for energy and calm</p>
                        </div>
                      </div>
                    </div>
                   
                  </div>

                  {/* Desktop Grid Layout */}
                  <div ref={highlightsRef} className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="highlight-item p-6 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:translate-y-1 group">
                      <div className="w-14 h-14 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                        <svg className="w-7 h-7 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Yoga</h3>
                      <p className="text-[#555]">Integrating mind, body and spirit through mindful movement</p>
                    </div>

                    <div className="highlight-item p-6 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:translate-y-1 group">
                      <div className="w-14 h-14 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                        <svg className="w-7 h-7 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Mobility</h3>
                      <p className="text-[#555]">Restoring natural movement patterns for lifelong freedom</p>
                    </div>

                    <div className="highlight-item p-6 bg-white rounded-xl border border-[#ADf0E8] text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:translate-y-1 group">
                      <div className="w-14 h-14 bg-[#ADf0E8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                        <svg className="w-7 h-7 text-[#55D0C7] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-[#333] mb-2 group-hover:text-[#55D0C7] transition-colors duration-300">Breathwork</h3>
                      <p className="text-[#555]">Harnessing the power of breath for energy and calm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default About;