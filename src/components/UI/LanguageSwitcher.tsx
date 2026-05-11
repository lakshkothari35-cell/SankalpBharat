
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { translations, Language } from '../../constants/translations';
import { Search, Globe, X, Check } from 'lucide-react';
import { useState, useMemo } from 'react';

interface LanguageSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LanguageSwitcher({ isOpen, onClose }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const languages = useMemo(() => {
    return (Object.keys(translations) as Language[]).map((key) => ({
      code: key,
      ...translations[key]
    }));
  }, []);

  const filteredLanguages = useMemo(() => {
    return languages.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [languages, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0c0805] border border-gold/20 rounded-[40px] shadow-2xl z-[101] overflow-hidden flex flex-col h-[80vh] max-h-[600px]"
          >
            {/* Header */}
            <div className="p-10 border-b border-gold/10 flex items-center justify-between bg-maroon/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-beige uppercase tracking-widest">Select Language</h3>
                  <p className="text-[10px] text-gold/40 tracking-[0.3em] font-black uppercase mt-1">Sankalp Bharat Regional Seva</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 text-beige/30 hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="px-10 py-6 border-b border-gold/5">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your Mother Tongue..."
                  className="w-full bg-white/5 border border-gold/10 rounded-2xl py-5 pl-16 pr-8 text-beige focus:outline-none focus:border-gold transition-all placeholder:text-beige/10 font-serif"
                />
              </div>
            </div>

            {/* List */}
            <div 
              className="flex-1 overflow-y-auto p-10 mandala-pattern scroll-smooth overscroll-contain"
              data-lenis-prevent
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLanguages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setLanguage(lang.code);
                      onClose();
                    }}
                    className={`p-6 rounded-[24px] border flex items-center justify-between transition-all group ${
                      language === lang.code 
                        ? 'bg-maroon/40 border-gold/40 text-gold shadow-lg' 
                        : 'bg-white/5 border-gold/10 text-beige/50 hover:bg-maroon/20 hover:border-gold/30'
                    }`}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-60">
                        {lang.name}
                      </span>
                      <span className={`text-xl ${lang.code === 'SA' || lang.code === 'HI' || lang.code === 'GU' ? 'font-serif' : ''} group-hover:text-gold transition-colors`}>
                        {lang.nativeName}
                      </span>
                    </div>
                    {language === lang.code && (
                      <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {filteredLanguages.length === 0 && (
                <div className="py-20 text-center opacity-20 italic font-serif">
                  Language not found. We are adding more soon.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 text-center bg-maroon/5 border-t border-gold/5">
              <p className="text-[9px] uppercase tracking-[0.5em] text-gold/40 font-black">
                United by Service, Diverse by Language
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
