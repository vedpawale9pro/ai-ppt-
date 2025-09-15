
import React from 'react';

const Loader: React.FC = () => {
  const messages = [
    "Brewing ideas...",
    "Assembling pixels...",
    "Consulting the digital oracle...",
    "Structuring brilliance...",
    "Polishing concepts...",
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <p className="text-white text-xl mt-4 font-semibold">{message}</p>
    </div>
  );
};

export default Loader;
