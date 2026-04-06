
import React, { useState } from 'react';
import { STORY_TIMELINE } from '../constants';
import { polishStory } from '../services/geminiService';
import { motion } from "framer-motion";

const Story: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishedText, setPolishedText] = useState('');

  const handlePolish = async () => {
    if (!notes.trim()) return;
    setIsPolishing(true);
    const result = await polishStory(notes);
    setPolishedText(result);
    setIsPolishing(false);
  };

  return (
    <section
      id="story"
      className="transition-all duration-700 ease-out py-24 bg-[#0c162c] bg-cover px-6 max-w-8xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-white text-4xl md:text-5xl serif mb-4">Our Story</h2>
        <p className="text-[#c19a6b] italic serif text-lg">From a coffee shop to forever</p>
      </motion.div>

      <div className="space-y-24">
        {STORY_TIMELINE.map((moment, idx) => (
          <motion.div 
            key={idx}
            className={`flex flex-col mx-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              className="flex-1 overflow-hidden rounded-lg shadow-xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={moment.imageUrl} 
                alt={moment.title} 
                className="w-full h-[600px] object-cover md:object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-sm font-bold text-[#c19a6b] tracking-widest uppercase">{moment.year}</span>
              <h3 className="text-white text-3xl serif mt-2 mb-4 text-gray">{moment.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg italic">
                {moment.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* <div className="mt-24 p-8 bg-[#fdfaf5] border border-[#f0e7d8] rounded-2xl shadow-sm text-center">
        <h4 className="text-2xl serif mb-4">AI Story Polisher</h4>
        <p className="text-sm text-gray-500 mb-6">Enter some key moments or notes about your own story, and let Gemini help write your narrative!</p>
        <textarea 
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c19a6b] outline-none transition-all h-32 bg-white"
          placeholder="e.g. Met in London, first date at a pub, James proposed in Paris..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={handlePolish}
          disabled={isPolishing}
          className="mt-4 px-8 py-3 bg-[#c19a6b] text-white rounded-full font-bold hover:bg-[#a67d51] transition-colors disabled:opacity-50"
        >
          {isPolishing ? 'Drafting Magic...' : 'Polish Story with AI'}
        </button>
        {polishedText && (
          <div className="mt-8 p-6 bg-white border-l-4 border-[#c19a6b] rounded shadow-inner text-left italic text-gray-700 serif text-lg leading-relaxed animate-fade-in">
            "{polishedText}"
          </div>
        )}
      </div> */}
    </section>
  );
};

export default Story;
