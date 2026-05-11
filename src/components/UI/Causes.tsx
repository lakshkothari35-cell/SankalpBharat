import { motion } from 'motion/react';
import { BookOpen, Sprout, HeartPulse, Utensils, Zap, Users2, PawPrint } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Causes() {
  const { t } = useLanguage();

  const causes = [
    {
      title: t.causes.titles.education,
      icon: BookOpen,
      desc: 'Digital classrooms and scholarships for underprivileged children across 15 states.',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: t.causes.titles.women,
      icon: Users2,
      desc: 'Skill development and micro-finance for rural women entrepreneurs.',
      color: 'from-pink-500/20 to-rose-500/20',
    },
    {
      title: t.causes.titles.hunger,
      icon: Utensils,
      desc: 'Community kitchens serving over 50,000 nutritious meals daily.',
      color: 'from-orange-500/20 to-amber-500/20',
    },
    {
      title: t.causes.titles.health,
      icon: HeartPulse,
      desc: 'Mobile medical units providing primary care in extreme rural locations.',
      color: 'from-emerald-500/20 to-teal-500/20',
    },
    {
      title: t.causes.titles.sustainability,
      icon: Sprout,
      desc: 'Reforestation and clean water initiatives in drought-prone regions.',
      color: 'from-green-500/20 to-lime-500/20',
    },
    {
      title: t.causes.titles.disaster,
      icon: Zap,
      desc: 'Rapid rescue and rehabilitation for flood and cyclone victims.',
      color: 'from-red-500/20 to-orange-500/20',
    },
    {
      title: t.causes.titles.animal,
      icon: PawPrint,
      desc: 'Shelters and emergency vet care for stray and distressed animals.',
      color: 'from-purple-500/20 to-indigo-500/20',
    }
  ];

  return (
    <section id="causes" className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="mb-24 text-center">
        <span className="text-gold font-serif text-sm tracking-[0.4em] uppercase">{t.causes.pillars}</span>
        <h2 className="text-5xl md:text-8xl font-serif mt-6">
          {t.causes.empowering} <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,175,55,0.4)' }}>{t.causes.humanity}</span>.
        </h2>
        <div className="w-24 h-px bg-gold/30 mx-auto mt-8 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {causes.map((cause, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-12 flex flex-col justify-between group transition-all relative overflow-hidden mandala-pattern"
          >
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-maroon/20 border border-gold/20 flex items-center justify-center mb-10 group-hover:bg-maroon/40 transition-all duration-500 shadow-inner">
                <cause.icon className="w-10 h-10 text-gold" />
              </div>
              <div className="text-[10px] text-gold/40 uppercase tracking-[0.3em] mb-4 font-black">{t.causes.sacred}</div>
              <h3 className="text-3xl font-serif mb-6 tracking-tight text-beige">{cause.title}</h3>
              <p className="text-beige/40 text-sm leading-relaxed mb-12 font-medium">
                {cause.desc}
              </p>
              
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-gold/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '80%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="bg-gradient-to-r from-maroon to-saffron h-full rounded-full shadow-[0_0_15px_#F27D26]" 
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest">{t.causes.progress}</span>
                <span className="text-[10px] font-mono text-beige/30">80% {t.causes.reached}</span>
              </div>
            </div>

            {/* Decorative Corner Motif */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <div className="w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
