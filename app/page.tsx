'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Sparkles, Heart } from 'lucide-react';

const names = ['Sarah', 'Dora', 'Ehinomen', 'Oseakhumen'];

export default function Page() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [openedNotes, setOpenedNotes] = useState<number[]>([]);
  const [choiceMade, setChoiceMade] = useState<'yes' | 'time' | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentName = names[currentNameIndex];

  const handleNameClick = () => {
    setCurrentNameIndex((prev) => (prev + 1) % names.length);
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://p.scdn.co/mp3-preview/745e7f1a3f65819777126131c9447c2a7924c8b9?cid=774b29d4f13844c495f2061dad9c1333');
      audioRef.current.loop = true;
    }
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
    }
  };

  const toggleNote = (index: number) => {
    if (!openedNotes.includes(index)) {
      setOpenedNotes([...openedNotes, index]);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-darkBg text-gray-200 overflow-hidden selection:bg-purple-900 selection:text-white pb-24">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-950/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] bg-indigo-950/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Atmospheric Audio Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surfaceDark/80 border border-purple-900/40 text-xs text-purple-300 backdrop-blur-md shadow-lg transition-all hover:bg-purple-950/30"
          title="Toggle atmospheric audio"
        >
          {audioPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse text-purple-400" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
          <span>{audioPlaying ? 'Atmosphere ON' : 'Atmosphere'}</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-16 sm:pt-24 flex flex-col items-center">

        {/* ================= STAGE 1: PLAYFUL / INTRIGUING ================= */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full text-center space-y-6 min-h-[75vh] flex flex-col justify-center items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-800/30 text-purple-300 text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Met on Snapchat · 5 months ago</span>
          </div>

          <div className="space-y-3">
            <p className="text-gray-400 text-sm tracking-widest uppercase">For the girl with too many names</p>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white cursor-pointer select-none group" onClick={handleNameClick}>
              For <span className="text-purple-400 underline decoration-purple-800/60 underline-offset-8 transition-colors group-hover:text-purple-300">{currentName}</span>
            </h1>
            <p className="text-xs text-gray-500 pt-1">(tap her name)</p>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 font-light max-w-md pt-4">
            Apparently, I have a lot to say.
          </p>

          <div className="pt-12 text-sm text-purple-400/80 font-light flex flex-col items-center gap-2 animate-bounce">
            <span>Scroll down</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.section>


        {/* ================= STAGE 2: REMIND HER WHY I LIKED HER ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-24 space-y-10"
        >
          <div className="space-y-3 text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white">You’re ridiculously easy to like.</h2>
            <p className="text-gray-400 text-sm font-light max-w-md mx-auto">
              Looking back, talking to you naturally became one of the easiest parts of my day.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              { label: 'Proactive', desc: 'You always showed up with intention.' },
              { label: 'Smart', desc: 'Conversations that actually made me think.' },
              { label: 'Fun to talk to', desc: 'Hours passed without realizing it.' },
              { label: 'A really good listener', desc: 'You paid attention to the details.' },
              { label: 'Gorgeous', desc: 'Obviously. That was hard to miss.' },
              { label: 'Older than me', desc: 'With a maturity I deeply respected.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-surfaceDark/60 border border-purple-950/50 backdrop-blur-sm space-y-1">
                <h3 className="text-sm font-medium text-purple-300">{item.label}</h3>
                <p className="text-xs text-gray-400 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>


        {/* ================= STAGE 3: MEMORIES (CARDS) ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-20 space-y-8"
        >
          <div className="space-y-2 text-center">
            <span className="text-xs tracking-widest text-purple-400 uppercase">Moments</span>
            <h2 className="text-2xl font-medium text-white">Things I still remember clearly.</h2>
            <p className="text-xs text-gray-500">Tap cards to inspect</p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              {
                id: '01',
                title: 'All night.',
                text: 'Those conversations where somehow it was suddenly 4 AM and neither of us wanted to go to sleep.'
              },
              {
                id: '02',
                title: 'My wife.',
                text: 'Yes. I really did have the audacity to call myself your husband even though we weren’t officially together.'
              },
              {
                id: '03',
                title: 'You.',
                text: 'The simple fact that talking to you became one of the easiest, brightest parts of my daily routine.'
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                className={`p-5 rounded-xl border transition-all cursor-pointer backdrop-blur-sm ${
                  activeCard === idx 
                    ? 'bg-purple-950/20 border-purple-700/60 shadow-lg shadow-purple-950/30' 
                    : 'bg-surfaceDark/40 border-purple-950/30 hover:border-purple-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400">{card.id}</span>
                  <span className="text-xs text-gray-500">{activeCard === idx ? 'close' : 'tap'}</span>
                </div>
                <h3 className="text-lg font-medium text-white mt-2">{card.title}</h3>
                <p className="text-sm text-gray-300 font-light mt-1">{card.text}</p>
              </div>
            ))}
          </div>
        </motion.section>


        {/* ================= SHIFT IN MOOD ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-28 text-center space-y-8 border-t border-purple-950/40"
        >
          <p className="text-xs tracking-widest text-purple-400 uppercase font-mono">OKAY. ENOUGH BEING CUTE.</p>
          
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Because I fucked up.
          </h2>

          <div className="space-y-4 max-w-md mx-auto text-gray-300 font-light text-base leading-relaxed">
            <p>I disappeared for two months.</p>
            <p className="text-gray-400 text-sm">I know what that looked like from your side.</p>
            <p className="text-gray-400 text-sm">And I know that no amount of pretty words can change what I actually did.</p>
            <div className="pt-4 p-6 rounded-2xl bg-surfaceDark/80 border border-purple-900/30 space-y-3">
              <p className="text-white font-medium">“You don’t ghost people you care about.”</p>
              <p className="text-xs text-purple-300">You were right when you said that. I should have communicated. I didn’t.</p>
            </div>
            <p className="pt-2 text-sm text-gray-300">That was selfish. It was childish. And whatever my reasons were, you deserved an explanation instead of silence.</p>
          </div>
        </motion.section>


        {/* ================= EXPLAIN WHY I LEFT ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-20 space-y-8"
        >
          <div className="space-y-2 text-center">
            <span className="text-xs tracking-widest text-purple-400 uppercase font-mono">THE PART I SHOULD HAVE SAID THEN</span>
            <h2 className="text-2xl font-medium text-white">Why I stepped away.</h2>
          </div>

          <div className="space-y-4 text-gray-300 font-light text-sm sm:text-base leading-relaxed p-6 rounded-2xl bg-surfaceDark/40 border border-purple-950/50">
            <p>I wasn’t trying to play with you. I wasn’t trying to manipulate you. But I handled everything badly enough that I completely understand why it felt that way.</p>
            <p>At the time, I had lost my sense of purpose, and that started feeding an unhealthy romantic obsession.</p>
            <p>I needed to step back and figure out whether what I felt for you was real, or whether I was using how I felt about you to fill something missing in myself.</p>
            <p>So I worked on myself. I got my life back in order. I wanted to come back without making you responsible for carrying me emotionally.</p>
            <div className="pt-3 pb-1 border-t border-purple-900/30 text-white font-medium">
              <p>But I made the mistake of thinking I could figure all of that out without talking to you.</p>
            </div>
            <p className="text-purple-300 font-normal">I couldn’t. And I shouldn’t have tried.</p>
          </div>
        </motion.section>


        {/* ================= THE APOLOGY (INTERACTIVE NOTES) ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-20 space-y-8 text-center"
        >
          <div className="space-y-2">
            <span className="text-xs tracking-widest text-purple-400 uppercase font-mono">ACCOUNTABILITY</span>
            <h2 className="text-2xl font-medium text-white">Tap the notes below</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
            {[
              "I’m sorry.",
              "I should’ve communicated.",
              "I don’t expect this website to erase two months.",
              "I cared. I just handled caring badly.",
              "If you gave me another chance, I would communicate better."
            ].map((noteText, idx) => {
              const isOpened = openedNotes.includes(idx);
              return (
                <div 
                  key={idx}
                  onClick={() => toggleNote(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer backdrop-blur-sm min-h-[100px] flex flex-col justify-between ${
                    isOpened 
                      ? 'bg-purple-950/20 border-purple-700/50 text-white' 
                      : 'bg-surfaceDark/70 border-purple-950/40 text-gray-400 hover:border-purple-800/30'
                  }`}
                >
                  <span className="text-xs font-mono text-purple-400">Note 0{idx + 1}</span>
                  <p className={`text-sm font-light transition-opacity duration-300 ${isOpened ? 'opacity-100 text-gray-200' : 'opacity-60 blur-[3px] select-none'}`}>
                    {noteText}
                  </p>
                  <span className="text-[10px] text-gray-500 text-right">{isOpened ? 'opened' : 'tap to read'}</span>
                </div>
              );
            })}
          </div>
        </motion.section>


        {/* ================= THE LETTER ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-24 px-6 sm:px-10 rounded-2xl bg-surfaceDark/30 border border-purple-950/60 backdrop-blur-md space-y-6 text-gray-300 font-light text-base sm:text-lg leading-relaxed"
        >
          <p className="text-purple-300 font-medium text-sm tracking-wider">
            Sarah — Dora — Ehinomen — Oseakhumen,
          </p>

          <p>I don’t know if I deserve another chance. I’m not going to pretend that I do.</p>

          <p>I just want you to know that disappearing wasn’t me deciding that I didn’t care about you. It was me being too immature to communicate what was actually going on inside my head.</p>

          <p>I liked you. I cared about you. I still do.</p>

          <p>And I’m sorry that instead of trusting you enough to explain myself, I chose silence.</p>

          <p>I can’t ask you to forget what happened. I can only tell you that if you let me back in, I want to do it properly this time.</p>

          <div className="pt-6 font-medium text-white">
            — Jay ♡
          </div>
        </motion.section>


        {/* ================= FINAL QUESTION & CHOICES ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full py-28 text-center space-y-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-medium text-white">So, {currentName}…</h2>
            <p className="text-xl sm:text-2xl font-light text-purple-300">Can I try again?</p>
          </div>

          <div className="space-y-2 text-xs text-gray-400 font-light max-w-sm mx-auto">
            <p>Not because you owe me forgiveness.</p>
            <p>Not because this website is supposed to change your mind.</p>
            <p>Just because I’d like the chance to show you I can do better.</p>
          </div>

          {!choiceMade ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
                onClick={() => setChoiceMade('yes')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm tracking-wide shadow-lg shadow-purple-950/50 transition-all transform hover:scale-[1.02]"
              >
                ♡ I want to
              </button>
              <button
                onClick={() => setChoiceMade('time')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-surfaceDark hover:bg-purple-950/20 text-gray-300 border border-purple-900/40 font-medium text-sm tracking-wide transition-all"
              >
                I need time
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-surfaceDark/80 border border-purple-800/40 max-w-md mx-auto space-y-4 text-center"
            >
              {choiceMade === 'yes' ? (
                <>
                  <h3 className="text-xl font-medium text-white">Then I’ll do this properly this time.</h3>
                  <div className="space-y-1 text-sm text-gray-300 font-light">
                    <p>No disappearing.</p>
                    <p>No half-explanations.</p>
                    <p>No making you guess.</p>
                    <p className="text-purple-300 font-medium pt-2">Just me. Showing you.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-medium text-white">Okay. Take all the time you need.</h3>
                  <div className="space-y-1 text-sm text-gray-300 font-light">
                    <p>I meant what I said.</p>
                    <p className="text-purple-300 font-medium pt-2">And thank you for getting this far.</p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.section>

        {/* ================= FINAL FOOTER ================= */}
        <footer className="w-full pt-16 pb-8 text-center border-t border-purple-950/30 text-xs text-gray-500 font-light">
          <p>made with questionable timing & genuine intentions · J ♡</p>
        </footer>

      </div>
    </main>
  );
}
