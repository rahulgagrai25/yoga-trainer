'use client'
import { useRef, useEffect, useState } from 'react';
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
  const slideshowRef = useRef<HTMLDivElement | null>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow images (yoga/wellness themed)
  const slides = [
    {
      image: "https://images.pexels.com/photos/8436597/pexels-photo-8436597.jpeg",
      title: "Find Your Balance",
      subtitle: "Harmony of body, mind, and spirit"
    },
    {
      image: "https://images.pexels.com/photos/13849282/pexels-photo-13849282.jpeg",
      title: "Embrace Stillness",
      subtitle: "Discover peace in every breath"
    },
    {
      image: "https://images.pexels.com/photos/8436726/pexels-photo-8436726.jpeg",
      title: "Journey to Wellness",
      subtitle: "Transformative practices for everyday life"
    }
  ];

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

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Background image transition animation
  useEffect(() => {
    if (slideshowRef.current) {
      const slides = slideshowRef.current.querySelectorAll('.slide');
      gsap.to(slides, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
      
      gsap.to(slides[currentSlide], {
        opacity: 1,
        duration: 1.0,
        ease: 'power2.inOut'
      });
    }
  }, [currentSlide]);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Slideshow */}
      <div ref={slideshowRef} className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url('${slide.image}')`,
            }}
          >
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20"></div>
            
            {/* Subtle content for each slide (appears during transition) */}
            <div className="absolute bottom-20 left-10 transform transition-transform duration-1000 opacity-70">
              <h3 className="text-white text-xl font-serif font-light">{slide.title}</h3>
              <p className="text-white/80 text-sm mt-1">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 font-serif"
        >
          Holistic Health & Mobility Coaching for Sustainable Wellness.
        </h1>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="text-xl md:text-2xl font-light mb-10 text-white/90 max-w-2xl mx-auto font-sans"
        >
          Helping busy professionals, parents & leaders build lifelong balance.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group">
            <span className="flex items-center justify-center">
              Book Coaching
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
          <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
            Explore Retreats
          </button>
        </div>
      </div>

    
      
    </section>
  );
}

export default Hero;