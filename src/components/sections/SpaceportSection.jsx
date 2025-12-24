import React from 'react';
import { RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA } from '../../data/retrospectivaGamificadaDesktopData';

const SpaceportSection = ({ leftX }) => (
  <div className="absolute bottom-[150px] z-40" style={{ left: leftX }}>
    <div className="relative">
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-16 rounded-[40px] shadow-2xl relative overflow-hidden w-[900px] border-4 border-slate-700 ml-48">
        <div className="relative z-10 text-center">
          <div className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-bold mb-6 border border-white/30">
            🚀 MISSÃO CUMPRIDA
          </div>
          <h2 className="text-5xl font-black mb-8">Impacto Total 2025</h2>

          <div className="grid grid-cols-5 gap-4 mb-8">
            {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.impacto.cards.map((card, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-black mb-2">{card.val}</div>
                <div className="text-indigo-200 text-[10px] font-bold uppercase leading-tight">{card.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {RETROSPECTIVA_GAMIFICADA_DESKTOP_DATA.impacto.tags.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-indigo-500/80 rounded-full text-sm font-bold shadow-lg">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 text-slate-400 text-sm font-mono">
            PRÓXIMA PARADA: CICLO 1/2026 • SQUAD VENDAS CAPTAÇÃO
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SpaceportSection;
