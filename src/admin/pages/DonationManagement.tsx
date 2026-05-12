
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  History, 
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  campaign: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
  method: 'UPI' | 'Card' | 'Transfer';
}

const mockDonations: DonationRecord[] = [
  { id: 'TXN-10294', donorName: 'Rohan Sharma', amount: 25000, campaign: 'Pure Water Project', date: new Date().toISOString(), status: 'Completed', method: 'UPI' },
  { id: 'TXN-10295', donorName: 'Aditi Rao', amount: 5000, campaign: 'Girl Education', date: new Date().toISOString(), status: 'Completed', method: 'Card' },
  { id: 'TXN-10296', donorName: 'Sanjay Dutt', amount: 100000, campaign: 'Village Digitalization', date: '2026-05-10T15:30:00Z', status: 'Processing', method: 'Transfer' },
  { id: 'TXN-10297', donorName: 'Anonymous', amount: 1500, campaign: 'Animal Rescue', date: '2026-05-09T09:15:00Z', status: 'Completed', method: 'UPI' },
  { id: 'TXN-10298', donorName: 'Kabir Khan', amount: 50000, campaign: 'Elderly Care', date: '2026-05-08T18:45:00Z', status: 'Failed', method: 'UPI' },
];

const DonationManagement: React.FC = () => {
  const [donations] = useState<DonationRecord[]>(mockDonations);

  const handleExport = () => {
    // Generate CSV from donations
    const headers = ['ID', 'Donor Name', 'Amount', 'Campaign', 'Date', 'Status', 'Method'];
    const rows = donations.map(d => [
      d.id,
      d.donorName,
      d.amount,
      d.campaign,
      d.date,
      d.status,
      d.method
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sankalp_bharat_donations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif mb-2">Donation <span className="text-gold">Intelligence</span></h1>
          <p className="text-beige/40 text-xs font-medium uppercase tracking-[0.2em]">Comprehensive transaction registry & finance controls</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleExport}
             className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-gold/20 transition-all cursor-pointer"
           >
              <Download className="w-4 h-4" />
              Audit Report
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all">
              Tax Reports
              <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* Snapshot Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Weekly Revenue', value: '₹4.8L', trend: '+12%', icon: ArrowUpRight, color: 'text-green-500' },
            { label: 'Average Ticket', value: '₹12.5K', trend: '+4%', icon: ArrowUpRight, color: 'text-green-500' },
            { label: 'Processing Queue', value: '₹3.2L', trend: '-2%', icon: ArrowDownRight, color: 'text-yellow-500' },
         ].map((stat, i) => (
            <div key={i} className="p-8 bg-[#0a0705] border border-white/5 rounded-[32px] flex justify-between items-center group hover:border-white/10 transition-all">
               <div>
                  <div className="text-[10px] text-beige/20 font-black uppercase tracking-widest mb-3">{stat.label}</div>
                  <div className="text-3xl font-serif text-white">{stat.value}</div>
               </div>
               <div className="text-right">
                  <div className={`flex items-center justify-end gap-1 text-[10px] font-bold mb-2 ${stat.color}`}>
                     <stat.icon className="w-3 h-3" />
                     {stat.trend}
                  </div>
                  <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-2/3 h-full bg-gold" />
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* Database Table */}
      <div className="bg-[#0a0705] border border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden">
         <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-4">
               <History className="w-5 h-5 text-gold" />
               <h3 className="text-lg font-serif italic text-white leading-none">Transaction Log</h3>
            </div>
            
            <div className="flex gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beige/20 group-focus-within:text-gold transition-colors" />
                  <input 
                     type="text" 
                     placeholder="ID, Donor, Campaign..."
                     className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs outline-none focus:border-gold/30 transition-all"
                  />
               </div>
               <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-beige/40 hover:text-gold transition-colors">
                  <Filter className="w-4 h-4" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/[0.01]">
                     <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Transaction</th>
                     <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Amount</th>
                     <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Method</th>
                     <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20">Status</th>
                     <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-beige/20 text-right">Receipt</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {donations.map((txn, i) => (
                     <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-white mb-1 group-hover:text-gold transition-colors">{txn.donorName}</span>
                              <div className="flex items-center gap-2">
                                 <span className="text-[10px] font-mono text-beige/20">{txn.id}</span>
                                 <span className="w-1 h-1 bg-beige/10 rounded-full" />
                                 <span className="text-[10px] text-gold/40 font-medium uppercase tracking-widest">{txn.campaign}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="text-sm font-mono font-bold text-white">₹{txn.amount.toLocaleString()}</div>
                           <div className="text-[10px] text-beige/20 mt-1 uppercase tracking-widest">{format(new Date(txn.date), 'MMM dd, yyyy')}</div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                 <CreditCard className="w-4 h-4 text-beige/30" />
                              </div>
                              <span className="text-[10px] font-bold text-beige/40 uppercase tracking-widest">{txn.method}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                              txn.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                              txn.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                           }`}>
                              {txn.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span className="text-[9px] font-black uppercase tracking-widest">{txn.status}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-beige/40 hover:text-gold hover:border-gold/30 transition-all shadow-sm">
                              <ExternalLink className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
            <span className="text-[10px] text-beige/20 uppercase tracking-widest font-black italic">Page 1 of 42 (Secure Ledger)</span>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-30" disabled>Prev</button>
               <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-gold/30 transition-all">Next</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DonationManagement;
