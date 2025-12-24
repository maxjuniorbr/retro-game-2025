import React from 'react';

const Player = ({ x, y, direction, isMoving, isJumping, isFlying, isHidden }) => {
  if (isHidden) return null;

  return (
    <div
      className="absolute z-50 transition-transform duration-100"
      style={{
        left: x,
        bottom: y,
        transform: `scaleX(${direction})`,
        width: '60px',
        height: '80px',
        // When flying, transition smoothly to follow the rocket
        transition: isFlying ? 'left 0.1s linear, bottom 0.1s linear' : 'none'
      }}
    >
      <div className={`relative w-full h-full ${isJumping && !isFlying ? 'animate-bounce-short' : isMoving && !isFlying ? 'animate-wobble' : ''}`}>
        <div className="absolute bottom-0 w-12 left-2 h-14 bg-indigo-600 rounded-lg shadow-lg"></div>
        <div className="absolute top-0 left-1 w-14 h-14 bg-white rounded-full border-4 border-indigo-600 z-10 flex items-center justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-black rounded-full animate-blink"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-blink delay-75"></div>
          </div>
        </div>
        <div className="absolute top-4 -left-2 w-6 h-10 bg-orange-500 rounded-lg"></div>

        {!isFlying && (
          <>
            <div className={`absolute -bottom-2 left-3 w-4 h-6 bg-indigo-800 rounded-full ${isMoving ? 'animate-leg-l' : ''}`}></div>
            <div className={`absolute -bottom-2 right-3 w-4 h-6 bg-indigo-800 rounded-full ${isMoving ? 'animate-leg-r' : ''}`}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
