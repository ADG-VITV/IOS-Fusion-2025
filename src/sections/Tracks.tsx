'use client';

import React, { useState, useRef } from 'react';

interface Track {
  id: number;
  title: string;
  description: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "HealthTech",
    description: "This track explores how machine learning can transform healthcare — from disease prediction and medical imaging to patient monitoring and personalized treatment. The focus is on building solutions that enhance accuracy, affordability, and the quality of care."
  },
  {
    id: 2,
    title: "AgriTech",
    description: "Agriculture meets AI here. Participants are encouraged to create ML-driven tools for crop yield forecasting, pest and disease detection, smart irrigation, and supply chain optimization, with the goal of making farming smarter and more sustainable."
  },
  {
    id: 3,
    title: "Smart Mobility",
    description: "Centered on transport and logistics, this track invites ideas that apply ML to traffic flow prediction, autonomous navigation, route optimization, and smart delivery systems. The aim is to bring safety, speed, and efficiency to modern mobility."
  },
  {
    id: 4,
    title: "Green AI & Sustainability",
    description: "This track is about harnessing ML for the planet. Solutions could focus on energy optimization, climate modeling, waste management, or tracking carbon footprints, with the purpose of driving sustainable innovation through solar energy."
  },
  {
    id: 5,
    title: "FinTech",
    description: "Build an ML-powered iOS application that leverages financial data to provide predictive insights, detect anomalies, or deliver personalised financial recommendations. The app should combine machine learning models with a mobile front-end to create a user-friendly financial assistant."
  },
  {
    id: 6,
    title: "Open Innovation",
    description: "This track welcomes bold, out-of-the-box ideas across any domain — from education and accessibility to lifestyle and social impact. It's all about creativity, experimentation, and building user-centered solutions without limits."
  }
];

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const tiltX = mousePosition.y / 10;
  const tiltY = -mousePosition.x / 10;

  return (
    <div
      ref={cardRef}
      className={`relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 ${
        isHovered ? 'h-auto min-h-80' : 'h-80'
      } cursor-pointer overflow-hidden transition-all duration-300 ease-out group ${
        isHovered ? 'border-2 border-purple-500/60 shadow-lg shadow-purple-500/20' : 'border border-gray-700/50'
      }`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : ''
      }`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Title */}
        <h3 className={`font-bold text-white transition-all duration-300 ease-out ${
          isHovered ? 'text-2xl mb-4' : 'text-3xl mb-0 flex items-center justify-center h-full text-center'
        }`}>
          {track.title}
        </h3>
        
        {/* Description */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${
          isHovered ? 'max-h-none opacity-100 pb-2' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-gray-300 text-base leading-relaxed break-words">
            {track.description}
          </p>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : ''
      }`} />
    </div>
  );
};

const Tracks: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-28" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            TRACKS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;