"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Brain, Zap, Heart, UserCircle, Play, Lock } from 'lucide-react';

/**
 * High-tech, glitchy Japanese "Isekai Status" Navigation
 * Features: Sci-fi loading audio, hover sound effects, hydration-safe animations.
 * Navigation Persistence: Remembers system state to skip loading on return.
 */

export default function App() {
  const [unlockCount, setUnlockCount] = useState(0); // Added for progression
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isMeHovered, setIsMeHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  
  // System State
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  // State for hydration-safe random values
  const [streamOpacities, setStreamOpacities] = useState<number[]>([]);
  
  // Audio References
  const loadingAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  const THEME = {
    bg: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
    textColor: '#ffffff',
    subTextColor: 'rgba(255, 255, 255, 0.4)',
    accent: '#34d399',
    glitch1: '#ff0000',
    glitch2: '#00ffff'
  };

  const pages = [
    { 
      id: 1, 
      name: 'Philosophy', 
      path: '/philosophical_self',
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />, 
      color: 'bg-emerald-500', 
      glowColor: 'rgba(16, 185, 129, 0.3)', 
      tintColor: 'rgba(16, 185, 129, 0.1)',
      pos: 'top-0 left-0', 
      translate: '-translate-x-2 -translate-y-2 md:-translate-x-6 md:-translate-y-6',
      side: 'left',
      section: 'top',
      subMeanings: ['Self-awareness', 'Identity', 'Values', 'Personal Meaning'],
      kanji: '哲学',
      translation: 'philosophy',
      contentAlign: 'items-end justify-end p-4 md:p-12',
      bgImg: 'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg' 
    },
    { 
      id: 2, 
      name: 'Psychology', 
      path: '/psychological_self',
      icon: <Brain className="w-5 h-5 md:w-6 md:h-6" />, 
      color: 'bg-blue-500', 
      glowColor: 'rgba(59, 130, 246, 0.3)', 
      tintColor: 'rgba(59, 130, 246, 0.1)',
      pos: 'top-0 right-0', 
      translate: 'translate-x-2 -translate-y-2 md:translate-x-6 md:-translate-y-6',
      side: 'right',
      section: 'top',
      subMeanings: ['Emotions', 'Self-concept', 'Self-esteem', 'Self-beliefs'],
      kanji: '心理',
      translation: 'psychology',
      contentAlign: 'items-start justify-end p-4 md:p-12',
      bgImg: 'https://images.unsplash.com/photo-1666330404750-061d4858593b?q=80&w=764&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Physical', 
      path: '/physical_self',
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, 
      color: 'bg-amber-500', 
      glowColor: 'rgba(245, 158, 11, 0.3)', 
      tintColor: 'rgba(245, 158, 11, 0.1)',
      pos: 'bottom-0 left-0', 
      translate: '-translate-x-2 translate-y-2 md:-translate-x-6 md:translate-y-6',
      side: 'left',
      section: 'bottom',
      subMeanings: ['Vitality', 'Sensation', 'Body Image', 'Physical Limits'],
      kanji: '身体',
      translation: 'physical',
      contentAlign: 'items-end justify-start p-4 md:p-12',
      bgImg: 'https://images.unsplash.com/photo-1659019730080-eb6adcdd996c?q=80&w=1171&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Sexual', 
      path: '/sexual_self',
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6" />, 
      color: 'bg-rose-500', 
      glowColor: 'rgba(244, 63, 94, 0.3)', 
      tintColor: 'rgba(244, 63, 94, 0.1)',
      pos: 'bottom-0 right-0', 
      translate: 'translate-x-2 translate-y-2 md:translate-x-6 md:translate-y-6',
      side: 'right',
      section: 'bottom',
      subMeanings: ['Intimacy', 'Orientation', 'Desire', 'Boundaries'],
      kanji: '性愛',
      translation: 'sexual',
      contentAlign: 'items-start justify-start p-4 md:p-12',
      bgImg: 'https://images.unsplash.com/photo-1516476573449-6fc45bb2f602?q=80&w=1173&auto=format&fit=crop' 
    },
  ];

  // PERSISTENCE LOGIC: Check session storage on mount
  useEffect(() => {
    const systemStatus = sessionStorage.getItem('isekai_system_active');
    if (systemStatus === 'true') {
      setHasStarted(true);
      setIsLoading(false);
      setLoadProgress(100);
    }
    setStreamOpacities(Array.from({ length: 15 }).map(() => Math.random()));
    
    // Initial fetch of unlock count
    const count = parseInt(localStorage.getItem('hasUnlocked') || '0');
    setUnlockCount(count);
  }, []);

  // System Start Sequence
  const startSystem = () => {
    setHasStarted(true);
    // Set persistence flag
    sessionStorage.setItem('isekai_system_active', 'true');
    
    if (loadingAudioRef.current) {
        loadingAudioRef.current.currentTime = 0;
        loadingAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            setLoadProgress(100);
            clearInterval(interval);
            if (loadingAudioRef.current) loadingAudioRef.current.pause();
            setTimeout(() => setIsLoading(false), 1200);
        } else {
            setLoadProgress(Math.floor(progress));
        }
    }, 400);
  };

  // Helper to play hover sound
  const playHoverSound = () => {
    if (hoverAudioRef.current && hasStarted && !isLoading) {
        hoverAudioRef.current.currentTime = 0;
        hoverAudioRef.current.volume = 0.4;
        hoverAudioRef.current.play().catch(e => {});
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeSegments = Math.floor((loadProgress / 100) * 10);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-mono text-white scanlines">
      {/* Audio Setup */}
      <audio 
        ref={loadingAudioRef} 
        src="/audio/mixkit-sci-fi-loading-operative-system-2529.wav" 
        preload="auto" 
        loop 
      />
      <audio 
        ref={hoverAudioRef} 
        src="/audio/mixkit-sci-fi-interface-robot-click-901.wav" 
        preload="auto" 
      />

      <style jsx global>{`
        .scanlines::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
          z-index: 40;
          background-size: 100% 3px;
          pointer-events: none;
        }
        .glitch-text {
          text-shadow: ${glitchActive ? `2px 0 ${THEME.glitch1}, -2px 0 ${THEME.glitch2}` : 'none'};
        }
        .quad-image {
          filter: grayscale(100%) contrast(250%) brightness(50%);
          mix-blend-mode: screen;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .quad-image-active {
          filter: grayscale(100%) contrast(300%) brightness(120%) invert(10%);
          transform: scale(1.1) rotate(0.2deg);
        }
        @keyframes glitch-popup-smoother {
          0% { opacity: 0; transform: scale(1) skew(5deg); filter: brightness(2); }
          50% { opacity: 0.6; transform: scale(1.05) skew(-2deg); filter: brightness(1.1); }
          100% { opacity: 0.8; transform: scale(1.02) skew(0); filter: brightness(1); }
        }
        .animate-glitch-popup-smoother {
          animation: glitch-popup-smoother 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.1s both;
        }
        .slice-btn {
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
          transform-style: preserve-3d;
          outline: none !important;
          box-shadow: none !important;
        }
        @keyframes slide-data {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .data-stream {
            animation: slide-data 2s linear infinite;
        }
      `}</style>

      {/* INITIAL BOOT BUTTON */}
      {!hasStarted && (
        <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center p-6">
            <button 
                onClick={startSystem}
                className="group relative flex flex-col items-center gap-4 transition-all duration-500 hover:scale-110"
            >
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 border border-emerald-500/50 rounded-full group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all" />
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 fill-emerald-500" />
                </div>
                <div className="text-center space-y-1">
                    <span className="block text-emerald-500 font-black tracking-[0.5em] text-xs md:text-sm">INITIALIZE SYSTEM</span>
                    <span className="block text-white/30 text-[8px] tracking-[0.2em] font-light">LINK START // ISEKAI_OS</span>
                </div>
            </button>
        </div>
      )}

      {/* Loading Screen Overlay */}
      {hasStarted && isLoading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {streamOpacities.map((opacity, i) => (
               <div 
                 key={i} 
                 className="absolute top-0 data-stream bg-emerald-500/30 w-px h-24"
                 style={{ 
                   left: `${i * 7}%`, 
                   animationDelay: `${i * 0.3}s`, 
                   opacity: opacity 
                 }}
               />
            ))}
          </div>

          <div className="relative flex flex-col items-center max-w-md w-full z-10">
            <div className="absolute -inset-40 border-2 border-emerald-500/10 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute -inset-24 border-t-2 border-emerald-500/40 rounded-full animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite]" />
            
            <div className="mb-10 text-center">
              <h2 className="text-emerald-400 font-black tracking-[0.8em] text-lg md:text-xl glitch-text">
                SYSTEM BOOTING
              </h2>
              <div className="mt-2 text-[10px] text-white/40 tracking-widest uppercase">
                Synchronizing Soul Waves... {loadProgress}%
              </div>
            </div>

            <div className="flex items-center gap-1 p-2 border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                        key={i}
                        className={`w-3 h-5 transition-all duration-300 ${
                            i < activeSegments 
                            ? 'bg-emerald-400 shadow-[0_0_15px_#34d399]' 
                            : 'bg-white/5'
                        }`}
                    />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Background Quadrants */}
      <div className={`absolute inset-0 grid grid-cols-2 grid-rows-2 z-0 pointer-events-none transition-all duration-1000 ${isLoading ? 'blur-2xl opacity-0' : 'blur-0 opacity-100'}`}>
        {pages.map((page) => (
          <div 
            key={`bg-quad-${page.id}`} 
            className="relative overflow-hidden border-[0.5px] border-white/5"
          >
            <img 
              src={page.bgImg} 
              alt="" 
              className={`absolute inset-0 w-full h-full object-cover quad-image ${
                hoveredSegment === page.id ? 'quad-image-active opacity-80' : 'opacity-30'
              }`}
            />
            
            {hoveredSegment === page.id && (
              <div className="hidden lg:flex absolute inset-0 items-center justify-center z-20">
                  <div className="px-5 py-3 bg-black/60 border border-white/20 backdrop-blur-md relative group/kanji animate-glitch-popup-smoother flex flex-col items-center">
                      <span className="text-base font-black tracking-[0.5em] text-white/90">
                          {page.kanji}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mt-1">
                          "{page.translation}"
                      </span>
                      <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-white/40" />
                      <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-white/40" />
                  </div>
              </div>
            )}

            <div className={`absolute inset-0 transition-all duration-700 ${
              hoveredSegment === page.id ? '' : 'bg-black/40'
            }`} 
            style={{ 
              backgroundColor: hoveredSegment === page.id ? page.tintColor : undefined 
            }} />
          </div>
        ))}
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />
      </div>

      {/* Central Hub */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center z-20 p-4 transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95 translate-y-10' : 'opacity-100 scale-100 translate-y-0'}`}>
        <div className="lg:hidden absolute inset-0 pointer-events-none flex items-center justify-center">
            {pages.map((page) => (
              hoveredSegment === page.id && (
                <div 
                  key={`mobile-kanji-${page.id}`}
                  className={`absolute transition-all duration-500 ease-out z-50
                    ${page.section === 'top' ? 'translate-y-[8.5rem] sm:translate-y-[10rem]' : '-translate-y-[8.5rem] sm:-translate-y-[10rem]'}
                  `}
                >
                   <div className="px-3 py-1.5 bg-black/80 border border-white/30 backdrop-blur-xl animate-glitch-popup-smoother flex flex-col items-center">
                      <span className="text-xs font-black tracking-[0.5em] text-emerald-400">
                          {page.kanji}
                      </span>
                   </div>
                </div>
              )
            ))}
        </div>

        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] z-10">
          <div className="relative w-full h-full">
            {pages.map((page) => (
              <button
                key={`slice-${page.id}`}
                className={`slice-btn absolute w-1/2 h-1/2 flex flex-col transition-all duration-500 ease-out group overflow-hidden outline-none ring-0 border-none
                  ${page.pos} ${page.contentAlign}
                  ${page.id === 1 ? 'rounded-tl-full' : ''}
                  ${page.id === 2 ? 'rounded-tr-full' : ''}
                  ${page.id === 3 ? 'rounded-bl-full' : ''}
                  ${page.id === 4 ? 'rounded-br-full' : ''}
                  ${hoveredSegment === page.id 
                    ? `z-20 bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.4)] ${page.translate} scale-105 md:scale-110` 
                    : 'bg-black/90 backdrop-blur-2xl text-white/50 border border-white/5'
                  }
                `}
                onMouseEnter={() => {
                    setHoveredSegment(page.id);
                    playHoverSound();
                }}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => {
                    if (hoveredSegment === page.id) {
                        window.location.href = page.path;
                    } else {
                        setHoveredSegment(page.id);
                    }
                }}
              >
                <div className={`transition-transform duration-500 flex flex-col items-center ${hoveredSegment === page.id ? 'scale-105' : 'scale-90'}`}>
                  <div className={`p-1 md:p-2 rounded-full mb-1 transition-colors duration-300 ${hoveredSegment === page.id ? 'bg-black/10' : ''}`}>
                    {page.icon}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
                    {page.name}
                  </span>
                </div>
              </button>
            ))}

            {/* MODIFIED PROGRESS-BASED CENTER BUTTON */}
            <button 
              disabled={unlockCount < 4}
              onClick={() => { if(unlockCount >= 4) window.location.href = "/reflection" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center z-30 transition-all duration-700
                ${unlockCount >= 4 
                  ? 'bg-black border-2 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)] cursor-pointer opacity-100 scale-100' 
                  : 'bg-neutral-900 border border-white/10 cursor-not-allowed opacity-40 scale-[0.85]'
                }
                ${isMeHovered && unlockCount >= 4 ? 'scale-110' : ''}
              `}
              onMouseEnter={() => {
                setIsMeHovered(true);
                if(unlockCount >= 4) playHoverSound();
              }}
              onMouseLeave={() => setIsMeHovered(false)}
            >
               {unlockCount >= 4 ? (
                 <UserCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 animate-pulse" />
               ) : (
                 <>
                   <Lock className="w-4 h-4 text-white/20 mb-1" />
                   <span className="text-[10px] font-black text-white/40 tracking-tighter">{unlockCount}/4</span>
                 </>
               )}
            </button>
          </div>
        </div>

        {/* Status Windows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
            {pages.map((page) => (
                <div
                    key={`chat-${page.id}`}
                    className={`absolute w-[14rem] sm:w-[16rem] md:w-[18rem] lg:w-72 p-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
                        ${hoveredSegment === page.id 
                        ? `opacity-100 scale-100 
                           ${page.side === 'left' ? 'lg:-translate-x-[26rem]' : 'lg:translate-x-[26rem]'} 
                           ${page.section === 'top' ? '-translate-y-[12.5rem] sm:-translate-y-[14.5rem]' : 'translate-y-[12.5rem] sm:translate-y-[14.5rem]'}
                           lg:translate-y-0` 
                        : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
                    `}
                >
                    <div className="relative bg-black/95 border-l-2 lg:border-l-4 border-white/80 p-3 sm:p-4 backdrop-blur-3xl shadow-2xl overflow-hidden">
                        <h3 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 border-b border-white/10 pb-1.5">
                           {page.name}
                        </h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                            {page.subMeanings.map((meaning, i) => (
                                <li key={i} className="flex items-center gap-2 group/item">
                                    <div className={`w-0.5 h-0.5 rounded-full ${page.color}`} />
                                    <span className="text-[10px] sm:text-xs font-light tracking-wide text-white/90">
                                        {meaning}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}