
import React, { useState, useEffect } from 'react';
import { OFFICIANT, ENTOURAGE, PRINCIPAL_SPONSORS, SECONDARY_SPONSORS, WEDDING_DATE } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Entourage: React.FC = () => {
  const officiant = OFFICIANT[0]; // Assuming there's only one officiant
  const allMembers = [
    ...PRINCIPAL_SPONSORS.map(m => ({ ...m, category: 'Principal Sponsor' })),
    ...SECONDARY_SPONSORS.map(m => ({ ...m, category: 'Secondary Sponsor' })),
    ...ENTOURAGE.map(m => ({ ...m, category: 'Wedding Member' })),
  ];

  useEffect(() => {
    const checkReveal = () => {
      const now = new Date().getTime();
      const revealTime = WEDDING_DATE.getTime() - (30 * 60 * 1000); // 30 minutes before
      setIsRevealed(now >= revealTime);
    };

    checkReveal();
    const interval = setInterval(checkReveal, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);


  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isRevealed, setIsRevealed] = useState(false);

  const nextMember = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % allMembers.length);
  };

  const prevMember = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + allMembers.length) % allMembers.length);
  };

  const officiant_index = officiant; // Assuming there's only one officiant
  const currentMember = allMembers[currentIndex];
  const isCurrentlyMystery = currentMember.isMystery && !isRevealed;

  return (
    <section id="entourage" className="py-24 bg-[#0c162c] bg-cover opacity-140">
      <div className="max-w-6xl mx-auto px-6 mt-20 mb-40">
        
        {/* Spotlight Flip Gallery */}
        <div className="relative max-w-2xl mx-auto min-h-[450px] md:h-[500px] flex items-center justify-center">
          {/* Member Card Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="w-full max-w-sm bg-white rounded-[3rem] p-8 text-center shadow-[0_35px_60px_-15px_rgba(193,154,107,0.15)] border border-[#faf9f6] animate-fade-in-up"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#c19a6b] mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {officiant_index.role}
              </motion.div>
              
              <motion.div 
                className="relative mb-8 mx-auto w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-8 border-[#faf9f6] shadow-inner group"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={officiant_index.imageUrl} 
                  alt={officiant_index.name} 
                  className={`w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100 ${isCurrentlyMystery ? 'grayscale' : ''}`}
                />
                {/* <div className="absolute inset-0 bg-[#c19a6b]/10 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                {isCurrentlyMystery && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="text-white text-4xl">?</span>
                  </div>
                )}
              </motion.div>

              <motion.h3 
                className="text-2xl md:text-3xl serif mb-2 text-[#333]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {officiant_index.name}
              </motion.h3>
              <motion.p 
                className="text-sm text-[#c19a6b] italic serif mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {/* Name */}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-white text-4xl md:text-5xl serif mb-4">The Entourage</h2>
          <p className="text-[#c19a6b] italic serif text-lg">The family and friends we hold dear</p>
        </motion.div>

        {/* Spotlight Flip Gallery */}
        <div className="relative max-w-2xl mx-auto min-h-[450px] md:h-[500px] flex items-center justify-center">
          
          {/* Controls - Left */}
          <motion.button 
            onClick={prevMember}
            className="absolute left-0 md:-left-12 z-50 p-4 rounded-full bg-white shadow-lg text-[#c19a6b] hover:bg-[#c19a6b] hover:text-white transition-all active:scale-90"
            aria-label="Previous Member"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Member Card Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="w-full max-w-sm bg-white rounded-[3rem] p-8 text-center shadow-[0_35px_60px_-15px_rgba(193,154,107,0.15)] border border-[#faf9f6]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c19a6b] mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentMember.category}
              </motion.div>
              
              <motion.div 
                className="relative mb-8 mx-auto w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-8 border-[#faf9f6] shadow-inner group"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={isCurrentlyMystery ? 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&h=400&fit=crop&blur=50' : currentMember.imageUrl} 
                  alt={isCurrentlyMystery ? 'Mystery Person' : currentMember.name} 
                  className={`w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100 ${isCurrentlyMystery ? 'grayscale' : ''}`}
                />
                {/* <div className="absolute inset-0 bg-[#c19a6b]/10 opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                {isCurrentlyMystery && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="text-white text-4xl">?</span>
                  </div>
                )}
              </motion.div>

              <motion.h3 
                className="text-2xl md:text-3xl serif mb-2 text-[#333]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {isCurrentlyMystery ? '???' : currentMember.name}
              </motion.h3>
              <motion.p 
                className="text-sm text-[#c19a6b] italic serif mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {isCurrentlyMystery ? '???' : currentMember.role}
              </motion.p>

              <motion.div 
                className="flex justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {allMembers.map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`h-1.5 rounded-full ${
                      i === currentIndex ? 'bg-[#c19a6b]' : 'bg-gray-100'
                    }`}
                    animate={{
                      width: i === currentIndex ? 32 : 6,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls - Right */}
          <motion.button 
            onClick={nextMember}
            className="absolute right-0 md:-right-12 z-50 p-4 rounded-full bg-white shadow-lg text-[#c19a6b] hover:bg-[#c19a6b] hover:text-white transition-all active:scale-90"
            aria-label="Next Member"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Thumbnail Preview (Optional interactive row) */}
        <motion.div 
          className="mt-16 flex justify-normal gap-4 overflow-x-auto py-4 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* {allMembers.map((member, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                i === currentIndex ? 'border-[#c19a6b] shadow-md' : 'border-transparent opacity-40 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: i === currentIndex ? 1.25 : 1,
              }}
            >
              <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
            </motion.button>
          ))} */}

          {allMembers.map((member, i) => {
            const isMysteryThumb = member.isMystery && !isRevealed;
            return (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)} 
                className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${i === currentIndex ? 'border-[#c19a6b] scale-125 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img 
                  src={isMysteryThumb ? 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=100&h=100&fit=crop&blur=50' : member.imageUrl} 
                  alt={isMysteryThumb ? '?' : member.name} 
                  className={`w-full h-full object-cover ${isMysteryThumb ? 'grayscale' : ''}`} 
                />
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Entourage;
