'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Import Lucide React icons for social media
import { Facebook, Instagram, Linkedin, Twitter, CalendarDays, Mail, Phone } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const calendarCtaRef = useRef<HTMLDivElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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

    // Form elements animation (staggered)
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, textarea, button');
      tl.fromTo(formElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );
    }

    // Calendar CTA animation
    if (calendarCtaRef.current) {
      tl.fromTo(calendarCtaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.3'
      );
    }

    // Social links animation
    if (socialLinksRef.current) {
      const links = socialLinksRef.current.querySelectorAll('a');
      tl.fromTo(links,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.2'
      );
    }

    // Success message animation (initially hidden)
    if (successMessageRef.current) {
      gsap.set(successMessageRef.current, { opacity: 0, y: 20 });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate async form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Animate success message in
      if (successMessageRef.current) {
        gsap.to(successMessageRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }

      // Clear form inputs
      if (formRef.current) {
        (formRef.current.querySelector('input[name="name"]') as HTMLInputElement).value = '';
        (formRef.current.querySelector('input[name="email"]') as HTMLInputElement).value = '';
        (formRef.current.querySelector('textarea[name="message"]') as HTMLTextAreaElement).value = '';
      }
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      id="contact"
      aria-label="Contact Us"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-gray-800 mb-12"
        >
          Ready to start your wellness journey?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-medium text-gray-800 mb-6">Send us a message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your wellness goals..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300 text-gray-800 resize-y"
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                  loading ? 'cursor-not-allowed opacity-70' : ''
                }`}
                disabled={loading}
                aria-live="assertive"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {/* Success Message */}
            {success && (
              <div
                ref={successMessageRef}
                className="mt-6 text-green-700 font-semibold text-center text-lg"
                role="alert"
                aria-live="assertive"
              >
                ✅ Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}
          </div>

          {/* Right Column: Calendar & Socials */}
          <div className="space-y-12">
            {/* Calendar Integration */}
            <div ref={calendarCtaRef} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
              <CalendarDays className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-gray-800 mb-4">Book a Coaching Call</h3>
              <p className="text-gray-600 mb-6">
                Schedule a free discovery call to discuss your goals and how we can help.
              </p>
              <a
                href="https://calendly.com/your-wellness-coach" // Replace with actual Calendly link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                aria-label="Book a Coaching Call on Calendly"
              >
                <CalendarDays className="w-5 h-5 mr-3" />
                Schedule Now
              </a>
            </div>

            {/* Social Profiles */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-medium text-gray-800 mb-6 text-center">Connect with us</h3>
              <div ref={socialLinksRef} className="flex justify-center space-x-6">
                <a
                  href="https://facebook.com/yourwellnesscoach" // Replace with actual Facebook link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Visit us on Facebook"
                >
                  <Facebook className="w-8 h-8" />
                </a>
                <a
                  href="https://instagram.com/yourwellnesscoach" // Replace with actual Instagram link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-600 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Visit us on Instagram"
                >
                  <Instagram className="w-8 h-8" />
                </a>
                <a
                  href="https://linkedin.com/in/yourwellnesscoach" // Replace with actual LinkedIn link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-700 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Visit us on LinkedIn"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
                <a
                  href="https://twitter.com/yourwellnesscoach" // Replace with actual Twitter link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  aria-label="Visit us on Twitter"
                >
                  <Twitter className="w-8 h-8" />
                </a>
              </div>
              <div className="mt-8 text-center space-y-3 text-gray-600">
                <p className="flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2 text-gray-500" />
                  <a href="mailto:info@serenenature.com" className="hover:text-blue-600 transition-colors">info@serenenature.com</a>
                </p>
                <p className="flex items-center justify-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-500" />
                  <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">+1 (234) 567-890</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;