import React from 'react';

const Cloud = ({ x, y, scale = 1 }) => (
  <div
    className="absolute opacity-40 text-white"
    style={{ left: x, top: y, transform: `scale(${scale})` }}
  >
    <div className="w-24 h-8 bg-current rounded-full"></div>
    <div className="w-12 h-12 bg-current rounded-full -mt-6 ml-4"></div>
  </div>
);

export default Cloud;
