import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, 
  Target, 
  Users, 
  TrendingUp, 
  Plus, 
  Calendar, 
  ChevronRight,
  Eye,
  Settings2,
  Trash2,
  Clock,
  X,
  Loader2
} from 'lucide-react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';

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
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  { 
    id: 'CMP-001', 
    title: 'Village Digital Seva (Mock)', 
    goal: 5000000, 
    raised: 3500000, 
    daysLeft: 12, 
    status: 'Active', 
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8',
    donorsCount: 1250,
    category: 'Education',
    createdAt: new Date().toISOString()
  },
];

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Campaign Form State
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    goal: '',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    daysLeft: '30'
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Campaign[];
      
      setCampaigns(campaignsData.length > 0 ? campaignsData : mockCampaigns);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      setCampaigns(mockCampaigns);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title || !newCampaign.goal) return;

    setIsSubmitting(true);
    try {
      const campaignData = {
        title: newCampaign.title,
        goal: parseFloat(newCampaign.goal),
        raised: 0,
        status: 'Draft',
        image: newCampaign.image,
        category: newCampaign.category,
        donorsCount: 0,
        daysLeft: parseInt(newCampaign.daysLeft),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'campaigns'), campaignData);
      setIsModalOpen(false);
      setNewCampaign({
        title: '',
        goal: '',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
        daysLeft: '30'
      });
      fetchCampaigns();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'campaigns', auth);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-maroon text-gold rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-maroon/20 hover:-translate-y-1 transition-all group"
        >
           <Plus className="w-5 h-5" />
           Initiate Campaign
           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
           { label: 'Active Goals', value: campaigns.filter(c => c.status === 'Active').length || '0', icon: Target, color: 'text-gold' },
           { label: 'Total Donors', value: '14.2K', icon: Users, color: 'text-saffron' },
           { label: 'Conversion', value: '4.8%', icon: TrendingUp, color: 'text-green-500' },
           { label: 'Drafts', value: campaigns.filter(c => c.status === 'Draft').length || '0', icon: Clock, color: 'text-beige/40' },
        ].map((stat, i) => (
           <div key={i} className="p-6 bg-[#0a0705] border border-white/5 rounded-3xl backdrop-blur-xl group hover:border-gold/20 transition-all">
              <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
              <div className="text-2xl font-serif text-white mb-1">{stat.value}</div>
              <div className="text-[10px] text-beige/20 font-black uppercase tracking-[0.2em]">{stat.label}</div>
           </div>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-gold animate-spin" />
          <p className="text-beige/20 text-[10px] font-black uppercase tracking-widest">Loading Campaigns...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {campaigns.map((camp) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={camp.id} 
              className="flex flex-col sm:flex-row gap-6 p-6 bg-[#0a0705] border border-white/5 rounded-[40px] group transition-all hover:shadow-2xl relative overflow-hidden"
            >
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
                          <button className="p-2 bg-white/5 rounded-xl text-beige/20 hover:text-gold transition-colors"><Settings2 className="w-4 h-4" /></button>
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
                          animate={{ width: camp.goal > 0 ? `${(camp.raised / camp.goal) * 100}%` : '0%' }}
                          className="h-full bg-gradient-to-r from-maroon to-gold rounded-full relative"
                       >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                       </motion.div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-beige/20">Progress: {camp.goal > 0 ? Math.round((camp.raised / camp.goal) * 100) : 0}%</span>
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold hover:translate-x-1 transition-all">
                          View Details <Eye className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Initiation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0c0805] border border-gold/20 rounded-[40px] p-8 md:p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-beige/30 hover:text-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-10 text-center">
                <div className="inline-flex p-4 bg-maroon/20 border border-maroon/20 rounded-3xl text-gold mb-6">
                  <Megaphone className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif mb-2">Initiate <span className="text-gold">Sankalp</span></h2>
                <p className="text-[10px] text-beige/30 font-black uppercase tracking-[0.2em]">Start a new fundraising journey</p>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gold font-black uppercase tracking-widest mb-2 ml-4">Campaign Title</label>
                  <input 
                    type="text"
                    required
                    value={newCampaign.title}
                    onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                    placeholder="e.g. Village Digital Seva"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gold font-black uppercase tracking-widest mb-2 ml-4">Target Goal (₹)</label>
                    <input 
                      type="number"
                      required
                      value={newCampaign.goal}
                      onChange={e => setNewCampaign({...newCampaign, goal: e.target.value})}
                      placeholder="50000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gold font-black uppercase tracking-widest mb-2 ml-4">Duration (Days)</label>
                    <input 
                      type="number"
                      required
                      value={newCampaign.daysLeft}
                      onChange={e => setNewCampaign({...newCampaign, daysLeft: e.target.value})}
                      placeholder="30"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-beige placeholder:text-beige/10 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gold font-black uppercase tracking-widest mb-2 ml-4">Category</label>
                  <select 
                    value={newCampaign.category}
                    onChange={e => setNewCampaign({...newCampaign, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-beige focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Health">Health</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-maroon text-gold rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-maroon/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Draft Campaign'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampaignManagement;
