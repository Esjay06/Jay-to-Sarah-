'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Heart, ShieldAlert } from 'lucide-react';

const names = ['Sarah', 'Dora', 'Ehinomen', 'Oseakhumen'];

export default function Page() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [choiceMade, setChoiceMade] = useState<'yes' | 'no' | null>(null);

  const currentName = names[currentNameIndex];

  const handleNameClick = () => {
    const nextIndex = currentNameIndex + 1;
    if (nextIndex < names.length) {
      setCurrentNameIndex(nextIndex);
    } else {
      // 4th and last name tapped -> Swipe up to page 2
      setCurrentPage(2);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050507] text-gray-100 overflow-hidden flex flex-col justify-center items-center selection:bg-purple-900 selection:text-white">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-950/20 blur-[150px] pointer-events-none rounded-full" />

      <AnimatePresence mode="wait">
        {currentPage === 1 ? (
          /* ================= PAGE 1: WELCOME & NAMES ================= */
          <motion.section
            key="page1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full max-w-md px-6 text-center space-y-10 flex flex-col items-center justify-center min-h-screen"
          >
            <div className="space-y-4">
              <p className="text-gray-400 text-sm font-light leading-relaxed tracking-wide">
                Welcome to your website. <br />
                <span className="text-gray-500 text-xs">Well it’s my website but I built it for you, cause you mean that much to me</span>
              </p>
            </div>

            <div className="py-8 space-y-3 cursor-pointer group" onClick={handleNameClick}>
              <p className="text-xs tracking-widest text-purple-400 uppercase font-mono">Tap the name below</p>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight transition-all group-hover:scale-105">
                {currentName}
              </h1>
              <p className="text-[11px] text-gray-500 font-mono pt-1">
                ({currentNameIndex + 1} of {names.length}) {currentNameIndex === names.length - 1 ? '— Tap to swipe up' : ''}
              </p>
            </div>

            <div className="pt-8 text-purple-400/70 text-xs font-light flex flex-col items-center gap-1.5 animate-bounce">
              <span>Swipe up when ready</span>
              <ChevronUp className="w-4 h-4" />
            </div>
          </motion.section>
        ) : (
          /* ================= PAGE 2: THE TRUTH & FINAL QUESTION ================= */
          <motion.section
            key="page2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full max-w-md px-6 py-16 space-y-8 flex flex-col justify-center min-h-screen"
          >
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.25em] text-purple-400 uppercase font-mono">ACCOUNTABILITY</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Let’s skip the bullshit.</h2>
            </div>

            {/* List of fuck ups & real talk */}
            <div className="space-y-4 text-gray-300 font-light text-sm leading-relaxed p-6 rounded-3xl bg-[#0b0b12]/90 border border-purple-900/40 backdrop-blur-xl shadow-2xl">
              <p>I messed up. I disappeared for two months like a ghost, and that was completely unfair to you.</p>
              <p>No games, no excuses, no long stories about how we met or cute nicknames. I handled things like an idiot.</p>
              <p className="text-white font-medium">I care about you deeply. And I want to make it crystal clear: I would never manipulate you or play with your head.</p>
              <p className="text-purple-300">Whatever your answer is, you deserve complete honesty from here on out.</p>
            </div>

            {/* Big Question & Options */}
            <div className="space-y-6 pt-4 text-center">
              <h3 className="text-xl font-semibold text-white tracking-tight">Do you want to try again?</h3>

              {!choiceMade ? (
                <div className="flex flex-col gap-3.5">
                  <button
                    onClick={() => setChoiceMade('yes')}
                    className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm tracking-wide shadow-xl shadow-purple-950/50 transition-all active:scale-95"
                  >
                    Let’s try again ♡
                  </button>
                  <button
                    onClick={() => setChoiceMade('no')}
                    className="w-full py-4 rounded-2xl bg-[#0b0b12] hover:bg-red-950/20 text-red-400 border border-red-900/30 font-medium text-sm tracking-wide transition-all active:scale-95"
                  >
                    Fuck off loser
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl bg-[#0b0b12]/95 border border-purple-600/40 space-y-3 text-center shadow-2xl"
                >
                  {choiceMade === 'yes' ? (
                    <>
                      <h4 className="text-lg font-semibold text-white">Bet. No more disappearing.</h4>
                      <p className="text-xs text-gray-300 font-light">I’ll show you right this time.</p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold text-white">Fair enough.</h4>
                      <p className="text-xs text-gray-400 font-light">I deserved that response. Thanks for listening anyway.</p>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </main>
  );
}
