import { motion } from 'motion/react';
import { ArrowRight, Heart, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-maroon/30 text-[10px] tracking-[0.3em] font-black text-gold mb-8 backdrop-blur-md uppercase">
          {t.hero.initiative}
        </span>
        
        <div className="flex flex-col gap-2 mb-10">
          <div className="text-[10px] tracking-[0.5em] text-beige/40 uppercase font-black">{t.hero.together}</div>
          <div className="text-[10px] tracking-[0.5em] text-beige/40 uppercase font-black">{t.hero.serving}</div>
          <h1 className="hero-text mt-4">
            {t.hero.transforming}<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,175,55,0.4)' }}>{t.hero.india}</span>
          </h1>
          <div className="text-lg md:text-3xl font-serif text-saffron mt-6 italic saffron-glow group">
            "Seva Parmo Dharma"
          </div>
        </div>
        
        <p className="max-w-xl mx-auto text-sm text-beige/50 leading-relaxed mb-12 font-medium tracking-wide">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('donation')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-saffron text-[#0c0805] rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(242,125,38,0.3)] hover:bg-gold"
          >
            {t.hero.donate} <Heart className="w-4 h-4 fill-current" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-white/5 border border-gold/20 text-beige rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            {t.hero.volunteer} <Users className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest"
      >
        <span>Scroll to Explore</span>
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
