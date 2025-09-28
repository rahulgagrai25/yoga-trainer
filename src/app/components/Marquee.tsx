import React from 'react';

function Marquee() {
  const texts = [
    'Flex & Relax',
    'Calm & Balance',
    'Yoga Journey',
    'Serene Flow',
    'Mindful Movement'
  ];

  return (
    <div className="relative overflow-hidden bg-[#f8f5f2] py-8">

      <div className="relative flex whitespace-nowrap animate-marquee">
        {/* First set of texts */}
        {texts.map((text, index) => (
          <span
            key={index}
            className="mx-8 text-3xl md:text-4xl font-serif font-light text-[#c37f67] uppercase tracking-wide"
          >
            {text}
          </span>
        ))}
        
        {/* Second set for seamless loop */}
        {texts.map((text, index) => (
          <span
            key={`duplicate-${index}`}
            className="mx-8 text-3xl md:text-4xl font-serif font-light text-[#c37f67] uppercase tracking-wide"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Optional: Pause on hover */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default Marquee;