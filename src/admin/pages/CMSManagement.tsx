
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  PenTool, 
  Globe, 
  Eye, 
  MessageSquare, 
  Share2, 
  MoreVertical,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Layout,
  BarChart3,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  date: string;
  views: number;
  comments: number;
  languages: string[];
}

const mockPosts: Post[] = [
  { id: '1', title: 'The Power of Seva: Impact stories from UP', author: 'Vikram S.', category: 'Stories', status: 'Published', date: '2026-05-10', views: 1240, comments: 45, languages: ['HI', 'EN'] },
  { id: '2', title: 'Why Rural Education is the key to Bharat 2047', author: 'Dr. Ananya', category: 'Lekh', status: 'Published', date: '2026-05-08', views: 890, comments: 28, languages: ['HI', 'EN', 'GU'] },
  { id: '3', title: 'New Digital Learning Center in Jaipur', author: 'Ishani R.', category: 'News', status: 'Draft', date: '2026-05-11', views: 0, comments: 0, languages: ['HI'] },
  { id: '4', title: 'Annual Yatra: Preparation Guide', author: 'Siddharth', category: 'Yatras', status: 'Scheduled', date: '2026-05-15', views: 0, comments: 0, languages: ['HI', 'EN'] },
];

const CMSManagement: React.FC = () => {
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-2">Content <span className="text-gold">Sutra</span></h1>
          <p className="text-beige/40 text-xs font-medium uppercase tracking-[0.2em]">Multilingual CMS & Storytelling Engine</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gold/20 transition-all">
              <Globe className="w-4 h-4 text-gold" />
              Translations
           </button>
           <button className="flex items-center gap-2 px-8 py-3 bg-maroon text-gold rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-maroon/20 hover:-translate-y-1 transition-all">
              <Plus className="w-4 h-4" />
              New Write-up
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Stats Bar */}
         <div className="lg:col-span-1 space-y-4">
            {[
               { label: 'Total Content', value: '1,248', icon: Layout, color: 'text-gold' },
               { label: 'Total Views', value: '45.2K', icon: BarChart3, color: 'text-saffron' },
               { label: 'Pending Drafts', value: '14', icon: PenTool, color: 'text-beige/40' },
            ].map((stat, i) => (
               <div key={i} className="p-6 bg-[#0a0705] border border-white/5 rounded-[32px] group hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                     </div>
                     <div>
                        <div className="text-xl font-serif text-white">{stat.value}</div>
                        <div className="text-[9px] text-beige/20 font-black uppercase tracking-widest">{stat.label}</div>
                     </div>
                  </div>
               </div>
            ))}
            
            <div className="mt-8 p-8 bg-gold/[0.03] border border-gold/10 rounded-[32px] text-center">
               <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-gold" />
               </div>
               <h4 className="text-sm font-serif italic text-gold mb-2">Regional Expansion</h4>
               <p className="text-[10px] text-beige/40 leading-relaxed uppercase tracking-widest px-4">Our content is now reaching 8 Indian languages.</p>
            </div>
         </div>

         {/* Content List */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-4">
               <div className="flex-1 relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-beige/20 group-focus-within:text-gold transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Search articles, lekh or stories..."
                     className="w-full bg-[#0a0705] border border-white/5 rounded-3xl py-4 pl-14 pr-6 text-xs outline-none focus:border-gold/30 transition-all"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {posts.map((post) => (
                  <motion.div 
                     layout
                     whileHover={{ x: 5 }}
                     key={post.id} 
                     className="p-6 bg-[#0a0705] border border-white/5 rounded-[32px] group hover:border-gold/20 transition-all relative overflow-hidden"
                  >
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                        <div className="flex-1 space-y-3">
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black uppercase tracking-widest text-gold">{post.category}</span>
                              <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${
                                 post.status === 'Published' ? 'bg-green-500/10 text-green-500' :
                                 post.status === 'Draft' ? 'bg-beige/10 text-beige/40' : 'bg-yellow-500/10 text-yellow-500'
                              }`}>
                                 {post.status === 'Published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                 <span className="text-[9px] font-black uppercase tracking-widest">{post.status}</span>
                              </div>
                           </div>
                           <h3 className="text-lg font-serif italic text-white group-hover:text-gold transition-colors cursor-pointer">{post.title}</h3>
                           <div className="flex items-center gap-6 text-[10px] text-beige/30 font-bold uppercase tracking-widest">
                              <div className="flex items-center gap-1.5"><PenTool className="w-3 h-3" /> {post.author}</div>
                              <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {format(new Date(post.date), 'MMM dd')}</div>
                              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                 {post.languages.map(lang => (
                                    <span key={lang} className="text-gold/60">{lang}</span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-12 pl-8 md:pl-0">
                           <div className="text-center">
                              <div className="text-lg font-serif text-white">{post.views > 1000 ? (post.views/1000).toFixed(1) + 'k' : post.views}</div>
                              <div className="text-[9px] text-beige/20 font-black uppercase tracking-widest">Views</div>
                           </div>
                           <div className="text-center">
                              <div className="text-lg font-serif text-white">{post.comments}</div>
                              <div className="text-[9px] text-beige/20 font-black uppercase tracking-widest">Talk</div>
                           </div>
                           <div className="flex items-center gap-2">
                              <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-beige/40 hover:text-gold transition-all"><Eye className="w-4 h-4" /></button>
                              <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-beige/40 hover:text-white transition-all"><MoreVertical className="w-4 h-4" /></button>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CMSManagement;
