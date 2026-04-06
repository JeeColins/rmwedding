
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  // const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);


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
    { label: 'Story', href: '#story' },
    { label: 'Entourage', href: '#entourage' },
    { label: 'Program', href: '#events' },
    { label: 'Attire', href: '#dress-code' },
    { label: 'Location', href: '#travel' },
    // { label: 'Highlights', href: '#highlights' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <nav className={`fixed top-0 left-0 w-full right-0 z-50 transition-all duration-300 px-4 py-3 flex justify-between items-center ${
      // isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent text-white'
      show ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className={`text-2xl serif transition-colors ${show ? 'text-white' : 'text-white'}`}>
        <img src="/img/rmlogo.png" alt="RSVP" className="w-[55px] h-[55px] object-fit md:w-[65px] h-[65px] object-fit" />
      </div>
      {/* hamburger button for small screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-between w-6 h-6"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span
          className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${
            menuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-current transition-opacity duration-300 ${
            menuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-current transform transition-transform duration-300 ${
            menuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* nav links for md+ screens */}
      <div className="hidden md:flex gap-3 md:gap-8 flex-wrap justify-end">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`uppercase tracking-widest text-[9px] md:text-xs font-bold hover:opacity-70 transition-opacity ${
              show ? 'text-white' : 'text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* mobile menu overlay */}
      {menuOpen && (
        <div
          className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm flex flex-col items-center py-4 space-y-4 z-40 ${
            show ? '' : 'text-black'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="uppercase tracking-widest text-sm font-bold hover:opacity-70 transition-opacity text-[#333]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
