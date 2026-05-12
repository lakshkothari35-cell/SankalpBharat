import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Github, Twitter, Instagram, ShieldCheck, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/');
  };

  const menuItems = [
    { label: t.nav.vision, href: '#about', type: 'anchor' },
    { label: t.nav.causes, href: '#causes', type: 'anchor' },
    { label: t.nav.donation, href: '#donation', type: 'anchor' },
    { label: t.nav.connect, href: '#volunteer', type: 'anchor' },
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
            data-lenis-prevent
            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0c0805] border-l border-gold/10 z-[201] flex flex-col p-8 md:p-12 mandala-pattern overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
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

            <div className="mb-12">
               {!user ? (
                 <Link 
                   to="/auth" 
                   onClick={onClose}
                   className="flex items-center gap-4 p-5 bg-gold border border-gold/20 rounded-2xl group transition-all"
                 >
                   <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center border border-gold/30">
                      <User className="w-5 h-5 text-gold" />
                   </div>
                   <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#0c0805]/60">Member Access</div>
                      <div className="text-sm font-serif text-[#0c0805] group-hover:scale-105 transition-transform italic font-bold">Join the Movement</div>
                   </div>
                   <ArrowRight className="ml-auto w-5 h-5 text-[#0c0805]" />
                 </Link>
               ) : (
                 <div className="space-y-4">
                   <div className="flex items-center gap-4 p-5 bg-gold/5 border border-gold/10 rounded-2xl group">
                      <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center border border-gold/30 text-gold font-black text-xl">
                         {profile?.name?.charAt(0) || user.email?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="text-xs font-bold text-beige truncate">{profile?.name || 'Human Being'}</div>
                         <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gold mt-1">{profile?.role || 'Donor'}</div>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                     <Link 
                       to={profile?.role === 'admin' ? '/admin' : `/dashboard/${profile?.role || 'donor'}`}
                       onClick={onClose}
                       className="flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl text-gold text-[10px] uppercase tracking-widest font-black hover:bg-gold/10 transition-all font-sans"
                     >
                       <LayoutDashboard className="w-4 h-4" />
                       Dashboard
                     </Link>
                     <button 
                       onClick={handleLogout}
                       className="flex items-center justify-center gap-2 p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500 text-[10px] uppercase tracking-widest font-black hover:bg-red-500/10 transition-all font-sans"
                     >
                       <LogOut className="w-4 h-4" />
                       Sign Out
                     </button>
                   </div>
                 </div>
               )}
            </div>

            <nav className="flex-1 flex flex-col gap-4">
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
                  <span className="text-3xl font-serif text-beige group-hover:text-gold transition-colors italic">
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
