
import React, { useState, useRef, useEffect } from 'react';
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
  Home,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
            {user?.name?.charAt(0) || 'A'}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-beige truncate">{user?.name || 'Administrator'}</span>
              <span className="text-[8px] text-gold font-bold uppercase tracking-wider truncate">{(user?.role || 'staff').replace('_', ' ')}</span>
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
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, profile: user } = useAuth();

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Donation Received', message: 'Hiralal just donated ₹5,000 to Digital Seva.', time: '2 mins ago', type: 'success', unread: true },
    { id: 2, title: 'Campaign Goal Met', message: 'Village Digital Seva campaign has reached 100%.', time: '1 hour ago', type: 'info', unread: true },
    { id: 3, title: 'Volunteer Application', message: '3 new volunteers applied for Mumbai region.', time: '3 hours ago', type: 'info', unread: false },
    { id: 4, title: 'System Maintenance', message: 'Scheduled maintenance tonight at 11 PM.', time: '5 hours ago', type: 'warning', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

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

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem('admin_authenticated');
    navigate('/');
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

          <div className="flex items-center gap-4 md:gap-6 relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 md:p-2.5 transition-colors group rounded-xl ${showNotifications ? 'bg-gold/10 text-gold' : 'text-beige/40 hover:text-beige'}`}
            >
              <Bell className="w-4.5 h-4.5 md:w-5 md:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 w-2 h-2 bg-saffron rounded-full border-2 border-[#0a0705]" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-14 right-[-60px] sm:right-0 w-[280px] sm:w-[400px] bg-[#0c0805] border border-gold/20 rounded-2xl md:rounded-[32px] shadow-2xl overflow-hidden z-[100] backdrop-blur-3xl"
                >
                  <div className="p-4 md:p-6 border-b border-gold/10 flex items-center justify-between bg-maroon/5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Bell className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold" />
                      <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest">Alert Center</h3>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gold/40 hover:text-gold transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-white/5">
                        {notifications.map((n) => (
                          <div 
                            key={n.id} 
                            className={`p-4 md:p-6 hover:bg-white/[0.02] transition-colors relative group cursor-pointer ${n.unread ? 'bg-gold/[0.02]' : ''}`}
                          >
                            {n.unread && <div className="absolute left-0 top-0 bottom-0 w-0.5 md:w-1 bg-gold" />}
                            <div className="flex gap-3 md:gap-4">
                              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center border ${
                                n.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                                n.type === 'warning' ? 'bg-saffron/10 border-saffron/20 text-saffron' :
                                'bg-gold/10 border-gold/20 text-gold'
                              }`}>
                                {n.type === 'success' ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /> : 
                                 n.type === 'warning' ? <AlertCircle className="w-4 h-4 md:w-5 md:h-5" /> : 
                                 <Clock className="w-4 h-4 md:w-5 md:h-5" />}
                              </div>
                              <div className="flex-1 space-y-0.5 md:space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className={`text-[10px] md:text-xs font-bold ${n.unread ? 'text-beige' : 'text-beige/60'}`}>{n.title}</h4>
                                  <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-beige/20">{n.time}</span>
                                </div>
                                <p className="text-[9px] md:text-[11px] text-beige/40 leading-relaxed italic">{n.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 md:py-12 text-center">
                        <Bell className="w-6 h-6 md:w-8 md:h-8 text-beige/10 mx-auto mb-2 md:mb-4" />
                        <p className="text-[8px] md:text-[10px] text-beige/20 font-black uppercase tracking-widest">No alerts</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-4 border-t border-gold/10 text-center bg-maroon/5">
                    <button className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gold hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      View All <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-2 md:gap-6 pl-2 md:pl-6 border-l border-white/10">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-beige">{user?.name || 'Administrative Staff'}</div>
                <div className="text-[10px] text-gold font-bold uppercase tracking-wider mt-0.5">{(user?.role || 'admin').replace('_', ' ')}</div>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-gold/20 to-maroon/20 border border-white/10 flex items-center justify-center text-gold font-black uppercase shadow-lg text-xs md:text-base">
                {user?.name?.charAt(0) || 'A'}
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
