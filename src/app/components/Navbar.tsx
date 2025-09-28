'use client'
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const menuItems = ['Home', 'About', 'Services', 'Retreats', 'Courses', 'Gallery', 'Contact'];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize animations
  useEffect(() => {
    // Animate logo on load
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Animate CTA button on load
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.3 }
      );
    }

    // Animate menu items with stagger
    if (menuRef.current) {
      const menuElements = menuRef.current.querySelectorAll('a');
      gsap.fromTo(menuElements,
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Hover animation for menu items
  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.target, {
      y: -2,
      duration: 0.2,
      ease: 'power1.out'
    });
  };

  const handleHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.target, {
      y: 0,
      duration: 0.2,
      ease: 'power1.out'
    });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full h-[100px] z-50 px-4 md:px-8 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      {/* Gradient border bottom */}
      <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ADf0E8] to-transparent ${
        isScrolled ? 'opacity-30' : 'opacity-50'
      }`} />
      
      <div className="relative h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          <span className={`text-xl font-serif tracking-wider transition-colors duration-300 ${
            isScrolled ? 'text-[#1b4629]' : 'text-white'
          }`}>Aaron S. Murray</span>
        </div>

        {/* Desktop Menu */}
        <div ref={menuRef} className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-light tracking-wide relative group transition-all duration-300 ${
                isScrolled ? 'text-[#555] hover:text-[#1b4629]' : 'text-white/90 hover:text-white'
              }`}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-[#1b4629]' : 'bg-white'
              }`}></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <button className={`px-6 py-3 text-sm rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 ${
            isScrolled 
              ? 'bg-[#c37f67] hover:bg-[#c76947] text-white' 
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}>
            Book a Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 w-6 transition-all duration-300 ${
              isScrolled ? 'bg-[#1b4629]' : 'bg-white'
            } ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 transition-all duration-300 ${
              isScrolled ? 'bg-[#1b4629]' : 'bg-white'
            } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 transition-all duration-300 ${
              isScrolled ? 'bg-[#1b4629]' : 'bg-white'
            } ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-0 left-0 w-full min-h-screen bg-gradient-to-b from-[#1b4629] to-[#2d6b4e] backdrop-blur-lg transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="pt-32 pb-8 px-6 flex flex-col space-y-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/90 hover:text-white text-2xl font-light tracking-wide transition-all duration-300 py-4 border-b border-white/10 last:border-b-0 transform hover:translate-x-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          
          {/* Mobile CTA */}
          <div className="pt-8">
            <button className="w-full bg-[#c37f67] hover:bg-[#c76947] text-white py-4 rounded-lg text-lg font-medium transition-colors duration-300">
              Book a Session
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;