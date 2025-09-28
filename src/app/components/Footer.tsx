'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const newsletterFormRef = useRef<HTMLFormElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Animation for footer elements on scroll
  useEffect(() => {
    if (footerRef.current) {
      const elements = footerRef.current.querySelectorAll('h3, p, a, button, input, ul li');
      gsap.fromTo(elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Success message animation (initially hidden)
    if (successMessageRef.current) {
      gsap.set(successMessageRef.current, { opacity: 0, y: 10 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate async newsletter signup
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Animate success message in
      if (successMessageRef.current) {
        gsap.to(successMessageRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }

      // Clear form inputs
      if (newsletterFormRef.current) {
        (newsletterFormRef.current.querySelector('input[type="email"]') as HTMLInputElement).value = '';
      }
    }, 1500);
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Courses', href: '#courses' },
    { name: 'Retreats', href: '#retreats' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const contactInfo = [
    { label: 'Email', value: 'asmurray@holistic.com', href: 'mailto:asmurray@holistic.com' },
    { label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { label: 'Location', value: 'Based in Sedona, AZ', href: '#contact' },
  ];

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-gradient-to-b from-[#f8f5f2] to-[#f0ede8] py-16 md:py-20 border-t border-[#e9d8c9]/30 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#ADf0E8_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#55D0C7_0%,_transparent_50%)]"></div>
      </div>

      <div className="absolute top-[-300px] right-[-300px] opacity-15 z-0">
        <img
          className="h-200 w-auto"
          src="/yoga3.png"
          alt="Rotating wheel"
        />
      </div>


      <h2 id="footer-heading" className="sr-only">Footer Navigation</h2>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-3xl font-serif text-[#333] tracking-wider mb-4">Aaron S. Murray</span>
            <p className="text-lg font-light text-[#555] mb-6 max-w-md">
              Holistic wellness coaching for sustainable health. Find your balance, strength, and inner peace.
            </p>
            
            {/* Social Links - FIXED ICONS */}
            <div className="flex space-x-4 mb-6">
              {[
                { name: 'Instagram', icon: '/footer/insta.png', href: 'https://instagram.com/serenenature' },
                { name: 'Facebook', icon: '/footer/facebook.png', href: 'https://facebook.com/serenenature' },
                { name: 'YouTube', icon: '/footer/youtube.png', href: 'https://youtube.com/serenenature' },
                { name: 'LinkedIn', icon: '/footer/linkedin.png', href: 'https://linkedin.com/company/serenenature' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-[#55D0C7] transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="w-8 h-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-xl font-serif font-medium text-[#333] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#555] hover:text-[#55D0C7] transition-colors duration-200 text-base font-light hover:pl-2 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-xl font-serif font-medium text-[#333] mb-6">Stay Connected</h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-[#55D0C7] text-sm font-medium">{contact.label}:</span>
                  <a 
                    href={contact.href} 
                    className="text-[#555] hover:text-[#c37f67] transition-colors text-sm"
                  >
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="w-full">
              <p className="text-sm text-[#555] mb-3">Join our wellness newsletter</p>
              <form ref={newsletterFormRef} onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email for newsletter signup"
                    className="flex-1 px-4 py-2 rounded-lg border border-[#ADf0E8] bg-white/80 text-[#555] placeholder-[#999] focus:ring-2 focus:ring-[#55D0C7] focus:border-transparent outline-none transition-all duration-200 text-sm"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-[#c37f67] hover:bg-[#c76947] text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                      loading ? 'cursor-not-allowed opacity-70' : ''
                    }`}
                    disabled={loading}
                    aria-live="assertive"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              </form>
              {success && (
                <div
                  ref={successMessageRef}
                  className="mt-2 text-[#55D0C7] text-sm font-medium flex items-center"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="mr-2">✓</span> Welcome to our wellness community!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#e9d8c9]/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#555] text-sm font-light">
              © {new Date().getFullYear()} Aaron S. Murray. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm text-[#555] font-light">
              <a href="/privacy" className="hover:text-[#55D0C7] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#55D0C7] transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-[#55D0C7] transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Wellness Quote */}
        <div className="text-center mt-8 pt-6 border-t border-[#e9d8c9]/30">
          <p className="text-[#555] italic font-light text-sm">
            "Wellness is the complete integration of body, mind, and spirit — the realization that everything we do, 
            think, feel, and believe has an effect on our state of well-being." — Greg Anderson
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;