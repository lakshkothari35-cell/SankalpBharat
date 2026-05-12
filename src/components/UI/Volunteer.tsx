import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Calendar, Globe2, Award, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Volunteer() {
  const { language, t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section id="volunteer" className="py-20 md:py-40 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-gold font-serif text-[10px] md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6">Sahayata - Joining the Mission</span>
        <h2 className="text-3xl md:text-8xl font-serif mb-8 md:mb-12 leading-tight">
          {t.volunteer.title} <br className="md:hidden" /> <span className="text-saffron italic">{t.volunteer.karmayogi}</span>.
        </h2>
        <p className="text-beige/40 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mb-12 md:mb-16">
          {t.volunteer.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full text-left">
          <div className="lg:col-span-2 glass-card p-6 md:p-12 relative overflow-hidden mandala-pattern">
            <h3 className="text-2xl font-serif text-gold mb-8 italic">{t.volunteer.formTitle}</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] text-beige/30 uppercase tracking-widest font-black">{t.volunteer.name}</label>
                <input 
                  type="text" 
                  disabled={isProcessing || isSuccess}
                  placeholder="..." 
                  className="bg-white/5 border border-gold/10 rounded-xl py-4 px-6 text-beige focus:outline-none focus:border-gold transition-all disabled:opacity-50" 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] text-beige/30 uppercase tracking-widest font-black">{t.volunteer.email}</label>
                <input 
                  type="email" 
                  disabled={isProcessing || isSuccess}
                  placeholder="..." 
                  className="bg-white/5 border border-gold/10 rounded-xl py-4 px-6 text-beige focus:outline-none focus:border-gold transition-all disabled:opacity-50" 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] text-beige/30 uppercase tracking-widest font-black">{t.volunteer.area}</label>
                <select 
                  disabled={isProcessing || isSuccess}
                  className="bg-[#1a120b] border border-gold/10 rounded-xl py-4 px-6 text-beige focus:outline-none focus:border-gold transition-all disabled:opacity-50"
                >
                  <option className="bg-[#1a120b] text-beige">{t.causes.titles.education}</option>
                  <option className="bg-[#1a120b] text-beige">{t.causes.titles.health}</option>
                  <option className="bg-[#1a120b] text-beige">{t.causes.titles.sustainability}</option>
                  <option className="bg-[#1a120b] text-beige">{t.causes.titles.hunger}</option>
                  <option className="bg-[#1a120b] text-beige">{t.causes.titles.women}</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] text-beige/30 uppercase tracking-widest font-black">{t.volunteer.location}</label>
                <input 
                  type="text" 
                  disabled={isProcessing || isSuccess}
                  placeholder="..." 
                  className="bg-white/5 border border-gold/10 rounded-xl py-4 px-6 text-beige focus:outline-none focus:border-gold transition-all disabled:opacity-50" 
                />
              </div>
              <div className="md:col-span-2">
                <button 
                  type="button" 
                  disabled={isProcessing || isSuccess}
                  onClick={handleSubmit}
                  className="w-full py-6 bg-gold text-[#0c0805] rounded-xl font-bold uppercase tracking-[0.3em] hover:bg-saffron transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                     <div className="flex gap-1">
                       <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#0c0805] rounded-full" />
                       <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#0c0805] rounded-full" />
                       <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#0c0805] rounded-full" />
                     </div>
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {language === 'HI' ? 'पंजीकरण सफल' : 'Successfully Registered'}
                    </div>
                  ) : (
                    t.volunteer.submit
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            {[
              { icon: Award, title: 'Seva Badge', desc: 'Gain recognition for your hours of selfless contribution.' },
              { icon: Calendar, title: 'Yatra Access', desc: 'Join on-field visits to our project locations across India.' },
              { icon: Globe2, title: 'Global Sangha', desc: 'Connect with a worldwide network of social change makers.' },
            ].map((perk, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="p-8 border border-gold/10 rounded-3xl bg-maroon/5 backdrop-blur-xl flex gap-6 items-start group"
              >
                <div className="p-3 bg-gold/10 rounded-2xl group-hover:bg-gold/20 transition-all">
                  <perk.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-beige mb-2">{perk.title}</h4>
                  <p className="text-xs text-beige/30 leading-relaxed">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-maroon/5 blur-[150px] pointer-events-none" />
    </section>
  );
}
