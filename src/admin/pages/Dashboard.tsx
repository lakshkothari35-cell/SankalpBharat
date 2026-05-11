
import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  History,
  Target,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const donationData = [
  { name: 'Jan', amount: 45000 },
  { name: 'Feb', amount: 52000 },
  { name: 'Mar', amount: 48000 },
  { name: 'Apr', amount: 61000 },
  { name: 'May', amount: 55000 },
  { name: 'Jun', amount: 67000 },
  { name: 'Jul', amount: 72000 },
];

const stateData = [
  { name: 'Maharashta', value: 45 },
  { name: 'UP', value: 38 },
  { name: 'Rajasthan', value: 32 },
  { name: 'Gujarat', value: 28 },
  { name: 'Karnataka', value: 25 },
];

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-[#0a0705] border border-white/5 rounded-[32px] p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 rounded-full ${color}`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}%
        </div>
      )}
    </div>
    <div className="space-y-1">
      <div className="text-3xl font-serif text-white">{value}</div>
      <div className="text-[10px] text-beige/30 uppercase tracking-[0.2em] font-black">{label}</div>
    </div>
  </motion.div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-2">Real-time <span className="text-gold">Impact</span></h1>
          <p className="text-beige/40 text-xs font-medium uppercase tracking-[0.2em]">Monitoring NGO performance & engagement</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gold/30 transition-all">
            Export Report
          </button>
          <button className="px-6 py-3 bg-maroon text-gold rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-maroon/20 hover:-translate-y-1 transition-all">
            Create Campaign
          </button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value="₹14.2M" 
          trend="up" 
          trendValue="12.5" 
          icon={TrendingUp}
          color="bg-gold"
        />
        <StatCard 
          label="Active Volunteers" 
          value="4,821" 
          trend="up" 
          trendValue="8.2" 
          icon={Users}
          color="bg-saffron"
        />
        <StatCard 
          label="Campaign Success" 
          value="89%" 
          trend="down" 
          trendValue="2.1" 
          icon={Target}
          color="bg-maroon"
        />
        <StatCard 
          label="Recent Donations" 
          value="152" 
          trend="up" 
          trendValue="24.5" 
          icon={Heart}
          color="bg-gold"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0705] border border-white/5 rounded-[40px] p-8 relative overflow-hidden">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-lg font-serif italic text-gold">Donation Trends</h3>
              <div className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold text-beige/40 uppercase tracking-widest">Yearly Activity</div>
           </div>
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={donationData}>
                    <defs>
                       <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 700 }}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 700 }}
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0a0705', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px' }}
                       itemStyle={{ color: '#D4AF37' }}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="amount" 
                       stroke="#D4AF37" 
                       strokeWidth={3}
                       fillOpacity={1} 
                       fill="url(#colorAmount)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-[#0a0705] border border-white/5 rounded-[40px] p-8">
           <h3 className="text-lg font-serif italic text-gold mb-10">Top Performing Regions</h3>
           <div className="space-y-8">
              {stateData.map((state, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black">
                       <span className="text-beige/40">{state.name}</span>
                       <span className="text-gold">{state.value}% growth</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          className="h-full bg-gradient-to-r from-maroon/50 to-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${state.value * 2}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1 }}
                       />
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
              <div className="text-xs font-serif italic text-white mb-1">Impact visualization coming soon</div>
              <p className="text-[10px] text-beige/30 uppercase tracking-widest">GIS-based real-time heatmaps</p>
           </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Recent Activity */}
         <div className="bg-[#0a0705] border border-white/5 rounded-[40px] p-8">
            <div className="flex items-center gap-3 mb-10">
               <Activity className="w-5 h-5 text-gold" />
               <h3 className="text-lg font-serif italic text-gold">Real-time Feed</h3>
            </div>
            <div className="space-y-6">
               {[
                  { user: 'Siddharth M.', action: 'donated ₹15,000 to', target: 'Clean Water', time: '2 mins ago', icon: Heart },
                  { user: 'Ananya S.', action: 'joined as a', target: 'Seva Volunteer', time: '14 mins ago', icon: Users },
                  { user: 'System', action: 'initiated monthly', target: 'AI Impact Report', time: '1 hour ago', icon: History },
                  { user: 'Priya K.', action: 'updated the', target: 'Literacy Blog', time: '3 hours ago', icon: FileText },
               ].map((event, i) => (
                  <div key={i} className="flex gap-4 group">
                     <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-beige/20 group-hover:bg-gold/10 group-hover:text-gold group-hover:border-gold/20 transition-all">
                        <event.icon className="w-4 h-4" />
                     </div>
                     <div className="flex-1 border-b border-white/5 pb-4 last:border-0">
                        <p className="text-xs font-medium leading-relaxed">
                           <span className="text-white font-bold">{event.user}</span>
                           <span className="text-beige/40 mx-1">{event.action}</span>
                           <span className="text-gold font-bold">{event.target}</span>
                        </p>
                        <span className="text-[10px] text-beige/20 font-black uppercase tracking-widest mt-1 block">{event.time}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Upcoming Milestones */}
         <div className="bg-[#0a0705] border border-white/5 rounded-[40px] p-8">
            <div className="flex items-center gap-3 mb-10">
               <Calendar className="w-5 h-5 text-gold" />
               <h3 className="text-lg font-serif italic text-gold">System Deadlines</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                  { title: 'Tax Filing Q1', date: 'May 15, 2026', status: 'Pending', color: 'text-saffron' },
                  { title: 'Village Survey', date: 'May 22, 2026', status: 'In Review', color: 'text-gold' },
                  { title: 'Annual Gala', date: 'June 05, 2026', status: 'Planning', color: 'text-gold' },
                  { title: 'Audit Session', date: 'June 12, 2026', status: 'Scheduled', color: 'text-beige/40' },
               ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                     <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.color}`}>{item.status}</div>
                     <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                     <div className="text-xs text-beige/30">{item.date}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
