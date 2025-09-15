
import React from 'react';
import type { Slide, Theme } from '../types';

interface SlidePreviewProps {
  slideNumber: number;
  slide: Slide;
  isActive: boolean;
  onClick: () => void;
  theme: Theme;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ slideNumber, slide, isActive, onClick, theme }) => {
  const activeClasses = 'ring-2 ring-offset-2 ring-blue-500 shadow-lg';
  const inactiveClasses = 'hover:shadow-md hover:ring-2 hover:ring-gray-300';

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-lg p-3 transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
      style={{ 
        backgroundColor: isActive ? theme.bg : '#f9fafb', 
        borderColor: isActive ? theme.accent : '#e5e7eb'
      }}
    >
      <div className="flex items-start space-x-3">
        <span className="text-sm font-semibold text-gray-500">{slideNumber}</span>
        <div className="flex-1">
          <h3 
            className="font-semibold truncate"
            style={{ color: isActive ? theme.title : '#374151' }}
          >
            {slide.title || 'Untitled Slide'}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SlidePreview;
