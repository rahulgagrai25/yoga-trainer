// FileName: /Testimonial.tsx
'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // Keep if you want to animate the section itself
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Import Lucide React icons
import { Users, Calendar, ThumbsUp, ShieldCheck, Clock, Share, Rocket, Zap, Gem } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Placeholder for cn utility - UPDATED TO HANDLE OBJECTS
type ClassValue = string | Record<string, boolean | undefined> | null | undefined;

const cn = (...args: ClassValue[]) => {
  const classes: string[] = [];
  args.forEach(arg => {
    if (typeof arg === 'string' && arg) {
      classes.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  });
  return classes.filter(Boolean).join(' ');
};

// --- NEW Testimonial Interface for TestimonialStack ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string; // Renamed from 'designation' to 'role' for consistency
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
  category: 'Individuals' | 'Teams' | 'Parents'; // Added category for filtering
}

// --- Original Testimonial Data (adapted for new interface) ---
const allTestimonialsData: Testimonial[] = [
  {
    id: 1,
    quote: "This retreat was a life-changing experience. I felt completely rejuvenated and reconnected with myself. The guidance was exceptional, and the natural setting was breathtaking.",
    name: "Sarah J.",
    role: "Marketing Manager",
    initials: "SJ",
    tags: [{ text: 'Personal Growth', type: 'default' }, { text: 'Retreat', type: 'featured' }],
    stats: [{ icon: ThumbsUp, text: 'Highly Recommended' }, { icon: Calendar, text: 'Joined 3 months ago' }],
    avatarGradient: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
    category: 'Individuals',
  },
  {
    id: 2,
    quote: "An incredible journey of self-discovery. The mindfulness practices and outdoor activities were perfectly balanced. I left feeling refreshed and inspired.",
    name: "David L.",
    role: "Software Engineer",
    initials: "DL",
    tags: [{ text: 'Mindfulness', type: 'default' }, { text: 'Self-Discovery', type: 'featured' }],
    stats: [{ icon: Rocket, text: 'Inspired' }, { icon: Clock, text: '1 month ago' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
    category: 'Individuals',
  },
  {
    id: 3,
    quote: "Our team's productivity and cohesion significantly improved after the wellness workshop. The practical tools for stress management were invaluable.",
    name: "Emily R.",
    role: "Team Lead, Tech Solutions",
    initials: "ER",
    tags: [{ text: 'Team Building', type: 'featured' }, { text: 'Corporate', type: 'default' }],
    stats: [{ icon: Users, text: 'Team of 15' }, { icon: ShieldCheck, text: 'Verified Impact' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    category: 'Teams',
  },
  {
    id: 4,
    quote: "I've attended several retreats, and this one stands out. The attention to detail and the genuine care from the organizers made it truly special.",
    name: "Michael B.",
    role: "Entrepreneur",
    initials: "MB",
    tags: [{ text: 'Luxury', type: 'default' }, { text: 'Exclusive', type: 'featured' }],
    stats: [{ icon: Gem, text: 'Exceptional' }, { icon: Share, text: 'Shared 5 times' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
    category: 'Individuals',
  },
  {
    id: 5,
    quote: "As a busy parent, finding time for self-care is hard. This program offered realistic strategies that fit into my schedule and truly made a difference.",
    name: "Jessica T.",
    role: "Full-time Mom",
    initials: "JT",
    tags: [{ text: 'Parenting', type: 'featured' }, { text: 'Self-Care', type: 'default' }],
    stats: [{ icon: Clock, text: 'Daily Routine' }, { icon: ThumbsUp, text: 'Life-changing' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    category: 'Parents',
  },
  {
    id: 6,
    quote: "The coaching helped our leadership team develop better communication and resilience. Highly recommend for corporate wellness initiatives.",
    name: "Robert K.",
    role: "CEO, Financial Services",
    initials: "RK",
    tags: [{ text: 'Leadership', type: 'featured' }, { text: 'Corporate', type: 'default' }],
    stats: [{ icon: Users, text: 'Leadership Team' }, { icon: Zap, text: 'Improved Resilience' }],
    avatarGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    category: 'Teams',
  },
  {
    id: 7,
    quote: "I finally feel like I have the tools to manage daily stress and be more present with my family. A truly transformative experience for parents.",
    name: "Maria S.",
    role: "Educator & Mother",
    initials: "MS",
    tags: [{ text: 'Family Wellness', type: 'featured' }, { text: 'Stress Management', type: 'default' }],
    stats: [{ icon: Calendar, text: 'Ongoing Support' }, { icon: ThumbsUp, text: 'Highly Effective' }],
    avatarGradient: 'linear-gradient(135deg, #a855f7, #9333ea)',
    category: 'Parents',
  },
  {
    id: 8,
    quote: "The personalized coaching helped me overcome my mobility limitations and regain confidence in my physical abilities. Fantastic support!",
    name: "Tom H.",
    role: "Retired Engineer",
    initials: "TH",
    tags: [{ text: 'Mobility', type: 'default' }, { text: 'Personalized Coaching', type: 'featured' }],
    stats: [{ icon: ShieldCheck, text: 'Regained Confidence' }, { icon: Clock, text: '3 months program' }],
    avatarGradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    category: 'Individuals',
  },
];

// --- NEW TestimonialStack Component (from your provided code) ---
export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(0); // Changed to number to track drag state more robustly
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(1); // Set to 1 to indicate dragging
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return; // Check if isDragging is truthy (1)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return; // Check if isDragging is truthy (1)
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(0); // Reset to 0
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) { // Check if isDragging is truthy (1)
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Autoplay functionality (adapted from your original CircularTestimonials)
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!isDragging) { // Only autoplay if not currently dragging
        navigate(activeIndex + 1);
      }
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(autoplayInterval);
  }, [activeIndex, isDragging, navigate]);


  if (!testimonials?.length) return (
    <div className="testimonial-container text-center text-gray-600 py-10">
      No testimonials available for this category yet.
    </div>
  );

  return (
    <section className="testimonials-stack-wrapper relative pb-10 pt-10"> {/* Added padding for pagination */}
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;
        // Calculate the card's position in the display order
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        // --- DYNAMIC STYLE CALCULATION ---
        const style: React.CSSProperties = {};
        if (displayOrder === 0) { // The active card
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) { // Cards stacked behind
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -2 * displayOrder; // in rem
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.2 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else { // Cards that are out of view
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClasses = (type: 'featured' | 'default') => type === 'featured'
          ? 'bg-blue-600/20 text-blue-600 border border-blue-600/30' // Adjusted to fit existing color scheme
          : 'bg-gray-200 text-gray-700'; // Adjusted to fit existing color scheme

        return (
          <div
            ref={(el) => { cardRefs.current[index] = el; }} // Corrected ref assignment: no explicit return
            key={testimonial.id}
            className="testimonial-card glass-effect backdrop-blur-xl"
            style={style} // Apply dynamic styles here
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-base" style={{ background: testimonial.avatarGradient }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-medium text-lg">{testimonial.name}</h3> {/* Adjusted text color */}
                    <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p> {/* Adjusted text color */}
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-700 leading-relaxed text-lg mb-6">"{testimonial.quote}"</blockquote> {/* Adjusted text color */}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-gray-200 pt-4 gap-4"> {/* Adjusted border color */}
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={['text-xs', 'px-2', 'py-1', 'rounded-md', tagClasses(tag.type)].join(' ')}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600"> {/* Adjusted text color */}
                  {testimonial.stats.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <span key={i} className="flex items-center">
                        <IconComponent className="mr-1.5 h-3.5 w-3.5" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="pagination flex gap-2 justify-center absolute bottom-0 left-0 right-0">
        {testimonials.map((_, index) => (
          <button key={index} aria-label={`Go to testimonial ${index + 1}`} onClick={() => navigate(index)} className={`pagination-dot ${activeIndex === index ? 'active' : ''}`} />
        ))}
      </div>
      <style jsx>{`
        .testimonials-stack-wrapper {
          min-height: 30rem; /* Ensure enough space for the stack */
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .testimonial-card {
          position: absolute;
          width: 100%;
          max-width: 36rem; /* Max width for the cards */
          background-color: rgba(255, 255, 255, 0.8); /* Light background for glass effect */
          border-radius: 1.5rem; /* Rounded corners */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Soft shadow */
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: grab;
          left: 50%;
          transform: translateX(-50%);
          transform-origin: center bottom; /* Scale from bottom center */
        }
        .testimonial-card.is-dragging {
          transition: none; /* Disable transition during drag */
          cursor: grabbing;
        }
        .pagination {
          bottom: 1rem; /* Position pagination dots */
        }
        .pagination-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: #d1d5db; /* Gray-300 */
          transition: background-color 0.3s, transform 0.3s;
          border: none;
          cursor: pointer;
        }
        .pagination-dot.active {
          background-color: #3b82f6; /* Blue-600 */
          transform: scale(1.2);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .testimonial-card {
            max-width: 90%; /* Adjust max-width for smaller screens */
          }
        }
      `}</style>
    </section>
  );
};


function TestimonialSection() {
  const [activeCategory, setActiveCategory] = useState<'Individuals' | 'Teams' | 'Parents'>('Individuals');
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const filteredTestimonials = useMemo(() => {
    return allTestimonialsData.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (!sectionRef.current) return;

    document.fonts.ready.then(() => {
      // Animation for the main heading
      if (headingRef.current) {
        const splitHeading = new SplitText(headingRef.current, {
          type: 'lines',
          linesClass: 'line-inner',
        });

        gsap.set(splitHeading.lines, {
          yPercent: 100,
          autoAlpha: 0,
          transformOrigin: '50% 100%',
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }).to(splitHeading.lines, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }

      // Animation for the tabs
      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);


  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-light text-center text-gray-800 mb-12">
          What Our Clients Say
        </h2>

        {/* Tabs for categories */}
        <div ref={tabsRef} className="flex justify-center space-x-4 md:space-x-6 mb-12">
          {['Individuals', 'Teams', 'Parents'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as 'Individuals' | 'Teams' | 'Parents')}
              className={cn(
                "px-6 py-3 rounded-full text-lg font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Testimonials Stack */}
        <TestimonialStack testimonials={filteredTestimonials} visibleBehind={2} />
      </div>
    </section>
  );
}

export default TestimonialSection;