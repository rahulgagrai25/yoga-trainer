'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const freebieRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
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

    // Subheadline animation
    if (subheadlineRef.current) {
      tl.fromTo(subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    // Benefits list animation
    if (benefitsRef.current) {
      const items = benefitsRef.current.querySelectorAll('li');
      tl.fromTo(items,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.5'
      );
    }

    // Freebie text animation
    if (freebieRef.current) {
      tl.fromTo(freebieRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    // Form elements animation (staggered)
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, button');
      tl.fromTo(formElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        '-=0.3'
      );
    }

    // CTA button animation (if separate from form)
    if (ctaButtonRef.current) {
      tl.fromTo(ctaButtonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
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

    // Simulate async newsletter signup
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Animate success message in
      if (successMessageRef.current) {
        gsap.to(successMessageRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }

      // Clear form inputs
      if (formRef.current) {
        (formRef.current.querySelector('input[type="email"]') as HTMLInputElement).value = '';
      }
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 w-full bg-gradient-to-b from-amber-50 to-orange-100 overflow-hidden"
      aria-label="Join the Wellness Community Newsletter Signup"
    >
      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* Decorative Wellness Icon */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-16 h-16 text-orange-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
          </svg>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-2"
        >
          Join the Wellness Community
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl font-light text-gray-700 mb-8 max-w-xl mx-auto"
        >
          Empower your mind and body with daily inspiration and expert tips.
        </p>

        {/* Benefits List */}
        <ul
          ref={benefitsRef}
          className="mb-10 max-w-xl mx-auto text-left text-gray-700 space-y-3 list-disc list-inside"
          aria-label="Benefits of joining the wellness community"
        >
          <li>Exclusive wellness tips and routines</li>
          <li>Early access to new courses and events</li>
          <li>Supportive community of like-minded individuals</li>
        </ul>

        {/* Freebie */}
        <p
          ref={freebieRef}
          className="text-xl md:text-2xl font-light text-gray-700 mb-10 max-w-2xl mx-auto"
        >
          Sign up for our newsletter and get a <span className="font-medium text-orange-700">Free 5-Minute Morning Routine PDF</span>!
        </p>

        {/* Newsletter Signup Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          aria-live="polite"
          aria-atomic="true"
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email for newsletter"
            className="flex-grow px-6 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300 text-gray-800 bg-white/80"
            required
            disabled={loading}
          />
          <button
            type="submit"
            ref={ctaButtonRef}
            className={`px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            disabled={loading}
            aria-live="assertive"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Signing Up...
              </>
            ) : (
              'Sign Up Now'
            )}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <div
            ref={successMessageRef}
            className="mt-6 text-green-700 font-semibold text-lg"
            role="alert"
            aria-live="assertive"
          >
            🎉 Thank you for joining our community! Check your email for the free PDF.
          </div>
        )}
      </div>
    </section>
  );
}

export default Community;