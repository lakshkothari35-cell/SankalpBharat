
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060403] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-maroon/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-maroon rounded-2xl border border-gold/30 shadow-[0_0_40px_rgba(128,0,0,0.5)] mb-8">
            <ShieldCheck className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-4xl font-serif mb-4 italic">Welcome <span className="text-gold">Admin</span></h1>
          <p className="text-beige/40 text-sm font-medium tracking-[0.2em] uppercase">NGO Administration Secure Access</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0705] border border-white/5 rounded-[40px] p-10 md:p-14 shadow-2xl backdrop-blur-3xl relative overflow-hidden"
        >
          {/* Subtle pattern */}
          <div className="absolute inset-0 mandala-pattern opacity-5 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-beige/30 ml-1">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/20 group-focus-within:text-gold transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ngoindia.org"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-sm focus:border-gold/30 outline-none transition-all placeholder:text-beige/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-beige/30 ml-1">Security Key / Password</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-beige/20 group-focus-within:text-gold transition-colors" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-sm focus:border-gold/30 outline-none transition-all placeholder:text-beige/10"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-maroon hover:bg-maroon/80 text-gold py-6 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.3em] transition-all shadow-[0_10px_30px_rgba(128,0,0,0.3)] hover:shadow-maroon/20 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Establish Connection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-beige/20 text-[10px] uppercase tracking-[0.2em] font-medium leading-relaxed">
              Protected by Enterprise Shield <br />
              Secure Admin Console v2.0.26
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
