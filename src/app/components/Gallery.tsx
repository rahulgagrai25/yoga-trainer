/* eslint-disable @next/next/no-img-element */
'use client'
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function BentoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to assign varying spans for bento layout (desktop only)
  function getSpanClass(index: number): string {
    const spans = [
      'md:col-span-4 lg:col-span-3',
      'md:col-span-8 lg:col-span-6',
      'md:col-span-4 lg:col-span-3',
      'md:col-span-4 lg:col-span-3 row-span-2',
      'md:col-span-8 lg:col-span-6',
      'md:col-span-4 lg:col-span-3',
      'md:col-span-4 lg:col-span-3 row-span-2',
      'md:col-span-4 lg:col-span-3',
      'md:col-span-8 lg:col-span-6',
    ];
    return spans[index % spans.length] || 'md:col-span-4 lg:col-span-3';
  }

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Animation timeline for entrance - different animations for mobile/desktop
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      defaults: { ease: 'power3.out' }
    });

    if (cardsRef.current) {
      const cards = (cardsRef.current as HTMLElement).querySelectorAll('.bento-card');
      
      if (isMobile) {
        // Mobile animation - horizontal entrance
        tl.fromTo(cards,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        );
      } else {
        // Desktop animation - vertical entrance with rotation
        tl.fromTo(cards,
          { y: 50, opacity: 0, rotationY: 10 },
          { y: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.15 }
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [isMobile]);

  // Sample data for gallery items (yoga/wellness themed)
  const galleryItems = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/31427101/pexels-photo-31427101.jpeg",
      title: "Warrior Flow",
      subtitle: "Strength & Grace",
      description: "Embrace the power within through dynamic warrior sequences."
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/4127321/pexels-photo-4127321.jpeg",
      title: "Lotus Serenity",
      subtitle: "Inner Peace",
      description: "Find stillness in the heart of meditation."
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
      title: "Sun Salutation",
      subtitle: "Vitality Rise",
      description: "Awaken your body with the rhythm of the sun."
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/4793276/pexels-photo-4793276.jpeg",
      title: "Tree Balance",
      subtitle: "Rooted Stability",
      description: "Stand tall like ancient trees in harmony."
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/4793331/pexels-photo-4793331.jpeg",
      title: "Downward Dog",
      subtitle: "Renewal Stretch",
      description: "Invert and refresh your energy flow."
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/4378993/pexels-photo-4378993.jpeg",
      title: "Child's Rest",
      subtitle: "Gentle Surrender",
      description: "Return to innocence and release tension."
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Bridge Lift",
      subtitle: "Heart Opening",
      description: "Elevate your spirit with backbends."
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/4793334/pexels-photo-4793334.jpeg",
      title: "Cobra Awakening",
      subtitle: "Vital Energy",
      description: "Rise like the serpent, awakening kundalini."
    },
    {
      id: 9,
      image: "https://www.fitsri.com/wp-content/uploads/2021/02/seated-twist-pose-1024x683.jpg",
      title: "Seated Twist",
      subtitle: "Detox Flow",
      description: "Twist away toxins for inner cleansing."
    },
  ];

  // Generate random 3D rotations for each card (desktop only)
  const getRandomRotation = () => ({
    rotateX: (Math.random() - 0.5) * 10,
    rotateY: (Math.random() - 0.5) * 10,
    rotateZ: (Math.random() - 0.5) * 5,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24 w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0ede8] overflow-hidden"
    >
      {/* Decorative background elements - hidden on mobile */}
      <div className="absolute inset-0 opacity-20 max-sm:hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#ADf0E8_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#55D0C7_0%,_transparent_50%)]"></div>
      </div>

      <div className="absolute bottom-[450px] right-[40px] z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga6.png" alt="" />
      </div>

      <div className="absolute bottom-[40px] left-[40px] z-0 scale-x-[-1] max-sm:hidden">
        <img className="h-full w-auto" src="/yoga6.png" alt="" />
      </div>

      {/* Subtle floating elements (hidden on mobile) */}
      <div className="absolute top-0 left-[-100px] z-30 max-sm:hidden">
        <img src="/leaf.png" alt="" className="w-100 h-100" />
      </div>
      <div className="absolute bottom-[-50px] right-[-30px] z-30 rotate-270 max-sm:hidden">
        <img src="/leaf.png" alt="" className="w-100 h-100" />
      </div>

      <div className="absolute top-[-300px] right-[-300px] opacity-15 z-0 max-sm:hidden">
        <img className="h-200 w-auto" src="/yoga2.png" alt="Rotating wheel" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-light text-center text-[#333] mb-4 font-serif">
          Yoga Gallery
        </h2>
        <p className="text-lg md:text-xl font-light text-center text-[#555] mb-8 md:mb-16 max-w-2xl mx-auto font-sans px-2">
          Immerse yourself in the beauty of mindful movement. Each pose tells a story of balance, strength, and serenity.
        </p>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="md:hidden flex justify-center mb-4">
          <div className="flex items-center space-x-2 text-[#55D0C7] text-sm">
            <span>Swipe to explore gallery</span>
            <svg className="w-4 h-4 animate-bounce horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bento Grid - Horizontal scroll on mobile */}
        <div 
          ref={scrollContainerRef}
          className="flex md:grid overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 1rem'
          }}
        >
          <div 
            ref={cardsRef}
            className="flex md:grid md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-6 flex-nowrap md:flex-wrap"
          >
            {galleryItems.map((item, index) => {
              const rotation = isMobile ? { rotateX: 0, rotateY: 0, rotateZ: 0 } : getRandomRotation();
              const spanClass = isMobile ? '' : getSpanClass(index);
              
              // Different heights for mobile vs desktop
              const imageContainerClass = isMobile 
                ? "relative w-full h-48 overflow-hidden"
                : getSpanClass(index).includes('row-span-2') 
                  ? "relative w-full h-full min-h-[300px] overflow-hidden"
                  : "relative w-full h-64 lg:h-80 overflow-hidden";

              return (
                <div
                  key={item.id}
                  className={`bento-card flex-shrink-0 w-80 md:w-auto relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group ${spanClass} scroll-snap-align-start`}
                  style={{ 
                    scrollSnapAlign: 'start',
                    transform: !isMobile ? `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) rotateZ(${rotation.rotateZ}deg)` : 'none',
                    transformStyle: 'preserve-3d' as const,
                  }}
                >
                  {/* Image */}
                  <div className={imageContainerClass}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Text Overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform ${isMobile ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'} transition-transform duration-500 ease-out bg-black/40 backdrop-blur-sm rounded-b-2xl`}>
                    <h3 className="text-lg md:text-2xl font-serif font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs md:text-base font-light opacity-90 mb-2">{item.subtitle}</p>
                    <p className="text-xs md:text-sm opacity-80 leading-relaxed hidden md:block">{item.description}</p>
                  </div>

                  {/* Hover 3D Tilt Enhancement (desktop only) */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-[#c37f67]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Dots Indicator */}
        <div className="md:hidden flex justify-center mt-4 space-x-2">
          {galleryItems.map((_, i) => (
            <div key={i} className="w-2 h-2 bg-[#55D0C7] rounded-full opacity-50"></div>
          ))}
        </div>
      </div>

      {/* Custom styles for mobile scroll */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .horizontal {
          animation: horizontalBounce 1s infinite;
        }
        @keyframes horizontalBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
      `}</style>
    </section>
  );
}

export default BentoGallery;