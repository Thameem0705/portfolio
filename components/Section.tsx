
import React from 'react';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <section className="mb-12">
    <div className="flex items-center mb-6">
      {icon && <span className="text-cyan-400 mr-3">{icon}</span>}
      <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
      <div className="flex-grow border-t-2 border-gray-700/50 ml-4"></div>
    </div>
    {children}
  </section>
);

export default Section;
