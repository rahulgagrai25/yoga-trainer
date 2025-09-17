'use client'
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const menuItems = ['Home', 'About', 'Services', 'Retreats', 'Courses', 'Blog', 'Contact'];

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
    <nav className="fixed top-0 left-0 w-full h-[100px] z-50 px-4 md:px-8">
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/10" />
      
      <div className="relative h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center">
          <span className="text-xl font-serif text-white tracking-wider">SereneNature</span>
        </div>

        {/* Desktop Menu */}
        <div ref={menuRef} className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm font-light tracking-wide relative group transition-colors duration-300"
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverOut}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
            Book a Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-6 flex flex-col space-y-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white text-base font-light tracking-wide transition-colors duration-300 py-2 border-b border-white/10 last:border-b-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;