import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  // Create scroll-linked transformations
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none sticky top-0 overflow-hidden">
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-6xl relative z-10"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-maroon/30 text-[10px] tracking-[0.3em] font-black text-gold mb-8 backdrop-blur-md uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          {t.hero.initiative}
        </motion.span>
        
        <div className="flex flex-col gap-2 mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] tracking-[0.5em] text-beige/40 uppercase font-black"
          >
            {t.hero.together}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-[10px] tracking-[0.5em] text-beige/40 uppercase font-black"
          >
            {t.hero.serving}
          </motion.div>
          
          <h1 className="hero-text mt-4 text-glow">
            {t.hero.transforming}<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(212,175,55,0.6)' }}>{t.hero.india}</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-lg md:text-3xl font-serif text-saffron mt-6 italic saffron-glow group relative"
          >
            <div className="absolute inset-0 blur-xl bg-saffron/10 -z-10" />
            "Seva Parmo Dharma"
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-xl mx-auto text-sm text-beige/50 leading-relaxed mb-12 font-medium tracking-wide italic"
        >
          {t.hero.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(242,125,38,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('donation')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-saffron text-[#0c0805] rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(242,125,38,0.3)] hover:bg-gold relative group overflow-hidden"
          >
            <span className="relative z-10">{t.hero.donate}</span>
            <Heart className="w-4 h-4 fill-current relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-white/5 border border-gold/20 text-beige rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-xl"
          >
            {t.hero.volunteer} <Users className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest"
      >
        <span className="animate-pulse">Explore the Sacred Journey</span>
        <div className="w-px h-16 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,8,5,0.6)_100%)]" />
    </section>
  );
}
