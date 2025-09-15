
import React, { useState, useCallback, useMemo } from 'react';
import { Slide, Theme, View } from './types';
import { THEMES } from './constants';
import { generateSlidesFromTopic, generateSlidesFromFile } from './services/geminiService';
import { exportToPptx, exportToJson, exportToPdf } from './services/exportService';
import TopicInputForm from './components/TopicInputForm';
import Toolbar from './components/Toolbar';
import SlidePreview from './components/SlidePreview';
import SlideEditor from './components/SlideEditor';
import Loader from './components/Loader';
import { PlusIcon } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.INPUT);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (topic: string, file?: File) => {
    setIsLoading(true);
    setError(null);
    try {
      let generatedSlides;
      if (file) {
        generatedSlides = await generateSlidesFromFile(file);
      } else {
        generatedSlides = await generateSlidesFromTopic(topic);
      }
      
      if (generatedSlides && generatedSlides.length > 0) {
        setSlides(generatedSlides);
        setCurrentSlideIndex(0);
        setView(View.EDITOR);
      } else {
        setError("The AI could not generate slides for this topic. Please try being more specific.");
        setView(View.INPUT);
      }
    } catch (err) {
      console.error(err);
      setError(`An error occurred while generating slides: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setView(View.INPUT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateSlide = useCallback((updatedSlide: Slide) => {
    setSlides(prevSlides =>
      prevSlides.map((slide, index) =>
        index === currentSlideIndex ? updatedSlide : slide
      )
    );
  }, [currentSlideIndex]);

  const handleAddSlide = () => {
    const newSlide: Slide = { title: 'New Slide', content: ['Add your content here.'], notes: '' };
    const newIndex = currentSlideIndex + 1;
    setSlides(prevSlides => [
      ...prevSlides.slice(0, newIndex),
      newSlide,
      ...prevSlides.slice(newIndex)
    ]);
    setCurrentSlideIndex(newIndex);
  };
  
  const handleDeleteSlide = () => {
    if (slides.length <= 1) {
        alert("Cannot delete the last slide.");
        return;
    }
    const newSlides = slides.filter((_, index) => index !== currentSlideIndex);
    setSlides(newSlides);
    setCurrentSlideIndex(prevIndex => Math.max(0, prevIndex - 1));
  };
  
  const handleNewPresentation = () => {
    setSlides([]);
    setCurrentSlideIndex(0);
    setView(View.INPUT);
    setError(null);
  };

  const currentSlide = useMemo(() => slides[currentSlideIndex], [slides, currentSlideIndex]);

  if (isLoading) {
    return <Loader />;
  }
  
  if (view === View.INPUT) {
    return <TopicInputForm onGenerate={handleGenerate} error={error} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 text-gray-800">
      <Toolbar 
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        onAddSlide={handleAddSlide}
        onDeleteSlide={handleDeleteSlide}
        onExportPptx={() => exportToPptx(slides, activeTheme)}
        onExportJson={() => exportToJson(slides)}
        onExportPdf={() => exportToPdf()}
        onNewPresentation={handleNewPresentation}
      />
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Slide Previews */}
        <aside className="w-64 bg-white shadow-md overflow-y-auto p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-3 text-gray-600">Slides</h2>
          <div className="flex-1 space-y-2">
            {slides.map((slide, index) => (
              <SlidePreview
                key={index}
                slideNumber={index + 1}
                slide={slide}
                isActive={index === currentSlideIndex}
                onClick={() => setCurrentSlideIndex(index)}
                theme={activeTheme}
              />
            ))}
          </div>
           <button 
            onClick={handleAddSlide}
            className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusIcon />
            <span className="ml-2">Add Slide</span>
          </button>
        </aside>

        {/* Center: Main Slide Editor */}
        <section className="flex-1 flex flex-col p-6 overflow-y-auto">
           <div className="flex-1 flex items-center justify-center">
             {currentSlide && <SlideEditor slide={currentSlide} onUpdate={handleUpdateSlide} theme={activeTheme} />}
           </div>
        </section>
        
         {/* Print Area */}
        <div id="print-area" className="hidden">
           {slides.map((slide, index) => (
              <div key={index} className="slide-print" style={{ backgroundColor: activeTheme.bg, color: activeTheme.text }}>
                <h1 className="text-5xl font-bold mb-8" style={{ fontFamily: activeTheme.font.title }}>{slide.title}</h1>
                <ul className="text-2xl list-disc pl-12 space-y-4">
                  {slide.content.map((point, i) => (
                     <li key={i} style={{ fontFamily: activeTheme.font.body }}>{point}</li>
                  ))}
                </ul>
              </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default App;
