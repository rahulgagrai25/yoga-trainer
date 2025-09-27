"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Testimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }

    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "This program completely transformed my daily routine and mindset. The guidance is so supportive and practical – I feel more balanced than ever!",
      name: "Sarah Johnson",
      role: "Wellness Coach",
      rating: 5.0,
      image: "https://i.pravatar.cc/150?img=3",
      course: "Foundations of Holistic Wellness",
    },
    {
      id: 2,
      quote:
        "The breathwork sessions are life-changing. I've reduced my stress levels dramatically and now incorporate these techniques into my yoga practice every day.",
      name: "Michael Chen",
      role: "Yoga Instructor",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=4",
      course: "Breathwork Fundamentals",
    },
    {
      id: 3,
      quote:
        "Mobility Mastery helped me overcome chronic back pain. The sequences are easy to follow and have improved my overall movement and confidence.",
      name: "Emily Rodriguez",
      role: "https://i.pravatar.cc/150?img=5",
      rating: 5.0,
      image: "/testimonial-emily.jpg",
      course: "Mobility Mastery",
    },
    {
      id: 4,
      quote:
        "Mindful Eating Mastery taught me to listen to my body. No more restrictive diets – just intuitive, nourishing choices that make me feel amazing.",
      name: "David Patel",
      role: "Nutrition Student",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=6",
      course: "Mindful Eating Mastery",
    },
    {
      id: 5,
      quote:
        "The Stress Management Toolkit is my go-to for busy days. Simple, effective tools that fit into any schedule and truly build resilience.",
      name: "Lisa Thompson",
      role: "Corporate Executive",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=7",
      course: "Stress Management Toolkit",
    },
    {
      id: 6,
      quote:
        "Starting my day with the Morning Routine Revolution has been a game-changer. More energy, focus, and positivity from the very first week!",
      name: "Alex Rivera",
      role: "Entrepreneur",
      rating: 5.0,
      image: "https://i.pravatar.cc/150?img=8",
      course: "Morning Routine Revolution",
    },
  ];

  // autoplay for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 w-full bg-[#f8f5f2] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute w-auto left-[-90px] top-[20px] z-10 scale-x-[-1]">
        <img src="/yogaf2.png" alt="" />
      </div>
      <div className="absolute h-[34%] w-auto right-[-2px] bottom-[28px] z-10 scale-x-[-1]">
        <img src="/palm2.png" alt="" />
      </div>
      <div className="absolute bottom-[50px] left-[100px] opacity-35 z-0">
        <img
          className="h-full w-auto"
          src="/yoga.png"
          alt="Rotating wheel"
        />
      </div>

      <div className="absolute top-[40px] right-[40px] z-0">
        <img className="h-full w-auto" src="/yoga4.png" alt="" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl font-light text-center text-[#333] mb-6 font-serif"
        >
          What Our Students Say
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-xl font-light text-center text-[#555] mb-12 max-w-3xl mx-auto font-sans"
        >
          Hear from those who&apos;ve transformed their lives through our
          wellness programs. Join thousands of students finding balance,
          strength, and inner peace.
        </p>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-full px-4 flex-shrink-0"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 max-w-2xl mx-auto">
                  <div className="flex items-start mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(testimonial.rating)
                                ? "text-[#c37f67]"
                                : "text-[#ADf0E8]"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-[#55D0C7] font-medium">
                        {testimonial.course}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-[#555] text-lg italic mb-4 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <h4 className="text-xl font-semibold text-[#333]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#999]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-[#c37f67]" : "bg-[#ddd]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mt-16">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-4xl font-bold text-[#c37f67]">2,000+</p>
            <p className="text-lg text-[#555]">Happy Students</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-4xl font-bold text-[#c37f67]">4.9</p>
            <p className="text-lg text-[#555]">Average Rating</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-4xl font-bold text-[#c37f67]">98%</p>
            <p className="text-lg text-[#555]">Recommendation Rate</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-4xl font-bold text-[#c37f67]">500+</p>
            <p className="text-lg text-[#555]">Testimonials</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            ref={ctaRef}
            className="bg-[#c37f67] hover:bg-[#c76947] text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
          >
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
