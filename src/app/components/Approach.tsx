import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface ApproachProps {
  // You can add props here if needed
}

function Approach({}: ApproachProps) {
  const approachRef = useRef<HTMLDivElement | null>(null);
  const approachHeadlineRef = useRef<HTMLHeadingElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Approach headline animation
    if (approachHeadlineRef.current) {
      const splitHeadline = new SplitText(approachHeadlineRef.current, { 
        type: 'lines', 
        linesClass: 'line' 
      });
      
      gsap.fromTo(splitHeadline.lines,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: approachHeadlineRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Animation for approach section - modified for horizontal layout
    if (approachRef.current) {
      const approachItems = approachRef.current.querySelectorAll('.approach-item');
      gsap.fromTo(approachItems,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: approachRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={approachRef} className="py-12 md:py-24 bg-[#fcfaf8] relative z-10 overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className='hidden md:block elementl absolute top-[250px] left-[-250px] opacity-20 z-[-1]'>
        <img className='h-full w-auto rotate-90' src="/line.png" alt="" />
      </div>
      <div className='hidden md:block elementl absolute top-[250px] right-[-250px] opacity-20 z-[-1]'>
        <img className='h-full w-auto rotate-270' src="/line.png" alt="" />
      </div>
      <div className='hidden md:block elementp absolute top-[220px] left-[505px] opacity-30 z-[-1]'>
        <img className='h-full w-auto scale-[150%]' src="/yoga3.png" alt="" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 ref={approachHeadlineRef} className="text-2xl md:text-6xl font-light text-[#333] text-center mb-8 md:mb-16 font-serif">My Approach</h2>
        
        {/* Mobile horizontal scroll container */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4">
              <div className="approach-item flex-shrink-0 w-[85vw] snap-center p-6 bg-[url('https://www.shutterstock.com/shutterstock/videos/3510332521/thumb/1.jpg?ip=x480')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                <div className="w-12 h-12 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                  <span className="text-xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">1</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#55D0C7] transition-colors duration-300">Personalized Guidance</h3>
                <p className="text-white text-sm">
                  Every body is different. I create customized practices that honor your unique needs, 
                  limitations, and goals, ensuring sustainable progress without injury.
                </p>
              </div>
              
              <div className="approach-item flex-shrink-0 w-[85vw] snap-center p-6 bg-[url('https://images.squarespace-cdn.com/content/v1/601cf6a4fabc2a27672c7e92/fcf3b6cd-665d-4fe1-a23d-09be0abec669/IMG_2917.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                <div className="w-12 h-12 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                  <span className="text-xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">2</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#55D0C7] transition-colors duration-300">Holistic Integration</h3>
                <p className="text-white text-sm">
                  Yoga isn't just what happens on the mat. I help you integrate mindfulness, breathwork, 
                  and movement into your daily life for lasting transformation.
                </p>
              </div>
              
              <div className="approach-item flex-shrink-0 w-[85vw] snap-center p-6 bg-[url('https://images.hindustantimes.com/img/2022/07/15/1600x900/pexels-ron-lach-9225391_1657880009262_1657880032761_1657880032761.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                <div className="w-12 h-12 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                  <span className="text-xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">3</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#55D0C7] transition-colors duration-300">Progressive Development</h3>
                <p className="text-white text-sm">
                  Whether you're a beginner or advanced practitioner, I design sequences that challenge 
                  you appropriately while honoring your body's wisdom.
                </p>
              </div>
              
              <div className="approach-item flex-shrink-0 w-[85vw] snap-center p-6 bg-[url('https://live.staticflickr.com/1840/43961078272_d7c19a2156_h.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] group">
                <div className="w-12 h-12 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#55D0C7] transition-colors duration-300">
                  <span className="text-xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">4</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[#55D0C7] transition-colors duration-300">Community Support</h3>
                <p className="text-white text-sm">
                  Join a supportive community of like-minded individuals on the path to wellness. 
                  Share experiences, challenges, and victories in a safe, nurturing environment.
                </p>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {[1, 2, 3, 4].map((dot) => (
              <div key={dot} className="w-2 h-2 bg-[#ADf0E8] rounded-full opacity-50"></div>
            ))}
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="approach-item p-8 bg-[url('https://www.shutterstock.com/shutterstock/videos/3510332521/thumb/1.jpg?ip=x480')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#55D0C7] transition-colors duration-300">
              <span className="text-2xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">1</span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#55D0C7] transition-colors duration-300">Personalized Guidance</h3>
            <p className="text-white">
              Every body is different. I create customized practices that honor your unique needs, 
              limitations, and goals, ensuring sustainable progress without injury.
            </p>
          </div>
          
          <div className="approach-item p-8 bg-[url('https://images.squarespace-cdn.com/content/v1/601cf6a4fabc2a27672c7e92/fcf3b6cd-665d-4fe1-a23d-09be0abec669/IMG_2917.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#55D0C7] transition-colors duration-300">
              <span className="text-2xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">2</span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#55D0C7] transition-colors duration-300">Holistic Integration</h3>
            <p className="text-white">
              Yoga isn't just what happens on the mat. I help you integrate mindfulness, breathwork, 
              and movement into your daily life for lasting transformation.
            </p>
          </div>
          
          <div className="approach-item p-8 bg-[url('https://images.hindustantimes.com/img/2022/07/15/1600x900/pexels-ron-lach-9225391_1657880009262_1657880032761_1657880032761.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#55D0C7] transition-colors duration-300">
              <span className="text-2xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">3</span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#55D0C7] transition-colors duration-300">Progressive Development</h3>
            <p className="text-white">
              Whether you're a beginner or advanced practitioner, I design sequences that challenge 
              you appropriately while honoring your body's wisdom.
            </p>
          </div>
          
          <div className="approach-item p-8 bg-[url('https://live.staticflickr.com/1840/43961078272_d7c19a2156_h.jpg')] bg-center bg-cover rounded-2xl shadow-md border border-[#ADf0E8] hover:shadow-xl transition-all duration-300 hover:border-[#55D0C7] hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-[#ADf0E8] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#55D0C7] transition-colors duration-300">
              <span className="text-2xl font-semibold text-[#55D0C7] group-hover:text-white transition-colors duration-300">4</span>
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#55D0C7] transition-colors duration-300">Community Support</h3>
            <p className="text-white">
              Join a supportive community of like-minded individuals on the path to wellness. 
              Share experiences, challenges, and victories in a safe, nurturing environment.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Approach;