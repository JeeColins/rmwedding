
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { WEDDING_DATE } from '../constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = WEDDING_DATE.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => {
    const [animate, setAnimate] = useState(false);
    const prevValue = useRef<number | null>(null);

  useEffect(() => {
    if (prevValue.current !== null && prevValue.current !== value) {
      setAnimate(true);

      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 500); // match your CSS animation duration

      return () => clearTimeout(timeout);
    }

    prevValue.current = value;
  }, [value]);
  
  return (
    <div className="flex flex-col items-center min-w-[70px] md:min-w-[90px] overflow-hidden">
      <div className="relative h-[45px] md:h-[65px] flex items-center justify-center">
        <span 
          // key={value} 
          // className="text-3xl md:text-5xl font-light serif animate-flip-number"
          className={`text-3xl md:text-5xl font-light serif ${
            animate ? "animate-flip-number" : ""
          }`}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70 font-bold mt-1">
        {label}
      </span>
    </div>
  );
};

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        // className="absolute bg-[url('/img/planebglandscape.png')] h-full opacity-80 inset-0 z-0 scale-100 md:scale-100 opacity-90 bg-cover"
        className="absolute bg-[#0c162c] h-full opacity-80 inset-0 z-0 scale-100 md:scale-100 opacity-90 bg-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.2 }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="relative mb-10 z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.2 }}
      >
        {/* <motion.h2 
          className="text-sm md:text-lg uppercase tracking-[0.4em] opacity-80 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8 }}
        > */}
          {/* Join us in the celebration of */}
        {/* </motion.h2> */}
        <motion.h1 
          id="randm" 
          className="text-6xl md:text-8xl mb-5 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1.2, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Raffy <br /> & <br />Mary May */}
          <img src="/img/rflogo.png" alt="rmlogo" className="w-full h-[400px] object-fit" />
        </motion.h1>
        <motion.div 
          className="h-px w-32 bg-white/40 mx-auto mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.p 
          className="text-xl md:text-3xl serif italic mb-5 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          April 28, 2026 • Catarman, Liloan
        </motion.p>
        
        <motion.div 
          className="inline-flex gap-4 md:gap-8 items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CountdownUnit value={timeLeft.days} label="Days" />
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <div className="h-8 w-px bg-white/20 hidden md:block" />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-light mt-5 mb-5 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          #MOYhappilyeveRAFter
        </motion.h1>
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to discover</span>
        <motion.div 
          className="mt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
