import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { dropdowns } from '@/constants/Header';
import logo from '/assets/logo.svg';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // Close dropdown when escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/90 shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={closeMenu}
            >
              <img
                src={logo}
                alt="Sugar Labs"
                className="h-8 sm:h-10 md:h-12 w-auto transition-transform hover:scale-105"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:ring-opacity-50 rounded-md z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                    menuOpen
                      ? 'rotate-45 translate-y-1.5'
                      : 'translate-y-[-4px]'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    menuOpen ? 'opacity-0' : ''
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    menuOpen
                      ? '-rotate-45 -translate-y-1.5'
                      : 'translate-y-[4px]'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-6">
              {Object.entries(dropdowns).map(([key, { label, items }]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`px-2 xl:px-3 py-2 text-gray-700 hover:text-blue-600 text-sm xl:text-base font-medium rounded-md
                              transition-all duration-200 hover:bg-gray-50 flex items-center space-x-1
                              ${activeDropdown === key ? 'text-blue-600' : ''}`}
                    aria-expanded={activeDropdown === key}
                    aria-haspopup="true"
                  >
                    <span>{label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === key ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`${key}-menu-button`}
                      >
                        <div className="py-2">
                          {items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50
                                      transition-all duration-200 hover:text-blue-600"
                              role="menuitem"
                            >
                              <span
                                className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100
                                          transition-all duration-200 mr-2 transform scale-0 group-hover:scale-100"
                                aria-hidden="true"
                              />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Navigation Links */}
              {[
                'News',
                'Products',
                'Donate',
                'Join Development',
                'Volunteer',
              ].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="px-2 xl:px-3 py-2 text-gray-700 hover:text-blue-600 text-sm xl:text-base font-medium rounded-md
                            transition-all duration-200 hover:bg-gray-50 whitespace-nowrap"
                >
                  {item}
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                to="/try-sugar"
                className="inline-flex items-center px-4 xl:px-6 py-2 xl:py-2.5 rounded-full text-sm xl:text-base font-semibold text-white
                          bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                          transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                TRY NOW
              </Link>
            </div>

            {/* Mobile Navigation Backdrop */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/30 lg:hidden z-40"
                  onClick={closeMenu}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed lg:hidden top-0 right-0 bottom-0 w-full xs:w-[85%] sm:w-[75%] md:w-[60%] max-w-sm bg-white shadow-xl z-40
                            flex flex-col h-screen overflow-y-auto"
                  id="mobile-menu"
                >
                  <div className="h-16 sm:h-18 md:h-20" aria-hidden="true" />
                  <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:py-6">
                    <div className="space-y-3 sm:space-y-4">
                      {Object.entries(dropdowns).map(
                        ([key, { label, items }]) => (
                          <div key={key} className="space-y-2">
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === key ? null : key,
                                )
                              }
                              className="flex items-center justify-between w-full text-left px-3 py-2.5
                                    text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                              aria-expanded={activeDropdown === key}
                              aria-controls={`${key}-mobile-menu`}
                            >
                              <span>{label}</span>
                              <svg
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  activeDropdown === key ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {activeDropdown === key && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                  id={`${key}-mobile-menu`}
                                >
                                  <div className="pl-4 space-y-1 sm:space-y-2">
                                    {items.map((item) => (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={closeMenu}
                                        className="flex items-center px-4 py-2.5 text-sm text-gray-600
                                              rounded-lg hover:bg-gray-50 hover:text-blue-600 
                                              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ),
                      )}

                      {[
                        'News',
                        'Products',
                        'Donate',
                        'Join Development',
                        'Volunteer',
                      ].map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase().replace(' ', '-')}`}
                          onClick={closeMenu}
                          className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg
                                  hover:bg-gray-50 hover:text-blue-600 focus:outline-none 
                                  focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 safe-area-bottom">
                    <Link
                      to="/try-sugar"
                      onClick={closeMenu}
                      className="flex items-center justify-center px-6 py-3 rounded-xl font-semibold
                              text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700
                              hover:to-blue-800 transition-all duration-300 w-full focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      TRY NOW
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="h-16 sm:h-18 md:h-20" aria-hidden="true" />
    </>
  );
};

export default Header;
