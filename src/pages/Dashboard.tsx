import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, Users, LayoutDashboard, Settings, 
  Bell, LogOut, ShieldCheck, Home, ArrowRight,
  TrendingUp, Calendar, Award, Receipt, Menu, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getRoleContent = () => {
    switch (profile?.role) {
      case 'donor':
        return {
          title: language === 'HI' ? 'दाता डैशबोर्ड' : 'Donor Dashboard',
          stats: [
            { label: 'Total Donated', value: '₹12,500', icon: Heart },
            { label: 'Active Monthly', value: '₹500', icon: TrendingUp },
            { label: 'Tax Savings', value: '₹3,750', icon: Receipt },
            { label: 'Campaigns Made', value: '4', icon: Award },
          ],
          actions: ['Download Receipts', 'View Saved Causes', 'Set Recurring Seva', 'Profile Settings']
        };
      case 'volunteer':
        return {
          title: language === 'HI' ? 'स्वयंसेवक डैशबोर्ड' : 'Volunteer Dashboard',
          stats: [
            { label: 'Service Hours', value: '142 hrs', icon: Calendar },
            { label: 'Events Joined', value: '12', icon: Users },
            { label: 'Impact Score', value: '98/100', icon: TrendingUp },
            { label: 'Certificates', value: '3', icon: Award },
          ],
          actions: ['Register for Event', 'Log Service Hours', 'Team Chat', 'View Progress']
        };
      default:
        return {
          title: 'Management Portal',
          stats: [
            { label: 'System Health', value: 'Optimal', icon: ShieldCheck },
            { label: 'Active Users', value: '25.4k', icon: Users },
            { label: 'Today Revenue', value: '₹4.2L', icon: TrendingUp },
            { label: 'Open Tasks', value: '18', icon: LayoutDashboard },
          ],
          actions: ['User Management', 'Campaign Controls', 'System Logs', 'Settings']
        };
    }
  };

  const content = getRoleContent();

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? 'p-6' : 'p-8'}`}>
       <div className="flex items-center justify-between mb-16 px-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center border border-gold/30">
                <ShieldCheck className="w-6 h-6 text-gold" />
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-widest text-beige">Sankalp</span>
                <span className="text-[8px] text-gold uppercase font-bold tracking-[0.2em]">{profile?.role} PORTAL</span>
             </div>
          </div>
          {mobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-beige hover:text-gold transition-colors">
              <X className="w-6 h-6" />
            </button>
          )}
       </div>

       <nav className="flex-1 space-y-2">
          {[
             { icon: LayoutDashboard, label: 'Overview' },
             { icon: Users, label: 'Connections' },
             { icon: Calendar, label: 'History' },
             { icon: Settings, label: 'Settings' },
          ].map((item, i) => (
             <button 
               key={i} 
               onClick={() => mobile && setIsSidebarOpen(false)}
               className={`flex items-center gap-4 w-full px-6 py-4 rounded-2xl transition-all ${i === 0 ? 'bg-gold/10 text-gold border border-gold/20' : 'text-beige/30 hover:text-beige hover:bg-white/5'}`}
             >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest font-black">{item.label}</span>
             </button>
          ))}
       </nav>

       <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <Link to="/" className="flex items-center gap-4 px-6 py-4 w-full text-beige/30 hover:text-beige transition-all group">
             <Home className="w-5 h-5" />
             <span className="text-[10px] uppercase tracking-widest font-black">Home</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 w-full text-red-500/60 hover:text-red-500 transition-all">
             <LogOut className="w-5 h-5" />
             <span className="text-[10px] uppercase tracking-widest font-black">Log Out</span>
          </button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0805] text-beige flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-80 border-r border-white/5 bg-[#0a0705] flex-col relative z-20 h-screen">
         <Sidebar />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSidebarOpen(false)}
               className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] md:hidden"
            />
            <motion.aside 
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed inset-y-0 left-0 w-[280px] bg-[#0a0705] z-[101] md:hidden border-r border-white/10"
            >
               <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 bg-[#0c0805] p-4 md:p-12 overflow-y-auto relative mandala-pattern">
         <header className="flex justify-between items-center mb-8 md:mb-12">
            <div className="flex items-center gap-4 md:gap-0">
               <button 
                 onClick={() => setIsSidebarOpen(true)}
                 className="md:hidden p-2 bg-white/5 rounded-xl border border-white/10 text-gold"
               >
                 <Menu className="w-6 h-6" />
               </button>
               <div>
                  <h1 className="text-2xl md:text-5xl font-serif mb-1 md:mb-2">{content.title}</h1>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-beige/20 font-black">Ready to make an impact today?</p>
               </div>
            </div>
            <button className="relative p-2 md:p-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-beige/40 hover:text-beige transition-all">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-saffron rounded-full" />
            </button>
         </header>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {content.stats.map((stat, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 key={i} 
                 className="p-6 md:p-8 bg-white/5 border border-white/5 rounded-[24px] md:rounded-[32px] hover:border-gold/20 transition-all group"
               >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gold/5 flex items-center justify-center text-gold mb-4 md:mb-6 group-hover:bg-gold group-hover:text-maroon transition-all">
                     <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-serif mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-beige/30 font-black">{stat.label}</div>
               </motion.div>
            ))}
         </div>

         {/* Quick Actions & Recent Activity */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="p-10 bg-maroon/10 border border-gold/10 rounded-[40px] relative overflow-hidden backdrop-blur-xl">
                  <div className="relative z-10">
                     <h3 className="text-2xl font-serif mb-8 flex items-center gap-3">
                        Active Progress
                        <TrendingUp className="text-gold w-5 h-5" />
                     </h3>
                     <div className="h-64 flex items-end gap-2 md:gap-4 px-4">
                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                           <motion.div 
                             key={i}
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                             className="flex-1 bg-gold/20 rounded-t-xl relative group"
                           >
                              <div className="absolute inset-0 bg-gold/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                           </motion.div>
                        ))}
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -z-10" />
               </div>

               <div className="p-10 bg-white/5 border border-white/5 rounded-[40px]">
                  <h3 className="text-2xl font-serif mb-8">Recent Seva Activities</h3>
                  <div className="space-y-6">
                     {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between py-4 border-b border-white/5 group">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold/40 font-black">0{item}</div>
                              <div>
                                 <div className="font-bold text-beige group-hover:text-gold transition-colors">Campaign Milestone Reached</div>
                                 <div className="text-[10px] uppercase tracking-widest text-beige/20 mt-1">2 hours ago • New Delhi</div>
                              </div>
                           </div>
                           <ArrowRight className="w-5 h-5 text-gold/20 group-hover:text-gold group-hover:translate-x-2 transition-all" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="p-8 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-[40px]">
                  <h3 className="text-xl font-serif mb-8 uppercase tracking-widest text-gold text-center">Quick Seva</h3>
                  <div className="space-y-3">
                     {content.actions.map((action, i) => (
                        <button key={i} className="w-full py-5 px-6 rounded-2xl bg-white/5 border border-white/5 text-[10px] uppercase tracking-widest font-black text-beige/40 hover:text-gold hover:bg-gold/10 hover:border-gold/20 transition-all text-left">
                           {action}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-white/5 border border-white/5 rounded-[40px] text-center">
                  <div className="w-20 h-20 bg-gold/10 border border-gold/20 rounded-full mx-auto flex items-center justify-center mb-6">
                     <Award className="w-10 h-10 text-gold" />
                  </div>
                  <h4 className="text-xl font-serif mb-2">Impact Badge</h4>
                  <p className="text-[10px] uppercase tracking-widest text-beige/30 mb-6">Platinum Sewadar</p>
                  <button className="text-gold text-[10px] uppercase tracking-[0.4em] font-black border-b border-gold/20 pb-1 hover:border-gold transition-all">View Recognition</button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}
