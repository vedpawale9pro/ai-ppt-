
import React from 'react';
import type { Slide, Theme } from '../types';

interface SlideEditorProps {
  slide: Slide;
  onUpdate: (updatedSlide: Slide) => void;
  theme: Theme;
}

const SlideEditor: React.FC<SlideEditorProps> = ({ slide, onUpdate, theme }) => {
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...slide, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...slide, content: e.target.value.split('\n') });
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ ...slide, notes: e.target.value });
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Main Slide View */}
      <div 
        className="w-full aspect-[16/9] rounded-lg shadow-2xl p-8 flex flex-col justify-start overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: theme.bg }}
      >
        <textarea
          value={slide.title}
          onChange={handleTitleChange}
          className="text-4xl font-bold bg-transparent outline-none resize-none w-full h-20"
          style={{ color: theme.title, fontFamily: theme.font.title }}
          placeholder="Slide Title"
          rows={1}
        />
        <textarea
          value={slide.content.join('\n')}
          onChange={handleContentChange}
          className="text-xl mt-4 bg-transparent outline-none resize-none w-full flex-1"
          style={{ color: theme.text, fontFamily: theme.font.body }}
          placeholder="- Bullet point one&#10;- Bullet point two"
        />
      </div>

      {/* Speaker Notes */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col h-48">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Speaker Notes</h3>
        <textarea
            value={slide.notes}
            onChange={handleNotesChange}
            className="w-full flex-1 bg-gray-50 p-2 rounded-md outline-none resize-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            placeholder="Add speaker notes here..."
        />
      </div>
    </div>
  );
};

export default SlideEditor;
