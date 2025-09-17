'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Lucide React icons for social media
import { Facebook, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

// Register GSAP plugins (if not already registered globally)
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%', // Adjust as needed
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
    { name: 'Retreats', href: '#retreats' },
    { name: 'Blog', href: '#blog' }, // Assuming a blog section exists or will exist
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/yourwellnesscoach', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/yourwellnesscoach', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourwellnesscoach', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourwellnesscoach', label: 'Twitter' },
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white/80 py-16 md:py-20 border-t border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer Navigation</h2>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">

        {/* Column 1: Logo & Tagline */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-2xl font-serif text-white tracking-wider mb-4">SereneNature</span>
          <p className="text-lg font-light text-white/70 mb-4">Calm • Empower • Grow.</p>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SereneNature. All rights reserved.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-medium text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-base font-light"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-medium text-white mb-5">Connect</h3>
          <div className="flex space-x-5">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label={`Visit us on ${link.label}`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
          <div className="mt-6 text-sm text-gray-400 flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <a href="mailto:info@serenenature.com" className="hover:text-white transition-colors">info@serenenature.com</a>
          </div>
        </div>

        {/* Column 4: Newsletter Signup (Mini Version) */}
        <div className="md:col-span-1 lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-medium text-white mb-5">Stay Updated</h3>
          <p className="text-sm text-white/70 mb-4">
            Join our newsletter for wellness tips and exclusive offers.
          </p>
          <form ref={newsletterFormRef} onSubmit={handleNewsletterSubmit} className="w-full max-w-xs space-y-3">
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email for newsletter signup"
              className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-300 ${
                loading ? 'cursor-not-allowed opacity-70' : ''
              }`}
              disabled={loading}
              aria-live="assertive"
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          {success && (
            <div
              ref={successMessageRef}
              className="mt-3 text-green-400 text-sm font-medium"
              role="alert"
              aria-live="assertive"
            >
              Subscribed!
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}

export default Footer;