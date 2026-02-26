'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Cylinder, UsersRound, Heart, User, X, Eye, Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TypewriterText = ({ text, speed = 15 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/mixkit-smartphone-digital-keyboard-1394.wav');
    audio.loop = true;
    audioRef.current = audio;

    setDisplayedText("");
    let i = 0;
    
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (e) {}
    };
    playAudio();

    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        audio.pause();
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

  return (
    <span>
      {displayedText}
      <span className="inline-block w-1.5 h-3 ml-1 bg-white animate-pulse"></span>
    </span>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const audioPlayed = useRef(false);

  useEffect(() => {
    // Attempt to play the alert sound immediately
    if (!audioPlayed.current) {
      const startAudio = new Audio('/audio/rescopicsound-ui-alert-menu-modern-interface-confirm-small-230482.mp3');
      startAudio.volume = 0.7;
      startAudio.play().catch((err) => console.log("Autoplay blocked, waiting for interaction", err));
      audioPlayed.current = true;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 4200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black/80 flex items-center justify-center transition-all duration-700 ${fadeOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-pulse"></div>
      
      <div className="relative group">
        <div className="absolute -inset-4 border border-white/10 animate-[ping_3s_infinite] scale-95 opacity-20"></div>
        <div className="absolute -inset-2 border border-white/20 animate-[pulse_2s_infinite]"></div>
        
        <div className="bg-black border-2 border-white px-12 py-8 relative overflow-hidden flex flex-col items-center justify-center min-w-[320px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-1/2 w-full animate-[bounce_1.5s_infinite] pointer-events-none"></div>
          <h1 className="text-white text-3xl font-bold tracking-[0.4em] uppercase italic relative">
            My Sexual Self
          </h1>
        </div>
        
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
      </div>
    </div>
  );
};

export default function App() {
  const [showUnlockToast, setShowUnlockToast] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  useEffect(() => {
    // 1. Get current list of visited pages to avoid double-counting the same page
    const visited = JSON.parse(localStorage.getItem('visited_selves') || '[]');
    const currentPage = window.location.pathname;

    if (!visited.includes(currentPage)) {
        const updatedVisited = [...visited, currentPage];
        localStorage.setItem('visited_selves', JSON.stringify(updatedVisited));
        
        // 2. Update the integer count
        const newCount = updatedVisited.length;
        localStorage.setItem('hasUnlocked', newCount.toString());

        // 3. Trigger toast if this is the 4th unique page
        if (newCount === 4) {
        setShowUnlockToast(true);
        }
    } else {
        // Check if they already hit 4 in a previous session to show toast again or keep it available
        const currentCount = parseInt(localStorage.getItem('hasUnlocked') || '0');
        if (currentCount >= 4) setShowUnlockToast(true);
    }
    }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const playHoverSound = () => {
    if (loading || !hasStarted) return;
    const hoverAudio = new Audio('/audio/mixkit-sci-fi-interface-robot-click-901.wav');
    hoverAudio.volume = 0.4;
    hoverAudio.play().catch(() => {});
  };

  const startSequence = () => {
    setHasStarted(true);
    setLoading(true);
  };

  const data = [
    {
      title: "Foundation",
      subtitle: "My Sexual Self's Starting Point",
      color: "text-cyan-400",
      borderColor: "border-cyan-500/50",
      icon: Cylinder,
      bgImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "My foundation grew up of the Christian values as well as being able to have a glimpse towards Roman Catholicism, I've been able to experience both and seen both that they align with the same virtues and they don't stray far away from marrying of the opposite sex and grow a family.."
    },
    {
      title: "Environment",
      subtitle: "Constant Environment & Encounters",
      color: "text-purple-400",
      borderColor: "border-purple-500/50",
      icon: UsersRound,
      bgImage: "https://images.unsplash.com/photo-1494861895304-fb272971c078?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "I live in a house that has other sexual orientations other than only being straightlaced, I have friends whom also are of the same. This exposed me to other variety of perceptions and how people comprehend who they are.."
    },
    {
      title: "Embracement",
      subtitle: "My Conclusion",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/50",
      icon: Heart,
      bgImage: "https://images.unsplash.com/photo-1516349935484-52a0d805fdb1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "I've solidified my own virtues through various experiences. I've seen myself only attracted of the opposite gender while also having the mindset that having exposed me through your typical simple get married and have a family lifestyle, I believe it suits me most and that I've endowed myself to this mindset as well. To live a simple life.."
    }
  ];

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(null);
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col relative font-sans">
      {/* Initial Entry Interaction (To bypass Browser Audio Policy) */}
      {!hasStarted && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
            <button 
                onClick={startSequence}
                className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-white/80 transition-all duration-500"
            >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <div className="flex items-center gap-4 text-white font-black italic tracking-[0.2em] uppercase">
                    <Play className="w-4 h-4 fill-white" />
                    Start Analysis
                </div>
            </button>
        </div>
      )}

      {/* Background Layer */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${loading || !hasStarted ? 'blur-2xl scale-110 opacity-40' : 'blur-0 scale-100'}`}>
        {data.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${activeIndex === i ? 'opacity-40' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${item.bgImage})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>

      {loading && hasStarted && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 3 Main Interactive Sections */}
      <div className={`relative z-10 flex flex-col h-full w-full transition-all duration-1000 ${loading || !hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {data.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => {
                if (activeIndex === null) playHoverSound();
              }}
              className="flex-1 w-full border-b border-white/5 relative group cursor-default overflow-hidden outline-none"
            >
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${isPreviewing ? 'opacity-0 pointer-events-none' : ''} ${activeIndex === i ? 'bg-white/5 backdrop-blur-sm' : 'hover:bg-white/[0.02]'}`}>
                <div className={`transition-all duration-700 transform flex flex-col items-center ${activeIndex === i ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}>
                  <div className={`mb-4 transition-all duration-500 ${activeIndex === i ? 'opacity-100 translate-y-0 scale-125' : 'opacity-20 translate-y-4 scale-100 group-hover:opacity-60'}`}>
                    <Icon className={`w-12 h-12 ${item.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                  </div>
                  
                  <h2 className={`text-4xl font-black italic tracking-tighter uppercase transition-colors duration-500 ${activeIndex === i ? item.color : 'text-white/40 group-hover:text-white/70'}`}>
                    {item.title}
                  </h2>
                  <p className="text-xs font-mono tracking-widest text-white/30 uppercase mt-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Center Fixed Dialogue Box */}
      {activeIndex !== null && !loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
          <div className="w-full max-w-4xl pointer-events-auto animate-in fade-in zoom-in duration-300 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-[60]">
              <button
                onMouseEnter={() => {
                  setIsPreviewing(true);
                  playHoverSound();
                }}
                onMouseLeave={() => setIsPreviewing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-black/80 border border-white/20 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/50 transition-all group"
              >
                <Eye className="w-3 h-3 group-hover:animate-pulse" />
                Hover over me to preview the full image
              </button>
            </div>

            <div className={`border border-white/10 bg-black/90 backdrop-blur-2xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-opacity duration-300 ${isPreviewing ? 'opacity-0' : 'opacity-100'}`}>
              <button 
                onClick={handleClose}
                onMouseEnter={playHoverSound}
                className="absolute -top-4 -right-4 w-10 h-10 bg-black border border-white/20 flex items-center justify-center text-white hover:border-white transition-colors z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40"></div>
              
              <div className="flex items-start gap-8">
                <div className="shrink-0">
                  <div className="w-20 h-20 border border-white/10 flex items-center justify-center bg-white/5 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <User className="w-10 h-10 text-white/60 transition-colors relative z-10" />
                    <div className="absolute inset-0 opacity-20 bg-cyan-500/10"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">User:</span>
                      <span className="text-[10px] font-mono text-white/80">Ian</span>
                    </div>

                    <h3 className={`text-lg font-bold tracking-wider flex items-center gap-2 transition-all duration-500 ${data[activeIndex].color}`}>
                      <span className="uppercase">
                        {data[activeIndex].title}
                      </span>
                    </h3>
                    
                    <div className="text-sm text-white/80 leading-relaxed font-light font-mono min-h-[3rem]">
                      {isMounted && (
                        <TypewriterText key={activeIndex} text={data[activeIndex].content} speed={20} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ambient Corners */}
      <div className="fixed top-10 left-10 w-32 h-32 border border-white/5 rotate-45 pointer-events-none opacity-20"></div>
      <div className="fixed bottom-10 right-10 w-32 h-32 border border-white/5 rotate-45 pointer-events-none opacity-20"></div>

      {showUnlockToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <Link href="/" className="group flex flex-col items-end gap-2">
            <div className="bg-emerald-500 text-black px-4 py-3 rounded-none skew-x-[-12deg] font-black text-xs tracking-tighter shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
                You have unlocked the middle button at the home page
            </div>
            <div className="bg-white text-black text-[10px] px-2 py-1 uppercase font-bold">
                Return to Home Page →
            </div>
            </Link>
        </div>
        )}

        <div className="fixed bottom-8 left-8 z-[100]">
            <Link href="/">
                <button className="group relative flex items-center bg-black/60 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/80 rounded-full h-12 w-12 hover:w-48 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden">
                
                {/* Arrow Icon Wrapper - Stays fixed on the left */}
                <div className="absolute left-0 w-12 h-12 flex items-center justify-center shrink-0">
                    <ArrowLeft className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-1" />
                </div>

                {/* Hidden Text - Fades in and stays aligned */}
                <span className="ml-12 opacity-0 group-hover:opacity-100 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 delay-100">
                    Return to Home
                </span>
                
                </button>
            </Link>
        </div>

    </div>
  );
}