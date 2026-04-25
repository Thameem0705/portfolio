import React, { useState, useEffect, useCallback } from 'react';
import { HomeIcon, BriefcaseIcon, ProjectIcon, CodeIcon, MailIcon, GraduationCapIcon, MenuIcon, XIcon } from './components/Icons';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Experience', icon: <BriefcaseIcon /> },
  { name: 'Education', icon: <GraduationCapIcon /> },
  { name: 'Projects', icon: <ProjectIcon /> },
  { name: 'Skills', icon: <CodeIcon /> },
  { name: 'Contact', icon: <MailIcon /> },
];

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy: track which section is currently in view
  useEffect(() => {
    const sectionIds = ['home', 'experience', 'education', 'projects', 'skills', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close mobile dropdown on scroll
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleNavClick = useCallback((page: string) => {
    onPageChange(page);
    setIsOpen(false);
  }, [onPageChange]);

  const isActive = (name: string) => activeSection === name.toLowerCase();

  return (
    <>
      {/* ═══ TOP NAVBAR (Desktop + Mobile Header) ═══ */}
      <nav
        className={`fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50 shadow-lg transition-all duration-300 ${
          isScrolled ? 'navbar-shrunk' : ''
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-[52px]' : 'h-16'}`}>
            <div
              className={`flex-shrink-0 text-cyan-400 font-bold tracking-wider cursor-pointer transition-all duration-300 nav-brand ${
                isScrolled ? 'text-base' : 'text-xl'
              }`}
              onClick={() => handleNavClick('Home')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('Home')}
            >
              M.A.T. ANSARI
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1 lg:space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 touch-target ${
                      isActive(item.name)
                        ? 'bg-cyan-500/15 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    aria-current={isActive(item.name) ? 'page' : undefined}
                  >
                    <span className="w-4 h-4">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button — only for dropdown, not bottom nav */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-cyan-400 touch-target"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-full right-4 w-64 md:hidden transition-all duration-300 ease-in-out transform origin-top-right z-50 ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-1'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 touch-target interactive-touch ${
                    isActive(item.name)
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`transition-colors duration-200 ${isActive(item.name) ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
                  </span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <div className="bottom-nav md:hidden flex items-center justify-around px-2" role="navigation" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl transition-all duration-200 min-w-[48px] interactive-touch ${
              isActive(item.name)
                ? 'text-cyan-400'
                : 'text-slate-500'
            }`}
            aria-current={isActive(item.name) ? 'page' : undefined}
            aria-label={item.name}
          >
            <span className={`transition-all duration-200 ${isActive(item.name) ? 'scale-110' : ''}`}>
              {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                className: `w-5 h-5 ${isActive(item.name) ? 'drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]' : ''}`
              })}
            </span>
            <span className={`text-[10px] font-medium leading-none ${isActive(item.name) ? 'text-cyan-400' : 'text-slate-500'}`}>
              {item.name}
            </span>
            {/* Active indicator dot */}
            {isActive(item.name) && (
              <span className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5 animate-scale-in" />
            )}
          </button>
        ))}
      </div>

      {/* Overlay for mobile dropdown menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
