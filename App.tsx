
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Entourage from './components/Entourage';
import Events from './components/Events';
import DressCode from './components/DressCode';
import Travel from './components/Travel';
import Highlights from './components/Highlights';
import RSVP from './components/RSVP';

// const Separator: React.FC<{ src: string }> = ({ src }) => (
//   <div
//     className="h-32 w-full bg-[#0c162c] object-fill bg-center bg-no-repeat bg-contain"
//     style={{ backgroundImage: `url(${src})` }}
//   />
// );

const App: React.FC = () => {
  const [hasTakenOff, setHasTakenOff] = useState(false);

    if (!hasTakenOff) {
      return (
        <div className="fixed inset-0 bg-[#0c162c] flex flex-col items-center justify-center overflow-hidden">
          <div className="text-center z-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 mb-4"
            >
              <h1 id="randm" className="text-6xl md:text-7xl font-normal mb-4 tracking-tighter text-white">Raffy & Mary May</h1>
              <p className="text-md text-blue-300 font-light tracking-[0.3em] uppercase">Are getting married</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -12, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                scale: { delay: 0.5, duration: 0.8 },
                opacity: { delay: 0.5, duration: 0.8 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="flex items-center justify-center h-48"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHasTakenOff(true)}
                className="bg-transparent text-[#0c162c] px-12 py-4 rounded-full flex items-center gap-3"
              >
                {/* <Plane className="w-6 h-6" />
                TAKE OFF */}
                <img 
                  src="/img/planeanimation.png" 
                  alt="Plane" 
                  className="w-40 h-full object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5 
              }}
              className="mt-8 text-blue-200/60 text-xs uppercase tracking-[0.3em] font-light"
            >
              Click the plane to take off
            </motion.p>
          </div>

          {/* Background Clouds/Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 20 + 10,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 100, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen">
      <AnimatePresence>
      {hasTakenOff && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0c162c] z-50 flex items-center justify-center"
          >
            <div className="text-center z-20 px-4">
              <motion.div
                animate={{ 
                  y: [-20, -1000],
                  rotate: [-0, -0],
                  scale: [0.3, 0.6],
                  opacity: [0.8, 0]
                }}
                transition={{ duration: 1.2, ease: "easeIn" }}
              >
                {/* <Plane className="w-24 h-24 text-white fill-white" /> */}
                <img 
                  src="/img/planeanimation.png" 
                  alt="Plane" 
                  className="w-full h-200 object-contain drop-shadow-2xl bg-transparent"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
      <Navbar />
      <Hero />
      {/* <Separator src="/img/separator1.png" /> */}
      <main>
        <Story />
        {/* <Separator src="/img/separator1.png" /> */}
        <Entourage />
        {/* <Separator src="/img/separator2.png" /> */}
        <Events />
        {/* <Separator src="/img/separator3.png" /> */}
        <DressCode />
        {/* <Separator src="/img/separator4.png" /> */}
        <Travel />
        {/* <Separator src="/img/separator1.png" /> */}
        {/* <Highlights /> */}
        <RSVP />
        {/* <Separator src="/img/separator2.png" /> */}
      </main>
      
      <footer className="py-12 bg-[#0c162c] text-center">
        <div className="serif text-2xl mb-4 text-[#c19a6b]">
          {/* R & M */}
          <img src="/img/rmlogo.png" alt="rmlogo" className="w-[80px] h-[80px] object-fit mx-auto" />
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-gray-100 mb-2">Made with love • 2026</p>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-[#c19a6b] transition-colors">Instagram</a>
          <a href="#" className="text-gray-400 hover:text-[#c19a6b] transition-colors">Registry</a>
          <a href="#" className="text-gray-400 hover:text-[#c19a6b] transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
