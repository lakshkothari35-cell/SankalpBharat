import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Lenis from 'lenis';
import Scene from './components/Canvas/Scene';
import Hero from './components/UI/Hero';
import Causes from './components/UI/Causes';
import Donation from './components/UI/Donation';
import Navbar from './components/UI/Navbar';
import Chatbot from './components/UI/Chatbot';
import Volunteer from './components/UI/Volunteer';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import AdminApp from './admin/AdminApp';

function PublicApp() {
  const { language, t } = useLanguage();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slower, more cinematic scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div 
      className={`relative min-h-screen bg-[#0c0805] text-beige overflow-x-hidden font-sans selection:bg-gold selection:text-maroon ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}
      dir={t.dir}
    >

      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} dpr={[1, 2]}>
          <ScrollControls pages={6} damping={0.1}>
            <Scene />
          </ScrollControls>
        </Canvas>
      </div>

      {/* Atmospheric Background Overlays */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 atmosphere-gradient opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000_150%)]" />
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#0c0805] to-transparent z-20" />
      </div>

      {/* UI Layers */}
      <div className="relative z-10">
        <Navbar />
        
        <main className="space-y-[20vh] md:space-y-[40vh]">
          <Hero />
          
          <div className="backdrop-blur-[2px]">
            <Causes />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-maroon/5 blur-[120px] rounded-full scale-150 -z-10" />
            <Donation />
          </div>
          
          <Volunteer />
          
          {/* About Section - Timeline */}
          <section id="about" className="py-20 md:py-40 px-6 max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
              <div>
                <span className="text-gold font-serif text-[10px] md:text-sm tracking-[0.4em] uppercase">{language === 'HI' ? 'विरासत - हमारी विरासत' : 'Virasat - Our Legacy'}</span>
                <h2 className="text-4xl md:text-8xl font-serif mb-8 md:mb-12 mt-4 md:mt-6">
                  {language === 'HI' ? 'सेवा में' : 'Rooted in'} <br /><span className="text-saffron italic">{language === 'HI' ? 'निहित' : 'Seva'}</span>.
                </h2>
                <p className="text-beige/40 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
                  {language === 'HI' 
                    ? 'एक दशक से अधिक समय से, हम केवल एक संगठन नहीं हैं; हम करुणा का एक आंदोलन हैं, जो वसुधैव कुटुंबकम के भारतीय आदर्श को आगे बढ़ा रहे हैं।'
                    : 'For over a decade, we have been more than an organization; we are a movement of compassion, carrying forward the Indian ideal of Vasudhaiva Kutumbakam.'}
                </p>
              </div>
              
              <div className="space-y-10 md:space-y-16 border-l border-gold/10 pl-6 md:pl-12">
                {[
                  { year: '2015', text: language === 'HI' ? 'एक जमीनी स्तर के सामुदायिक सेवा प्रोजेक्ट के रूप में शुरू हुआ।' : 'Initiated as a grassroots community service project.' },
                  { year: '2018', text: language === 'HI' ? 'ग्रामीण उत्थान के लिए एक अखिल भारतीय फाउंडेशन में विकसित हुआ।' : 'Evolved into a Pan-India foundation for rural upliftment.' },
                  { year: '2021', text: language === 'HI' ? 'गाँवों में 500+ डिजिटल लर्निंगセンター स्थापित किए।' : 'Established 500+ digital learning centers in villages.' },
                  { year: '2024', text: language === 'HI' ? 'अग्रणी सतत सामाजिक मॉडलों के लिए राष्ट्रीय स्तर पर मान्यता प्राप्त।' : 'Nationally recognized for pioneering sustainable social models.' },
                ].map((item, i) => (
                   <div key={i} className="relative group">
                     <div className="absolute -left-[35px] md:-left-[58px] top-2 w-4 md:w-5 h-4 md:h-5 rounded-full border border-gold/30 bg-maroon shadow-[0_0_15px_rgba(128,0,0,0.5)] flex items-center justify-center">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-gold rounded-full" />
                     </div>
                     <span className="text-saffron font-mono text-[10px] md:text-sm mb-2 block font-black uppercase tracking-widest">{item.year}</span>
                     <p className="text-base md:text-xl text-beige/60 group-hover:text-beige transition-colors duration-500 font-serif italic leading-relaxed">
                       {item.text}
                     </p>
                   </div>
                 ))}
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-20 md:py-32 mandala-pattern border-y border-gold/5 bg-maroon/[0.02]">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {[
                { label: language === 'HI' ? 'प्रभावित आत्माएं' : 'Souls Impacted', value: '1.4M+' },
                { label: language === 'HI' ? 'प्राचीन गाँव' : 'Ancient Villages', value: '1200+' },
                { label: language === 'HI' ? 'सेवा स्वयंसेवक' : 'Seva Volunteers', value: '25K+' },
                { label: language === 'HI' ? 'पावन राज्य' : 'Sacred States', value: '22' },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-3xl md:text-6xl font-serif text-gold group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-beige/30 mt-3 md:mt-4 leading-loose">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="py-20 md:py-32 px-6 border-t border-gold/5 text-center relative overflow-hidden backdrop-blur-xl">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          
          <div className="text-2xl md:text-3xl font-serif text-beige tracking-widest uppercase mb-4">Sankalp <span className="text-gold">Bharat</span></div>
          <div className="text-[10px] tracking-[0.4em] text-saffron font-black uppercase mb-12">Seva Parmo Dharma</div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 md:mb-16 text-beige/30 text-[10px] tracking-[0.3em] uppercase font-black">
             <Link to="/admin" className="hover:text-gold transition-colors font-light">Admin</Link>
             <a href="#" className="hover:text-saffron transition-colors">Yatras</a>
             <a href="#" className="hover:text-saffron transition-colors">Lekh</a>
             <a href="#" className="hover:text-saffron transition-colors">Varta</a>
          </div>
          <p className="text-beige/10 text-[9px] uppercase tracking-[0.5em] font-medium leading-loose max-w-sm mx-auto">
            Handcrafted with devotion for a better tomorrow. <br /> © 2026 Sankalp Bharat Foundation.
          </p>
        </footer>
      </div>

      <Chatbot />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/" element={<PublicApp />} />
      <Route path="*" element={<PublicApp />} />
    </Routes>
  );
}
