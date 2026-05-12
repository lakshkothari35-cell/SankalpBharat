import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Smartphone, Banknote, ShieldCheck, Heart, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';

export default function Donation() {
  const [amount, setAmount] = useState('500');
  const [method, setMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const handleDonation = async () => {
    if (!amount || parseFloat(amount) <= 0 || !user) return;
    
    setIsProcessing(true);
    try {
      // Save donation to Firestore
      const donationData = {
        donorId: user.uid,
        donorName: user.displayName || 'Anonymous',
        amount: parseFloat(amount),
        method,
        status: 'completed',
        timestamp: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'donations'), donationData);
      
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setIsProcessing(false);
      handleFirestoreError(err, OperationType.CREATE, 'donations', auth);
    }
  };

  return (
    <section id="donation" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl md:text-7xl font-serif tracking-tighter mb-6 md:mb-8 leading-[1.1] text-beige">
            {t.donation.title} <br /> <span className="italic text-saffron">{t.donation.realChange}</span>.
          </h2>
          <p className="text-base md:text-xl text-beige/50 mb-8 md:mb-12 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 font-serif">
            {t.donation.description}
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 text-gold">
             <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
             <span className="text-[10px] md:text-sm font-mono tracking-widest uppercase font-black">{t.donation.secured}</span>
          </div>
        </div>

        <div className="p-5 md:p-12 bg-maroon/10 border border-gold/20 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden backdrop-blur-3xl relative min-h-[500px] flex flex-col justify-center">
          <div className="relative z-10">
            <h3 className="text-base md:text-xl font-serif uppercase tracking-widest mb-8 md:mb-10 text-gold text-center">{t.donation.choose}</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
              {['500', '2100', '5100', '11000', '25000', 'Custom'].map((val) => (
                <button
                  key={val}
                  disabled={isProcessing || isSuccess}
                  onClick={() => setAmount(val === 'Custom' ? '' : val)}
                  className={`py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest border transition-all disabled:opacity-50 ${
                    amount === val || (val === 'Custom' && amount === '')
                      ? 'bg-saffron border-saffron text-[#0c0805] shadow-[0_0_20px_rgba(242,125,38,0.3)]'
                      : 'bg-white/5 border-gold/10 text-beige/50 hover:border-gold/40'
                  }`}
                >
                  {val === 'Custom' ? (language === 'HI' ? 'कस्टम' : val) : `₹${val}`}
                </button>
              ))}
            </div>

            <div className="mb-8 md:mb-12">
               <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gold font-serif text-xl md:text-2xl">₹</span>
                 <input 
                   type="number" 
                   value={amount} 
                   disabled={isProcessing || isSuccess}
                   onChange={(e) => setAmount(e.target.value)}
                   placeholder={t.donation.custom}
                   className="w-full bg-white/5 border border-gold/20 rounded-xl md:rounded-2xl py-4 md:py-6 pl-12 md:pl-14 pr-8 text-xl md:text-2xl font-serif focus:outline-none focus:border-gold transition-colors text-beige placeholder:text-beige/10 disabled:opacity-50"
                 />
               </div>
            </div>

            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 text-beige/30 text-center">{t.donation.paymentPath}</h3>
            <div className="flex gap-4 md:gap-6 mb-8 md:mb-12 overflow-x-auto pb-4 scrollbar-hide">
               {[
                 { id: 'upi', icon: Smartphone, label: 'UPI' },
                 { id: 'card', icon: CreditCard, label: language === 'HI' ? 'कार्ड' : 'Card' },
                 { id: 'net', icon: Banknote, label: language === 'HI' ? 'बैंक' : 'Bank' }
               ].map((m) => (
                 <button
                   key={m.id}
                   onClick={() => setMethod(m.id)}
                   className={`flex-1 min-w-[100px] md:min-w-[110px] py-4 md:py-6 rounded-xl md:rounded-2xl border flex flex-col items-center gap-2 md:gap-3 transition-all ${
                     method === m.id
                       ? 'bg-gold/10 border-gold text-gold'
                       : 'bg-white/5 border-gold/10 text-beige/30 hover:border-gold/30'
                   }`}
                 >
                   <m.icon className="w-5 h-5 md:w-6 md:h-6" />
                   <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black">{m.label}</span>
                 </button>
               ))}
            </div>

            <div className="mb-8 md:mb-12">
              <AnimatePresence mode="wait">
                {method === 'upi' && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-1 md:gap-2">
                      <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/40 ml-2">{t.donation.upiIdLabel}</label>
                      <input 
                        type="text" 
                        disabled={isProcessing || isSuccess}
                        placeholder="sankalp@upi"
                        className="w-full bg-white/5 border border-gold/10 rounded-lg md:rounded-xl py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:border-gold transition-colors text-beige disabled:opacity-50 text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {method === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-1 md:gap-2">
                       <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/40 ml-2">{t.donation.cardNumberLabel}</label>
                       <input 
                         type="text" 
                         disabled={isProcessing || isSuccess}
                         placeholder="XXXX XXXX XXXX XXXX"
                         className="w-full bg-white/5 border border-gold/10 rounded-lg md:rounded-xl py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:border-gold transition-colors text-beige disabled:opacity-50 text-sm"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1 md:gap-2">
                        <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/40 ml-2">{t.donation.expiryLabel}</label>
                        <input 
                          type="text" 
                          disabled={isProcessing || isSuccess}
                          placeholder="MM/YY"
                          className="w-full bg-white/5 border border-gold/10 rounded-lg md:rounded-xl py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:border-gold transition-colors text-beige disabled:opacity-50 text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1 md:gap-2">
                        <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/40 ml-2">{t.donation.cvvLabel}</label>
                        <input 
                          type="password" 
                          disabled={isProcessing || isSuccess}
                          placeholder="***"
                          className="w-full bg-white/5 border border-gold/10 rounded-lg md:rounded-xl py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:border-gold transition-colors text-beige disabled:opacity-50 text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {method === 'net' && (
                  <motion.div
                    key="bank"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-1 md:gap-2">
                       <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-gold/40 ml-2">{t.donation.bankAccountLabel}</label>
                       <input 
                         type="text" 
                         disabled={isProcessing || isSuccess}
                         placeholder={language === 'HI' ? 'खाता संख्या' : 'Account Number'}
                         className="w-full bg-white/5 border border-gold/10 rounded-lg md:rounded-xl py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:border-gold transition-colors text-beige disabled:opacity-50 text-sm"
                       />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!user ? (
               <Link 
                 to="/auth"
                 className="w-full py-6 md:py-8 bg-gold text-maroon rounded-xl md:rounded-2xl text-base md:text-lg font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
               >
                 Login to {t.donation.process}
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </Link>
            ) : (
              <button 
                onClick={handleDonation}
                disabled={isProcessing || isSuccess}
                className={`w-full py-6 md:py-8 bg-gradient-to-r from-maroon to-saffron text-beige rounded-xl md:rounded-2xl text-lg md:text-xl font-serif uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(128,0,0,0.3)] disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-4`}
              >
                {isProcessing ? (
                  <div className="flex gap-1">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-beige rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-beige rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-beige rounded-full" />
                  </div>
                ) : isSuccess ? (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="flex items-center gap-2"
                  >
                    <ShieldCheck className="w-6 h-6" />
                    {language === 'HI' ? 'सफल योगदान' : 'Seva Successful'}
                  </motion.div>
                ) : (
                  t.donation.process
                )}
              </button>
            )}
            
            <p className="text-center mt-6 md:mt-8 text-[8px] md:text-[9px] text-beige/20 uppercase tracking-[0.3em] font-medium leading-relaxed">
              {t.donation.report}
            </p>
          </div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-saffron/5 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gold/20 rounded-br-[32px] md:rounded-br-[40px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
