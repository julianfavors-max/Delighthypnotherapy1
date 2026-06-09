import { motion } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Star, Brain, Sparkles, Moon, Activity, Shield, Heart, Trophy, Sun, ArrowLeft, Calendar, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'pricing' | 'testimonials' | 'contact'>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'selection' | 'calendar' | 'disclosure'>('selection');
  const [selectedSessionUrl, setSelectedSessionUrl] = useState('');
  const [disclosureLoadCount, setDisclosureLoadCount] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  const submitContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
      setFormStatus('error');
      setFormErrorMessage('API key is missing! Please configure the VITE_WEB3FORMS_ACCESS_KEY variable in your settings/secrets.');
      return;
    }
    setFormStatus('submitting');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          ...contactForm,
        })
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus('success');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
        setFormErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setFormErrorMessage('Network error occurred. Please try again.');
    }
  };

  const servicesList = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Anxiety & Stress Release',
      desc: 'Reprogram your mind to respond calmly to triggers and release daily stress naturally.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trauma Recovery Hypnosis',
      desc: 'Safely process and heal from past trauma in a gentle, supportive, and secure environment.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Hypnosis for Children',
      desc: 'Empower your child to overcome anxiety, behavioral issues, and fears through engaging techniques.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Grief Therapy',
      desc: 'Navigate the complex emotions of loss and discover a comforting path forward toward healing.'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Smoking/Vaping Cessation',
      desc: 'Break the addiction cycle completely and become smoke and vape-free without persistent cravings.'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Sports Hypnotherapy',
      desc: 'Enhance your athletic performance, increase focus, and overcome mental blocks to achieve your peak potential.'
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: 'Hypnotherapy for Life Enhancement',
      desc: 'Boost confidence, improve focus, and cultivate a positive mindset to achieve your personal and professional goals.'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'NLP (Neuro Linguistics Programming)',
      desc: 'Reprogram your thought patterns, overcome limiting beliefs, and align your mindset for personal growth and success.'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Weight Management',
      desc: 'Develop a healthy relationship with food, overcome emotional eating, and achieve your weight goals naturally.'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: 'home' | 'about' | 'services' | 'pricing' | 'testimonials' | 'contact') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const Logo = ({ isFooter = false }: { isFooter?: boolean }) => {
    if (isFooter) {
      return (
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer group" onClick={() => navigateTo('home')}>
          <div className="transition-all duration-300 w-48 sm:w-56 bg-white p-4 rounded-2xl shadow-sm mx-auto sm:mx-0">
            <img 
              src="/back ground pic/logo.jpg" 
              alt="Delight Hypnotherapy Logo" 
              className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4 sm:gap-6 cursor-pointer group" onClick={() => navigateTo('home')}>
        <div className="transition-all duration-300 flex-shrink-0 flex items-center justify-center overflow-hidden w-[95px] sm:w-[119px]">
          <img 
            src="/back ground pic/logo 2-1.png" 
            alt="Delight Hypnotherapy Logo" 
            className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="font-serif text-ocean-1 leading-tight flex flex-col justify-center text-[1.5rem] sm:text-[1.8rem]">
          <span className="font-bold tracking-wide">Delight</span>
          <span className="font-medium tracking-wider text-ocean-1/80 text-[0.75em]">Hypnotherapy</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-ocean-6 selection:bg-ocean-3/40">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-ocean-6/95 backdrop-blur-md shadow-sm py-2' : 'bg-ocean-6/90 backdrop-blur-md py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[3rem]">
            {/* Logo */}
            <Logo />
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
              <button onClick={() => navigateTo('home')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'home' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>Home</button>
              <button onClick={() => navigateTo('about')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'about' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>About</button>
              <button onClick={() => navigateTo('services')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'services' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>Services</button>
              <button onClick={() => navigateTo('testimonials')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'testimonials' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>Testimonials</button>
              <button onClick={() => navigateTo('contact')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'contact' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>Contact</button>
              <button onClick={() => navigateTo('pricing')} className={`text-sm font-medium hover:text-ocean-3 transition-colors ${currentPage === 'pricing' ? 'text-ocean-1 font-bold' : 'text-ocean-1/70'}`}>Pricing</button>
              <button onClick={() => setIsBookingModalOpen(true)} className="bg-ocean-4 text-ocean-6 px-4 py-2 lg:px-5 rounded-full text-sm font-medium hover:bg-ocean-4/80 transition-colors">
                Book Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6 text-ocean-1" /> : <Menu className="w-6 h-6 text-ocean-1" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-ocean-6 pt-32 px-6 md:hidden overflow-y-auto"
        >
          <div className="flex flex-col gap-6 text-lg pb-10">
            <button onClick={() => navigateTo('home')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'home' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>Home</button>
            <button onClick={() => navigateTo('about')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'about' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>About</button>
            <button onClick={() => navigateTo('services')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'services' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>Services</button>
            <button onClick={() => navigateTo('testimonials')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'testimonials' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>Testimonials</button>
            <button onClick={() => navigateTo('contact')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'contact' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>Contact</button>
            <button onClick={() => navigateTo('pricing')} className={`text-left hover:text-ocean-3 font-medium ${currentPage === 'pricing' ? 'text-ocean-1 font-bold' : 'text-ocean-1/80'}`}>Pricing</button>
            <button onClick={() => { setIsBookingModalOpen(true); setMobileMenuOpen(false); }} className="bg-ocean-4 text-ocean-6 px-6 py-3 rounded-full font-medium mt-4 hover:bg-ocean-4/80 transition-colors w-full text-center">
              Book Consultation
            </button>
          </div>
        </motion.div>
      )}

      {currentPage === 'home' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-ocean-1/50 via-ocean-1/60 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ocean-3/20 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ocean-4/10 rounded-full blur-[80px] pointer-events-none"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block py-1.5 px-4 rounded-full bg-ocean-2/20 text-ocean-6 text-[18.7px] font-semibold tracking-wider uppercase mb-8">
                    Transform Your Life
                  </span>
                  <h1 className="text-4xl md:text-6xl font-serif text-ocean-6 mb-6 leading-tight">
                    Unlock the Power of Your Subconscious Mind
                  </h1>
                  <p className="text-lg md:text-xl text-ocean-6 mb-10 leading-relaxed">
                    Experience profound positive change through clinical hypnotherapy. Overcome anxiety, break bad habits, and discover your true potential in a safe, nurturing environment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={() => navigateTo('services')} className="w-full sm:w-auto bg-ocean-4 text-ocean-6 px-8 py-4 rounded-full text-base font-medium hover:bg-ocean-4/80 transition-colors flex items-center justify-center gap-2">
                      Start Your Journey <ChevronRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => navigateTo('about')} className="w-full sm:w-auto bg-transparent backdrop-blur-sm text-ocean-6 border border-ocean-4/50 px-8 py-4 rounded-full text-base font-medium hover:bg-ocean-2/20 transition-colors">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats/Trust Section */}
          <section className="py-12 bg-ocean-2/20 border-y border-ocean-2/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12 text-center items-center">
                {[
                  { label: 'Years Experience', value: '3+' },
                  { label: 'Clients Helped', value: '200+' },
                  { label: 'Success Rate', value: '98%' },
                  { label: '5-Star Reviews', value: '175+' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-ocean-3/10 transition-colors"
                  >
                    <span className="text-3xl md:text-4xl font-serif text-ocean-6">{stat.value}</span>
                    <span className="text-sm text-ocean-6 font-medium uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 bg-transparent backdrop-blur-sm text-ocean-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif text-ocean-6 mb-4">Areas of Expertise</h2>
                <p className="text-ocean-6/80">Tailored hypnotherapy sessions designed to address your specific needs and goals.</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {servicesList.map((service, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-ocean-2/40 p-8 rounded-2xl shadow-sm border border-ocean-2/30 hover:bg-ocean-2/20 backdrop-blur-md hover:border-ocean-3/30 hover:shadow-lg hover:shadow-ocean-3/10 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    onClick={() => navigateTo('services')}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ocean-3/10 rounded-full blur-3xl group-hover:bg-ocean-3/20 transition-colors pointer-events-none"></div>
                    <div className="w-12 h-12 bg-ocean-3 rounded-xl flex items-center justify-center text-ocean-6 mb-6 group-hover:bg-ocean-4 group-hover:text-ocean-6 transition-colors relative z-10 shadow-lg shadow-ocean-3/20 group-hover:shadow-ocean-4/30">
                      {service.icon}
                     </div>
                    <h3 className="text-xl font-medium text-ocean-6 mb-3 relative z-10">{service.title}</h3>
                    <p className="text-ocean-6/80 leading-relaxed relative z-10">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Summary Section */}
          <section id="about-summary" className="py-24 bg-ocean-2/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden border-4 border-ocean-2/60">
                    <img 
                      src="/back ground pic/updated doc picture.png" 
                      alt="Therapist" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-ocean-2/30 backdrop-blur-md text-ocean-6 p-8 rounded-2xl hidden md:block shadow-xl border border-ocean-2/60">
                    <p className="text-2xl font-serif mb-1">"Healing begins</p>
                    <p className="text-2xl font-serif">from within."</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-ocean-6 mb-6">Meet Your Therapist</h2>
                  <p className="text-lg text-ocean-6/90 mb-6 leading-relaxed">
                    Hi, I'm Santosh Pawar CHt, the founder of Delight Hypnotherapy. With over a decade of experience in clinical hypnotherapy, I've dedicated my life to helping people break free from their limitations.
                  </p>
                  <p className="text-ocean-6/80 mb-8 leading-relaxed">
                    My approach is compassionate, evidence-based, and tailored entirely to you. I believe that everyone has the internal resources they need to heal and thrive; sometimes, we just need a little help accessing them.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      'Member of American Hypnosis Association',
                      'Certified Hypnotherapist',
                      'Certified Neuro Linguistic Programmer (NLP)',
                      'Compassionate and judgment-free environment'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-ocean-6">
                        <div className="mt-1 bg-transparent backdrop-blur-sm rounded-full p-1">
                          <ChevronRight className="w-3 h-3 text-ocean-6" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-24 bg-ocean-5/20 text-ocean-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Client Success Stories</h2>
                <p className="text-ocean-6/80">Real results from people who decided to make a change.</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    text: "I struggled with severe anxiety for years. After just three sessions, I felt a profound shift. I now have the tools to manage my stress and feel like myself again.",
                    author: "Sarah M.",
                    issue: "Anxiety"
                  },
                  {
                    text: "I was skeptical about hypnotherapy for weight loss, but it completely changed my relationship with food. I've lost 30 pounds and kept it off without feeling deprived.",
                    author: "David L.",
                    issue: "Weight Management"
                  },
                  {
                    text: "A 20-year smoking habit gone in two sessions. It felt almost too easy. I haven't had a craving since and I feel healthier than ever.",
                    author: "Michael T.",
                    issue: "Smoking Cessation"
                  }
                ].map((testimonial, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-ocean-5/40 p-8 rounded-2xl border border-ocean-5/40"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current text-ocean-6" />
                      ))}
                    </div>
                    <p className="text-ocean-6 mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div>
                      <p className="font-medium text-ocean-6">{testimonial.author}</p>
                      <p className="text-sm text-ocean-6/70">{testimonial.issue}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.main>
      )}

      {currentPage === 'about' && (
        <main className="pt-40 pb-24 bg-transparent backdrop-blur-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-md relative">
                  <img src="/back ground pic/Nature Therapy.png" alt="Nature Therapy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-ocean-4/10"></div>
                </div>
                <span className="inline-block py-1 px-3 rounded-full bg-ocean-2/20 text-ocean-6 text-xs font-semibold tracking-wider uppercase mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-ocean-6 mb-6">About Delight Hypnotherapy</h1>
                <p className="text-xl text-ocean-6/80 font-medium">Empowering you to live your most authentic, joyful life.</p>
              </motion.div>

              <div className="prose prose-lg prose-invert max-w-none text-ocean-6/90">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-ocean-5/20 p-8 md:p-12 rounded-3xl mb-16 border border-ocean-5/30"
                >
                  <h2 className="text-2xl font-serif text-ocean-6 mb-4">Welcome to Delight Hypnotherapy</h2>
                  <p className="mb-6 leading-relaxed">
                    At Delight Hypnotherapy, we believe that true transformation happens when we align our conscious desires with our subconscious programming. Founded on the principle that every individual possesses the innate capacity to heal, we provide a safe, nurturing, and judgment-free space for deep emotional work.
                  </p>
                  <p className="leading-relaxed">
                    Our practice specializes in clinical hypnotherapy and neuro-linguistic programming to help you break through mental barriers. Whether you are dealing with past trauma, navigating the heavy waters of grief, or looking to overcome daily anxiety, we are here to support your journey.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-ocean-3/20 p-8 rounded-3xl border border-ocean-3/30"
                  >
                    <div className="w-12 h-12 bg-transparent backdrop-blur-sm rounded-xl flex items-center justify-center text-ocean-6 mb-6 shadow-sm">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif text-ocean-6 mb-3">Our Mission</h3>
                    <p className="leading-relaxed text-ocean-6/80">
                      To empower individuals—from children to adults—to overcome their subconscious limitations. We strive to provide effective, compassionate hypnotherapy that facilitates rapid healing, fosters resilience, and helps our clients overcome challenges and achieve lasting peace of mind.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-ocean-5/20 p-8 rounded-3xl border border-ocean-5/40"
                  >
                    <div className="w-12 h-12 bg-transparent backdrop-blur-sm rounded-xl flex items-center justify-center text-ocean-6 mb-6 shadow-sm">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif text-ocean-6 mb-3">Our Core Values</h3>
                    <ul className="space-y-3 text-ocean-6/80">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-ocean-6 shrink-0 mt-0.5" />
                        <span><strong>Compassion:</strong> Meeting you where you are with profound empathy.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-ocean-6 shrink-0 mt-0.5" />
                        <span><strong>Integrity:</strong> Using evidence-based and ethical hypnotherapy practices.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-ocean-6 shrink-0 mt-0.5" />
                        <span><strong>Empowerment:</strong> Teaching you the tools to take back control of your life.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center mt-12 bg-ocean-2/40 p-10 rounded-3xl"
                >
                  <h3 className="text-2xl font-serif text-ocean-6 mb-4">Start Your Healing Journey Today</h3>
                  <p className="text-ocean-6/80 mb-8 max-w-2xl mx-auto">
                    You don't have to carry the weight alone. Reach out to learn more about how hypnotherapy can help you release what no longer serves you.
                  </p>
                  <button onClick={() => navigateTo('contact')} className="bg-ocean-4 text-ocean-6 px-8 py-4 rounded-full text-base font-medium hover:bg-ocean-4/80 transition-colors">
                    Get in Touch
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      )}

      {currentPage === 'services' && (
        <main className="pt-40 pb-24 bg-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-md relative group"
              >
                <img src="/back ground pic/clear mind.jpg" alt="Clear mind lake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-ocean-4/10"></div>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block py-1 px-3 rounded-full bg-ocean-4/50 text-ocean-6 text-xs font-semibold tracking-wider uppercase mb-6"
              >
                Our Services
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl md:text-6xl font-serif text-ocean-6 mb-6"
              >
                Areas of Expertise
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-xl text-ocean-6/80 font-medium max-w-2xl mx-auto"
              >
                Comprehensive, tailored hypnotherapy sessions designed to address your specific needs and guide you toward lasting positive change.
              </motion.p>
            </motion.div>

            <div className="space-y-12 max-w-5xl mx-auto">
              {servicesList.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="bg-ocean-3/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 border border-ocean-3/30 transition-colors shadow-sm cursor-default"
                >
                  <div className="w-20 h-20 bg-transparent backdrop-blur-sm rounded-2xl flex items-center justify-center text-ocean-6 shrink-0 shadow-sm border border-ocean-2/20">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-ocean-6 mb-4">{service.title}</h3>
                    <p className="text-lg text-ocean-6/80 leading-relaxed">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center bg-ocean-5/20 p-12 rounded-3xl border border-ocean-5/40 max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-serif text-ocean-6 mb-4">Not Sure Where to Start?</h3>
              <p className="text-ocean-6/80 mb-8 max-w-xl mx-auto text-lg">
                Every journey is unique. Schedule a free consultation to discuss your goals and discover how we can tailor our hypnotherapy approach to your specific needs.
              </p>
              <button onClick={() => navigateTo('contact')} className="bg-ocean-3/60 text-ocean-6 px-8 py-4 rounded-full text-base font-medium hover:bg-ocean-3/48 transition-colors shadow-sm">
                Discuss Your Goals
              </button>
            </motion.div>
          </div>
        </main>
      )}

      {currentPage === 'pricing' && (
        <main className="pt-40 pb-24 bg-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-serif text-ocean-6 mb-6 text-center">Our Services & Pricing</h1>
              <p className="text-lg text-ocean-6/80 text-center mb-12">
                At Delight Therapy, we provide personalized hypnotherapy sessions designed to help you overcome mental barriers, reduce stress, and create lasting positive change. Each session is tailored to your unique needs in a calm, supportive environment.
              </p>

              <div className="space-y-8 mb-16">
                {[
                  {
                    title: "Exploratory Session (Free)",
                    duration: "30 Minutes – Complimentary",
                    desc: "Begin your journey with a free consultation. This session allows us to understand your goals, answer your questions, and determine how hypnotherapy can best support you."
                  },
                  {
                    title: "First Hypnotherapy Session",
                    duration: "90 Minutes – $175 + taxes & processing fees",
                    desc: "Your first full session is an in-depth experience focused on identifying root causes, setting clear intentions, and beginning the therapeutic process through guided hypnosis."
                  },
                  {
                    title: "Follow-Up Sessions",
                    duration: "45 Minutes – $150 per session + taxes & processing fees",
                    desc: "Ongoing sessions are designed to reinforce progress, deepen transformation, and help you stay aligned with your goals."
                  },
                  {
                    title: "Package Option",
                    duration: "6 Sessions – $750 + taxes & processing fees",
                    desc: "Commit to your growth with a discounted package designed to provide consistency and long-term results."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-ocean-2/30 border border-ocean-3/40"
                  >
                    <h3 className="text-xl font-serif text-ocean-6 mb-2">{item.title}</h3>
                    <p className="font-medium text-ocean-6/90 mb-4">{item.duration}</p>
                    <p className="text-ocean-6/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-ocean-5/10 p-8 rounded-3xl border border-ocean-5/20"
              >
                <div className="mb-10">
                  <h2 className="text-2xl font-serif text-ocean-6 mb-4">Payment Policy</h2>
                  <p className="text-ocean-6/80">Payments are due <strong>24 hours prior</strong> to your scheduled session.</p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-serif text-ocean-6 mb-4">Cancellation Policy</h2>
                  <ul className="space-y-6 text-ocean-6/80">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-ocean-4 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ocean-6 mb-1">24+ Hours Notice:</strong>
                        No charge for cancellation or rescheduling (first occurrence). For a second occurrence, rescheduling is allowed, but cancellations may not be refunded.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-ocean-4 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ocean-6 mb-1">24 to 6 Hours Before Session:</strong>
                        50% of the session fee will be charged.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-ocean-4 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ocean-6 mb-1">Within 6 Hours of Session:</strong>
                        100% of the session fee will be charged.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-ocean-4 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-ocean-6 mb-1">No-Show:</strong>
                        Clients who miss their appointment without notice will be charged 100% of the session fee.
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-ocean-3/20 flex flex-col items-center text-center">
                    <p className="text-ocean-6/70 italic mb-6">
                      We are committed to providing a respectful and supportive experience for all clients. Thank you for honoring our time and policies.
                    </p>
                    <button onClick={() => setIsBookingModalOpen(true)} className="bg-ocean-4 text-ocean-6 px-8 py-4 rounded-full text-base font-medium hover:bg-ocean-4/80 transition-colors shadow-m">
                      Book a Session
                    </button>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </main>
      )}

      {currentPage === 'testimonials' && (
        <main className="pt-40 pb-24 bg-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-md relative group"
              >
                <img src="/back ground pic/sitting on a rock.jpg" alt="Person sitting peacefully on a rock" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-ocean-4/10"></div>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block py-1 px-3 rounded-full bg-ocean-4/50 text-ocean-6 text-xs font-semibold tracking-wider uppercase mb-6"
              >
                Success Stories
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl md:text-6xl font-serif text-ocean-6 mb-6"
              >
                Client Testimonials
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-xl text-ocean-6/80 font-medium max-w-2xl mx-auto"
              >
                Real results from people who decided to make a positive change in their lives.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  text: "I struggled with severe anxiety for years. After just three sessions, I felt a profound shift. I now have the tools to manage my stress and feel like myself again.",
                  author: "Sarah M.",
                  issue: "Anxiety"
                },
                {
                  text: "I was skeptical about hypnotherapy for weight loss, but it completely changed my relationship with food. I've lost 30 pounds and kept it off without feeling deprived.",
                  author: "David L.",
                  issue: "Weight Management"
                },
                {
                  text: "A 20-year smoking habit gone in two sessions. It felt almost too easy. I haven't had a craving since and I feel healthier than ever.",
                  author: "Michael T.",
                  issue: "Smoking Cessation"
                },
                {
                  text: "I finally sleep through the night. The insomnia that plagued me for a decade was resolved through understanding my subconscious blockages.",
                  author: "Elena R.",
                  issue: "Insomnia"
                },
                {
                  text: "My confidence has soared. I used to be terrified of public speaking, and now I lead meetings at my company with genuine ease.",
                  author: "James W.",
                  issue: "Self-Confidence"
                },
                {
                  text: "The phobia of flying was limiting my life and my family's vacations. After therapy, I just booked a flight to Europe and I'm actually excited.",
                  author: "Patricia K.",
                  issue: "Phobias"
                }
              ].map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-ocean-3/10 p-8 rounded-3xl border border-ocean-3/30 transition-all shadow-sm"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current text-ocean-5" />
                    ))}
                  </div>
                  <p className="text-ocean-6/90 mb-6 leading-relaxed italic border-l-2 border-ocean-4 pl-4 text-sm md:text-base">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-auto">
                    <p className="font-medium text-ocean-6">{testimonial.author}</p>
                    <p className="text-sm text-ocean-6/70 font-medium">{testimonial.issue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <button onClick={() => setIsBookingModalOpen(true)} className="bg-ocean-4 text-ocean-6 px-8 py-3 rounded-full text-lg font-medium hover:bg-ocean-4/80 transition-colors shadow-md border border-ocean-4 border-opacity-10">
                Start Your Own Journey
              </button>
            </motion.div>
          </div>
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="pt-40 pb-24 bg-transparent backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-md relative group"
              >
                <img src="/back ground pic/OIP.webp" alt="Lush waterfall scenery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-ocean-4/10"></div>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block py-1 px-3 rounded-full bg-ocean-4/50 text-ocean-6 text-xs font-semibold tracking-wider uppercase mb-6"
              >
                Get in Touch
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl md:text-6xl font-serif text-ocean-6 mb-6"
              >
                Contact Delight Hypnotherapy
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-xl text-ocean-6/80 font-medium max-w-2xl mx-auto"
              >
                Ready to take the first step? We'd love to hear from you. Reach out to schedule your free consultation or ask any questions.
              </motion.p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="bg-ocean-5/20 p-6 sm:p-10 rounded-3xl border border-ocean-5/40"
              >
                <h3 className="text-2xl font-serif text-ocean-6 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-transparent backdrop-blur-sm rounded-xl flex items-center justify-center text-ocean-6 shrink-0 shadow-sm border border-ocean-2/20">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-ocean-6 mb-1">Phone</p>
                      <p className="text-ocean-6/80 text-sm md:text-base">930-220-6308</p>
                      <p className="text-xs sm:text-sm text-ocean-6/60 mt-1">Available Mon-Fri, 5:30pm - 9:00pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-transparent backdrop-blur-sm rounded-xl flex items-center justify-center text-ocean-6 shrink-0 shadow-sm border border-ocean-2/20">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ocean-6 mb-1">Email</p>
                      <a href="mailto:consult@delighthypnotherapy.com" className="text-ocean-6/80 text-xs sm:text-sm md:text-base break-words hover:text-ocean-6 hover:underline transition-colors block">
                        consult@delighthypnotherapy.com
                      </a>
                      <p className="text-xs sm:text-sm text-ocean-6/60 mt-1">We usually respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-transparent backdrop-blur-sm rounded-xl flex items-center justify-center text-ocean-6 shrink-0 shadow-sm border border-ocean-2/20">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 flex flex-col justify-center h-12">
                      <p className="font-medium text-ocean-6 mb-1">Social Media</p>
                      <div className="flex gap-4">
                        <a href="https://www.instagram.com/delighthypnotherapy?igsh=MTI2OWR1NXp1YWRvaw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="text-ocean-6/80 hover:text-ocean-6 transition-colors">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.tiktok.com/@delighthypnotherapy?_r=1&_t=ZT-96IRiyR0C90" target="_blank" rel="noreferrer" className="text-ocean-6/80 hover:text-ocean-6 transition-colors">
                          <TikTokIcon className="w-5 h-5" />
                        </a>
                        <a href="https://www.facebook.com/share/18n5xPuG6v/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="text-ocean-6/80 hover:text-ocean-6 transition-colors">
                          <Facebook className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-ocean-4/20 rounded-2xl border border-ocean-4/50">
                  <h4 className="font-medium text-ocean-6 mb-2">Free Discovery Call</h4>
                  <p className="text-ocean-6/80 text-sm mb-4">Unsure if hypnotherapy is right for you? Let's chat for 30 minutes, completely free.</p>
                  <button onClick={() => setIsBookingModalOpen(true)} className="bg-transparent backdrop-blur-sm text-ocean-6 px-6 py-2 rounded-full text-sm font-medium hover:bg-ocean-2/20 transition-colors border border-ocean-2/30 w-full">
                    Schedule Now
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-serif text-ocean-6 mb-6">Send us a Message</h3>
                  <form onSubmit={submitContactForm} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ocean-6 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-white/50 border border-ocean-3/30 rounded-xl px-4 py-3 text-ocean-6 placeholder:text-ocean-6/40 focus:outline-none focus:ring-2 focus:ring-ocean-4 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-ocean-6 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-white/50 border border-ocean-3/30 rounded-xl px-4 py-3 text-ocean-6 placeholder:text-ocean-6/40 focus:outline-none focus:ring-2 focus:ring-ocean-4 focus:border-transparent transition-all"
                          placeholder="Your email address"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-ocean-6 mb-1">Phone (Optional)</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-white/50 border border-ocean-3/30 rounded-xl px-4 py-3 text-ocean-6 placeholder:text-ocean-6/40 focus:outline-none focus:ring-2 focus:ring-ocean-4 focus:border-transparent transition-all"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-ocean-6 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        required 
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-white/50 border border-ocean-3/30 rounded-xl px-4 py-3 text-ocean-6 placeholder:text-ocean-6/40 focus:outline-none focus:ring-2 focus:ring-ocean-4 focus:border-transparent transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-700/90 rounded-xl text-sm">
                        {formErrorMessage}
                      </div>
                    )}
                    {formStatus === 'success' && (
                      <div className="p-4 bg-ocean-4/20 border border-ocean-4/40 text-ocean-6 rounded-xl text-sm font-medium">
                        Thank you for your message! We will get back to you shortly.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-ocean-4 text-ocean-6 px-6 py-4 rounded-xl font-medium hover:bg-ocean-4/80 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-xs text-ocean-6/50 text-center mt-4">
                      Powered by Web3Forms. Configure VITE_WEB3FORMS_ACCESS_KEY to enable.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-ocean-2/40 backdrop-blur-md text-ocean-6 relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-ocean-3/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-ocean-4/10 rounded-full blur-[100px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-ocean-6 mb-6">Ready to Transform Your Life?</h2>
          <p className="text-lg text-ocean-6/90 mb-10">Take the first step towards a happier, healthier you. Book a free 30-minute discovery call to see if hypnotherapy is right for you.</p>
          <button onClick={() => setIsBookingModalOpen(true)} className="bg-ocean-4 text-ocean-6 px-10 py-5 rounded-full text-lg font-medium hover:bg-ocean-4/80 transition-colors shadow-lg shadow-ocean-4/30">
            Book Your Free Consultation
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent backdrop-blur-sm pt-20 pb-10 border-t border-ocean-2/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Logo isFooter={true} />
              </div>
              <p className="text-ocean-6/70 mb-6 max-w-sm">
                Professional clinical hypnotherapy services helping you overcome obstacles and achieve your full potential.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-ocean-6 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigateTo('home')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">Home</button></li>
                <li><button onClick={() => navigateTo('about')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">About Story</button></li>
                <li><button onClick={() => navigateTo('services')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">Services</button></li>
                <li><button onClick={() => navigateTo('testimonials')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">Testimonials</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">Contact</button></li>
                <li><button onClick={() => navigateTo('pricing')} className="text-ocean-6/70 hover:text-ocean-6 transition-colors">Pricing</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-ocean-6 mb-4">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-ocean-6/70">
                  <Phone className="w-5 h-5 text-ocean-6 shrink-0" />
                  <span>930-220-6308</span>
                </li>
                <li className="flex items-start gap-3 text-ocean-6/70">
                  <Mail className="w-5 h-5 text-ocean-6 shrink-0 mt-0.5" />
                  <a href="mailto:consult@delighthypnotherapy.com" className="break-words text-sm sm:text-base hover:text-ocean-6 hover:underline transition-colors block">
                    consult@delighthypnotherapy.com
                  </a>
                </li>
              </ul>
              
              <div className="mt-6 flex gap-4">
                <a href="https://www.instagram.com/delighthypnotherapy?igsh=MTI2OWR1NXp1YWRvaw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ocean-3/20 flex items-center justify-center text-ocean-6/80 hover:bg-ocean-3/40 hover:text-ocean-6 transition-colors border border-ocean-3/20">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@delighthypnotherapy?_r=1&_t=ZT-96IRiyR0C90" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ocean-3/20 flex items-center justify-center text-ocean-6/80 hover:bg-ocean-3/40 hover:text-ocean-6 transition-colors border border-ocean-3/20">
                  <TikTokIcon className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/18n5xPuG6v/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ocean-3/20 flex items-center justify-center text-ocean-6/80 hover:bg-ocean-3/40 hover:text-ocean-6 transition-colors border border-ocean-3/20">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-ocean-2/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-ocean-6/60">© {new Date().getFullYear()} Delight Hypnotherapy. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-ocean-6/60">
              <a href="#" className="hover:text-ocean-6 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-ocean-6 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ocean-6/50 backdrop-blur-sm shadow-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`w-full max-w-4xl bg-transparent backdrop-blur-sm border border-ocean-3/20 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-[90vh] md:h-[85vh] max-h-[800px]`}
          >
            <button 
              onClick={() => {
                setIsBookingModalOpen(false);
                setTimeout(() => {
                  setBookingStep('selection');
                  setDisclosureLoadCount(0);
                }, 300);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ocean-1 hover:text-ocean-6 hover:bg-ocean-2 transition-colors border border-ocean-2 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            {bookingStep === 'selection' ? (
              <div className="w-full p-8 md:p-12 overflow-y-auto bg-white">
                <h2 className="text-3xl md:text-4xl font-serif text-black mb-4 text-center mt-2">Select Session Type</h2>
                <p className="text-black/80 text-center mb-10 max-w-2xl mx-auto">
                  Choose the session that best fits your current needs.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      id: 'exploratory',
                      title: 'Exploratory Session',
                      duration: '30 Minutes',
                      price: 'Free',
                      desc: 'A complimentary consultation to discuss your goals and see if hypnotherapy is right for you.',
                      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ11TmqC67FNtiGhKCwLH2AadUnJgdCl5wYi4cGYl_iU5WtcpUpGD4bxzr_Y5yA5DOPB9AGY-dVk?gv=true'
                    },
                    {
                      id: 'intro',
                      title: 'Introduction Session',
                      duration: '90 Minutes',
                      price: '$175',
                      desc: 'Your first full in-depth experience focused on identifying root causes and setting intentions.',
                      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3XMyLxsIT76bvFMmCfy8SsBP6T8Zu-9_v4kRK0NByJOXgIN-QMgopP_t8ai213sPikg45DpZCg?gv=true'
                    },
                    {
                      id: 'hypnotherapy',
                      title: 'Hypnotherapy Session',
                      duration: '45 Minutes',
                      price: '$150',
                      desc: 'Follow-up sessions to reinforce progress, deepen transformation, and maintain alignment.',
                      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0-jlvWb7SL79bhBvqNjNgJbV_2cs6Id_sYJ02hA2uI0XXxbD9q0WB2BYYio4JbrkrNmkSyKhqr?gv=true'
                    },
                    {
                      id: 'package',
                      title: 'Package Option',
                      duration: '6 Sessions',
                      price: '$750 + taxes processing fee',
                      desc: 'A comprehensive package of 6 sessions tailored to help you achieve lasting transformation.',
                      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2_3Ulkx2c1x2cI6q3eaXkRM2RoBHazsMoxZFyUgZVZ47B7tbNb15h40X3bC_qid5BH-Ce-LQRD?gv=true'
                    }
                  ].map((session, idx) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => {
                        setSelectedSessionUrl(session.url);
                        setBookingStep('disclosure');
                        setDisclosureLoadCount(0);
                      }}
                      className="bg-ocean-1/50 backdrop-blur-md border border-ocean-2 hover:border-ocean-4 rounded-2xl p-6 cursor-pointer hover:bg-ocean-2/20 transition-all flex flex-col group"
                    >
                      <div className="w-12 h-12 bg-ocean-2 rounded-full flex items-center justify-center text-ocean-6 mb-4 group-hover:bg-ocean-4 group-hover:text-ocean-6 transition-colors">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif text-ocean-6 mb-2">{session.title}</h3>
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-sm font-medium text-ocean-6/70">{session.duration}</span>
                        <span className="text-sm font-medium text-ocean-6">{session.price}</span>
                      </div>
                      <p className="text-ocean-6/80 text-sm flex-grow mb-6">
                        {session.desc}
                      </p>
                      <div className="flex items-center text-ocean-5 text-sm font-medium group-hover:text-ocean-6 mt-auto">
                        Book Now <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : bookingStep === 'disclosure' ? (
              <>
                <button
                  onClick={() => setBookingStep('selection')}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-ocean-1 hover:text-ocean-6 hover:bg-ocean-2 transition-colors border border-ocean-2 shadow-sm text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="w-full h-full bg-white pt-14 flex flex-col">
                  <div className="flex-1 relative">
                    <iframe 
                      src="https://docs.google.com/forms/d/e/1FAIpQLSf4DfDOblP90CNgEo3ET30C3ZFuDnxqxspUs8v-is6WOX9vIg/viewform?usp=header&embedded=true" 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      marginHeight={0} 
                      marginWidth={0}
                      className="absolute inset-0 w-full h-full"
                      onLoad={() => {
                        setDisclosureLoadCount((prev) => {
                          const newCount = prev + 1;
                          if (newCount === 2) {
                            // Automatically advance to calendar after brief pause
                            setTimeout(() => {
                              setBookingStep('calendar');
                            }, 1000);
                          }
                          return newCount;
                        });
                      }}
                    >
                      Loading…
                    </iframe>
                  </div>
                  <div className="bg-ocean-1/30 border-t border-ocean-2/50 p-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 pb-6 sm:pb-4">
                    <p className="text-sm font-medium text-ocean-6 text-center sm:text-left m-0 flex-1">
                      Please complete all required fields and submit the form above. Once submitted, you will be automatically redirected to the calendar.
                    </p>
                    <button 
                      onClick={() => setBookingStep('calendar')}
                      disabled={disclosureLoadCount < 2}
                      className={`px-4 py-2 sm:px-6 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-all ${
                        disclosureLoadCount >= 2 
                          ? 'bg-ocean-4 text-ocean-6 hover:bg-ocean-4/80 cursor-pointer' 
                          : 'bg-ocean-2/50 text-ocean-6/50 cursor-not-allowed hidden md:block opacity-50'
                      }`}
                    >
                      {disclosureLoadCount >= 2 ? 'Next: Schedule' : 'Waiting for submission...'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setBookingStep('disclosure');
                    setDisclosureLoadCount(0);
                  }}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-ocean-1 hover:text-ocean-6 hover:bg-ocean-2 transition-colors border border-ocean-2 shadow-sm text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="w-full h-full bg-white pt-14 flex flex-col">
                  <div className="flex-1 relative rounded-b-3xl overflow-hidden">
                    <iframe 
                      src={selectedSessionUrl || "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3XMyLxsIT76bvFMmCfy8SsBP6T8Zu-9_v4kRK0NByJOXgIN-QMgopP_t8ai213sPikg45DpZCg?gv=true"}
                      style={{ border: 0 }} 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      title="Book Consultation"
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
