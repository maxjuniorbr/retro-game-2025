import React from 'react';
import { CheckCircle, Clock, Shield, Trophy, Zap } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

const EntregasSection = ({ playerX }) => {
  const isHeaderHovered = playerX > 8100 && playerX < 10000;

  return (
    <div className="absolute left-[8200px] bottom-[150px] z-40">
      <div
        className="text-center mb-16 relative z-[70] transition-transform duration-700 ease-out"
        style={{ transform: isHeaderHovered ? 'translateY(-250px)' : 'translateY(0)' }}
      >
        <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">Big Wins</span>
        <h2 className="text-4xl font-bold text-slate-800 mt-2">Principais Entregas</h2>
      </div>
      <div className="flex gap-32">
        {GAME_DATA.entregas.map((entrega, idx) => {
          const myZoneX = 8200 + (idx * (320 + 128));
          const isHovered = playerX > myZoneX - 100 && playerX < myZoneX + 320 + 100;

          return (
            <div
              key={idx}
              className="relative w-80 transition-transform duration-500 ease-out z-[60]"
              style={{ transform: isHovered ? 'translateY(-250px)' : 'translateY(0)' }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105 border border-slate-100 z-10 relative">
                <div className={`h-24 flex items-center justify-center ${idx === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : idx === 1 ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : idx === 2 ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-pink-500 to-purple-600'}`}>
                  {idx === 0 && <Trophy className="text-white w-12 h-12" />}
                  {idx === 1 && <Clock className="text-white w-12 h-12" />}
                  {idx === 2 && <Shield className="text-white w-12 h-12" />}
                  {idx === 3 && <Zap className="text-white w-12 h-12" />}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{entrega.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold mb-4">{entrega.subtitle}</p>
                  <ul className="space-y-2">
                    {entrega.stats.map((stat, sIdx) => (
                      <li key={sIdx} className="flex items-center text-slate-600 text-xs font-medium">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" /> {stat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute -bottom-10 left-4 right-4 h-4 bg-black opacity-10 blur-xl rounded-full"></div>
              <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-1 bg-amber-200 h-40 opacity-30"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EntregasSection;
