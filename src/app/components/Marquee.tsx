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
      {/* Background decorative elements (optional, matching previous style) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#ADf0E8]/20 to-[#55D0C7]/20"></div>
      </div>

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