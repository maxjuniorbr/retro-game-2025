import React from 'react';

// Fighter Jet SVG Component
// Rotacionado 180deg para voar "para baixo"
export const FighterJet = ({ isShooting }) => (
    <div className="relative w-24 h-24 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] transform rotate-180">
        {/* Thruster Fire (Agora aponta para cima, pois o jato vai para baixo) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-4 h-12 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 blur-sm animate-pulse origin-top transform scale-y-150" />
        <div className="absolute left-[30%] bottom-2 w-2 h-8 bg-blue-400 blur-sm animate-pulse" />
        <div className="absolute right-[30%] bottom-2 w-2 h-8 bg-blue-400 blur-sm animate-pulse" />

        <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-100">
            {/* Wings */}
            <path d="M50 20 L20 80 L20 90 L50 70 L80 90 L80 80 Z" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <path d="M50 20 L10 60 L10 80 L50 50 L90 80 L90 60 Z" fill="#334155" opacity="0.8" />

            {/* Cockpit / Fuselage */}
            <path d="M50 5 L60 80 L50 95 L40 80 Z" fill="#cbd5e1" />
            <path d="M50 30 L55 50 L45 50 Z" fill="#3b82f6" className="animate-pulse" />

            {/* Guns */}
            {isShooting && (
                <>
                    <rect x="20" y="40" width="4" height="20" fill="#fff" className="animate-ping" />
                    <rect x="76" y="40" width="4" height="20" fill="#fff" className="animate-ping" />
                </>
            )}
        </svg>
    </div>
);
