
import React, { useState } from 'react';
import { GenerateIcon } from './Icons';

interface TopicInputFormProps {
  onGenerate: (topic: string, file?: File) => void;
  error: string | null;
}

const TopicInputForm: React.FC<TopicInputFormProps> = ({ onGenerate, error }) => {
  const [topic, setTopic] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic && !file) {
      alert('Please enter a topic or upload a file.');
      return;
    }
    onGenerate(topic, file || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-4xl font-bold text-white text-center mb-2">AI Presentation Builder</h1>
        <p className="text-center text-gray-300 mb-8">Enter a topic or upload your notes to get started.</p>
        
        {error && (
          <div className="bg-red-500/50 border border-red-700 text-white px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The Future of Renewable Energy..."
            className="w-full h-32 p-4 text-lg bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition-all duration-300 placeholder-gray-400"
          />
          
          <div className="flex items-center justify-center text-gray-400">
            <span className="flex-grow border-t border-gray-600"></span>
            <span className="mx-4">OR</span>
            <span className="flex-grow border-t border-gray-600"></span>
          </div>

          <div>
            <label htmlFor="file-upload" className="w-full flex items-center justify-center px-4 py-3 bg-gray-700 text-gray-300 rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:bg-gray-600 hover:border-blue-500 transition-all duration-300">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              <span>{file ? file.name : 'Upload Text File (.txt)'}</span>
            </label>
            <input id="file-upload" type="file" className="hidden" accept=".txt" onChange={handleFileChange} />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center text-xl font-semibold bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <GenerateIcon />
            <span className="ml-2">Generate Slides</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopicInputForm;
