'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Ghost, Zap, Shield, User, Info, Quote, ShoppingBag, Users, Sparkles } from 'lucide-react';

interface SoulCardProps {
  title: string;
  color: 'violet' | 'red' | 'blue';
  description: string;
  icon: React.ElementType;
  images: string[];
  imageTitles: string[]; // Data type for image titles
  imageDescriptions: string[];
  isActive: boolean;
  onToggle: () => void;
  onImageHover: (data: { title: string, desc: string } | null) => void;
  index: number;
}

const SoulCard = ({ title, color, description, icon: Icon, images, imageTitles, imageDescriptions, isActive, onToggle, onImageHover, index }: SoulCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500 + (index * 200));
    return () => clearTimeout(timer);
  }, [index]);

  const colors = {
    violet: {
      border: 'border-violet-500/50',
      text: 'text-violet-400',
      bg: 'bg-violet-500/10',
      shadow: 'shadow-[0_0_10px_rgba(139,92,246,0.2)]',
      filter: 'bg-violet-500/30',
    },
    red: {
      border: 'border-red-500/50',
      text: 'text-red-400',
      bg: 'bg-red-500/10',
      shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]',
      filter: 'bg-red-500/30',
    },
    blue: {
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.2)]',
      filter: 'bg-blue-500/30',
    }
  };

  const style = colors[color];

  const handleImageEnter = (i: number) => {
    if (isActive) {
      // Adjusted to public/audio folder as requested
      const hoverAudio = new Audio('/audio/mixkit-sci-fi-interface-robot-click-901.wav');
      hoverAudio.volume = 0.8;
      hoverAudio.play().catch(() => {});
      
      onImageHover({ title: imageTitles[i], desc: imageDescriptions[i] });
    }
  };

  return (
    <div 
      className={`relative group flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Container for images and lines */}
      <div className={`absolute bottom-full mb-0 flex flex-col items-center pointer-events-none z-20`}>
        <div className="flex flex-col-reverse items-center relative">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Image Container */}
              <div
                onMouseEnter={() => handleImageEnter(i)}
                onMouseLeave={() => onImageHover(null)}
                style={{ 
                  transitionDelay: '0ms'
                }}
                className={`w-40 lg:w-48 h-20 lg:h-24 bg-black border border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden pointer-events-auto
                  transition-all duration-700
                  hover:border-white hover:brightness-125
                  ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
              >
                <img 
                  src={images[i]} 
                  alt="Soul Visual" 
                  className="w-full h-full object-cover opacity-60 transition-opacity duration-300 hover:opacity-100"
                />
                <div className={`absolute inset-0 ${style.filter} mix-blend-color`}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                <span className="absolute bottom-1 right-2 text-[8px] text-white/40 uppercase font-mono tracking-widest cursor-default">IMAGE_{i+1}</span>
              </div>
              
              {/* Line Container */}
              <div 
                className="relative flex items-center justify-center overflow-hidden transition-all" 
                style={{ 
                  height: isActive ? (i === 0 ? '24px' : '32px') : '0px', 
                  transitionDuration: isActive ? '300ms' : '200ms',
                  transitionTimingFunction: 'linear',
                  transitionDelay: isActive ? `${i * 300}ms` : '0ms' 
                }}
              >
                 <div 
                  className={`w-[1px] h-full bg-gradient-to-t from-white to-transparent`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onToggle}
        className={`relative w-40 lg:w-48 h-20 lg:h-24 cursor-default transition-all duration-300 transform 
          ${isActive ? 'scale-105 border-white ring-1 ring-white/30' : 'scale-100 border-white/20 hover:border-white/50'} 
          border ${style.bg} ${style.shadow}
          backdrop-blur-md flex flex-col items-center justify-center overflow-hidden z-30`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className={`absolute top-0 left-0 w-full h-[1px] bg-white ${isActive ? 'animate-pulse' : ''}`}></div>
        </div>

        <Icon className={`w-5 lg:w-6 h-5 lg:h-6 mb-1 ${style.text} ${isActive ? 'animate-pulse' : ''}`} />
        <h2 className={`text-[10px] lg:text-sm font-bold tracking-widest uppercase text-white/80`}>
          {title}
        </h2>
        
        {/* Status Indicator */}
        <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-ping' : 'bg-white/10'}`}></div>
      </button>
    </div>
  );
};

const TypewriterText = ({ text, speed = 15 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Adjusted to public/audio folder as requested
    const audio = new Audio('/audio/mixkit-smartphone-digital-keyboard-1394.wav');
    audio.loop = true;
    audioRef.current = audio;

    setDisplayedText("");
    let i = 0;
    
    // Start audio when typing begins
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (e) {
        // Browser might block autoplay without interaction
      }
    };
    playAudio();

    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        audio.pause(); // Stop audio when done
        audio.currentTime = 0;
      }
    }, speed);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [text, speed]);

  return <span>{displayedText}<span className="inline-block w-1.5 h-3 ml-1 bg-white animate-pulse"></span></span>;
};

