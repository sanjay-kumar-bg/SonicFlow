import React from 'react';
import Radio from '../components/Radio';

const RadioPage = () => {
  return (
    <div className="h-full w-full bg-[#121212] text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Radio</h1>
          <p className="text-gray-400">Listen to your favorite Indian radio stations</p>
        </div>
        <Radio />
      </div>
    </div>
  );
};

export default RadioPage; 