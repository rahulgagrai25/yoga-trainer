'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function BentoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation timeline for entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      defaults: { ease: 'power3.out' }
    });

    if (cardsRef.current) {
      const cards = (cardsRef.current as HTMLElement).querySelectorAll('.bento-card');
      tl.fromTo(cards,
        { y: 50, opacity: 0, rotationY: 10 },
        { y: 0, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.15 }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Sample data for gallery items (yoga/wellness themed)
  const galleryItems = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/31427101/pexels-photo-31427101.jpeg", // Placeholder: Replace with actual yoga images
      title: "Warrior Flow",
      subtitle: "Strength & Grace",
      description: "Embrace the power within through dynamic warrior sequences."
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/4127321/pexels-photo-4127321.jpeg",
      title: "Lotus Serenity",
      subtitle: "Inner Peace",
      description: "Find stillness in the heart of meditation."
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
      title: "Sun Salutation",
      subtitle: "Vitality Rise",
      description: "Awaken your body with the rhythm of the sun."
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/4793276/pexels-photo-4793276.jpeg",
      title: "Tree Balance",
      subtitle: "Rooted Stability",
      description: "Stand tall like ancient trees in harmony."
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/4793331/pexels-photo-4793331.jpeg",
      title: "Downward Dog",
      subtitle: "Renewal Stretch",
      description: "Invert and refresh your energy flow."
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/4378993/pexels-photo-4378993.jpeg",
      title: "Child's Rest",
      subtitle: "Gentle Surrender",
      description: "Return to innocence and release tension."
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Bridge Lift",
      subtitle: "Heart Opening",
      description: "Elevate your spirit with backbends."
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/4793334/pexels-photo-4793334.jpeg",
      title: "Cobra Awakening",
      subtitle: "Vital Energy",
      description: "Rise like the serpent, awakening kundalini."
    },
    {
      id: 9,
      image: "https://www.fitsri.com/wp-content/uploads/2021/02/seated-twist-pose-1024x683.jpg",
      title: "Seated Twist",
      subtitle: "Detox Flow",
      description: "Twist away toxins for inner cleansing."
    },
  ];

  // Generate random 3D rotations for each card (in degrees, subtle for beauty)
  const getRandomRotation = () => ({
    rotateX: (Math.random() - 0.5) * 10, // -5 to 5 degrees
    rotateY: (Math.random() - 0.5) * 10,
    rotateZ: (Math.random() - 0.5) * 5,  // Smaller Z rotation
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 w-full bg-gradient-to-br from-[#f8f5f2] to-[#f0ede8] overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_#ADf0E8_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_#55D0C7_0%,_transparent_50%)]"></div>
      </div>

      <div className="absolute bottom-[450px] right-[40px] z-0">
        <img className="h-full w-auto" src="/yoga6.png" alt="" />
      </div>

      <div className="absolute bottom-[40px] left-[40px] z-0 scale-x-[-1]">
        <img className="h-full w-auto" src="/yoga6.png" alt="" />
      </div>

      {/* Subtle floating elements (yoga icons or leaves) */}
      <div className="absolute top-0 left-[-100px] z-30">
        <img src="/leaf.png" alt="" className="w-100 h-100" /> {/* Placeholder */}
      </div>
      <div className="absolute bottom-[-50px] right-[-30px] z-30 rotate-270">
        <img src="/leaf.png" alt="" className="w-100 h-100" /> {/* Placeholder */}
      </div>

      <div className="absolute top-[-300px] right-[-300px] opacity-15 z-0">
        <img
          className="h-200 w-auto"
          src="/yoga2.png"
          alt="Rotating wheel"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-light text-center text-[#333] mb-4 font-serif">
          Yoga Gallery
        </h2>
        <p className="text-xl font-light text-center text-[#555] mb-16 max-w-2xl mx-auto font-sans">
          Immerse yourself in the beauty of mindful movement. Each pose tells a story of balance, strength, and serenity.
        </p>

        {/* Bento Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-6 h-auto">
          {galleryItems.map((item, index) => {
            const rotation = getRandomRotation();
            const spanClass = getSpanClass(index); // Vary sizes for bento effect
            
            // Conditionally set image container height based on row-span
            const isTallCard = spanClass.includes('row-span-2');
            const imageContainerClass = isTallCard 
              ? "relative w-full h-full min-h-[200px] md:min-h-[300px] overflow-hidden"
              : "relative w-full h-48 md:h-64 lg:h-80 overflow-hidden";

            return (
              <div
                key={item.id}
                className={`bento-card relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group ${spanClass}`}
                style={{
                  transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg) rotateZ(${rotation.rotateZ}deg)`,
                  transformStyle: 'preserve-3d' as const,
                }}
              >
                {/* Image */}
                <div className={imageContainerClass}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm md:text-base font-light opacity-90 mb-2">{item.subtitle}</p>
                  <p className="text-xs md:text-sm opacity-80 leading-relaxed">{item.description}</p>
                </div>

                {/* Hover 3D Tilt Enhancement */}
                <div className="absolute inset-0 bg-[#c37f67]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Helper function to assign varying spans for bento layout (asymmetric)
  function getSpanClass(index: number): string {
    const spans = [
      'md:col-span-4 lg:col-span-3', // 1x1
      'md:col-span-8 lg:col-span-6', // 2x1 (wider)
      'md:col-span-4 lg:col-span-3', // 1x1
      'md:col-span-4 lg:col-span-3 row-span-2', // 1x2 (taller) - Tree Balance
      'md:col-span-8 lg:col-span-6', // 2x1
      'md:col-span-4 lg:col-span-3', // 1x1
      'md:col-span-4 lg:col-span-3 row-span-2', // 1x2 (taller) - Bridge Lift
      'md:col-span-4 lg:col-span-3', // 1x1
      'md:col-span-8 lg:col-span-6', // 2x1 (fills remaining)
    ];
    return spans[index % spans.length] || 'md:col-span-4 lg:col-span-3';
  }
}

export default BentoGallery;