import React from 'react';

const Ground = () => (
  <div className="absolute bottom-0 left-0 w-[20000px] h-32 bg-slate-900 border-t-4 border-indigo-500 overflow-hidden">
    <div
      className="w-full h-full opacity-20"
      style={{
        backgroundImage: 'linear-gradient(90deg, #6366f1 1px, transparent 1px), linear-gradient(#6366f1 1px, transparent 1px)',
        backgroundSize: '100px 100px'
      }}
    ></div>
  </div>
);

export default Ground;
