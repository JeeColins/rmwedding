
import React, { useState } from 'react';
import { EVENTS } from '../constants';
import { motion } from 'framer-motion';

const Events: React.FC = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const checkAccess = () => {
    if (accessCode.toLowerCase() === 'forever') {
      setIsUnlocked(true);
    } else {
      alert('Incorrect access code for private events.');
    }
  };

  return (
    <section id="events" className="py-24 bg-[#0c162c] bg-cover overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-white text-4xl md:text-5xl serif mb-4">The Celebration</h2>
          <p className="text-[#c19a6b] italic serif text-lg">We can't wait to see you there</p>
        </motion.div>

        {/* {!isUnlocked && (
          <div className="mb-12 p-6 bg-white/50 backdrop-blur rounded-xl border border-[#c19a6b]/20 text-center max-w-md mx-auto animate-fade-in-up">
            <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-widest">Guest Access</p>
            <p className="text-xs text-gray-500 mb-4 italic">Have a code from your invite? Enter it to see private family events.</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Code (e.g. FOREVER)" 
                className="flex-1 p-3 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-[#c19a6b] transition-all"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
              <button 
                onClick={checkAccess}
                className="px-6 py-2 bg-[#c19a6b] text-white rounded text-sm font-bold hover:bg-[#a67d51] transition-colors active:scale-95"
              >
                Unlock
              </button>
            </div>
          </div>
        )} */}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {EVENTS.map((event, index) => {
            if (event.isPrivate && !isUnlocked) return null;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-[#fffef7] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {event.isPrivate && (
                   <div className="absolute top-4 right-4 bg-[#c19a6b] text-white text-[10px] uppercase font-bold px-2 py-1 rounded z-10">
                     Private Event
                   </div>
                )}
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-[#c19a6b] font-bold tracking-widest uppercase text-xs block transition-transform group-hover:translate-x-1">{event.date}</span>
                    <h3 className="text-2xl serif mt-2 transition-colors group-hover:text-[#c19a6b]">{event.title}</h3>
                  </div>
                  <div className="space-y-2 mb-6 text-gray-600 italic">
                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      <svg className="w-4 h-4 text-[#c19a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform stagger-1">
                      <svg className="w-4 h-4 text-[#c19a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {event.description}
                  </p>
                  <a 
                    href={event.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c19a6b] border-b border-[#c19a6b] pb-1 hover:text-[#a67d51] hover:border-[#a67d51] transition-all self-start group/link"
                  >
                    Add to Calendar
                    <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;