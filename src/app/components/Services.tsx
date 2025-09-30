/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Services data
  const services = [
    {
      id: 1,
      title: "1:1 Coaching",
      description: "Personalized one-on-one sessions tailored to your specific health and wellness goals.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          ></path>
        </svg>
      ),
      color: "bg-[#ADf0E8]",
      borderColor: "border-[#ADf0E8]",
      iconColor: "text-[#55D0C7]",
    },
    {
      id: 2,
      title: "Group Wellness",
      description: "Join small group sessions for shared learning, motivation, and community support.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
      color: "bg-[#ADf0E8]",
      borderColor: "border-[#ADf0E8]",
      iconColor: "text-[#55D0C7]",
    },
    {
      id: 3,
      title: "Corporate Wellness",
      description: "Bring wellness to your workplace with customized programs for teams and organizations.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
      ),
      color: "bg-[#ADf0E8]",
      borderColor: "border-[#ADf0E8]",
      iconColor: "text-[#55D0C7]",
    },
    {
      id: 4,
      title: "Lifestyle Guidance",
      description: "Comprehensive lifestyle assessment and ongoing support for holistic well-being.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
      ),
      color: "bg-[#ADf0E8]",
      borderColor: "border-[#ADf0E8]",
      iconColor: "text-[#55D0C7]",
    },
  ];

  useEffect(() => {
    // Animation for the section heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Animation for service cards - different animation for mobile
    if (window.innerWidth < 768) {
      // Mobile animation - horizontal entrance
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    } else {
      // Desktop animation - vertical entrance
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Add cards to ref array with proper typing
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-24 relative overflow-hidden bg-[#fcfaf8] h-auto"
      id="services"
    >
      {/* Decorative elements - hidden on mobile */}
      <div className="max-sm:hidden">
        <img
          className="absolute h-[35%] w-auto right-[-70px] top-[-3px] z-10"
          src="/palm.png"
          alt=""
        />
      </div>
      <div className="max-sm:hidden">
        <img
          className="absolute h-[34%] w-auto left-[-3px] bottom-[0px] z-10"
          src="/palm2.png"
          alt=""
        />
      </div>

      <div className="absolute top-[600px] left-[800px] opacity-35 z-0 max-sm:top-0 max-sm:left-0 max-sm:opacity-10">
        <img className="h-full w-auto" src="/yoga.png" alt="" />
      </div>

      <div className="absolute top-[40px] left-[40px] z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga4.png" alt="" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-20 pb-16 md:pb-[400px]">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-light text-[#333] mb-4 md:mb-6 font-serif"
          >
            Coaching Packages
          </h2>
          <p className="text-lg md:text-xl text-[#555] max-w-2xl mx-auto font-sans px-4">
            Discover the right wellness journey for your needs and lifestyle
          </p>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="md:hidden flex justify-center mb-6">
          <div className="flex items-center space-x-2 text-[#55D0C7]">
            <span className="text-sm">Scroll horizontally</span>
            <svg className="w-4 h-4 animate-bounce horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Services Container - Horizontal scroll on mobile */}
        <div 
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            scrollPadding: '0 1rem'
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              ref={addToRefs}
              className={`flex-shrink-0 w-80 md:w-auto rounded-2xl border ${service.borderColor} bg-white p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group scroll-snap-align-start`}
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 md:w-16 md:h-16 ${service.color} rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#55D0C7] transition-colors duration-300`}
              >
                <div
                  className={`${service.iconColor} group-hover:text-white transition-colors duration-300`}
                >
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-medium text-[#333] mb-3 md:mb-4 group-hover:text-[#55D0C7] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#555] mb-4 md:mb-6 flex-grow font-light text-sm md:text-base">
                {service.description}
              </p>

              {/* CTA Button */}
              <button className="self-start px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-[#55D0C7] bg-transparent border border-[#55D0C7] rounded-lg hover:bg-[#55D0C7] hover:text-white transition-colors duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Quote Section - Compact on mobile */}
        <div className="relative top-8 md:top-[100px] text-center md:text-left">
          <h1 className="text-2xl md:text-6xl font-medium text-gray-700 px-4 md:px-0">
            &quot;Be the part of the Transformation Journey.&quot;
          </h1>
        </div>

        <div className="mt-20 absolute top-[400px] right-[-140px] max-sm:hidden">
          <img className="h-full w-auto" src="/yogaf1.png" alt="" />
        </div>
      </div>

      {/* Custom scrollbar styles */}
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

export default Services;