import React from 'react';

interface TryCardProps {
  title: string;
  description: string;
  tryNowText: string;
  tryNowHref: string;
  learnMoreText: string;
  learnMoreHref: string;
  imagePath: string;
  gradientClass?: string;
}

const TryCard: React.FC<TryCardProps> = ({
  title,
  description,
  tryNowText,
  tryNowHref,
  learnMoreText,
  learnMoreHref,
  imagePath,
  gradientClass,
}) => (
  <div className="bg-white rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[rgba(13,_38,_76,_0.25)_0px_12px_28px] transition-all duration-500 overflow-hidden mx-auto w-85 group h-full">
    <div className="p-6 flex flex-col h-full">
      {/* Content Section */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="space-y-3 text-center w-full">
          <h2 className="text-xl font-black text-gray-800 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text group-hover:scale-[1.02] transition-transform duration-500">
            {title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mx-auto font-medium tracking-wide">
            {description}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5 flex flex-col items-center pt-3">
          <a
            href={tryNowHref}
            className={`w-full text-white font-bold px-5 py-3 rounded-2xl 
                       transition-all duration-500 hover:scale-[1.02] hover:shadow-lg 
                       active:scale-95 text-sm backdrop-blur-sm relative overflow-hidden
                       ${gradientClass || 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'}
                       before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-150%] before:skew-x-[45deg]
                       hover:before:translate-x-[150%] before:transition-transform before:duration-700
                       `}
          >
            {tryNowText}
          </a>
          <a
            href={learnMoreHref}
            className="w-full bg-gray-50/80 backdrop-blur-sm border-[1.5px] border-gray-100 rounded-2xl px-5 py-3 
                     font-bold transition-all duration-500 hover:scale-[1.02] 
                     hover:bg-gray-100/80 hover:border-gray-200 text-gray-700 text-sm
                     active:scale-95 relative overflow-hidden
                     before:absolute before:inset-0 before:bg-gray-400/20 before:translate-x-[-150%] before:skew-x-[45deg]
                     hover:before:translate-x-[150%] before:transition-transform before:duration-700"
          >
            {learnMoreText}
          </a>
        </div>
      </div>

      {/* Image Section */}
      <div className="-mx-6 -mb-6 mt-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent h-12 z-10" />
        <img
          src={imagePath}
          alt={title}
          className="w-full h-48 object-cover transform transition-all duration-700 
                     group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  </div>
);

export default TryCard;
