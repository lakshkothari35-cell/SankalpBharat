
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, 
  Target, 
  Users, 
  TrendingUp, 
  Plus, 
  Calendar, 
  MoreHorizontal,
  ChevronRight,
  Eye,
  Settings2,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  goal: number;
  raised: number;
  daysLeft: number;
  status: 'Active' | 'Draft' | 'Ended';
  image: string;
  donorsCount: number;
  category: string;
}

const mockCampaigns: Campaign[] = [
  { 
    id: 'CMP-001', 
    title: 'Village Digital Seva', 
    goal: 5000000, 
    raised: 3500000, 
    daysLeft: 12, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8',
    donorsCount: 1250,
    category: 'Education'
  },
  { 
    id: 'CMP-002', 
    title: 'Sacred Water Conservation', 
    goal: 2000000, 
    raised: 1800000, 
    daysLeft: 5, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09',
    donorsCount: 840,
    category: 'Environment'
  },
  { 
    id: 'CMP-003', 
    title: 'Widow Welfare Program', 
    goal: 1000000, 
    raised: 0, 
    daysLeft: 30, 
    status: 'Draft', 
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    donorsCount: 0,
    category: 'Social'
  },
  { 
    id: 'CMP-004', 
    title: 'Himalayan Tree Seva', 
    goal: 500000, 
    raised: 520000, 
    daysLeft: 0, 
    status: 'Ended', 
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    donorsCount: 410,
    category: 'Environment'
  },
];

const CampaignManagement: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gold">
                 <Megaphone className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-5xl font-serif">Sankalp <span className="text-gold">Campaigns</span></h1>
           </div>
           <p className="text-beige/40 text-[10px] uppercase tracking-[0.2em] font-black">Control fundraisers, track progress & manage impact stories</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-maroon text-gold rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-maroon/20 hover:-translate-y-1 transition-all group">
           <Plus className="w-5 h-5" />
           Initiate Campaign
           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
           { label: 'Active Goals', value: '08', icon: Target, color: 'text-gold' },
           { label: 'Total Donors', value: '14.2K', icon: Users, color: 'text-saffron' },
           { label: 'Conversion', value: '4.8%', icon: TrendingUp, color: 'text-green-500' },
           { label: 'Drafts', value: '03', icon: Clock, color: 'text-beige/40' },
        ].map((stat, i) => (
           <div key={i} className="p-6 bg-[#0a0705] border border-white/5 rounded-3xl backdrop-blur-xl group hover:border-gold/20 transition-all">
              <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
              <div className="text-2xl font-serif text-white mb-1">{stat.value}</div>
              <div className="text-[10px] text-beige/20 font-black uppercase tracking-[0.2em]">{stat.label}</div>
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {campaigns.map((camp) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={camp.id} 
            className="flex flex-col sm:flex-row gap-6 p-6 bg-[#0a0705] border border-white/5 rounded-[40px] group transition-all hover:shadow-2xl relative overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 mandala-pattern opacity-[0.02] pointer-events-none" />
            
            <div className="w-full sm:w-48 h-48 rounded-3xl overflow-hidden relative border border-white/10 shrink-0">
               <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                  camp.status === 'Active' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' :
                  camp.status === 'Draft' ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-red-500 text-white'
               }`}>
                  {camp.status}
               </div>
            </div>

            <div className="flex-1 flex flex-col justify-between py-2 relative z-10">
               <div className="space-y-2">
                  <div className="flex justify-between items-start">
                     <span className="text-[10px] text-gold font-bold uppercase tracking-widest">{camp.category}</span>
                     <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-xl text-beige/20 hover:text-gold transition-colors"><Edit3 className="w-4 h-4" /></button>
                        <button className="p-2 bg-white/5 rounded-xl text-beige/20 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
                  <h3 className="text-xl font-serif italic text-white group-hover:text-gold transition-colors">{camp.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] text-beige/30 font-bold uppercase tracking-widest">
                     <div className="flex items-center gap-1"><Users className="w-3 h-3" /> {camp.donorsCount} Donors</div>
                     <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {camp.daysLeft} Days Left</div>
                  </div>
               </div>

               <div className="space-y-4 pt-6">
                  <div className="flex justify-between text-xs font-mono">
                     <span className="text-gold">₹{camp.raised.toLocaleString()}</span>
                     <span className="text-beige/30">Target: ₹{camp.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(camp.raised / camp.goal) * 100}%` }}
                        className="h-full bg-gradient-to-r from-maroon to-gold rounded-full relative"
                     >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                     </motion.div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-beige/20">Progress: {Math.round((camp.raised / camp.goal) * 100)}%</span>
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold hover:translate-x-1 transition-all">
                        View Details <Eye className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Edit3 = ({ className }: { className?: string }) => (
  <Settings2 className={className} />
);

export default CampaignManagement;
