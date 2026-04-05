
import React from 'react';
import { LOCAL_RECS } from '../constants';
import { motion } from 'framer-motion';

const Travel: React.FC = () => {
  return (
    <section id="travel" className="py-24 bg-[#0c162c] px-6 max-w-8xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-white text-4xl md:text-5xl serif mb-4">Wedding Venue</h2>
        <p className="text-[#c19a6b] italic serif text-lg">Amara Subdivision, Catarman</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div></div>
        <motion.div 
          className="lg:col-span-1 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
        <div></div>
          <div className="bg-[#f4f1ea] p-8 rounded-2xl">
            <h3 className="text-2xl serif mb-4">Location Map</h3>
            <motion.div 
              className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden relative shadow-inner group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.4854180219813!2d124.01561497592047!3d10.382966689742926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bd0b16d133df%3A0x78b6a41b04756930!2sAmara%20Subdivision!5e0!3m2!1sen!2sph!4v1772886027824!5m2!1sen!2sph"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>

        {/* <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full animate-fade-in-up stagger-2">
            <h3 className="text-2xl serif mb-6">Local Favorites</h3>
            <div className="space-y-8">
              {LOCAL_RECS.map((rec, i) => (
                <div key={i} className="group cursor-default">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c19a6b] bg-[#c19a6b]/10 px-2 py-1 rounded transition-colors group-hover:bg-[#c19a6b] group-hover:text-white">
                    {rec.category}
                  </span>
                  <h4 className="font-bold mt-2 transition-transform group-hover:translate-x-1">{rec.name}</h4>
                  <p className="text-sm text-gray-500 mt-1 italic leading-relaxed">{rec.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100">
               <h3 className="text-xl serif mb-4">Parking Info</h3>
               <p className="text-sm text-gray-600 italic leading-relaxed">Valet will be provided at the reception. Street parking is free for the first 2 hours in downtown Carmel.</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Travel;