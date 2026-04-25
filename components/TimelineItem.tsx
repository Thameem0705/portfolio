
import React from 'react';



interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description?: string[];
  details?: string;
  isLast: boolean;
  institutionUrl?: string;
  image?: string;
  attachmentImage?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, period, description, details, isLast, institutionUrl, image, attachmentImage }) => {
  return (
    <div className={`relative pb-12 ${isLast ? '' : 'mb-2'} group`}>
      {/* 
        Dot Positioning Calculation:
        Mobile: pl-6 (24px) + border (2px). Content starts at 26px. Border center relative to content start is -25px. Dot center is 10px. Left = -35px.
        Desktop: pl-10 (40px) + border (2px). Content starts at 42px. Border center relative to content start is -41px. Dot center is 10px. Left = -51px.
      */}
      <div className="absolute -left-[35px] md:-left-[51px] top-1.5 h-5 w-5 rounded-full bg-cyan-500 border-4 border-gray-900 shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] z-10"></div>

      {/* Connector Line Highlight */}
      <div className="absolute -left-[26px] md:-left-[42px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 transition-transform duration-300 group-hover:translate-x-2">
        <div className="flex items-start gap-4 flex-1">
          {image && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={`${subtitle} logo`}
                className="w-12 h-12 rounded-lg object-cover border border-gray-700 bg-gray-800 transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-500/50"
              />
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 leading-tight group-hover:text-cyan-300 transition-colors">{title}</h3>
            {institutionUrl ? (
              <a href={institutionUrl} target="_blank" rel="noopener noreferrer" className="text-md text-gray-400 hover:text-cyan-400 hover:underline transition-colors duration-300">
                {subtitle}
              </a>
            ) : (
              <p className="text-md text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
        <span className="text-sm font-mono text-cyan-500/80 whitespace-nowrap pt-1 bg-gray-800/40 px-2 py-1 rounded border border-gray-700/50 group-hover:border-cyan-500/30 group-hover:bg-cyan-900/20 transition-all">{period}</span>
      </div>

      <div className={`mt-3 ${image ? 'sm:ml-16' : ''} transition-opacity duration-300 group-hover:opacity-100`}>
        {description && (
          <ul className="list-disc list-inside text-gray-400 space-y-1 group-hover:text-gray-300 transition-colors">
            {description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
        {details && (
          <p className="mt-2 text-sm text-gray-500">{details}</p>
        )}
        {attachmentImage && (
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg transition-all duration-500 group-hover:shadow-cyan-900/20 group-hover:border-cyan-500/30">
            <img src={attachmentImage} alt="Experience atttachment" className="w-full h-auto object-cover max-h-96 transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
