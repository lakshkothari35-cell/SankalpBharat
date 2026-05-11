
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Type, Layout, Accessibility, RotateCcw, X, Check, Sun, Moon, Droplets } from 'lucide-react';
import { useTheme, ThemeType } from '../../context/ThemeContext';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const { theme, setTheme, config, setCustomColor, setFontSize, resetTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'fonts'>('themes');

  const themes: { id: ThemeType; name: string; icon: any; description: string }[] = [
    { id: 'traditional', name: 'Traditional', icon: Palette, description: 'Saffron & Gold' },
    { id: 'minimal', name: 'Minimal', icon: Layout, description: 'Clean & Modern' },
    { id: 'dark', name: 'Premium Dark', icon: Moon, description: 'Neon & Glass' },
    { id: 'nature', name: 'Nature', icon: Droplets, description: 'Organic Green' },
    { id: 'accessibility', name: 'Accessibility', icon: Accessibility, description: 'High Contrast' },
    { id: 'festival', name: 'Festival', icon: Sun, description: 'Vibrant Holi' },
  ];

  return (
    <>
      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full border-l border-white/10 z-[251] flex flex-col glass-card rounded-none"
              style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
            >
              {/* Header */}
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold/20 rounded-lg">
                    <Palette className="w-5 h-5 text-gold" />
                  </div>
                  <h2 className="text-xl font-serif tracking-widest uppercase">Theme <span className="text-saffron">Atelier</span></h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10 px-4">
                {[
                  { id: 'themes', icon: Palette, label: 'Themes' },
                  { id: 'fonts', icon: Type, label: 'Fonts' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex flex-col items-center gap-1 py-4 text-[10px] uppercase tracking-widest font-black transition-all relative ${
                      activeTab === tab.id ? 'text-gold' : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 inset-x-4 h-0.5 bg-gold"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto p-8 mandala-pattern">
                {activeTab === 'themes' && (
                  <div className="grid grid-cols-2 gap-4">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`p-6 rounded-2xl border text-left transition-all group relative overflow-hidden ${
                          theme === t.id 
                            ? 'border-gold bg-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                            : 'border-white/5 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <t.icon className={`w-8 h-8 mb-4 transition-colors ${theme === t.id ? 'text-gold' : 'text-white/40'}`} />
                        <div className="font-bold text-sm mb-1">{t.name}</div>
                        <div className="text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">{t.description}</div>
                        {theme === t.id && (
                          <div className="absolute top-4 right-4 bg-gold text-black rounded-full p-1">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'fonts' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-serif text-2xl mb-4 italic">Typography Preview</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        The elegance of service is reflected in the clarity of expression. 
                        Every character carries the weight of our shared vision.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                       <div className="flex justify-between items-center">
                          <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Text Scaling</label>
                          <span className="text-xs text-gold">{(config.fontSize * 100).toFixed(0)}%</span>
                       </div>
                       <input 
                         type="range" 
                         min="0.8" 
                         max="1.5" 
                         step="0.05"
                         value={config.fontSize}
                         onChange={(e) => setFontSize(parseFloat(e.target.value))}
                         className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                       />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       <button className="p-4 bg-white/5 border border-gold/40 rounded-xl text-left flex justify-between items-center group">
                          <div>
                            <div className="font-serif text-lg">Marcellus</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">Default Serif</div>
                          </div>
                          <Check className="w-4 h-4 text-gold" />
                       </button>
                       <button className="p-4 bg-white/5 border border-white/10 rounded-xl text-left flex justify-between items-center group opacity-50 cursor-not-allowed">
                          <div>
                            <div className="font-sans text-lg">Inter</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-widest">Modern Sans</div>
                          </div>
                       </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/10 flex gap-4">
                <button 
                  onClick={resetTheme}
                  className="flex-1 py-4 flex items-center justify-center gap-2 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-black hover:bg-white/5 transition-all text-white/60"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button 
                  className="flex-1 py-4 bg-gold text-black rounded-xl text-[10px] uppercase tracking-widest font-black shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                >
                  Save Preset
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
