import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Lock, User, Phone, MapPin, Globe, 
  ArrowRight, Github, Chrome, Apple, ShieldCheck, 
  ChevronRight, Heart, Users, LineChart, Star,
  Eye, EyeOff
} from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, appleProvider } from '../lib/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Profile creation is handled in AuthContext's onSnapshot/setDoc logic
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent to your email.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0805] text-beige flex overflow-hidden">
      {/* Left Side: Cinematic Mission */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-maroon/80 via-[#0c0805]/95 to-black pointer-events-none z-10" />
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="NGO Impact"
          />
          
          {/* Animated Particles/Orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-gold/10 rounded-full blur-[100px]"
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                top: `${20 * i}%`,
                left: `${15 * i}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-maroon rounded-xl flex items-center justify-center border border-gold/30 shadow-[0_0_20px_rgba(128,0,0,0.4)]">
                <ShieldCheck className="text-gold w-8 h-8" />
              </div>
              <span className="text-2xl font-serif tracking-widest uppercase text-gold">SANKALP</span>
            </div>

            <h1 className="text-6xl font-serif leading-tight mb-8">
              {language === 'HI' ? 'परिवर्तन की ओर' : 'A Step Towards'} <br />
              <span className="text-saffron italic">{language === 'HI' ? 'एक कदम' : 'Eternal Impact'}</span>.
            </h1>

            <p className="text-xl text-beige/50 font-serif italic leading-relaxed mb-12">
              {language === 'HI' 
                ? 'आपका एक निर्णय हजारों जीवनों में प्रकाश ला सकता है। हमारे साथ जुड़ें और सेवा की इस पावन यात्रा का हिस्सा बनें।'
                : 'One decision can light up thousands of lives. Join us and be a part of this sacred journey of Seva.'}
            </p>

            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Heart, label: 'Lives Changed', val: '1.4M+' },
                { icon: Users, label: 'Volunteers', val: '25K+' },
                { icon: LineChart, label: 'Donations', val: '₹12Cr+' },
                { icon: Star, label: 'Awards', val: '15+' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-xl font-serif text-beige">{item.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-beige/30">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-20 z-20 text-[10px] tracking-[0.5em] text-beige/20 uppercase font-black">
          Sankalp Bharat Foundation © 2026
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-20 relative overflow-y-auto">
        <div className="lg:hidden absolute top-10 left-10">
           <div className="flex items-center gap-3">
              <ShieldCheck className="text-gold w-8 h-8" />
              <span className="text-xl font-serif tracking-widest uppercase text-gold">SANKALP</span>
           </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 flex items-center gap-4">
              {isLogin ? (language === 'HI' ? 'वापसी पर स्वागत है' : 'Welcome Back') : (language === 'HI' ? 'जुड़ें हमसे' : 'Join the Cause')}
              <Heart className="text-saffron w-8 h-8 opacity-20" />
            </h2>
            <p className="text-beige/40 uppercase tracking-[0.2em] text-[10px] font-black">
              {isLogin ? (language === 'HI' ? 'लॉगिन करें' : 'Secure Member Access') : (language === 'HI' ? 'नया खाता बनाएँ' : 'Create Your Sacred Identity')}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type="text" 
                  required
                  placeholder={language === 'HI' ? 'पूरा नाम' : 'Full Name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 pr-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all backdrop-blur-xl"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/20 group-focus-within:text-gold transition-colors" />
              <input 
                type="email" 
                required
                placeholder={language === 'HI' ? 'ईमेल पता' : 'Email Address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 pr-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all backdrop-blur-xl"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/20 group-focus-within:text-gold transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder={language === 'HI' ? 'पासवर्ड' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-12 pr-12 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all backdrop-blur-xl"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-beige/20 hover:text-beige transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 bg-white/5 border border-white/10 rounded flex items-center justify-center group-hover:border-gold/30 transition-all">
                    <input type="checkbox" className="hidden peer" />
                    <div className="w-2 h-2 bg-gold rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-beige/40">Remember Me</span>
                </label>
                <button 
                  type="button" 
                  onClick={resetPassword}
                  className="text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs font-medium px-2"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-maroon to-maroon/80 text-gold rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(128,0,0,0.3)] border border-gold/20 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? (
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                <>
                  {isLogin ? (language === 'HI' ? 'अंदर आएं' : 'Enter Portal') : (language === 'HI' ? 'अकाउंट बनाएं' : 'Begin Seva')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12">
            <div className="relative mb-12">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/5" />
              <div className="relative flex justify-center">
                <span className="px-6 bg-[#0c0805] text-[10px] uppercase tracking-[0.5em] text-beige/20 font-black">Social Connect</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => socialLogin(googleProvider)}
                className="py-4 border border-white/5 bg-white/[0.02] rounded-2xl flex items-center justify-center group hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <Chrome className="w-6 h-6 text-beige/40 group-hover:text-beige transition-colors" />
              </button>
              <button 
                onClick={() => socialLogin(facebookProvider)}
                className="py-4 border border-white/5 bg-white/[0.02] rounded-2xl flex items-center justify-center group hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <Github className="w-6 h-6 text-beige/40 group-hover:text-beige transition-colors" />
              </button>
              <button 
                onClick={() => socialLogin(appleProvider)}
                className="py-4 border border-white/5 bg-white/[0.02] rounded-2xl flex items-center justify-center group hover:bg-white/5 hover:border-white/20 transition-all"
              >
                <Apple className="w-6 h-6 text-beige/40 group-hover:text-beige transition-colors" />
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-beige/30 text-[10px] uppercase tracking-widest font-black">
            {isLogin ? "New to the movement?" : "Already a member?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-3 text-gold hover:text-saffron transition-colors"
            >
              {isLogin ? "Create Account" : "Access Portal"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vh] bg-saffron/5 blur-[150px] -z-10 rounded-full" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vh] bg-maroon/5 blur-[150px] -z-10 rounded-full" />
    </div>
  );
}
