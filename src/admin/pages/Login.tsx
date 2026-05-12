
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Hardcoded credentials as requested by user
    // ID: admin@ngo123.com, Password: admin12345
    if (email === 'admin@ngo123.com' && password === 'admin12345') {
      // Simulate login success - in a real app we'd use Firebase Auth
      // We'll store a simple token to bypass the protected route for this session
      sessionStorage.setItem('admin_authenticated', 'true');
      
      // Give a tiny delay for effect
      setTimeout(() => {
        navigate('/admin');
      }, 800);
    } else {
      setTimeout(() => {
        setError('Invalid administrative credentials. Please check your ID and Security Password.');
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#060403] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 mandala-pattern opacity-[0.03] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-maroon/20 border border-gold/20 rounded-3xl text-gold mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-serif text-white mb-2">Administrative <span className="text-gold">Access</span></h1>
          <p className="text-[10px] text-beige/30 font-black uppercase tracking-[0.3em]">Sankalp Bharat NGO Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
              <input 
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin ID (e.g. admin@ngo123.com)"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold transition-all"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Security Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3 text-red-500"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {error}
              </p>
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-maroon text-gold rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-maroon/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Access 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-beige/20 uppercase tracking-[0.3em] font-medium leading-relaxed">
            Unauthorized access attempts are logged and reported. <br />
            NGO Administrative Control System v2.4.0
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
