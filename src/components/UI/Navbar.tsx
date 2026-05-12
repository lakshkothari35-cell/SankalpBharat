import { motion } from 'motion/react';
import { Menu, Globe, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import ThemeCustomizer from './ThemeCustomizer';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { language, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    if (isLangOpen || isMenuOpen || isThemeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLangOpen, isMenuOpen, isThemeOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between pointer-events-none holographic-panel rounded-2xl md:rounded-[32px] backdrop-blur-2xl"
      >
        <div className="flex items-center gap-2 md:gap-12 pointer-events-auto">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 border border-gold/30 bg-maroon/20 rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden group transition-all hover:bg-maroon/40 shadow-[0_0_20px_rgba(128,0,0,0.3)]">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-maroon/40" />
              <span className="text-[8px] md:text-xs font-serif font-bold text-gold relative z-10 group-hover:scale-110 transition-transform">सेवा</span>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] md:text-lg font-serif font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase leading-none text-beige text-glow">
                Sankalp <span className="text-saffron italic">Bharat</span>
              </div>
              <span className="text-[5px] md:text-[8px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-gold font-black mt-0.5 md:mt-1 opacity-60">Seva Parmo Dharma</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex gap-12 ml-6">
            <a href="#about" className="text-[10px] uppercase tracking-[0.4em] text-beige/40 hover:text-gold transition-all relative group font-black">
              {t.nav.vision}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
            <a href="#causes" className="text-[10px] uppercase tracking-[0.4em] text-beige/40 hover:text-gold transition-all relative group font-black">
              {t.nav.causes}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
            <a href="#donation" className="text-[10px] uppercase tracking-[0.4em] text-beige/40 hover:text-gold transition-all relative group font-black">
              {t.nav.donation}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-4 pointer-events-auto">
          <div className="hidden md:block">
            <UserMenu />
          </div>

          <button 
            onClick={() => setIsLangOpen(true)}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-white/5 border border-gold/20 rounded-lg md:rounded-xl text-gold hover:bg-gold/10 transition-all group shadow-[0_0_15px_rgba(212,175,55,0.1)]"
          >
            <Globe className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-12 transition-transform" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{language}</span>
          </button>

          <button 
            onClick={() => setIsThemeOpen(true)}
            className="p-2 md:p-3 bg-white/5 border border-gold/10 rounded-lg md:rounded-xl hover:bg-gold/10 transition-all text-gold group"
          >
            <Settings className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-90 transition-transform duration-500" />
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 md:p-3 bg-gold text-[#0c0805] rounded-lg md:rounded-xl hover:bg-white hover:text-maroon transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </motion.nav>

      <LanguageSwitcher isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ThemeCustomizer isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />
    </>
  );
}
