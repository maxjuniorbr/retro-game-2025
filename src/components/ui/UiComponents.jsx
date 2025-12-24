import React from 'react';
import { Lock } from 'lucide-react';

export const ShieldBarrier = ({ hp, maxHp, isLocked }) => {
    if (!isLocked) return null;

    const percentage = (hp / maxHp) * 100;

    return (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm border-2 border-red-500/50 rounded-xl overflow-hidden transition-all duration-100">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="z-10 text-center animate-pulse">
                <Lock className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <h3 className="text-red-500 font-mono font-bold text-xl tracking-widest">LOCKED</h3>
                <div className="text-red-400 text-xs font-mono mt-1">ARMOR INTEGRITY</div>
            </div>

            {/* Health Bar */}
            <div className="absolute bottom-10 left-10 right-10 h-2 bg-red-900 rounded-full overflow-hidden">
                <div
                    className="h-full bg-red-500 transition-all duration-75 ease-linear shadow-[0_0_10px_red]"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export const ContentCard = ({ children, isLocked }) => (
    <div className={`relative bg-slate-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 border border-slate-700 ${isLocked ? 'scale-95 opacity-50' : 'scale-100 opacity-100 border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.3)]'}`}>
        {/* Header Decoration */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

        <div className="p-6 relative min-h-[160px]">
            {children}
        </div>
    </div>
);

export const ChevronDoubleDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
    </svg>
);
