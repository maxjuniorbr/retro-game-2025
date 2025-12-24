import React from 'react';
import { BarChart2, Calendar, Clock, Target } from 'lucide-react';
import { RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA } from '../../data/retrospectivaGamificadaDesktopData';

const CerimoniasSection = ({ playerX }) => {
  const total = RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.cerimonias.totalHours;
  const breakdown = RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.cerimonias.breakdown;
  const getIcon = (icon) => {
    if (icon === 'calendar') return <Calendar className="w-5 h-5" />;
    if (icon === 'bar') return <BarChart2 className="w-5 h-5" />;
    if (icon === 'target') return <Target className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const isHovered = playerX > 1100 && playerX < 2400;

  return (
    <div
      className="absolute left-[1300px] bottom-[150px] w-[950px] z-40 transition-transform duration-700 ease-out"
      style={{ transform: isHovered ? 'translateY(-200px)' : 'translateY(0)' }}
    >
      <div className="flex items-end justify-between gap-10">
        <div className="w-[420px]">
          <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-glow">Rituais</span>
          <h2 className="text-4xl font-black text-slate-800 mt-4 leading-tight">Cerimônias do Ciclo</h2>
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center"><Calendar className="w-7 h-7" /></div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-400">Total Investido</div>
                <div className="text-3xl font-black text-slate-800">~{total}h</div>
              </div>
            </div>
            <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex">
              {breakdown.map((b) => (<div key={b.label} className={b.color} style={{ width: `${(b.hours / total) * 100}%` }} title={b.label} />))}
            </div>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-5">
          {breakdown.map((b) => (
            <div key={b.label} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg text-white flex items-center justify-center ${b.color}`}>{getIcon(b.icon)}</div>
                <div className="font-bold text-slate-800">{b.label}</div>
              </div>
              <div className="text-2xl font-black text-slate-800">{b.hours}h</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CerimoniasSection;
