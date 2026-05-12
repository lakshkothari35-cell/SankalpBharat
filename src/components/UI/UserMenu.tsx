import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, LayoutDashboard, Shield, Heart, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserMenu() {
  const { user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <Link 
        to="/auth"
        className="px-6 py-3 bg-white/5 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-all font-black uppercase tracking-widest text-[10px] flex items-center gap-2 pointer-events-auto"
      >
        <User className="w-4 h-4" />
        Join Seva
      </Link>
    );
  }

  const roleConfigs = {
    admin: { label: 'Admin Panel', path: '/admin', icon: Shield },
    donor: { label: 'Donation Portal', path: '/dashboard/donor', icon: Heart },
    volunteer: { label: 'Volunteer Portal', path: '/dashboard/volunteer', icon: Users },
    staff: { label: 'Staff Portal', path: '/dashboard/staff', icon: LayoutDashboard },
    manager: { label: 'Management', path: '/dashboard/manager', icon: LayoutDashboard },
  };

  const config = roleConfigs[profile?.role || 'donor'];

  return (
    <div className="relative pointer-events-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-2 pr-4 py-2 bg-gold/10 border border-gold/20 rounded-2xl hover:bg-gold/20 transition-all group"
      >
        <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center text-maroon font-black text-sm uppercase">
          {profile?.name?.charAt(0) || user.email?.charAt(0)}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-widest text-beige leading-none">
            {profile?.name?.split(' ')[0] || 'Member'}
          </span>
          <span className="text-[8px] text-gold uppercase font-bold tracking-wider mt-1">
            {profile?.role || 'Donor'}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40" 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-60 bg-[#0c0805]/90 border border-gold/20 rounded-[28px] p-4 backdrop-blur-3xl z-50 shadow-2xl"
            >
              <div className="px-4 py-4 border-b border-white/5 mb-2">
                <p className="text-[10px] uppercase tracking-widest text-beige/40 mb-1">Signed in as</p>
                <p className="text-xs font-bold text-beige truncate">{user.email}</p>
              </div>

              <div className="space-y-1">
                <Link 
                  to={config.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gold/10 text-gold transition-all"
                >
                  <config.icon className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{config.label}</span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
