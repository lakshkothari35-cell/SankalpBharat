
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
  Database,
  Home
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

const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }: SidebarItemProps & { onClick?: () => void }) => (
  <Link to={path} onClick={onClick}>
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

const SidebarContent = ({ 
  menuItems, 
  location, 
  collapsed, 
  handleLogout, 
  user, 
  onItemClick 
}: { 
  menuItems: any[], 
  location: any, 
  collapsed: boolean, 
  handleLogout: () => void, 
  user: any,
  onItemClick?: () => void
}) => (
  <div className="flex flex-col h-full">
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
          onClick={onItemClick}
        />
      ))}
    </nav>

    <div className="p-4 border-t border-white/5 space-y-2">
      <Link
        to="/"
        onClick={onItemClick}
        className="flex items-center gap-4 px-4 py-3 w-full text-gold/60 hover:text-gold hover:bg-gold/5 rounded-xl transition-all"
      >
        <Home className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="text-sm font-medium">Back to Website</span>}
      </Link>

      <div className="pt-2 border-t border-white/5 pb-2">
        <div className={`flex items-center gap-4 px-4 py-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-gold/20 to-maroon/20 border border-white/10 flex items-center justify-center text-gold font-black uppercase text-[10px]">
            {user?.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-beige truncate">{user?.name}</span>
              <span className="text-[8px] text-gold font-bold uppercase tracking-wider truncate">{user?.role.replace('_', ' ')}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 w-full text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
      >
        <LogOut className="w-5 h-5 shrink-0" />
        {!collapsed && <span className="text-sm font-medium">Log out</span>}
      </button>
    </div>
  </div>
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
        <SidebarContent 
          menuItems={menuItems} 
          location={location} 
          collapsed={collapsed} 
          handleLogout={handleLogout} 
          user={user} 
        />
        <div className="px-4 pb-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-4 px-4 py-3 w-full text-beige/40 hover:text-beige hover:bg-white/5 rounded-xl transition-all"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <Menu className="w-5 h-5 shrink-0" />}
            {!collapsed && <span className="text-sm font-medium">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#060403] relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[#0a0705]/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
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

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-2 text-beige/40 hover:text-beige transition-colors group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-saffron rounded-full border-2 border-[#0a0705]" />
            </button>
            
            <div className="flex items-center gap-4 pl-4 md:pl-6 border-l border-white/10">
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-7xl mx-auto mandala-pattern pb-20">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Drawer (Unified Styling) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-[280px] bg-[#0a0705] z-[101] md:hidden border-r border-white/10"
            >
              <SidebarContent 
                menuItems={menuItems} 
                location={location} 
                collapsed={false} 
                handleLogout={handleLogout} 
                user={user} 
                onItemClick={() => setIsMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};


export default AdminLayout;
