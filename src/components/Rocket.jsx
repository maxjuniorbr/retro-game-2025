import React from 'react';

const Rocket = ({ x, y, isFlying, flightPhase }) => {
  let rotation = 0;
  let thrust = false;

  if (isFlying) {
    if (flightPhase === 'liftoff') { rotation = 0; thrust = true; }
    if (flightPhase === 'cruise') { rotation = 90; thrust = true; }
    if (flightPhase === 'landing') { rotation = 0; thrust = true; }
  }

  return (
    <div
      className="absolute z-50 transition-all duration-300 ease-linear"
      style={{
        left: x,
        bottom: y,
        transform: `rotate(${rotation}deg)`
      }}
    >
      <div className="relative w-20 h-32">
        <div className="absolute bottom-0 -left-4 w-8 h-12 bg-red-600 rounded-l-lg skew-y-12"></div>
        <div className="absolute bottom-0 -right-4 w-8 h-12 bg-red-600 rounded-r-lg -skew-y-12"></div>

        <div className="absolute bottom-2 left-0 w-20 h-24 bg-slate-100 border-4 border-slate-300 rounded-b-xl overflow-hidden z-10 shadow-xl flex items-center justify-center">
          <div className="w-12 h-12 bg-sky-300 rounded-full border-4 border-slate-400"></div>
        </div>

        <div className="absolute top-0 left-0 w-20 h-16 bg-red-600 rounded-t-[100%] border-4 border-red-700 z-10"></div>

        {thrust && (
          <div className="absolute -bottom-16 left-4 w-12 h-20 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-md animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default Rocket;
