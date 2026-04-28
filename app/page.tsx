'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Settings, BookOpen, Truck, MapPin, Activity, Tool, 
  Phone, Mail, CheckCheck, Loader2, ArrowRight, ImageOff,
  Menu, X, Instagram, Tractor, ShieldCheck, Zap
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/40 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

export default function Page() {
  const brand = {
    name: "Profem & Partners Nigeria Limited",
    tagline: "Modernizing Agriculture Through Robust Engineering",
    description: "Leading the charge in Nigeria's agricultural revolution by providing high-performance agro-machinery, irrigation solutions, and technical expertise to farmers nationwide.",
    industry: "Industrial Logistics",
    region: "Nigeria"
  };

  const IMAGES = {
    hero: "https://images.unsplash.com/photo-1690986375486-460dc48dd499?q=80&w=1080",
    products: [
      "https://images.unsplash.com/photo-1690986375486-460dc48dd499?q=80&w=1080",
      "https://images.unsplash.com/photo-1728886583846-befba61ea4b4?q=80&w=1080",
      "https://images.unsplash.com/photo-1695393349419-8974dc8e4c13?q=80&w=1080"
    ],
    about: "https://images.unsplash.com/photo-1655130944281-072e0644db75?q=80&w=1080"
  };

  const features = [
    { title: "On-Site Maintenance", description: "Our mobile technical units ensure your equipment never stays down during harvest.", icon: <Settings className="text-accent" /> },
    { title: "Operator Training", description: "We don't just sell machines; we train your team for maximum efficiency.", icon: <BookOpen className="text-accent" /> },
    { title: "Nationwide Delivery", description: "Logistics support to deliver heavy equipment to any farm in 36 states.", icon: <Truck className="text-accent" /> }
  ];

  const products = [
    { name: "Heavy-Duty Multi-Crop Tractor", description: "Engineered for Nigerian terrain with 75HP and fuel-efficient performance.", price: "₦18,500,000" },
    { name: "Precision Irrigation Kit", description: "Solar-powered automated watering systems for year-round cultivation.", price: "₦3,250,000" },
    { name: "Industrial Combine Harvester", description: "Maximize your yield with rapid processing and minimal grain loss technology.", price: "₦24,000,000" }
  ];

  const stats = [
    { number: "10+", label: "States Covered", icon: <MapPin size={20} /> },
    { number: "150+", label: "Assets Deployed", icon: <Activity size={20} /> },
    { number: "24/7", label: "Field Support", icon: <Tool size={20} /> }
  ];

  const process = [
    { number: "01", title: "Farm Assessment", description: "We analyze your terrain and crop types to recommend the perfect machinery." },
    { number: "02", title: "Supply & Assembly", description: "Direct shipping and professional on-site setup by our engineers." },
    { number: "03", title: "Lifetime Support", description: "Regular maintenance schedules and genuine spare parts availability." }
  ];

  const testimonials = [
    { name: "Alhaji Ibrahim Musa", role: "COO, Northern Plains Farm", text: "The tractors from Profem changed our harvest cycle. Their support team in Kano was on-site within 12 hours when we needed them." },
    { name: "Dr. Chima Okoro", role: "Founder, GreenLeaf Estates", text: "Reliable equipment is rare. Profem provides both the machine and the peace of mind that it will keep working." }
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Form State
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const featureReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-primary text-xl">P</div>
            <span className="font-heading font-black text-xl tracking-tighter uppercase hidden sm:block">Profem</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">Our Reach</a>
            <a href="#products" className="text-sm font-medium hover:text-accent transition-colors">Equipment</a>
            <a href="#contact" className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
              Partner With Us
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary shadow-2xl flex flex-col p-8">
          <button className="self-end mb-12" onClick={() => setMobileMenu(false)}>
            <X size={32} />
          </button>
          <div className="space-y-8">
            <a href="#about" className="block text-3xl font-heading font-black" onClick={() => setMobileMenu(false)}>Our Reach</a>
            <a href="#products" className="block text-3xl font-heading font-black" onClick={() => setMobileMenu(false)}>Equipment</a>
            <a href="#contact" className="block text-3xl font-heading font-black" onClick={() => setMobileMenu(false)}>Partner With Us</a>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-C) */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1.2fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32">
          <div className={`transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} ref={heroReveal.ref}>
            <p className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">
              {brand.industry}
            </p>
            <h1 className="font-heading text-5xl md:text-[5rem] font-black text-white leading-[0.95] tracking-tight">
              Empowering Nigeria&apos;s Industrial Agro-Future
            </h1>
            <p className="text-white/45 mt-8 text-xl max-w-md leading-relaxed">
              Superior machinery and technical partnership for the modern commercial farmer.
            </p>
            <div className="flex gap-4 mt-12 flex-wrap">
              <a href="#products" className="bg-accent text-primary px-10 py-4 font-bold text-lg hover:brightness-110 hover:scale-[1.02] transition-all duration-300 rounded-full">
                View Inventory
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src={IMAGES.hero} alt="Profem Machinery" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        </div>
      </section>

      {/* Divider Style D-STAT */}
      <div className="bg-accent py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-primary/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-4">
              <p className="text-3xl md:text-5xl font-black text-primary tracking-tight">{s.number}</p>
              <p className="text-primary/60 text-[10px] md:text-xs mt-1 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl font-black text-primary mb-8">The Profem Standard</h2>
            <p className="text-primary/70 text-lg leading-relaxed mb-8">
              Profem & Partners Nigeria Limited is more than an equipment supplier. We are a strategic partner in food security, bringing world-class engineering to local soil. With a focus on durability and innovation, we ensure Nigerian agriculture meets global standards.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <ShieldCheck className="text-accent mb-4" size={32} />
                <h4 className="font-bold text-primary">Certified</h4>
                <p className="text-sm text-primary/60">International safety & quality standards.</p>
              </div>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <Zap className="text-accent mb-4" size={32} />
                <h4 className="font-bold text-primary">Efficient</h4>
                <p className="text-sm text-primary/60">Optimized for Nigeria&apos;s toughest terrains.</p>
              </div>
            </div>
          </div>
          <div className={`relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src={IMAGES.about} alt="Technical Expertise" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Features - A9 Sticky Reveal (F-STICKY) */}
      <section id="features" ref={featureReveal.ref} className="py-28 bg-primary px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white mb-16 text-center">Our Support Ecosystem</h2>
          <div className="space-y-4">
            {features.map((f, idx) => (
              <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
                <div className="bg-secondary rounded-3xl p-10 border border-white/10 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500 flex flex-col md:flex-row items-start gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
                    {React.cloneElement(f.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-3xl font-bold text-primary">{f.title}</h3>
                      <span className="text-primary/10 font-mono text-xl font-black">0{idx + 1}</span>
                    </div>
                    <p className="text-primary/60 text-lg leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Editorial Style (P-EDITORIAL) */}
      <section id="products" ref={productReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-6xl font-black text-primary leading-none">Premium Fleet</h2>
            <p className="text-primary/40 mt-4 text-xl">Top-tier equipment engineered for reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <div key={i} className={`group relative h-[450px] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage src={IMAGES.products[i] ?? IMAGES.hero} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <h3 className="text-3xl font-heading font-black text-white">{p.name}</h3>
                  <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-500">
                    <p className="text-white/70 mt-3 text-base leading-relaxed">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-accent font-black text-3xl">{p.price}</span>
                    <a href="#contact" className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-accent transition-all">Order Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white mb-16">Our Procurement Process</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-accent/30 hidden md:block" />
            <div className="space-y-16">
              {process.map((step, i) => (
                <div key={i} className={`flex gap-10 items-start group transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0 relative z-10 font-black text-xl">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/40 text-lg leading-relaxed max-w-2xl">{step.description}</p>
                    {i === 1 && <p className="text-accent/60 font-mono text-xs mt-4 uppercase tracking-widest">Sharp delivery, nationwide.</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Spotlight (T-SPOTLIGHT) */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-black text-white mb-16">Trusted by Commercial Growers</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div key={i} className={`relative py-12 px-10 rounded-[2rem] border border-white/5 bg-primary transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center text-3xl font-black shadow-xl">
                  &ldquo;
                </div>
                <p className="text-white/70 text-2xl font-medium leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent font-black text-xl border border-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-accent/60 text-sm font-mono uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Diagonal Split (C2) */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32 bg-primary">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,40%_100%,0_100%)] hidden md:block" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-2'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white leading-none mb-8">Start Your Industrial Journey</h2>
            <p className="text-white/60 text-xl max-w-sm mb-12">Expert consultation on equipment financing and farm mechanization.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-white/80">
                <Mail className="text-accent" />
                <span>contact@profempartners.ng</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin className="text-accent" />
                <span>Nationwide Service, Nigeria</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg ml-auto">
            {sent ? (
              <div className="bg-primary p-12 rounded-[2.5rem] border border-white/10 text-center animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto border border-accent/40">
                  <CheckCheck size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-4">Request Logged</h3>
                <p className="text-white/50 text-lg">Our engineering consultant will call you shortly to discuss your farm requirements.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-primary p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-5">
                  <h3 className="font-heading text-2xl font-bold text-white mb-6">Equipment Inquiry</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent transition-all"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                  <textarea
                    rows={4}
                    placeholder="Farm Type & Equipment Needed"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-accent resize-none transition-all"
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                  <button type="submit" disabled={loading} className="w-full bg-accent text-primary py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all flex justify-center items-center gap-3">
                    {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-black text-primary text-2xl">P</div>
              <span className="font-heading font-black text-2xl tracking-tighter uppercase">Profem</span>
            </div>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed">
              Nigeria&apos;s leading technical partners in large-scale agricultural transformation. From soil to silo, we provide the power.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#about" className="hover:text-accent transition-colors">The Standard</a></li>
              <li><a href="#products" className="hover:text-accent transition-colors">Equipment Fleet</a></li>
              <li><a href="#features" className="hover:text-accent transition-colors">Support Ecosystem</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Consultation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/profemandpartners" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
            </div>
            <p className="mt-8 text-white/30 text-xs font-mono uppercase tracking-[0.2em]">Regional HQ: Lagos, Nigeria</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Profem & Partners Nigeria Limited. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-xs font-mono uppercase tracking-widest">
            <span>Engineering Excellence</span>
            <span>Food Security</span>
          </div>
        </div>
      </footer>
    </main>
  );
}