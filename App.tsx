import React, { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { PhoneIcon, MailIcon, LocationIcon, CalendarIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, CertificateIcon, ProjectIcon, LanguageIcon, UserIcon, SendIcon, HtmlIcon, CssIcon, PythonIcon, OfficeIcon, DownloadIcon, WhatsappIcon, LinkedInIcon, GithubIcon, ExternalLinkIcon } from './components/Icons';
import TimelineItem from './components/TimelineItem';
import SkillBadge from './components/SkillBadge';
import Navbar from './Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import EarthGlobe from './components/EarthGlobe';
import ThreeDWorkspace from './components/ThreeDWorkspace';
import TiltCard from './components/TiltCard';
import BentoCard from './components/BentoCard';


import yadavaLogo from './assets/yadava_college_logo.png';
import sultanExperienceImg from './assets/sultan_experience.png';
import auditingImg from './assets/auditing_3d_final.png';
import bloodBankImg from './assets/blood_bank.png';
import bloodBankDashboard from './assets/project_dashboard_final.png';
import profilePic from './assets/ahamed.png.png';

import resumePdf from './assets/My_resume (1).pdf';
import schoolLogo from './assets/school.png';
import vb6Logo from './assets/vb6_logo.png';
import htmlCssLogo from './assets/html_css_logo.png';
import pythonLogo from './assets/python_logo.png';
import primeLogo from './assets/prime.png';
import geniusLogo from './assets/genius_logo.png';
import gstLogo from './assets/gst_logo.png';
import officeLogo from './assets/office_logo.png';
import pmLogo from './assets/pm_logo.png';
import techBg from './assets/tech_bg.png';
import maduraiMap from './assets/madurai_map.png';

// --- DATA ---
const portfolioData = {
  name: "M. Ahamed Thameemul Ansari",
  title: "Master of Commerce (Computer Application) Graduate",
  location: "Madurai - 625014",
  email: "thameemulansari0503@gmail.com",
  phone: "+91-9342497791",
  whatsapp: "9342497791",
  dob: "07/05/2003",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/m-thameem-ansari-612775305", icon: <LinkedInIcon /> },
    { name: "GitHub", url: "https://github.com/Thameem0705", icon: <GithubIcon /> },
    { name: "WhatsApp", url: "https://wa.me/9342497791", icon: <WhatsappIcon /> }
  ],
  summary: "Motivated and adaptable recent graduate with a Master's degree in Commerce (Computer Application). Eager to apply technical and analytical skills in a dynamic work environment while contributing positively to organizational growth. Ready to learn, grow, and make a meaningful impact as part of a collaborative team.",
  experience: [
    {
      role: "Intern - Audit Assistant",
      company: "Sultan & Co ITP Auditor",
      period: "Jul 2024 – Jan 2026",
      location: "Madurai - 625007",
      image: sultanExperienceImg,
      description: [
        "1 year of hands-on experience in auditing processes and financial documentation.",
        "Developed deep understanding of compliance and regulatory requirements.",
        "Enhanced analytical and attention-to-detail skills through practical application in a professional environment."
      ],
      attachmentImage: undefined
    }
  ],
  education: [
    {
      degree: "Master of Commerce (Computer Application)",
      institution: "Yadava College Co-education Institute",
      institutionUrl: "https://www.yadavacollege.ac.in/",
      period: "2024 – 2026",
      details: "Percentage: 70%",
      image: yadavaLogo,
    },
    {
      degree: "Bachelor of Commerce (Computer Application)",
      institution: "Yadava College Co-education Institute",
      institutionUrl: "https://www.yadavacollege.ac.in/",
      period: "2021 – 2024",
      details: "Percentage: 73%",
      image: yadavaLogo
    },
    {
      degree: "Higher Secondary Certificate (HSC +1, +2)",
      institution: "Xavier Matric Hr. Sec. School",
      period: "2018 – 2021",
      details: "Percentage: 70%",
      image: schoolLogo
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Xavier Matric Hr. Sec. School",
      period: "2017 – 2018",
      details: "Percentage: 63%",
      image: schoolLogo
    }
  ],
  projects: [
    {
      name: "Blood Bank Management System",
      year: "2023",
      technologies: "Microsoft Visual Basic 6.0, Microsoft Access",
      link: "https://github.com/your-username/blood-bank-management-system",
      description: [
        "Developed a comprehensive system to help locate blood donors and facilitate social service.",
        "Implemented donor registration, blood inventory management, and search functionality.",
        "Streamlined blood donation process and improved accessibility for emergency requirements.",
        "Technologies: Microsoft Visual Basic 6.0 (Frontend), Microsoft Access Database (Backend)."
      ],
      reportLink: "https://heyzine.com/flip-book/705ba3ebd4.html",
      image: bloodBankImg
    }
  ],
  technicalSkills: {
    programming: ["Microsoft Visual Basic 6.0", "HTML & CSS (Basics)", "Python (Basics)"],
    businessApps: ["Tally Prime (Basics)", "Genius Tax Filing", "GST Filing", "MS Office"],
    projectManagement: ["Fundamentals of Project Management"]
  },
  certifications: [
    { name: "Project Management", institution: "Yadava College", year: "2024" },
    { name: "Entrepreneurship Development", institution: "Yadava College", year: "2024" },
    { name: "Microsoft Excel (Intermediate)", institution: "Great Learning", year: "2024" }
  ],
  languages: [
    { name: "Tamil", proficiency: "Native" },
    { name: "English", proficiency: "Proficient" }
  ]
};

