
import React from 'react';
import { DRESS_CODE } from '../constants';
import { motion } from 'framer-motion';

const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="py-24 bg-[#0c162c]">
      <motion.div 
        className="max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="inline-block p-4 bg-white rounded-full shadow-sm mb-8"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-8 h-8 text-[#c19a6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v4m3-4v2M9 20h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>
        <h2 className="text-white text-3xl md:text-4xl serif mb-6">Dress Code</h2>
        
        <motion.h3 
          className="text-xl text-[#c19a6b] font-bold uppercase tracking-[0.3em] mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {DRESS_CODE.title}
        </motion.h3>
        
        {/* <motion.p 
          className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {DRESS_CODE.description}
        </motion.p> */}
        <motion.div className='col-span-3 mb-5 mt-5'>
            <img 
            src="/img/dresscode.png" 
            alt="Dress Code Inspiration" 
            className="w-full h-full object-fit rounded-3xl shadow-lg" 
            />
        </motion.div>
        
        <motion.div 
          className="flex justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, staggerChildren: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {DRESS_CODE.colors.map((color, i) => (
            <motion.div 
              key={i} 
              className="group relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.25 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full border border-gray-100 shadow-inner ring-offset-2 ring-[#c19a6b]/30 hover:ring-2 transition-all"
                style={{ backgroundColor: color }}
                whileHover={{ boxShadow: '0 0 20px rgba(193, 154, 107, 0.4)' }}
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase font-bold tracking-tighter text-[#c19a6b] whitespace-nowrap">
                {color}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DressCode;