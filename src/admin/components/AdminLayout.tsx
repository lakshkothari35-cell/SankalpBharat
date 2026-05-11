
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  HeartHandshake, 
  Megaphone, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Globe,
  Database
} from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface SidebarItemProps {
  icon: any;
  label: string;
  path: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, active, collapsed }: SidebarItemProps) => (
  <Link to={path}>
    <motion.div
      whileHover={{ x: collapsed ? 0 : 4 }}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
        active 
          ? 'bg-gold/10 text-gold border border-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
          : 'text-beige/40 hover:text-beige hover:bg-white/5'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-gold' : 'text-beige/40 group-hover:text-beige'} transition-colors`} />
      {!collapsed && <span className="text-sm font-medium tracking-wide">{label}</span>}
      {!collapsed && active && (
        <motion.div
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 bg-gold rounded-full"
        />
      )}
    </motion.div>
  </Link>
);

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAdminAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Database, label: 'User Database', path: '/admin/users' },
    { icon: HeartHandshake, label: 'Donations', path: '/admin/donations' },
    { icon: Megaphone, label: 'Campaigns', path: '/admin/campaigns' },
    { icon: Users, label: 'Volunteers', path: '/admin/volunteers' },
    { icon: FileText, label: 'CMS / Blog', path: '/admin/cms' },
    { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
    { icon: Globe, label: 'Translations', path: '/admin/translations' },
    { icon: Settings, label: 'Website Control', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#060403] text-beige overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        className="hidden md:flex flex-col border-r border-white/5 bg-[#0a0705] relative z-50 backdrop-blur-3xl"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center border border-gold/30 shadow-[0_0_20px_rgba(128,0,0,0.4)]">
            <ShieldCheck className="text-gold w-6 h-6" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="text-sm font-black uppercase tracking-widest leading-none">Sankalp</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">Admin Portal</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-4 px-4 py-3 w-full text-beige/40 hover:text-beige hover:bg-white/5 rounded-xl transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5 shrink-0" />}
            {!collapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#060403] relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0705]/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6 flex-1">
            <button className="md:hidden p-2 text-beige/60" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-96 group focus-within:border-gold/30 transition-all">
              <Search className="w-4 h-4 text-beige/20 group-focus-within:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search database, transactions, campaigns..." 
                className="bg-transparent border-none outline-none text-xs w-full text-beige/60 placeholder:text-beige/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-beige/40 hover:text-beige transition-colors group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-saffron rounded-full border-2 border-[#0a0705]" />
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-beige">{user?.name}</div>
                <div className="text-[10px] text-gold font-bold uppercase tracking-wider mt-0.5">{user?.role.replace('_', ' ')}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-maroon/20 border border-white/10 flex items-center justify-center text-gold font-black uppercase shadow-lg">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto mandala-pattern pb-20">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Drawer (Simplified) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-80 bg-[#0a0705] z-[101] md:hidden border-r border-white/10"
            >
               {/* Mobile sidebar content */}
               <div className="p-8 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-12">
                     <div className="flex items-center gap-3">
                        <ShieldCheck className="text-gold w-6 h-6" />
                        <span className="text-sm font-black uppercase tracking-widest text-gold">Admin</span>
                     </div>
                     <button onClick={() => setIsMobileOpen(false)}>
                        <X className="w-6 h-6 text-beige/40" />
                     </button>
                  </div>
                  <nav className="flex-1 space-y-4 overflow-y-auto">
                     {menuItems.map((item) => (
                        <Link 
                           key={item.path} 
                           to={item.path}
                           onClick={() => setIsMobileOpen(false)}
                           className={`flex items-center gap-4 p-4 rounded-2xl ${location.pathname === item.path ? 'bg-gold/10 text-gold border border-gold/20' : 'text-beige/40'}`}
                        >
                           <item.icon className="w-5 h-5" />
                           <span className="font-medium">{item.label}</span>
                        </Link>
                     ))}
                  </nav>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-4 px-4 py-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-maroon/20 border border-white/10 flex items-center justify-center text-gold font-black uppercase shadow-lg">
                        {user?.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-beige">{user?.name}</span>
                        <span className="text-[10px] text-gold font-bold uppercase tracking-wider mt-0.5">{user?.role.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 px-4 py-4 w-full text-red-500/80 bg-red-500/5 hover:bg-red-500/10 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px]"
                    >
                      <LogOut className="w-5 h-5 shrink-0" />
                      <span>Log out of portal</span>
                    </button>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