export default function App() {
  const [activeSoulId, setActiveSoulId] = useState<string | null>(null);
  const [activeSoulData, setActiveSoulData] = useState<{ title: string, description: string, color: string } | null>(null);
  const [activeImageSubData, setActiveImageSubData] = useState<{ title: string, desc: string } | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsHeaderVisible(true), 200);
    setTimeout(() => setIsQuoteVisible(true), 1200);
    setTimeout(() => setIsDialogueVisible(true), 1600);
  }, []);

  const toggleSoul = (id: string, data: any) => {
    if (activeSoulId === id) {
      // Deactivate current
      setActiveSoulId(null);
      setActiveSoulData(null);
      setActiveImageSubData(null);
    } else {
      // Switch to new soul
      setActiveSoulId(id);
      setActiveSoulData({ title: data.title, description: data.description, color: data.color });
      setActiveImageSubData(null); // Reset subdata when switching primary soul
    }
  };

  const getSubDataColor = (colorClass: string) => {
    if (colorClass.includes('violet')) return 'text-violet-400';
    if (colorClass.includes('red')) return 'text-red-400';
    if (colorClass.includes('blue')) return 'text-blue-400';
    return 'text-white/40';
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 lg:p-8 font-sans text-white overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      <div className={`absolute top-4 left-4 lg:top-8 lg:left-8 text-left z-0 transition-all duration-1000 ${isHeaderVisible ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-10'} hover:opacity-100`}>
        <h1 className="text-lg lg:text-xl font-bold italic tracking-tighter uppercase font-mono border-l border-white/30 pl-3">
          The Psychological Self
        </h1>
      </div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200%] transition-all duration-1000 ${isQuoteVisible ? 'opacity-30' : 'opacity-0 scale-90'} flex flex-col items-center gap-4`}>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <p className="text-sm italic font-mono tracking-[0.3em] uppercase text-center px-4">
          "Nobody is stupid all the time, but everyone can be stupid sometimes."
          George Herbert Mead
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 z-10 w-full max-w-6xl justify-items-center mb-32 mt-32 lg:mt-64">
        <SoulCard
          index={0}
          title="Material Self"
          color="violet"
          icon={ShoppingBag}
          isActive={activeSoulId === 'material'}
          onToggle={() => toggleSoul('material', { title: "Material Self", description: "This self refers to the tangible objects, people, or places that carry the designation 'my' or 'mine'.", color: "text-violet-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1590285381943-9fbf39f4f75d?q=80&w=1170&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599223031712-68b05f38d5f5?q=80&w=1176&auto=format&fit=crop"
          ]}
          imageTitles={[
            "HEIGHT", 
            "BODY WEIGHT", 
            "SLEEP DEPRIVED"]}
          imageDescriptions={[
            "I see myself a smaller than average for my height compared to others..",
            "My weight is off the lower than average type..",
            "I have a bad habit of staying up and being sleepy all day.."
          ]}
          description="Focuses on the physical body and possessions that shape our identity in the material world."
        />
        
        <SoulCard 
          index={1}
          title="Social Self"
          color="red"
          icon={Users}
          isActive={activeSoulId === 'social'}
          onToggle={() => toggleSoul('social', { title: "Social Self", description: "The social self is how we are perceived by others and the different versions of ourselves we present in various social contexts.", color: "text-red-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1173&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586806974856-c55e8b9364e4?q=80&w=1170&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1663246544984-2730f63628b4?q=80&w=687&auto=format&fit=crop"
          ]}
          imageTitles={[
            "HANGING OUT", 
            "AMIABLE", 
            "COOPERATIVE"]}
          imageDescriptions={[
            "I enjoy the company of other people especially my friends when we are hanging out..",
            "I like to try my best to talk with random people especially at a social event, I tend to enjoy knowing what others do..",
            "Most of the time in a team organized event, I try to listen to others especially when I'm the one leading the team or listen to other team leaders if I am their member.."
          ]}
          description="Represents our external interactions and the recognition we receive from those around us."
        />

        <SoulCard 
          index={2}
          title="Spiritual Self"
          color="blue"
          icon={Sparkles}
          isActive={activeSoulId === 'spiritual'}
          onToggle={() => toggleSoul('spiritual', { title: "Spiritual Self", description: "The spiritual self is our inner subjective being; it is the most enduring and intimate part of the self.", color: "text-blue-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://images.unsplash.com/photo-1572955995017-e769428eb228?q=80&w=1738&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1762328542960-26ea0b7f0309?q=80&w=735&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=764&auto=format&fit=crop"
          ]}
          imageTitles={[
            "OPTIMISTIC", 
            "PERSISTENT", 
            "KINDESS"]}
          imageDescriptions={[
            "Even in a dark situation, or gloomy nights I try to be positive about my situation..",
            "I try to go through and resolve my problems as much as I could, I'll always find a way..",
            "Giving kindness without expecting in return, especially helping people who are in dire need is one of my traits.."
          ]}
          description="The core of our subjective experience, encompassing our values, thoughts, and conscience."
        />
      </div>

      <div className={`fixed bottom-0 left-0 w-full p-4 lg:p-8 z-50 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-1000 ${isDialogueVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className={`max-w-4xl mx-auto mb-2 flex items-center gap-2 px-2 transition-opacity duration-500 ${activeSoulData ? 'opacity-60' : 'opacity-0'}`}>
          <Info className="w-3 h-3 text-white/50" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Tip: Hover over images to retrieve more information</span>
        </div>

        <div className="max-w-4xl mx-auto border border-white/5 bg-black/60 backdrop-blur-2xl p-6 relative transition-all duration-700 ease-out min-h-[140px]">
          <div className="absolute top-0 left-0 w-4 h-px bg-white/20"></div>
          <div className="absolute top-0 left-0 h-4 w-px bg-white/20"></div>
          <div className="absolute bottom-0 right-0 w-4 h-px bg-white/20"></div>
          <div className="absolute bottom-0 right-0 h-4 w-px bg-white/20"></div>
          
          <div className="flex items-start gap-8">
            <div className="shrink-0">
              <div className="w-14 h-14 border border-white/10 flex items-center justify-center bg-white/5 relative overflow-hidden">
                <User className={`w-6 h-6 transition-colors duration-500 ${activeSoulData ? 'text-white' : 'text-white/40'}`} />
                <div className={`absolute inset-0 bg-white/5 ${activeSoulData ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">User:</span>
                  <span className="text-[10px] font-mono text-white-500/80">Ian</span>
                </div>

                <h3 className={`text-lg font-bold tracking-wider flex items-center gap-2 transition-all duration-500 ${activeImageSubData ? getSubDataColor(activeSoulData?.color || '') : (activeSoulData?.color || 'text-white/80')}`}>
                  <span className="uppercase">
                    {activeImageSubData ? activeImageSubData.title : (activeSoulData ? activeSoulData.title : "The I & Me Self by George Herbert Mead")}
                  </span>
                </h3>
                
                <div className="text-sm text-white/80 leading-relaxed font-light font-mono min-h-[3rem]">
                  {activeSoulData ? (
                    activeImageSubData ? (
                      <div className="flex items-start gap-2 text-white/60">
                        <TypewriterText text={activeImageSubData.desc} speed={20} />
                      </div>
                    ) : (
                      <TypewriterText text={activeSoulData.description} />
                    )
                  ) : (
                    <div className="flex flex-col justify-center h-full pt-2">
                       <span className="text-white/20 text-xs italic tracking-widest uppercase">Click on a self to begin analyzing.</span>
                       <div className="w-24 h-[1px] bg-white/10 mt-2"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 left-10 w-32 h-32 border border-white/5 rotate-45 pointer-events-none opacity-20"></div>
    </div>
  );
}