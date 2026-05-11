import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Github, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  const menuItems = [
    { label: t.nav.vision, href: '#about' },
    { label: t.nav.causes, href: '#causes' },
    { label: t.nav.donation, href: '#donation' },
    { label: t.nav.connect, href: '#volunteer' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0c0805]/95 backdrop-blur-xl z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0c0805] border-l border-gold/10 z-[201] flex flex-col p-8 md:p-12 mandala-pattern"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex flex-col">
                <div className="text-xl font-serif font-bold tracking-widest uppercase leading-none text-beige">
                  Sankalp <span className="text-saffron">Bharat</span>
                </div>
                <span className="text-[8px] tracking-[0.4em] uppercase text-gold font-bold mt-1">Seva Parmo Dharma</span>
              </div>
              <button 
                onClick={onClose}
                className="p-4 glass-card rounded-full text-gold hover:bg-gold/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-8">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center justify-between py-4 border-b border-gold/5"
                >
                  <span className="text-3xl md:text-4xl font-serif text-beige group-hover:text-gold transition-colors italic">
                    {item.label}
                  </span>
                  <ArrowRight className="w-6 h-6 text-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <div className="flex gap-6 mb-8">
                {[Twitter, Instagram, Github].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 bg-white/5 border border-gold/10 rounded-xl text-gold/60 hover:text-gold hover:border-gold/30 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/30 font-black">
                United by Service • Diverse by Language
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
