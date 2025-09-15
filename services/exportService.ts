
import type { Slide, Theme } from '../types';
// This assumes pptxgenjs is loaded globally from a CDN
declare var PptxGenJS: any;

export const exportToPptx = (slides: Slide[], theme: Theme) => {
  if (typeof PptxGenJS === 'undefined') {
    alert('Presentation library (pptxgenjs) is not loaded. Please check your internet connection and try again.');
    return;
  }

  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_16x9';

  slides.forEach(slideData => {
    const slide = pptx.addSlide();
    
    // Remove '#' from hex codes for pptxgenjs
    const bgColor = theme.bg.substring(1);
    const titleColor = theme.title.substring(1);
    const textColor = theme.text.substring(1);

    slide.background = { color: bgColor };

    // Title
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.25,
      w: '90%',
      h: 1,
      fontSize: 36,
      fontFace: theme.font.title,
      color: titleColor,
      bold: true,
      align: 'center'
    });

    // Content (bullet points)
    const contentText = slideData.content.map(point => ({
        text: point,
        options: {
            fontFace: theme.font.body,
            color: textColor,
            fontSize: 20,
            bullet: true,
            indent: 30,
        }
    }));
    
    slide.addText(contentText, {
      x: 0.75,
      y: 1.5,
      w: '85%',
      h: 4,
    });
    
    // Speaker Notes
    slide.addNotes(slideData.notes);
  });

  pptx.writeFile({ fileName: 'AI_Presentation.pptx' });
};

export const exportToJson = (slides: Slide[]) => {
  const jsonString = JSON.stringify(slides, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presentation.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPdf = () => {
  window.print();
};
