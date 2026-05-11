
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Mail, 
  Phone, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Award,
  Globe2,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  status: 'Approved' | 'Pending' | 'Rejected';
  hours: number;
  appliedDate: string;
}

const mockVolunteers: Volunteer[] = [
  { id: 'VOL-001', name: 'Aman Deep', email: 'aman@gmail.com', phone: '+91 98XXX-XXXXX', location: 'Delhi', skills: ['Teaching', 'Management'], status: 'Approved', hours: 45, appliedDate: '2026-03-12' },
  { id: 'VOL-002', name: 'Zoya Khan', email: 'zoya@outlook.com', phone: '+91 87XXX-XXXXX', location: 'Mumbai', skills: ['Healthcare', 'Yoga'], status: 'Pending', hours: 0, appliedDate: '2026-05-10' },
  { id: 'VOL-003', name: 'Prakash Raj', email: 'prakash@example.com', phone: '+91 76XXX-XXXXX', location: 'Bangalore', skills: ['Coding', 'Mentoring'], status: 'Approved', hours: 120, appliedDate: '2025-12-05' },
  { id: 'VOL-004', name: 'Ishani Roy', email: 'ishani@charity.org', phone: '+91 99XXX-XXXXX', location: 'Kolkata', skills: ['Design', 'Social Media'], status: 'Rejected', hours: 0, appliedDate: '2026-04-20' },
];

const VolunteerManagement: React.FC = () => {
  const [volunteers] = useState<Volunteer[]>(mockVolunteers);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif">Volunteer <span className="text-gold">Hub</span></h1>
          <p className="text-beige/40 text-[10px] uppercase tracking-[0.2em] font-black mt-2">Managing the heartbeat of our organization</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <Globe2 className="w-4 h-4 text-gold" />
              <div className="text-right">
                 <div className="text-xs font-black text-white">45 Regions</div>
                 <div className="text-[9px] text-beige/20 uppercase tracking-widest">Global Coverage</div>
              </div>
           </div>
           <button className="flex items-center gap-2 px-8 py-3 bg-maroon text-gold rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-maroon/20 hover:-translate-y-1 transition-all">
              Broadcast
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Main List */}
         <div className="flex-1 space-y-6">
            <div className="flex gap-4">
               <div className="flex-1 relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-beige/20 group-focus-within:text-gold transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Filter by name, skills or location..."
                     className="w-full bg-[#0a0705] border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-xs outline-none focus:border-gold/30 transition-all"
                  />
               </div>
               <button className="p-4 bg-[#0a0705] border border-white/5 rounded-3xl text-beige/40 hover:text-gold transition-colors">
                  <Filter className="w-5 h-5" />
               </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {volunteers.map((vol) => (
                  <motion.div 
                     whileHover={{ scale: 1.01 }}
                     key={vol.id} 
                     className="p-6 bg-[#0a0705] border border-white/5 rounded-[32px] group hover:border-gold/20 transition-all shadow-xl relative overflow-hidden"
                  >
                     <div className="flex flex-col md:flex-row gap-8 relative z-10">
                        <div className="flex-1 space-y-6">
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <h3 className="text-lg font-serif italic text-white group-hover:text-gold transition-colors">{vol.name}</h3>
                                 <div className="flex items-center gap-2 text-[10px] text-beige/30 font-black uppercase tracking-widest">
                                    <MapPin className="w-3 h-3" /> {vol.location}
                                    <span className="w-1 h-1 bg-white/10 rounded-full mx-1" />
                                    <Calendar className="w-3 h-3" /> {format(new Date(vol.appliedDate), 'MMM yyyy')}
                                 </div>
                              </div>
                              <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                                 vol.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                 vol.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}>
                                 {vol.status}
                              </div>
                           </div>

                           <div className="flex flex-wrap gap-2">
                              {vol.skills.map((skill, i) => (
                                 <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-beige/60 uppercase tracking-widest">
                                    {skill}
                                 </span>
                              ))}
                           </div>

                           <div className="pt-6 border-t border-white/5 flex gap-8">
                              <div className="flex items-center gap-3 text-beige/40">
                                 <Mail className="w-4 h-4" />
                                 <span className="text-xs font-mono">{vol.email}</span>
                              </div>
                              <div className="flex items-center gap-3 text-beige/40">
                                 <Phone className="w-4 h-4" />
                                 <span className="text-xs font-mono">{vol.phone}</span>
                              </div>
                           </div>
                        </div>

                        <div className="w-full md:w-32 flex flex-col items-center justify-center gap-4 bg-white/[0.02] rounded-2xl p-6 border border-white/5">
                           <Award className={`w-8 h-8 ${vol.hours > 100 ? 'text-gold' : 'text-beige/20'}`} />
                           <div className="text-center">
                              <div className="text-2xl font-serif text-white">{vol.hours}</div>
                              <div className="text-[9px] text-beige/30 font-black uppercase tracking-widest">Seva Hours</div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="w-full lg:w-80 space-y-6">
            <div className="p-8 bg-maroon rounded-[40px] border border-gold/30 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 mandala-pattern opacity-10 pointer-events-none" />
               <h3 className="text-lg font-serif italic text-gold mb-6 relative z-10">Application Requests</h3>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Pending Approval</span>
                     <span className="text-xl font-serif text-white">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Today's Applicants</span>
                     <span className="text-xl font-serif text-white">04</span>
                  </div>
                  <button className="w-full py-4 bg-gold text-maroon rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all mt-4">
                     Review all
                  </button>
               </div>
            </div>

            <div className="p-8 bg-[#0a0705] border border-white/5 rounded-[40px]">
               <h3 className="text-lg font-serif italic text-gold mb-8">Top Leaders</h3>
               <div className="space-y-8">
                  {[
                     { name: 'Prakash R.', score: 120 },
                     { name: 'Sneha M.', score: 95 },
                     { name: 'Amit V.', score: 88 },
                  ].map((leader, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center font-black text-gold text-xs italic">{i + 1}</div>
                        <div className="flex-1">
                           <div className="text-xs font-bold text-white mb-1">{leader.name}</div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${(leader.score / 120) * 100}%` }}
                                 className="h-full bg-gold" 
                              />
                           </div>
                        </div>
                        <span className="text-[10px] text-gold font-black">{leader.score}h</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default VolunteerManagement;
