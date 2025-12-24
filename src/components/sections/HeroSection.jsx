import React from 'react';
import { RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA } from '../../data/retrospectivaGamificadaDesktopData';

const HeroSection = ({ playerX, onReturnToStart }) => {
  const isHovered = playerX < 1000;

  return (
    <div
      className="absolute left-[200px] bottom-[150px] w-[800px] z-40 transition-transform duration-700 ease-in-out"
      style={{ transform: isHovered ? 'translateY(-100px)' : 'translateY(0)', opacity: isHovered ? 1 : 0.5 }}
    >
      <div className="animate-float">
        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-glow">Squad Vendas Captação</span>
        <h1 className="text-6xl font-black text-slate-800 mt-4 leading-tight">
          {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.hero.title}
          <span className="block text-3xl text-indigo-600 font-medium mt-2">{RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.hero.subtitle}</span>
        </h1>
        <p className="text-slate-600 mt-4 text-lg max-w-lg">{RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.hero.description}</p>

        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-slate-200 rounded text-xs font-bold text-slate-700">Setas: Mover</span>
          <span className="px-2 py-1 bg-slate-200 rounded text-xs font-bold text-slate-700">Espaço: Pular</span>
        </div>
      </div>

      <div className="flex gap-6 mt-12">
        {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.hero.stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-indigo-500 transform hover:-translate-y-2 transition-transform">
            <div className="text-4xl font-bold text-indigo-700">{stat.value}</div>
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
