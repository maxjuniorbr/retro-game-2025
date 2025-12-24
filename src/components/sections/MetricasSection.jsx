import React from 'react';
import { GAME_DATA } from '../../data/gameData';

const MetricasSection = ({ playerX }) => {
  const isHovered = playerX > 10000 && playerX < 11000;

  return (
    <div
      className="absolute left-[10200px] bottom-[150px] z-40 transition-transform duration-700 ease-out"
      style={{ transform: isHovered ? 'translateY(-220px)' : 'translateY(0)' }}
    >
      <div className="flex gap-12 items-center">
        <div className="w-[400px]">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Performance Kanban</h2>
          <div className="grid grid-cols-2 gap-4">
            {GAME_DATA.metricas.quality.map((q, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-slate-800">{q.val}</div>
                <div className="text-xs text-slate-500 uppercase">{q.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-t-8 border-indigo-500 w-56">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Lead Time</div>
            <div className="text-4xl font-black text-indigo-600">{GAME_DATA.metricas.leadTime.value}</div>
            <div className="text-xs text-slate-500 mt-2 bg-slate-50 px-2 py-1 inline-block rounded">P85: {GAME_DATA.metricas.leadTimeP85}d</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border-t-8 border-emerald-500 w-56">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-wide">Cycle Time</div>
            <div className="text-4xl font-black text-emerald-600">{GAME_DATA.metricas.cycleTime.value}</div>
            <div className="text-xs text-slate-500 mt-2 bg-slate-50 px-2 py-1 inline-block rounded">P85: {GAME_DATA.metricas.cycleTimeP85}d</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricasSection;
