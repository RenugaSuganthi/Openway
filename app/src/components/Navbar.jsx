import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bus, Globe, Menu, X, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdown';
import NotificationBell from './NotificationBell';

const Navbar = ({ transparent = false }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '#/' },
    { name: t('complaint'), href: '#/complaint' },
    { name: t('transport'), href: '#/transport' },
    { name: t('liveTracking'), href: '#/tracking' },
    { name: t('support'), href: '#/support' },
  ];

  const navBgClass = transparent && !scrolled 
    ? 'bg-transparent' 
    : 'bg-white/90 backdrop-blur-lg shadow-lg';

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`}
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a href="#/" className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <Bus className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div>
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">OpenWay</span>
              <p className="text-[10px] lg:text-xs text-gray-500 -mt-1">{language === 'tamil' ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu Govt'}</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a 
                key={index} 
                href={link.href} 
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-medium text-sm" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Language Toggle */}
            <motion.button 
              onClick={toggleLanguage} 
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium shadow-md" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'tamil' ? 'English' : 'தமிழ்'}</span>
            </motion.button>

            {/* Notification Bell - Show when logged in */}
            {isAuthenticated && <NotificationBell />}

            {/* User Dropdown or Login Button */}
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <motion.a 
                href="#/login" 
                className="hidden sm:flex items-center space-x-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-medium shadow-md" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span>{t('login')}</span>
              </motion.a>
            )}

            {/* Mobile Menu Button */}
            <motion.button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" 
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`} 
        initial={{ opacity: 0, height: 0 }} 
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }} 
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">{link.name}</span>
            </a>
          ))}
          {isAuthenticated ? (
            <a 
              href="#/profile" 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700" 
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">{language === 'tamil' ? 'சுயவிவரம்' : 'Profile'}</span>
            </a>
          ) : (
            <a 
              href="#/login" 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">{t('login')}</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