const skillIconMap: { [key: string]: React.ReactNode } = {
  "Microsoft Visual Basic 6.0": <img src={vb6Logo} alt="VB6" className="w-12 h-12 object-contain" />,
  "HTML & CSS (Basics)": <img src={htmlCssLogo} alt="HTML/CSS" className="w-12 h-12 object-contain" />,
  "Python (Basics)": <img src={pythonLogo} alt="Python" className="w-12 h-12 object-contain" />,
  "Tally Prime (Basics)": <img src={primeLogo} alt="Tally Prime" className="w-12 h-12 object-contain" />,
  "Genius Tax Filing": <img src={geniusLogo} alt="Genius" className="w-12 h-12 object-contain" />,
  "GST Filing": <img src={gstLogo} alt="GST" className="w-12 h-12 object-contain" />,
  "MS Office": <img src={officeLogo} alt="Office" className="w-12 h-12 object-contain" />,
  "Fundamentals of Project Management": <img src={pmLogo} alt="PM" className="w-12 h-12 object-contain" />,
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activePage, setActivePage] = useState('Home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back-to-top scroll listener
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handlePageChange = (page: string) => {
    setActivePage(page);
    const element = document.getElementById(page.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', phone: '', subject: '', message: '' };
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Required'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Required'; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Invalid email'; isValid = false; }
    if (!formData.subject.trim()) { newErrors.subject = 'Required'; isValid = false; }
    if (!formData.message.trim()) { newErrors.message = 'Required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('');
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'thameemulansari0503@gmail.com',
      };
      try {
        await emailjs.send('service_uw1myr8', 'template_kzekt99', templateParams, 'Cg_XGINeokOd9yN7N');
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (error: any) {
        console.error("EmailJS Error:", error);
        setSubmitStatus('Failed to send. Please check connection.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    if (showWelcome) return;

    // Check for accessibility: reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Immediately reveal all elements
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      // Group elements that intersect in the exact same frame for stagger effects
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        intersectingEntries.forEach((entry, index) => {
          const target = entry.target as HTMLElement;

          // If the element is a stagger container, animate its children in sequence
          if (target.classList.contains('stagger-container')) {
            const children = target.querySelectorAll('.reveal-on-scroll');
            children.forEach((child, childIdx) => {
              const childEl = child as HTMLElement;
              // Add a stagger delay (e.g. 100ms per child)
              childEl.style.transitionDelay = `${childIdx * 100}ms`;
              childEl.classList.add('revealed');
            });
          } else {
            // Apply a minor stagger delay if multiple separate elements enter viewport at the same time
            if (!target.style.transitionDelay && !target.closest('.stagger-container')) {
              target.style.transitionDelay = `${index * 100}ms`;
            }
            target.classList.add('revealed');
          }

          // Unobserve the element so it only triggers once
          obs.unobserve(target);
        });
      }
    }, {
      threshold: 0.08, // Trigger when 8% of the element is visible
      rootMargin: '0px 0px -50px 0px' // offset so it triggers slightly before entering view
    });

    // We want to observe individual scroll-reveal elements
    // Note: We skip elements that are inside a stagger-container because the container handles them
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const staggerContainers = document.querySelectorAll('.stagger-container');

    revealElements.forEach(el => {
      // If it's inside a stagger-container, don't observe it directly
      if (!el.closest('.stagger-container')) {
        observer.observe(el);
      }
    });

    staggerContainers.forEach(containerEl => {
      observer.observe(containerEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [showWelcome]);


  return (
    <div className="bg-slate-900 min-h-screen font-sans selection:bg-cyan-500/30 text-slate-200 pb-4 sm:pb-20 overflow-x-hidden">
      <Navbar activePage={activePage} onPageChange={handlePageChange} />

      {showWelcome ? (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      ) : (
        <>
          {/* Flow Line SVG */}
          <div className="absolute top-0 left-0 w-full h-[500px] pointer-events-none z-0 overflow-hidden opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 1440 500" preserveAspectRatio="none">
              <path d="M720,50 C900,100 1100,50 1300,150" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse-slow" />
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                  <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12 relative z-10 max-w-7xl">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[minmax(120px,auto)] sm:auto-rows-[minmax(140px,auto)] md:auto-rows-[minmax(180px,auto)]"
            >

              {/* 1. HERO PROFILE (Col 2, Row 2) */}
              <BentoCard colSpan={3} rowSpan={2} className="relative !p-0 overflow-hidden scroll-mt-28" id="home" revealAnimation="fade-up">
                <div className="absolute inset-0 z-0">
                  <img src={techBg} alt="Tech Background" className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center h-full text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                    <div className="relative group flex-shrink-0">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                      <img src={profilePic} alt="Profile" className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-800 object-cover shadow-2xl" />
                      <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 border-3 sm:border-4 border-slate-800 rounded-full z-20" title="Available for work"></div>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <div className="inline-block px-2 sm:px-3 py-1 mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold tracking-wider text-cyan-300 uppercase bg-cyan-900/30 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                        Available for Hire
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-tight mb-2 sm:mb-3">
                        {portfolioData.name.split(' ')[0]} <span className="text-cyan-400">{portfolioData.name.split(' ')[1]}</span>
                      </h1>
                      <p className="text-sm sm:text-base md:text-xl text-slate-300 font-medium max-w-lg mb-4 sm:mb-6">{portfolioData.title}</p>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start w-full sm:w-auto">
                        <a href={portfolioData.socials.find(s => s.name === 'LinkedIn')?.url} target="_blank" rel="noreferrer" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group text-sm sm:text-base">
                          <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Connect on LinkedIn
                        </a>
                        <a href={resumePdf} download="Resume_Ahamed_Thameemul_Ansari" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                          <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Download Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </BentoCard>


              {/* 2. 3D WORKSPACE (Col 2, Row 2) */}
              <BentoCard colSpan={1} rowSpan={2} title="Workspace" id="workspace" className="!p-0 relative overflow-hidden group min-h-[240px] sm:min-h-[280px] md:min-h-[320px]" revealAnimation="fade-up">

                <div className="absolute inset-0">
                  <ThreeDWorkspace />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none"></div>
              </BentoCard>

              {/* 3. ABOUT ME (Col 2, Row 1) */}
              <BentoCard colSpan={2} title="About Me" id="about" revealAnimation="fade-left">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {portfolioData.summary}
                </p>
              </BentoCard>

              {/* 4. SOCIAL & LOCATION (Col 2 - Split) */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-container">
                {/* Socials */}
                <BentoCard colSpan={1} title="Connect" className="flex flex-col justify-center !mb-0" revealAnimation="fade-up">
                  <div className="flex gap-4 justify-center items-center h-full">
                    {portfolioData.socials.map(social => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-xl hover:bg-cyan-900/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all group/icon">
                        <span className="text-gray-400 group-hover/icon:text-cyan-400 transition-colors scale-125 block">
                          {social.icon}
                        </span>
                      </a>
                    ))}
                  </div>
                </BentoCard>

                {/* Madurai Map */}
                <BentoCard colSpan={1} className="!p-0 relative overflow-hidden bg-black flex items-center justify-center !mb-0 group" revealAnimation="fade-up">
                  <a href="https://www.google.com/maps/place/Madurai,+Tamil+Nadu/@9.9252,78.1198,12z" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 cursor-pointer" title="Open Madurai in Google Maps"></a>
                  <div className="absolute inset-0 z-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62788.82770029498!2d78.0766113!3d9.9252007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b0f5f218a84!2sMadurai%2C%20Tamil%20Nadu!5e1!2m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'saturate(1.2) brightness(0.7)', pointerEvents: 'none' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Madurai Satellite Map"
                    ></iframe>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                  <div className="z-10 text-center relative mt-auto mb-4">
                    <p className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] mb-1 font-bold">Based In</p>
                    <p className="text-xl text-white font-bold tracking-wide flex items-center justify-center gap-1">
                      <LocationIcon className="w-4 h-4 text-cyan-500" /> Madurai
                    </p>
                    <p className="text-[9px] text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to open in Maps →</p>
                  </div>
                </BentoCard>
              </div>

              {/* 3. EDUCATION (Col 2, Row 2) - "Left Side" */}
              <BentoCard colSpan={2} rowSpan={2} title="Education" id="education" className="relative overflow-hidden scroll-mt-28" revealAnimation="fade-left">
                <div className="space-y-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 p-2">
                  <div className="relative pl-6 border-l-2 border-slate-700 ml-2 stagger-container">
                    {portfolioData.education.map((edu, i) => (
                      <div key={i} className="mb-8 last:mb-0 relative reveal-on-scroll reveal-fade-up">
                        <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-slate-900 border-4 border-cyan-500"></div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                            <img src={edu.image || schoolLogo} alt={edu.institution} className="w-8 h-8 object-contain opacity-80" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg leading-tight">{edu.degree}</p>
                            <p className="text-cyan-400 text-sm mt-1">{edu.institution}</p>
                            {edu.institutionUrl && (
                              <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 mt-1">
                                Visit Website <ExternalLinkIcon className="w-3 h-3" />
                              </a>
                            )}
                            <p className="text-slate-500 text-xs mt-2 bg-slate-800/80 inline-block px-2 py-1 rounded border border-slate-700">{edu.period}</p>
                            {edu.details && <p className="text-emerald-400 text-xs font-mono mt-2">{edu.details}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>

              {/* 4. EXPERIENCE (Col 2, Row 2) - "Right Side" */}
              <BentoCard colSpan={2} rowSpan={2} title="Experience" id="experience" className="relative overflow-hidden scroll-mt-28" revealAnimation="fade-right">
                <div className="space-y-6 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 stagger-container">
                  {portfolioData.experience.map((job, i) => (
                    <div key={i} className="flex flex-col h-full reveal-on-scroll reveal-fade-up">
                      <div className="flex items-center gap-4 mb-4">
                        {job.image && (
                          <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-lg flex-shrink-0">
                            <img src={job.image} alt={job.company} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-xl font-bold text-white">{job.role}</h4>
                          <p className="text-cyan-400 font-medium">{job.company}</p>
                          <p className="text-slate-500 text-xs mt-1 bg-slate-800 inline-block px-2 py-1 rounded">{job.period}</p>
                        </div>
                      </div>
                      <div className="pl-4 border-l-2 border-slate-700 ml-8 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                        {job.description.map((desc, idx) => (
                          <p key={idx} className="text-slate-400 text-sm mb-2 leading-relaxed">{desc}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </BentoCard>

              {/* 5. SOCIAL CONNECT (Col 2) */}
              {/* Removed as part of the new "SOCIAL & LOCATION" block */}

              {/* 6. LOCATION MINI (Col 2) */}
              {/* Removed as part of the new "SOCIAL & LOCATION" block */}




              {/* 7. SKILLS (Col 2) */}
              {/* 7. SKILLS (Col 2) */}
              <BentoCard colSpan={2} title="Technical Expertise" id="skills" className="scroll-mt-28" revealAnimation="fade-left">
                <div className="flex flex-wrap justify-center gap-4 stagger-container">
                  {portfolioData.technicalSkills.programming.concat(portfolioData.technicalSkills.businessApps, portfolioData.technicalSkills.projectManagement).map((skill, i) => (
                    <SkillBadge key={i} skill={skill} icon={skillIconMap[skill] || <CodeIcon className="w-8 h-8" />} className="reveal-on-scroll reveal-fade-up" />
                  ))}
                </div>
              </BentoCard>

              {/* 8. CERTIFICATIONS (Col 2) */}
              <BentoCard colSpan={2} title="Certifications" id="certifications" className="scroll-mt-28" revealAnimation="fade-right">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-container">
                  {portfolioData.certifications.map((cert, i) => (
                    <TiltCard key={i} className="h-full reveal-on-scroll reveal-fade-up">
                      <div className="flex flex-col justify-between h-full p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                            <CertificateIcon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded-full border border-slate-700/50">{cert.year}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm mb-1 leading-tight group-hover:text-cyan-200 transition-colors">{cert.name}</h4>
                          <p className="text-xs text-slate-400">{cert.institution}</p>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </BentoCard>

              {/* 6. PROJECTS (Col 4 - Wide) */}
              {/* 6. PROJECTS (Col 4 - Wide - Full Page Feel) */}
              {/* 6. PROJECTS (Col 4 - Wide - Full Page Feel) */}
              <BentoCard colSpan={4} title="" id="projects" className="!border-2 sm:!border-4 !border-cyan-500/50 bg-slate-900/95 relative overflow-hidden !p-0" revealAnimation="fade-up">
                <div className="flex flex-col lg:flex-row h-full min-h-[auto] lg:min-h-[500px]">
                  {/* Left Side: Features & Details */}
                  <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-700/50 bg-slate-900/50 relative reveal-on-scroll reveal-fade-left">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                    <div className="mb-6">
                      <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Featured Project</p>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{portfolioData.projects[0].name}</h3>
                      <p className="text-slate-400 text-sm">Developed by <span className="text-cyan-300 font-semibold">{portfolioData.name}</span></p>
                    </div>

                    <div className="space-y-3 mb-8 flex-grow overflow-y-auto custom-scrollbar pr-2">
                      <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-3">Key Features</h4>
                      {portfolioData.projects[0].description.map((desc, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 group-hover:bg-cyan-300 transition-colors shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                          <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">{desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-700/50 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <a
                        href={portfolioData.projects[0].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all border border-slate-600 hover:border-cyan-500/50 group text-sm sm:text-base touch-target"
                      >
                        <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Source Code</span>
                      </a>
                      <a
                        href={portfolioData.projects[0].reportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 active:from-cyan-700 active:to-blue-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 group text-sm sm:text-base touch-target"
                      >
                        <span className="text-xl">📖</span>
                        <span>Read Report</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Side: AI Dashboard Image */}
                  <div className="w-full lg:w-1/2 relative bg-slate-950 flex items-center justify-center p-4 overflow-hidden reveal-on-scroll reveal-fade-right">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-cyan-500/5 blur-3xl"></div>

                    <img
                      src={bloodBankDashboard}
                      alt="Blood Bank AI Dashboard"
                      className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                    />
                  </div>
                </div>
              </BentoCard>




              {/* 8. CONTACT FORM + GLOBE (Col 4 - Full Width) */}
              <BentoCard colSpan={4} title="Get In Touch" id="contact" className="relative overflow-hidden" revealAnimation="fade-up">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center h-full">
                  <div className="z-10 reveal-on-scroll reveal-fade-left">
                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none w-full touch-target" />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none w-full touch-target" />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      <div>
                        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none w-full touch-target" />
                        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                      </div>
                      <div>
                        <textarea name="message" rows={4} placeholder="Message" value={formData.message} onChange={handleInputChange} className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none w-full"></textarea>
                        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg shadow-cyan-900/20 touch-target disabled:opacity-60 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Sending...' : <><SendIcon className="w-4 h-4" /> Send Message</>}
                      </button>
                      {submitStatus && <p className={`text-xs text-center ${submitStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{submitStatus}</p>}
                    </form>
                  </div>
                  <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full hidden md:block rounded-2xl overflow-hidden border border-slate-700/30 reveal-on-scroll reveal-fade-right">
                    <div className="absolute inset-0 bg-cyan-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>
                    <EarthGlobe />
                    <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                      <span className="text-xs text-cyan-300 flex items-center gap-1"><LocationIcon className="w-3 h-3" /> Madurai, India</span>
                    </div>
                  </div>
                </div>
              </BentoCard>

            </div>
          </div>

          {/* ═══ FOOTER ═══ */}
          <footer className="site-footer mt-8 sm:mt-12 py-8 sm:py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                {/* Brand */}
                <div>
                  <h4 className="text-cyan-400 font-bold text-lg mb-3">M.A.T. ANSARI</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{portfolioData.title}</p>
                  <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                    <LocationIcon className="w-3 h-3" /> {portfolioData.location}
                  </p>
                </div>
                {/* Contact */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Contact</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <a href={`mailto:${portfolioData.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <MailIcon className="w-4 h-4" /> {portfolioData.email}
                    </a>
                    <a href={`tel:${portfolioData.phone}`} className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4" /> {portfolioData.phone}
                    </a>
                  </div>
                  <div className="flex gap-3 mt-4">
                    {portfolioData.socials.map(social => (
                      <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800/50 rounded-lg hover:bg-cyan-900/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all text-gray-400 hover:text-cyan-400">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-slate-500 text-xs">© {new Date().getFullYear()} M. Ahamed Thameemul Ansari. All rights reserved.</p>
                <p className="text-slate-600 text-xs flex items-center gap-1">Made in <span className="text-cyan-400 font-semibold">Ansari</span></p>
              </div>
            </div>
          </footer>

          {/* ═══ BACK TO TOP BUTTON ═══ */}
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              className="back-to-top animate-scale-in"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          )}
        </>
      )
      }
    </div>
  );
};

export default App;
