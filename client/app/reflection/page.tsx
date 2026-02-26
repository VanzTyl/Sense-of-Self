"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, FastForward } from 'lucide-react';
import Link from 'next/link';

// --- DATA STRUCTURE ---
const REFLECTION_SCENES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1739733901467-ed70da263604?q=80&w=2070",
    text: "You now have finished reading the pieces and self-reflections that Ian made throughout this entire building process of making his own self of sense website..",
    speaker: "SYSTEM AI"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1498673394965-85cb14905c89?q=80&w=2070",
    text: "Hello! If you're reading this you've finished reading all the selves that I have built up from the start and till now, I'm still on an adventure exploring more things to indulge, enjoy and spend time on. This reflections that I'll be showing are what symbolizes the current me..",
    speaker: "IAN"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1766390700609-5c437e7bc638?q=80&w=2070",
    text: "I've realized that my physical self, my sexual self looks very contradicting from the other 2 selves, you may ask. But this actually symbolizes on how simple I want to be. If there are things I agree on my self like the sexual one, I think about other things to improve my other aspects on, as well as for the physical self where I try to find ways to improve myself and not just plain acceptance and moving on...",
    speaker: "IAN"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1639976519431-d04370623ee5?q=80&w=2070",
    text: "Creating this website has shown me more things and deep actualizations of myself that I need to focus on. The most impactful self that I currently am facing right now is my sexual self, this self of mine has encouraged me more to step up and be better not just for myself but also for my current partner..",
    speaker: "IAN"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1702424616004-ed0aeab3d432?q=80&w=2070",
    text: "Finalizing and finishing this, polishing and trying to make my narrative and flow of things lead all up to this. Has made me realize that it's actually fun to create projects like this where I focus on myself instead of trying to seek materialistic achievements that I can gain from it. It helped me lessen my worries and stress from the pressure of currently being an adult..",
    speaker: "IAN"
  }
];

// --- OPTIMIZED TYPEWRITER (Prevents double-typing) ---
const TypewriterText = ({ text, speed = 25, onComplete }: { text: string, speed?: number, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("");
    const audio = new Audio('/audio/mixkit-smartphone-digital-keyboard-1394.wav');
    audio.loop = true;
    audioRef.current = audio;
    
    let i = 0;
    const playAudio = async () => { try { await audio.play(); } catch (e) {} };
    playAudio();

    timerRef.current = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        audio.pause();
        onComplete();
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [text, speed]); // Removed onComplete from dependencies to prevent re-triggers

  return (
    <span>
      {displayedText}
      <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-pulse"></span>
    </span>
  );
};

export default function ReflectionPage() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const nextScene = () => {
    if (currentScene < REFLECTION_SCENES.length - 1) {
      setIsTypingDone(false);
      setCurrentScene(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="h-screen w-full bg-black overflow-hidden flex flex-col relative font-mono">
      
      {/* INITIAL START BUTTON (Blank Canvas) */}
      {!isStarted && (
        <div className="absolute inset-0 z-[110] bg-black flex items-center justify-center">
          <button 
            onClick={() => setIsStarted(true)}
            className="group flex flex-col items-center gap-6 transition-all hover:scale-105"
          >
            <div className="w-20 h-20 border border-white/20 flex items-center justify-center rounded-full group-hover:border-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
              <Play className="text-white fill-white w-8 h-8" />
            </div>
            <div className="space-y-2 text-center">
              <span className="block text-white text-xs tracking-[0.6em] font-black uppercase italic">Start Reflection</span>
              <span className="block text-white/40 text-[12px] tracking-[0.3em] uppercase">The Self's Journey</span>
            </div>
          </button>
        </div>
      )}

      {/* TOP SECTION: 70% IMAGE AREA */}
      <div className={`relative h-[70%] w-full transition-opacity duration-1000 ${isStarted && !isFinished ? 'opacity-100' : 'opacity-0'}`}>
        {REFLECTION_SCENES.map((scene, index) => (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${currentScene === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            style={{
              backgroundImage: `url(${scene.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]"></div>
        
        {/* Letterbox Top Bar */}
        <div className="absolute top-0 w-full h-12 bg-black/80 backdrop-blur-md flex items-center px-10 border-b border-white/5 justify-between">
           <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Reflection // Fragment_{currentScene + 1}</span>
           <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> REC
           </span>
        </div>
      </div>

      {/* BOTTOM SECTION: 30% DIALOGUE AREA */}
      <div className={`relative h-[30%] w-full bg-black border-t border-white/10 p-8 flex flex-col transition-all duration-1000 ${isStarted && !isFinished ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-5xl mx-auto w-full h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-3">
               <div className="bg-white/10 px-2 py-0.5 border border-white/20">
                 <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Speaker</span>
               </div>
               <span className="text-white text-xs font-black tracking-[0.3em] uppercase">{REFLECTION_SCENES[currentScene].speaker}</span>
            </div>
            
            <div className="text-white/90 text-lg md:text-xl font-light italic leading-relaxed">
              {isStarted && (
                <TypewriterText 
                  key={currentScene} 
                  text={REFLECTION_SCENES[currentScene].text} 
                  onComplete={() => setIsTypingDone(true)} 
                />
              )}
            </div>
          </div>

          {/* Interaction Prompt */}
          <div className="flex justify-end items-end h-8">
            {isTypingDone && (
              <button 
                onClick={nextScene}
                className="flex items-center gap-3 text-[10px] text-white font-bold uppercase tracking-[0.4em] hover:text-emerald-400 transition-colors animate-in fade-in slide-in-from-right-4"
              >
                Continue Sequence <FastForward className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FINAL STATE: RETURN TO HOME */}
      {isFinished && (
        <div className="absolute inset-0 z-[120] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
           <div className="text-center mb-12 space-y-4">
             <div className="h-px w-24 bg-white/20 mx-auto" />
             <h2 className="text-white text-4xl font-black tracking-[0.5em] uppercase italic">Thank you!</h2>
             <p className="text-white/30 text-xs tracking-widest uppercase">The website itself was easy to create, but I made sure to take time in pondering bits of my selfs throughout the entire process</p>
           </div>
           
           <Link href="/">
              <button className="group relative flex items-center bg-black/60 hover:bg-white backdrop-blur-md border border-white/20 h-14 w-14 hover:w-56 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-full">
                <div className="absolute left-0 w-14 h-14 flex items-center justify-center shrink-0">
                  <ArrowLeft className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <span className="ml-16 opacity-0 group-hover:opacity-100 whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-black transition-all duration-500 delay-100">
                  Return to Home
                </span>
              </button>
           </Link>
        </div>
      )}
    </div>
  );
}