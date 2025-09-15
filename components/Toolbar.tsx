import React, { useState } from 'react';
import type { Theme } from '../types';
import { THEMES } from '../constants';
import { NewIcon, AddIcon, DeleteIcon, ThemeIcon, ExportIcon } from './Icons';

interface ToolbarProps {
  activeTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
  onExportPptx: () => void;
  onExportJson: () => void;
  onExportPdf: () => void;
  onNewPresentation: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTheme, onThemeChange, onAddSlide, onDeleteSlide,
  onExportPptx, onExportJson, onExportPdf, onNewPresentation
}) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-lg p-2 flex items-center justify-between z-10">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold ml-2">AI Presenter</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onNewPresentation} className="toolbar-btn">
          <NewIcon /> <span className="hidden md:inline">New</span>
        </button>
        <button onClick={onAddSlide} className="toolbar-btn">
          <AddIcon /> <span className="hidden md:inline">Add</span>
        </button>
        <button onClick={onDeleteSlide} className="toolbar-btn">
          <DeleteIcon /> <span className="hidden md:inline">Delete</span>
        </button>

        {/* Theme Dropdown */}
        <div className="relative">
          <button onClick={() => setThemeDropdownOpen(!themeDropdownOpen)} className="toolbar-btn">
            <ThemeIcon /> <span className="hidden md:inline">Theme</span>
          </button>
          {themeDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              {THEMES.map(theme => (
                <a
                  key={theme.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onThemeChange(theme);
                    setThemeDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {theme.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Export Dropdown */}
        <div className="relative">
          <button onClick={() => setExportDropdownOpen(!exportDropdownOpen)} className="toolbar-btn bg-blue-600 hover:bg-blue-700">
            <ExportIcon /> <span className="hidden md:inline">Export</span>
          </button>
          {exportDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <a href="#" onClick={(e) => { e.preventDefault(); onExportPptx(); setExportDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">as PPTX</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onExportJson(); setExportDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">as JSON</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onExportPdf(); setExportDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">as PDF</a>
            </div>
          )}
        </div>
      </div>
      {/* FIX: Removed unsupported `jsx` prop from `<style>` tag. This is not standard JSX and requires a specific library. */}
      <style>{`
        .toolbar-btn {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 6px;
          background-color: #4a5568;
          transition: background-color 0.2s;
          font-weight: 500;
        }
        .toolbar-btn:hover {
          background-color: #2d3748;
        }
        .toolbar-btn svg {
          margin-right: 8px;
        }
      `}</style>
    </header>
  );
};

export default Toolbar;
