
import { label } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShow(false);
      } else {
        // Scrolling up
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Story', href: '#story' },
    { label: 'Entourage', href: '#entourage' },
    { label: 'Program', href: '#events' },
    { label: 'Attire', href: '#dress-code' },
    { label: 'Location', href: '#travel' },
    // { label: 'Highlights', href: '#highlights' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };
<div className={`text-2xl serif transition-colors ${show ? 'text-white' : 'text-white'}`}>
        <img src="/img/rmlogo.png" alt="RSVP" className="w-[55px] h-auto object-fit" />
      </div>
  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 px-6 py-4 md:px-12 flex justify-between items-center ${
          isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent text-white'
        }`}
      >
        <div className={`text-2xl md:text-3xl serif transition-colors duration-500 ${
          isScrolled || isMenuOpen ? 'text-[#c19a6b]' : 'text-white'
        }`}>
          <img src="/img/rmlogo.png" alt="RSVP" className="w-[55px] h-auto object-fit" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`uppercase tracking-[0.2em] text-[10px] font-bold hover:text-[#c19a6b] transition-all relative group ${
                isScrolled ? 'text-[#333]' : 'text-white'
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c19a6b] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#rsvp" 
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              isScrolled 
                ? 'bg-[#c19a6b] text-white hover:bg-[#a67d51]' 
                : 'bg-white font-bold text-[#0c162c] hover:bg-opacity-90'
            }`}
          >
            RSVP Now
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden relative z-50 p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span className={`h-0.5 transition-all duration-300 origin-right ${
              isMenuOpen ? 'w-6 -rotate-45 translate-y-[1px] bg-[#c19a6b]' : `w-6 ${isScrolled ? 'bg-[#333]' : 'bg-white'}`
            }`}></span>
            <span className={`h-0.5 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 bg-[#c19a6b]' : `w-4 ${isScrolled ? 'bg-[#333]' : 'bg-white'}`
            }`}></span>
            <span className={`h-0.5 transition-all duration-300 origin-right ${
              isMenuOpen ? 'w-6 rotate-45 -translate-y-[1px] bg-[#c19a6b]' : `w-6 ${isScrolled ? 'bg-[#333]' : 'bg-white'}`
            }`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[55] bg-white transition-all duration-700 ease-in-out lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full items-center justify-center p-8 space-y-8">
          <div id="randm" className="text-[#c19a6b]/20 text-6xl serif absolute top-24 left-1/2 -translate-x-1/2 select-none">
            Raffy & Mary May
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className={`text-3xl md:text-4xl serif text-[#333] hover:text-[#c19a6b] transition-all transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={`pt-12 flex flex-col items-center gap-6 transition-all duration-700 delay-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="h-px w-12 bg-[#c19a6b]/30"></div>
            <p className="text-[#c19a6b] italic serif text-lg">April 28, 2026</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
