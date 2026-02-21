'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Ghost, Zap, Shield, User, Info, Quote } from 'lucide-react';

interface SoulCardProps {
  title: string;
  color: 'green' | 'orange' | 'blue';
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
    green: {
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]',
      filter: 'bg-emerald-500/30',
    },
    orange: {
      border: 'border-orange-500/50',
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.2)]',
      filter: 'bg-orange-500/30',
    },
    blue: {
      border: 'border-cyan-500/50',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      shadow: 'shadow-[0_0_10px_rgba(6,182,212,0.2)]',
      filter: 'bg-cyan-500/30',
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
    if (colorClass.includes('emerald')) return 'text-emerald-400';
    if (colorClass.includes('orange')) return 'text-orange-400';
    if (colorClass.includes('cyan')) return 'text-cyan-400';
    return 'text-white/40';
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 lg:p-8 font-sans text-white overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      <div className={`absolute top-4 left-4 lg:top-8 lg:left-8 text-left z-0 transition-all duration-1000 ${isHeaderVisible ? 'opacity-40 translate-x-0' : 'opacity-0 -translate-x-10'} hover:opacity-100`}>
        <h1 className="text-lg lg:text-xl font-bold italic tracking-tighter uppercase font-mono border-l border-white/30 pl-3">
          The Philosophical Self
        </h1>
      </div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200%] transition-all duration-1000 ${isQuoteVisible ? 'opacity-30' : 'opacity-0 scale-90'} flex flex-col items-center gap-4`}>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <p className="text-sm italic font-mono tracking-[0.3em] uppercase text-center px-4">
          "The soul never thinks without a picture."
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 z-10 w-full max-w-6xl justify-items-center mb-32 mt-32 lg:mt-64">
        <SoulCard
          index={0}
          title="Nutritive Soul"
          color="green"
          icon={Ghost}
          isActive={activeSoulId === 'nutritive'}
          onToggle={() => toggleSoul('nutritive', { title: "Nutritive Soul", description: "This soul serves as our reminder for the basic needs for human growth ensuring to take care of one's physical self.", color: "text-emerald-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://images.unsplash.com/photo-1649134296132-56606326c566?auto=format&fit=crop&q=80&w=400",
            "https://st3.depositphotos.com/17500018/35124/i/450/depositphotos_351247046-stock-photo-african-american-man-bites-hamburger.jpg",
            "https://st3.depositphotos.com/11233746/15398/i/450/depositphotos_153986034-stock-photo-man-taking-dumbbells-at-gym.jpg"
          ]}
          imageTitles={[
            "MORNING WALKS", 
            "EATING", 
            "PHYSICAL TRAINING"]}
          imageDescriptions={[
             "I prefer talking morning walks, as it helps me freshen my mind..",
            "Eating is one of the many essential things when it comes to taking care of my physical body..",
            "I believe having a good workout routine means a better and disciplined body.."
          ]}
          description="This soul serves as our reminder for the basic needs for human growth ensuring to take care of one's physical self."
        />
        
        <SoulCard 
          index={1}
          title="Appetitive Soul"
          color="orange"
          icon={Zap}
          isActive={activeSoulId === 'appetitive'}
          onToggle={() => toggleSoul('appetitive', { title: "Appetitive Soul", description: "The appetitive soul is the source of motivation and movement, driven by the intensity of one's desires.", color: "text-orange-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://st5.depositphotos.com/41571362/79615/i/450/depositphotos_796154152-stock-photo-human-hand-pointing-abstract-modern.jpg",
            "https://st3.depositphotos.com/13324256/16676/i/450/depositphotos_166767508-stock-photo-badminton-racket-and-shuttlecocks.jpg",
            "https://st4.depositphotos.com/3917667/29380/i/450/depositphotos_293806820-stock-photo-male-speaker-giving-presentation-in.jpg"
          ]}
          imageTitles={[
            "CODING", 
            "BADMINTON", 
            "PRESENTATION"]}
          imageDescriptions={[
            "My desire for coding is to be able to create anything I think of, it's one of my passions and dream to become a great developer someday..",
            "Getting more active into badminton lately, I've been enjoying this sport and has been the fuel for me to play it more..",
            "I want to be able to improve this skill as it will enable me to openly express my ideas and initiatives towards my projects to help the community.."
          ]}
          description="The appetitive soul is the source of motivation and movement, driven by the intensity of one's desires."
        />

        <SoulCard 
          index={2}
          title="Rational Soul"
          color="blue"
          icon={Shield}
          isActive={activeSoulId === 'rational'}
          onToggle={() => toggleSoul('rational', { title: "Rational Soul", description: "This is the support behind the 2 other souls and act as a balance, keeping intellect and reason intact.", color: "text-cyan-400" })}
          onImageHover={setActiveImageSubData}
          images={[
            "https://images.unsplash.com/photo-1711409645921-ef3db0501f96?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1699993131854-a1cde51ce9da?auto=format&fit=crop&q=80&w=400",
            "https://images.unsplash.com/photo-1767972159871-b9f5d320be2b?auto=format&fit=crop&q=80&w=400"
          ]}
          imageTitles={["BRAIN", "CRITICAL THINKING", "JUDGEMENT"]}
          imageDescriptions={[
            "The brain represents the rational soul more, as it is symbolic for the thinking process of everything that occurs within the human body..",
            "I believe critical thinking also stems from the rational soul, as it is one of the things that are necessary to maintain sanity and reasonability..",
            "Being able to judge is being able to think, I believe judgement as one of the most basic functions that are within the rational soul.."
          ]}
          description="This is the support behind the 2 other souls and act as a balance, one to prevent you from not taking care of yourself, and the other to oppose strong desires and maintain good balance, this leads as the main guardian to protect your soul and keep the balance in tact. It is the seat of intellect and reason."
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
                    {activeImageSubData ? activeImageSubData.title : (activeSoulData ? activeSoulData.title : "Aristotle's Philosophical Sense of Self")}
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
                       <span className="text-white/20 text-xs italic tracking-widest uppercase">Click on a soul to begin analyzing.</span>
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