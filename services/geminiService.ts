
import { GoogleGenAI, Type } from '@google/genai';
import type { Slide } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const slideSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A concise and engaging title for the slide.',
    },
    content: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'An array of strings, where each string is a key takeaway or bullet point. Keep points brief.',
    },
    notes: {
      type: Type.STRING,
      description: 'Detailed speaker notes for the presenter for this slide.',
    },
  },
  required: ['title', 'content', 'notes'],
};

const presentationSchema = {
    type: Type.ARRAY,
    items: slideSchema,
};


const generateSlides = async (prompt: string): Promise<Slide[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: presentationSchema,
            },
        });
        
        const jsonText = response.text.trim();
        // The API should return valid JSON, but as a fallback, parse defensively
        const parsedData = JSON.parse(jsonText);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            return parsedData.map(item => ({
                title: item.title || 'Untitled',
                content: Array.isArray(item.content) ? item.content : [],
                notes: item.notes || ''
            }));
        }
        return [];

    } catch (error) {
        console.error('Error generating slides with Gemini:', error);
        throw new Error('Failed to parse response from AI. Please try again.');
    }
};

export const generateSlidesFromTopic = async (topic: string): Promise<Slide[]> => {
    const prompt = `
        You are an expert presentation creator. Based on the following topic, create a compelling presentation.
        Topic: "${topic}"

        Generate a JSON array of slide objects.
        Create between 5 and 10 slides, covering an introduction, key points, and a conclusion.
        Ensure the content is well-structured and flows logically.
    `;
    return generateSlides(prompt);
};

export const generateSlidesFromFile = async (file: File): Promise<Slide[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const textContent = event.target?.result as string;
                const prompt = `
                    You are an expert presentation creator. You will be given text content to summarize into a presentation.
                    Content:
                    ---
                    ${textContent}
                    ---
                    Based on the text above, create a compelling presentation.
                    Generate a JSON array of slide objects.
                    Create a logical number of slides to effectively summarize the content, including an introduction, key points, and a conclusion.
                `;
                const slides = await generateSlides(prompt);
                resolve(slides);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => {
            reject(new Error("Failed to read the file: " + error));
        };
        reader.readAsText(file);
    });
};
