import React, { useRef } from "react";
import { motion, useInView, Easing } from "framer-motion";
import { Heart, Users, Wind, Clock, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const upcomingRetreats = [
  {
    id: 1,
    title: "Sedona, Arizona",
    date: "June 15-18, 2023",
    price: "$1,299",
    available: true,
    description: "A rejuvenating desert retreat focused on breathwork and mobility.",
    highlights: [
      "Daily yoga sessions",
      "Breathwork workshops",
      "Guided mobility exercises",
      "Nature immersion",
    ],
    image: "https://images.pexels.com/photos/3822166/pexels-photo-3822166.jpeg",
  },
  {
    id: 2,
    title: "Catskills, New York",
    date: "July 20-24, 2023",
    price: "$1,499",
    available: true,
    description: "Forest immersion with daily yoga and holistic lifestyle coaching.",
    highlights: [
      "Forest bathing",
      "Holistic nutrition",
      "Mindfulness practices",
      "Group coaching",
    ],
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
  },
  {
    id: 3,
    title: "Big Sur, California",
    date: "August 12-16, 2023",
    price: "$1,799",
    available: false,
    description: "Coastal retreat emphasizing injury prevention and mindfulness.",
    highlights: [
      "Coastal hikes",
      "Injury prevention workshops",
      "Sunset meditation",
      "Organic meals",
    ],
    image: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
  },
];

const retreatBenefits = [
  {
    icon: Users,
    title: "Holistic Wellness Programs",
    desc: "Experience comprehensive wellness with programs that combine yoga, meditation, and nutrition.",
  },
  {
    icon: Wind,
    title: "Group Meditation Sessions",
    desc: "Join guided group meditations to deepen your practice and connect with others.",
  },
  {
    icon: Heart,
    title: "Relaxation Techniques",
    desc: "Learn proven relaxation methods to reduce stress and improve overall well-being.",
  },
  {
    icon: Clock,
    title: "Sustainable Practices",
    desc: "Develop habits that support long-term health and balance in your daily life.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as Easing },
  },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const UpcomingRetreats = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      aria-label="Upcoming wellness retreats"
      className="relative py-10 md:py-24 w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0ede8] overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#ADf0E8_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#55D0C7_0%,_transparent_50%)]"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-[-300px] right-[-300px] opacity-15 z-0 hidden md:block">
        <img
          className="h-200 w-auto"
          src="/yoga3.png"
          alt="Rotating wheel"
        />
      </div>

      <div className="absolute top-10 left-10 opacity-15 z-0 hidden md:block">
        <img className="h-16 w-auto" src="/yoga3.png" alt="Decorative element" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-15 z-0 hidden md:block">
        <img className="h-20 w-auto" src="/yoga.png" alt="Decorative element" />
      </div>

      {/* Palm leaf decorations */}
      <div className="absolute h-[15%] w-auto right-[-80px] top-[-3px] z-10 hidden md:block">
        <img src="/palm.png" alt="" />
      </div>
      <div className="absolute h-[34%] w-auto left-[-3px] bottom-[-220px] z-10 hidden md:block">
        <img src="/palm2.png" alt="" />
      </div>
      <div className="absolute h-[auto] w-auto left-[0px] top-[50px] z-10 scale-x-[-1] hidden md:block">
        <img src="/yoga7.png" alt="" />
      </div> 
      <div className="absolute h-[34%] w-auto right-[-3px] bottom-[10px] z-10 hidden md:block">
        <img src="/yogaf3.png" alt="" />
      </div>      

      <div className="container mx-auto px-3 md:px-4 max-w-6xl relative z-20">
        {/* Main Heading */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-light text-[#333] mb-3 md:mb-6 font-serif">
            Upcoming Retreats
          </h2>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl font-light text-[#555] max-w-3xl mx-auto font-sans px-2"
          >
            Discover immersive wellness experiences designed to nurture your body, mind, and spirit. 
            Choose your next retreat and begin your journey to holistic health.
          </motion.p>
        </motion.div>

        {/* Retreat Cards Horizontal Scroll for Mobile */}
        <div className="relative mb-10 md:mb-20">
          {/* Scroll buttons for mobile */}
          <div className="flex justify-between items-center mb-4 md:hidden px-2">
            <h3 className="text-lg font-medium text-[#333]">Available Retreats</h3>
            <div className="flex space-x-2">
              <button 
                onClick={scrollLeft}
                className="p-2 rounded-full bg-white/90 border border-[#ADf0E8] shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-[#55D0C7]" />
              </button>
              <button 
                onClick={scrollRight}
                className="p-2 rounded-full bg-white/90 border border-[#ADf0E8] shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-[#55D0C7]" />
              </button>
            </div>
          </div>

          {/* Scroll indicator for mobile */}
          <div className="text-center mb-3 md:hidden">
            <span className="text-xs text-[#555] bg-white/70 px-2 py-1 rounded-full">Swipe or use buttons to explore</span>
          </div>

          <motion.div 
            ref={scrollContainerRef}
            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide md:auto-cols-fr"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {/* Hide scrollbar for Webkit browsers */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {upcomingRetreats.map(
              ({ id, title, date, price, available, description, highlights, image }, idx) => (
                <motion.article
                  key={id}
                  variants={fadeInUp}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(85, 208, 199, 0.15)" }}
                  className="w-[calc(100vw-40px)] md:w-auto min-w-0 bg-white rounded-2xl shadow-lg border border-[#ADf0E8] overflow-hidden transition-all duration-300 hover:border-[#55D0C7] group flex-shrink-0 md:flex-shrink"
                  style={{ scrollSnapAlign: 'start' }}
                  aria-label={`${title} retreat from ${date}`}
                  tabIndex={0}
                >
                  {/* Image */}
                  <div className="relative h-36 md:h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${available ? 'bg-[#ADf0E8] text-[#333]' : 'bg-gray-400 text-white'}`}>
                        {available ? 'Available' : 'Fully booked'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <header className="mb-3">
                      <h3 className="text-lg font-medium text-[#333] mb-1 group-hover:text-[#55D0C7] transition-colors duration-300 truncate">{title}</h3>
                      <div className="flex items-center text-[#555] text-xs">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{date}</span>
                      </div>
                    </header>

                    <p className="text-[#555] text-sm mb-3 font-light line-clamp-2 leading-tight">{description}</p>

                    <ul className="mb-4 text-xs text-[#555] space-y-1">
                      {highlights.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-[#55D0C7] rounded-full mr-2 mt-1 flex-shrink-0"></div>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {highlights.length > 3 && (
                        <li className="text-xs text-[#55D0C7] pl-3.5">+{highlights.length - 3} more</li>
                      )}
                    </ul>

                    <div className="flex items-center justify-between pt-3 border-t border-[#ADf0E8]">
                      <span className="text-base font-bold text-[#c37f67]">{price}</span>
                      <button
                        disabled={!available}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-colors duration-300 ${
                          available
                            ? "bg-[#55D0C7] hover:bg-[#3db9b0] cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        aria-disabled={!available}
                        aria-label={
                          available
                            ? `Book ${title} retreat`
                            : `${title} retreat fully booked`
                        }
                      >
                        {available ? "Book Now" : "Full"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            )}
          </motion.div>
        </div>

        {/* Benefits Section - Compact for Mobile */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left: Benefits Grid */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-3 md:gap-6">
            {retreatBenefits.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#ADf0E8] hover:border-[#55D0C7] transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-start">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-2 md:mb-4 mr-3 group-hover:bg-[#55D0C7] transition-colors duration-300 flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-[#55D0C7] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-lg font-medium text-[#333] mb-1 group-hover:text-[#55D0C7] transition-colors duration-300 truncate">{title}</h4>
                    <p className="text-[#555] text-xs md:text-sm font-light line-clamp-2">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={fadeInUp} className="text-center lg:text-left">
            <h3 className="text-xl md:text-4xl font-light text-[#333] mb-3 md:mb-6 font-serif">
              Why Choose Our Retreats?
            </h3>
            <p className="text-sm md:text-lg text-[#555] mb-4 md:mb-8 font-light leading-relaxed">
              Our retreats are carefully designed to provide transformative experiences that 
              integrate yoga, mindfulness, and nature immersion.
            </p>
            <div className="space-y-2 mb-4 md:mb-8">
              <div className="flex items-center justify-center lg:justify-start">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#55D0C7] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-[#555] text-sm md:text-base">Beautiful natural locations</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[#55D0C7] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-[#555] text-sm md:text-base">Small personalized groups</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#55D0C7] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-[#555] text-sm md:text-base">Holistic wellness approach</span>
              </div>
            </div>
            
            <button className="bg-[#c37f67] hover:bg-[#c76947] text-white px-5 py-2 md:px-8 md:py-3 rounded-lg font-medium transition-colors duration-300 text-sm md:text-base w-full md:w-auto">
              View All Retreats
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section - Compact for Mobile */}
        <motion.div 
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 mt-10 md:mt-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {[
            { number: "500+", label: "Participants" },
            { number: "4.9", label: "Avg Rating" },
            { number: "15+", label: "Destinations" },
            { number: "98%", label: "Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-3 md:p-6 bg-white/80 rounded-xl md:rounded-2xl border border-[#ADf0E8] backdrop-blur-sm"
            >
              <div className="text-lg md:text-3xl font-bold text-[#c37f67] mb-1 md:mb-2">{stat.number}</div>
              <div className="text-[#555] text-xs md:text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingRetreats;