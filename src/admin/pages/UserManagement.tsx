
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Shield, 
  User as UserIcon,
  CheckCircle2,
  XCircle,
  Download,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Donor' | 'Volunteer' | 'Admin' | 'Beneficiary';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  totalDonation?: number;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Arjun Verma', email: 'arjun@example.com', role: 'Donor', status: 'Active', lastActive: new Date().toISOString(), totalDonation: 50000 },
  { id: '2', name: 'Sita Ramani', email: 'sita@ngo.org', role: 'Volunteer', status: 'Active', lastActive: new Date().toISOString() },
  { id: '3', name: 'Vikram Singh', email: 'vikram@example.com', role: 'Donor', status: 'Inactive', lastActive: '2026-04-10T10:00:00Z', totalDonation: 12000 },
  { id: '4', name: 'Meera Kapur', email: 'meera@charity.com', role: 'Beneficiary', status: 'Active', lastActive: new Date().toISOString() },
  { id: '5', name: 'Laksh Kothari', email: 'laksh@admin.org', role: 'Admin', status: 'Active', lastActive: new Date().toISOString() },
  { id: '6', name: 'Rahul Patil', email: 'rahul@example.com', role: 'Volunteer', status: 'Pending', lastActive: '2026-05-01T14:20:00Z' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');

  const filteredUsers = users.filter(u => 
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (selectedRole === 'All' || u.role === selectedRole)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif mb-2">User <span className="text-gold">Database</span></h1>
          <p className="text-beige/40 text-[10px] uppercase tracking-widest font-black">Management of Donors, Volunteers & Staff</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gold/20 transition-all">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-maroon text-gold rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-maroon/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
            Add Entity
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#0a0705] border border-white/5 rounded-3xl backdrop-blur-xl">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beige/20 group-focus-within:text-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs outline-none focus:border-gold/20 transition-all"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
             <select 
               value={selectedRole}
               onChange={(e) => setSelectedRole(e.target.value)}
               className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-xs outline-none focus:border-gold/20 appearance-none cursor-pointer min-w-[140px]"
             >
                <option value="All">All Roles</option>
                <option value="Donor">Donors</option>
                <option value="Volunteer">Volunteers</option>
                <option value="Admin">Admins</option>
                <option value="Beneficiary">Beneficiaries</option>
             </select>
             <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-beige/20 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#0a0705] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Identity</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Role / Status</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Activity</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={user.id} 
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-gold shadow-inner">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-gold transition-colors">{user.name}</span>
                        <span className="text-[10px] text-beige/30 font-medium">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2">
                          <Shield className={`w-3 h-3 ${user.role === 'Admin' ? 'text-saffron' : 'text-beige/20'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'Admin' ? 'text-saffron' : 'text-beige/60'}`}>{user.role}</span>
                       </div>
                       <div className={`px-2 py-1 rounded-md inline-flex items-center gap-1.5 w-fit ${
                         user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                         user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                       }`}>
                          {user.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span className="text-[9px] font-black uppercase tracking-widest">{user.status}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-beige/40 font-medium tracking-wide">Last Active: {format(new Date(user.lastActive), 'MMM dd, HH:mm')}</span>
                       {user.totalDonation && <span className="text-gold font-bold text-xs mt-1">₹{user.totalDonation.toLocaleString()} Total</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-white/5 rounded-xl text-beige/40 hover:text-gold transition-all" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-xl text-beige/40 hover:text-beige transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500/5 rounded-xl text-beige/40 hover:text-red-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center text-beige/20 uppercase tracking-[0.3em] font-black italic">
              No entities found in secure registry
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
