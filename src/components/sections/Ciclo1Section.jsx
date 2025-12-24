import React from 'react';
import { Database } from 'lucide-react';
import { RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA } from '../../data/retrospectivaGamificadaDesktopData';

const Ciclo1Section = ({ playerX }) => {
  const isHeaderHovered = playerX > 2500 && playerX < 4500;

  return (
    <div className="absolute left-[2600px] bottom-[150px] z-40">
      <div
        className="flex flex-col items-center mb-12 relative z-[70] transition-transform duration-700 ease-out"
        style={{ transform: isHeaderHovered ? 'translateY(-250px)' : 'translateY(0)' }}
      >
        <h2 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
          <Database className="w-10 h-10 text-indigo-600" />
          {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.ciclo1.title}
        </h2>
        <p className="text-slate-500">{RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.ciclo1.subtitle}</p>
      </div>
      <div className="flex gap-20">
        {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.ciclo1.items.map((item, idx) => {
          const myZoneX = 2600 + (idx * (256 + 80));
          const isHovered = playerX > myZoneX - 100 && playerX < myZoneX + 256 + 100;

          return (
            <div
              key={idx}
              className="relative group transition-transform duration-500 ease-out z-[60]"
              style={{ transform: isHovered ? 'translateY(-200px)' : 'translateY(0)' }}
            >
              <div className="w-64 bg-white p-6 rounded-xl shadow-lg border-2 border-slate-200 group-hover:border-indigo-500 transition-colors relative z-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600 font-bold">{idx + 1}</div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 h-20 opacity-50"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ciclo1Section;
