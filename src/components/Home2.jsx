import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplet, 
  Search, 
  Users, 
  ArrowRight, 
  Activity, 
  Calendar, 
  MapPin, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

// --- Shared Components based on Guideline ---

const PrimaryButton = ({ children, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 ${className}`}
  >
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle, center = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      {title}
    </h2>
    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
      {subtitle}
    </p>
    <div className={`h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-4 ${center ? 'mx-auto' : ''}`} />
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0B0B15]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
            <Droplet className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white">Blood<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Aid</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Donors', 'Funding', 'Blog'].map((item) => (
            <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors font-medium">
              {item}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-white font-medium hover:text-purple-400 transition-colors">Login</button>
          <PrimaryButton className="!px-5 !py-2 !text-sm">Join Now</PrimaryButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#131320] border-b border-white/10 p-4 flex flex-col gap-4">
           {['Home', 'Donors', 'Funding', 'Blog'].map((item) => (
            <a key={item} href="#" className="text-gray-400 hover:text-white py-2 block">
              {item}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <SecondaryButton className="w-full justify-center">Login</SecondaryButton>
          <PrimaryButton className="w-full justify-center">Join Now</PrimaryButton>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Background Gradients */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10" />

    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
          <Activity size={16} /> Saving Lives, One Drop at a Time
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Donate Blood, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Save a Life</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg">
          Join our community of heroes. Connect with donors, find blood banks, and make a difference in your local community today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <PrimaryButton>
            Find Donors <Search size={18} />
          </PrimaryButton>
          <SecondaryButton>
            Register as Donor
          </SecondaryButton>
        </div>
        
        <div className="mt-12 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0B0B15] bg-gray-700 flex items-center justify-center text-xs text-white">
                <Users size={14} />
              </div>
            ))}
          </div>
          <div>
            <p className="text-white font-bold">12k+ Donors</p>
            <p className="text-xs text-gray-500">Registered this month</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <GlassCard className="relative z-10 !p-8 border-white/20 bg-white/5 backdrop-blur-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <h3 className="text-2xl font-bold text-white">Urgent Request</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold border border-red-500/30 animate-pulse">
              LIVE
            </span>
          </div>
          
          <div className="space-y-4">
             {[
               { grp: 'A+', loc: 'Dhaka Medical', time: '10m ago' },
               { grp: 'O-', loc: 'Square Hospital', time: '25m ago' },
               { grp: 'B+', loc: 'Chittagong General', time: '1h ago' }
             ].map((req, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                     {req.grp}
                   </div>
                   <div>
                     <p className="text-white font-medium">{req.loc}</p>
                     <p className="text-xs text-gray-500">{req.time}</p>
                   </div>
                 </div>
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-purple-600 hover:text-white text-gray-400 transition-colors">
                   <ArrowRight size={16} />
                 </button>
               </div>
             ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm mb-3">54 requests active now</p>
            <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/10">
              View All Requests
            </button>
          </div>
        </GlassCard>
        
        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl" />
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-20 bg-[#0B0B15]">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Active Donors', value: '15,000+', color: 'text-purple-400' },
          { icon: Heart, label: 'Lives Saved', value: '8,400+', color: 'text-pink-400' },
          { icon: Droplet, label: 'Blood Bags', value: '12,000+', color: 'text-red-400' },
          { icon: MapPin, label: 'Districts Covered', value: '64', color: 'text-blue-400' },
        ].map((stat, idx) => (
          <GlassCard key={idx} className="text-center group hover:-translate-y-2">
            <div className={`w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeading 
        title="How It Works" 
        subtitle="The process is simple, secure, and life-changing. Be a hero in just 3 steps."
        center={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        {[
          { 
            step: '01', 
            title: 'Register Account', 
            desc: 'Create your profile, set your blood group and location availability.',
            icon: ShieldCheck 
          },
          { 
            step: '02', 
            title: 'Find or Request', 
            desc: 'Browse urgent requests or post your own blood requirements.',
            icon: Search 
          },
          { 
            step: '03', 
            title: 'Save a Life', 
            desc: 'Connect with the patient, donate blood, and be a real-life hero.',
            icon: Heart 
          }
        ].map((item, idx) => (
          <div key={idx} className="relative z-10">
            <div className="bg-[#0B0B15] w-24 h-24 mx-auto rounded-full flex items-center justify-center border-4 border-[#131320] mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <item.icon size={32} />
              </div>
            </div>
            <div className="text-center">
              <span className="text-5xl font-bold text-white/5 absolute top-10 left-1/2 -translate-x-1/2 -z-10 select-none">
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed px-4">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ name, role, text, location }) => (
  <GlassCard className="h-full flex flex-col justify-between">
    <div>
      <div className="flex text-yellow-500 mb-4 text-xs">
        {'★'.repeat(5)}
      </div>
      <p className="text-gray-300 italic mb-6">"{text}"</p>
    </div>
    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600" />
      <div>
        <h4 className="text-white font-bold text-sm">{name}</h4>
        <p className="text-gray-500 text-xs">{role} • {location}</p>
      </div>
    </div>
  </GlassCard>
);

const StoriesSection = () => (
  <section className="py-24 bg-[#0B0B15] relative">
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <SectionHeading 
        title="Voices of Impact" 
        subtitle="Real stories from real heroes and survivors in our community."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TestimonialCard 
          name="Rahim Uddin"
          role="Donor"
          location="Dhaka"
          text="I found it incredibly easy to connect with someone in need. The app's notification system alerts me instantly when my blood group is needed nearby."
        />
        <TestimonialCard 
          name="Sarah Khan"
          role="Recipient"
          location="Chittagong"
          text="When my father needed surgery, we were desperate. BloodAid connected us with a donor within 20 minutes. This platform literally saved his life."
        />
        <TestimonialCard 
          name="Michael Rozario"
          role="Volunteer"
          location="Sylhet"
          text="Managing blood drives has never been easier. The dashboard gives us real-time data on donor availability. A must-have tool for our organization."
        />
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20">
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      <div className="rounded-3xl relative overflow-hidden bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-white/10 p-12 text-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/20 blur-[100px] -z-10" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Every 2 seconds, someone needs blood. Your contribution can save a mother, a child, or a friend. Join us today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton className="justify-center text-lg px-8">
            Register Now
          </PrimaryButton>
          <SecondaryButton className="justify-center text-lg px-8">
            Download App
          </SecondaryButton>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#05050A] border-t border-white/10 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-1.5 rounded-lg">
              <Droplet className="text-white fill-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white">Blood<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Aid</span></span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Connecting donors with patients in real-time. We are committed to making blood donation accessible, safe, and efficient for everyone.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Find Blood</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Register as Donor</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-purple-400 transition-colors">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-gray-500 text-sm mb-4">Stay updated with our latest campaigns.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-purple-500 w-full"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm">© 2025 BloodAid. All rights reserved.</p>
        <div className="flex gap-6">
           {/* Social placeholders */}
           {[1,2,3].map(i => (
             <div key={i} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
           ))}
        </div>
      </div>
    </div>
  </footer>
);

const Home2 = () => {
  return (
    <div className="bg-[#0B0B15] min-h-screen text-gray-400 font-sans selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <StoriesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home2;