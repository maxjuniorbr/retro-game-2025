import React from 'react';
import { RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA } from '../../data/retrospectivaGamificadaDesktopData';

const TimelineSection = ({ playerX }) => {
  const isHeaderHovered = playerX > 4600 && playerX < 7500;

  return (
    <div className="absolute left-[4700px] bottom-[150px] z-40">
      <div
        className="mb-16 relative z-[70] transition-transform duration-700 ease-out"
        style={{ transform: isHeaderHovered ? 'translateY(-250px)' : 'translateY(0)' }}
      >
        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">Jornada</span>
        <h2 className="text-4xl font-bold text-slate-800 mt-2">Linha do Tempo - Ciclo 2</h2>
      </div>
      <div className="flex items-end gap-0">
        {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.timeline.map((item, idx) => {
          const myZoneX = 4700 + (idx * 300);
          const isHovered = playerX > myZoneX - 100 && playerX < myZoneX + 300 + 100;

          return (
            <div
              key={idx}
              className="relative w-[300px] group transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? 'translateY(-200px)' : 'translateY(0)' }}
            >
              <div className="absolute bottom-8 left-0 w-full h-2 bg-slate-200"></div>
              <div className="absolute bottom-6 left-1/2 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-lg z-10 transform -translate-x-1/2 group-hover:scale-125 transition-transform"></div>
              <div className={`mb-16 mx-4 p-5 rounded-xl shadow-xl transition-all duration-300 transform group-hover:-translate-y-4 ${item.type === 'biz' ? 'bg-blue-50 border-l-4 border-blue-500' : item.type === 'tech' ? 'bg-purple-50 border-l-4 border-purple-500' : 'bg-white border-l-4 border-slate-300'}`}>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">{item.month}</span>
                <h4 className="font-bold text-slate-800 mb-2 leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSection;
