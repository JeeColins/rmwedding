
import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * INSTRUCTIONS FOR GOOGLE SHEETS INTEGRATION:
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste the following code:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(), 
 *     data.fullName, 
 *     data.email, 
 *     data.attending, 
 *     data.plusOne, 
 *     data.meal, 
 *     data.allergies, 
 *     data.note
 *   ]);
 *   return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me' and 'Who has access' to 'Anyone'.
 * 7. Copy the Web App URL and paste it into the GOOGLE_SCRIPT_URL constant below.
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzrD3zPfWPiYhgcjlVIHzBNx_At9glInYOvKimYC2Mvtm0Fe02Ykaj_yzOozH_DZhlK/exec'; // PASTE YOUR APPS SCRIPT URL HERE

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 100, damping: 20 },
  },
};

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    attending: 'Yes'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!GOOGLE_SCRIPT_URL) {
      setError("Please configure the Google Script URL to enable RSVP submission.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Split names by comma and trim whitespace
      const names = formData.fullName.split(',').map(name => name.trim()).filter(name => name !== '');
      
      if (names.length === 0) {
        setError("Please enter at least one name.");
        setIsSubmitting(false);
        return;
      }

      // Send a separate request for each name to ensure they appear as individual rows in the sheet
      const requests = names.map(name => {
        const submissionData = {
          ...formData,
          fullName: name
        };
        
        return fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });
      });

      await Promise.all(requests);
      setSubmitted(true);
    } catch (err) {
      console.error("RSVP Submission Error:", err);
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    const isAttending = formData.attending === 'yes';
    return (
      <section id="rsvp" className="py-24 px-6 bg-[#0c162c] text-center">
        <motion.div 
          className="max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-[#c19a6b]/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div 
            // className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8"
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${isAttending ? 'bg-green-50' : 'bg-gray-50'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            {/* <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg> */}
            {isAttending ? (
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </motion.div>
          <h2 className="text-3xl serif mb-4">Thank You!</h2>
          <p className="text-gray-600 italic mb-8">
            {/* Your RSVP has been received and saved to our guest list. We can't wait to celebrate with you!<br />(Table assignment to be announced on April 15, 2026) */}
            {isAttending 
              ? "Your RSVP has been received and saved to our guest list. We can't wait to celebrate with you!" 
              : "Thank you for letting us know. We're sorry you can't make it, but we'll be thinking of you on our special day!"}
          </p>
          <motion.button 
            onClick={() => setSubmitted(false)}
            className="text-[#c19a6b] font-bold uppercase tracking-widest text-xs border-b border-[#c19a6b] pb-1 hover:opacity-70 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit RSVP
          </motion.button>
        </motion.div>
      </section>
    );
  }

  const isAttending = formData.attending === 'yes';

  return (
    <section id="rsvp" className="py-24 bg-[#0c162c] text-white">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className='col-span-3'>
          <img src="/img/rsvp.png" alt="RSVP" className="w-full h-full object-fit rounded-1xl shadow-lg" />
        </motion.div>
        <motion.form 
          onSubmit={handleSubmit} 
          // className="grid grid-cols-1 md:grid-cols-1 gap-8 bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-1xl border border-white/10 relative overflow-hidden"
          className={`grid grid-cols-1 ${isAttending ? 'md:grid-cols-1' : ''} gap-8 bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-1xl border border-white/10 relative 
          overflow-hidden transition-all duration-500`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl serif mb-4">RSVP</h2>
            <p className="text-[#c19a6b] italic serif text-lg">Kindly respond by March 28, 2026</p>
          </div> */}
          {/* Form Content */}
          <motion.div 
            className="col-span-2 md:col-span-2 space-y-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Full Name</label>
              <motion.input 
                required
                disabled={isSubmitting}
                type="text" 
                className="w-full bg-transparent border-b border-white/30 p-2 outline-none focus:border-[#c19a6b] transition-colors disabled:opacity-50"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            {/* <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Email Address</label>
              <input 
                required
                disabled={isSubmitting}
                type="email" 
                className="w-full bg-transparent border-b border-white/30 p-2 outline-none focus:border-[#c19a6b] transition-colors disabled:opacity-50"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div> */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Will you attend?</label>
              <motion.div 
                className="flex gap-4 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="attending" disabled={isSubmitting} checked={formData.attending === 'yes'} onChange={() => setFormData({...formData, attending: 'yes'})} className="accent-[#c19a6b]" />
                  <span className="group-hover:text-[#c19a6b] transition-colors">Joyfully Accept</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="attending" disabled={isSubmitting} checked={formData.attending === 'no'} onChange={() => setFormData({...formData, attending: 'no'})} className="accent-[#c19a6b]" />
                  <span className="group-hover:text-[#c19a6b] transition-colors">Regretfully Decline</span>
                </label>
              </motion.div>
            </div>
          </motion.div>

          {/* <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Plus One?</label>
              <select 
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/30 p-2 outline-none focus:border-[#c19a6b] transition-colors appearance-none cursor-pointer"
                value={formData.plusOne}
                onChange={(e) => setFormData({...formData, plusOne: e.target.value})}
              >
                <option className="text-black" value="no">No Plus One</option>
                <option className="text-black" value="yes">Yes, bringing a guest</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Meal Preference</label>
              <select 
                disabled={isSubmitting}
                className="w-full bg-transparent border-b border-white/30 p-2 outline-none focus:border-[#c19a6b] transition-colors appearance-none cursor-pointer"
                value={formData.meal}
                onChange={(e) => setFormData({...formData, meal: e.target.value})}
              >
                <option className="text-black" value="Steak">Filet Mignon</option>
                <option className="text-black" value="Salmon">Pan-Seared Salmon</option>
                <option className="text-black" value="Vegetarian">Wild Mushroom Risotto</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Dietary Restrictions</label>
              <input 
                disabled={isSubmitting}
                type="text" 
                placeholder="e.g. Peanut allergy, Vegan"
                className="w-full bg-transparent border-b border-white/30 p-2 outline-none focus:border-[#c19a6b] transition-colors text-sm disabled:opacity-50"
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
              />
            </div>
          </div> */}

          {error && (
            <motion.div 
              className="md:col-span-2 text-red-400 text-xs italic bg-red-500/10 p-3 rounded-lg border border-red-500/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            className="md:col-span-2 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
             <motion.button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#c19a6b] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#a67d51] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
             >
               {isSubmitting ? (
                 <>
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Sending Response...
                 </>
               ) : 'Send Response'}
             </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RSVP;
