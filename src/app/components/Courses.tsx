/* eslint-disable @next/next/no-img-element */
'use client'
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All Courses");

  useEffect(() => {
    // Animation timeline
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

    // Subtext animation
    if (subtextRef.current) {
      tl.fromTo(subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    // Cards animation - different for mobile/desktop
    if (cardsRef.current) {
      const cards = (cardsRef.current as HTMLElement).querySelectorAll('.course-card');
      
      if (window.innerWidth < 768) {
        // Mobile animation - horizontal entrance
        tl.fromTo(cards,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          '-=0.3'
        );
      } else {
        // Desktop animation - vertical entrance
        tl.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
          '-=0.3'
        );
      }
    }

    // CTA button animation
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
      );
    }

    return () => {
      // Clean up animations
      tl.kill();
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: "Foundations of Holistic Wellness",
      category: "Foundations",
      type: "8-Week Program",
      price: "$197",
      originalPrice: "$297",
      duration: "8 weeks",
      lessons: 48,
      students: 500,
      rating: 4.9,
      description: "Transform your approach to wellness with this comprehensive program covering mindful movement, breathwork, nutrition, and stress management.",
      features: ["8 comprehensive modules", "48 video lessons", "+2 more features"],
      image: "https://aaron-calm-wellness.vercel.app/assets/online-courses-DVC8hDa3.jpg",
      tags: ["Most Popular", "Top Rated"]
    },
    {
      id: 2,
      title: "Breathwork Fundamentals",
      category: "Mindfulness",
      type: "Video Course",
      price: "$67",
      duration: "3 hours",
      lessons: 12,
      students: 320,
      rating: 4.8,
      description: "Master the basics of conscious breathing with practical techniques you can use anywhere.",
      features: ["12 guided practices", "Downloadable audio", "+2 more features"],
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      tags: ["New", "Best Seller"]
    },
    {
      id: 3,
      title: "Mobility Mastery",
      category: "Movement",
      type: "Video Course",
      price: "$89",
      duration: "4.5 hours",
      lessons: 18,
      students: 280,
      rating: 4.9,
      description: "Comprehensive movement training to prevent injury and improve daily function.",
      features: ["18 movement sequences", "Injury prevention guide", "+2 more features"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      tags: ["Trending", "Top Rated"]
    },
    {
      id: 4,
      title: "Mindful Eating Mastery",
      category: "Mindfulness",
      type: "Video Course",
      price: "$79",
      duration: "2.5 hours",
      lessons: 15,
      students: 240,
      rating: 4.7,
      description: "Develop a healthy relationship with food through mindful eating practices and intuitive nutrition.",
      features: ["15 mindful eating practices", "Nutrition guide", "+2 more features"],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      tags: []
    },
    {
      id: 5,
      title: "Stress Management Toolkit",
      category: "Mindfulness",
      type: "Video Course",
      price: "$59",
      duration: "2 hours",
      lessons: 10,
      students: 450,
      rating: 4.8,
      description: "Learn practical tools and techniques to manage stress and build resilience in daily life.",
      features: ["10 stress management tools", "Meditation practices", "+2 more features"],
      image: "https://images.moneycontrol.com/static-mcnews/2024/07/20240708094629_yoga.jpg?impolicy=website&width=770&height=431",
      tags: ["Essential"]
    },
    {
      id: 6,
      title: "Morning Routine Revolution",
      category: "Foundations",
      type: "Video Course",
      price: "$47",
      duration: "1.5 hours",
      lessons: 8,
      students: 380,
      rating: 4.9,
      description: "Create a powerful morning routine that sets you up for success and wellness throughout the day.",
      features: ["8 morning practices", "Routine templates", "+2 more features"],
      image: "https://insights.ibx.com/wp-content/uploads/2020/04/relaxation.jpg",
      tags: ["Quick Win", "Top Rated"]
    },
  ];

  const categories = [
    { name: "All Courses", count: 6 },
    { name: "Foundations", count: 2 },
    { name: "Movement", count: 2 },
    { name: "Mindfulness", count: 2 },
  ];

  const filteredCourses = activeCategory === "All Courses" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24 w-full bg-[#fcfaf8] overflow-hidden"
    >
      {/* Decorative elements - hidden on mobile */}
      <div className='max-sm:hidden'>
        <img 
          className="absolute h-[20%] w-auto right-[-60px] top-[-3px] z-10" 
          src="/palm.png" 
          alt="" 
        />
      </div>
      <div className='max-sm:hidden'>
        <img 
          className="absolute h-[20%] w-auto left-[-3px] bottom-[0px] z-10" 
          src="/palm2.png" 
          alt="" 
        />
      </div>
      <div className="absolute top-[600px] right-[0px] opacity-35 z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga.png" alt="" />
      </div>
      <div className="absolute top-[800px] left-[0px] opacity-35 z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga.png" alt="" />
      </div>
      <div className="absolute bottom-[100px] right-[0px] opacity-35 z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga3.png" alt="" />
      </div>
      <div className="absolute top-[40px] left-[40px] z-0 max-sm:hidden">
        <img className="h-full w-auto" src="/yoga5.png" alt="" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-20">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl md:text-5xl font-light text-center text-[#333] mb-4 md:mb-6 font-serif"
        >
          Courses & Resources
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-lg md:text-xl font-light text-center text-[#555] mb-8 md:mb-16 max-w-3xl mx-auto font-sans px-2"
        >
          Transform your life with our comprehensive wellness courses. Learn at your own pace with expert guidance.
        </p>

        {/* Course Categories - Horizontal scroll on mobile */}
        <div className="relative mb-8 md:mb-12">
          {/* Scroll indicator for mobile */}
          <div className="md:hidden flex justify-center mb-4">
            <div className="flex items-center space-x-2 text-[#55D0C7] text-sm">
              <span>Swipe to browse</span>
              <svg className="w-4 h-4 animate-bounce horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex md:flex-wrap gap-3 md:gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex-shrink-0 px-5 py-2 rounded-full border text-sm md:text-lg font-light transition-colors duration-300 scroll-snap-align-start ${
                  activeCategory === category.name
                    ? 'bg-[#ADf0E8] border-[#55D0C7] text-[#333]'
                    : 'bg-white border-[#ADf0E8] text-[#555] hover:bg-[#ADf0E8] hover:text-[#333]'
                }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards - Horizontal scroll on mobile */}
        <div className="relative">
          {/* Mobile scroll indicator */}
          <div className="md:hidden flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-[#555]">
              {filteredCourses.length} courses
            </span>
            <div className="flex items-center space-x-2 text-[#55D0C7] text-sm">
              <span>Swipe to view</span>
              <svg className="w-4 h-4 animate-bounce horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div 
            ref={cardsRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-6 md:pb-0 scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 1rem'
            }}
          >
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="course-card flex-shrink-0 w-80 md:w-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative h-40 md:h-48 w-full overflow-hidden rounded-t-2xl">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {course.tags.map((tag, index) => (
                      <span key={index} className="bg-[#ADf0E8] text-[#333] text-xs font-medium px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <span className="text-xs md:text-sm font-medium text-[#55D0C7] mb-2 block">{course.category}</span>
                  <h3 className="text-lg md:text-xl font-semibold text-[#333] mb-2 group-hover:text-[#c37f67] transition-colors duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-[#555] text-xs md:text-sm mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-[#555] text-xs md:text-sm">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-[#c37f67] mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                      {course.rating} ({course.students})
                    </div>
                    <div className="text-base md:text-lg font-bold text-[#c37f67]">
                      {course.price}
                      {course.originalPrice && <span className="text-xs md:text-sm text-[#999] line-through ml-1">{course.originalPrice}</span>}
                    </div>
                  </div>
                  <ul className="space-y-1 text-xs md:text-sm text-[#555] mb-3">
                    {course.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-[#55D0C7] mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-[#c37f67] hover:bg-[#c76947] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors duration-300">
                    {course.type.includes("Program") ? "Enroll Now" : "Learn More"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section - 2x2 grid on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center my-12 md:mb-16">
          <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-2xl md:text-4xl font-bold text-[#c37f67]">2,000+</p>
            <p className="text-sm md:text-lg text-[#555]">Students</p>
          </div>
          <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-2xl md:text-4xl font-bold text-[#c37f67]">4.8</p>
            <p className="text-sm md:text-lg text-[#555]">Avg Rating</p>
          </div>
          <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-2xl md:text-4xl font-bold text-[#c37f67]">95%</p>
            <p className="text-sm md:text-lg text-[#555]">Completion</p>
          </div>
          <div className="p-4 md:p-6 bg-white rounded-2xl shadow-sm border border-[#ADf0E8]">
            <p className="text-2xl md:text-4xl font-bold text-[#c37f67]">24/7</p>
            <p className="text-sm md:text-lg text-[#555]">Access</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            ref={ctaRef}
            className="bg-[#c37f67] hover:bg-[#c76947] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
          >
            Access All Resources
          </button>
        </div>
      </div>

      {/* Custom styles for mobile scroll and animations */}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default Courses;