import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  path: string;
}

interface DropdownItem {
  label: string;
  items: MenuItem[];
}

const Header: React.FC = () => {
  const [activeDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const aboutItems: MenuItem[] = [
    { label: 'About Us', path: '/about-us' },
    { label: 'Mission', path: '/mission' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'FAQs', path: '/faqs' },
  ];

  const newsItems: MenuItem[] = [
    { label: 'Community News', path: '/community-news' },
    { label: 'Events', path: '/events' },
    { label: 'Press Release', path: '/press-release' },
    { label: 'Sugar Stories', path: '/sugar-stories' },
  ];

  const dropdowns: Record<string, DropdownItem> = {
    about: { label: 'About', items: aboutItems },
    news: { label: 'News', items: newsItems },
  };

  return (
    <nav className="bg-white shadow-md w-full z-50 relative">
      <div className="w-full mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Sugar Labs" className="h-12 object-fill" />
        </Link>

        <button
          className="md:hidden flex flex-col justify-center w-8 h-8 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-full h-1 bg-gray-700 transition-transform duration-300 absolute ${menuOpen ? 'rotate-45 top-2.5' : 'top-0'}`} />
          <span className={`block w-full h-1 bg-gray-700 transition-opacity duration-300 absolute ${menuOpen ? 'opacity-0' : 'top-2.5'}`} />
          <span className={`block w-full h-1 bg-gray-700 transition-transform duration-300 absolute ${menuOpen ? '-rotate-45 top-2.5' : 'top-5'}`} />
        </button>

        <div className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0 space-y-4 md:space-y-0`}>
          {Object.entries(dropdowns).map(([key, { label, items }]) => (
            <div key={key} className="relative group">
              <button
                className="text-gray-700 hover:text-blue-600 font-medium w-full text-left md:w-auto"
                onClick={() => setMobileDropdown(mobileDropdown === key ? null : key)}
              >
                {label}
              </button>

              <AnimatePresence>
                {(activeDropdown === key || mobileDropdown === key) && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:absolute md:top-full left-0 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50"
                  >
                    {items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileDropdown(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium block md:inline-block py-2 md:px-4" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/donate" className="text-gray-700 hover:text-blue-600 font-medium block md:inline-block py-2 md:px-4" onClick={() => setMenuOpen(false)}>Donate</Link>
          <Link to="/join-development" className="text-gray-700 hover:text-blue-600 font-medium block md:inline-block py-2 md:px-4" onClick={() => setMenuOpen(false)}>Join Development</Link>
          <Link to="/volunteer" className="text-gray-700 hover:text-blue-600 font-medium block md:inline-block py-2 md:px-4" onClick={() => setMenuOpen(false)}>Volunteer</Link>

          <Link to="/try-sugar" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors block md:inline-block mt-4 md:mt-0" onClick={() => setMenuOpen(false)}>TRY NOW</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;