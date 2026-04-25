import React from 'react';

interface SkillBadgeProps {
  skill: string;
  icon: React.ReactNode;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, icon }) => {
  return (
    <div className="group relative flex flex-col items-center justify-center text-center p-1.5 sm:p-2 md:p-3 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg sm:rounded-xl border border-gray-600/50 w-[5.5rem] h-[5.5rem] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-900/40 hover:to-blue-900/40 hover:border-cyan-400 hover:shadow-[0_10px_20px_rgba(6,182,212,0.15)] hover:-translate-y-2 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 text-cyan-400 mb-1 sm:mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] [&_img]:w-7 [&_img]:h-7 sm:[&_img]:w-9 sm:[&_img]:h-9 md:[&_img]:w-10 md:[&_img]:h-10 lg:[&_img]:w-12 lg:[&_img]:h-12">
        {icon}
      </div>
      <span className="relative z-10 text-gray-200 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold leading-tight group-hover:text-white line-clamp-2">
        {skill}
      </span>
    </div>
  );
};

export default SkillBadge;
