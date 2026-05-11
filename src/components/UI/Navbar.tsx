import { motion } from 'motion/react';
import { Menu, Search, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-6 md:py-8 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center gap-4 md:gap-12 pointer-events-auto">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 border border-gold/30 bg-maroon/20 rounded-full flex items-center justify-center relative overflow-hidden group transition-all hover:bg-maroon/40">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-maroon/40" />
              <span className="text-[10px] md:text-xs font-serif font-bold text-gold relative z-10 group-hover:scale-110 transition-transform">सेवा</span>
            </div>
            <div className="flex flex-col">
              <div className="text-sm md:text-lg font-serif font-bold tracking-widest uppercase leading-none text-beige">
                Sankalp <span className="text-saffron">Bharat</span>
              </div>
              <span className="text-[6px] md:text-[8px] tracking-[0.4em] uppercase text-gold font-bold mt-0.5 md:mt-1">Seva Parmo Dharma</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10">
            <a href="#about" className="text-[11px] uppercase tracking-[0.2em] text-beige/50 hover:text-saffron transition-colors relative group">
              {t.nav.vision}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full" />
            </a>
            <a href="#causes" className="text-[11px] uppercase tracking-[0.2em] text-beige/50 hover:text-saffron transition-colors relative group">
              {t.nav.causes}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full" />
            </a>
            <a href="#donation" className="text-[11px] uppercase tracking-[0.2em] text-beige/50 hover:text-saffron transition-colors relative group">
              {t.nav.donation}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-saffron transition-all group-hover:w-full" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 pointer-events-auto">
          <button 
            onClick={() => setIsLangOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-gold/10 rounded-full text-gold hover:bg-white/10 transition-all group"
          >
            <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-12 transition-transform" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{language}</span>
          </button>
          
          <button className="hidden lg:flex px-8 py-3 bg-maroon/20 border border-gold/30 text-gold rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-maroon/40 transition-all">
            {t.nav.connect}
          </button>

          <button className="p-2 md:p-3 glass-card rounded-full hover:bg-gold/10 transition-all text-gold">
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </motion.nav>

      <LanguageSwitcher isOpen={isLangOpen} onClose={() => setIsLangOpen(false)} />
    </>
  );
}
