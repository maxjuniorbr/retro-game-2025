import React, { useEffect, useRef, useState } from 'react';
import { Star, Target, Trophy } from 'lucide-react';
import { RETROSPECTIVA_GAMIFICADA_MOBILE_DATA } from '../../data/retrospectivaGamificadaMobileData';
import { FighterJet } from '../ui/UiFighterJet';
import { ChevronDoubleDown, ContentCard, ShieldBarrier } from '../ui/UiComponents';
import { playExplosion, playLaser, playRocketLaunch, playVictory, initAudio } from '../../utils/audio';

export default function RetrospectivaGamificadaMobile() {
    const [retrospectivaState, setRetrospectivaState] = useState({
        activeTargetId: null,
        unlockedIds: [],
        targets: {}, // { id: { hp: 100, maxHp: 100 } }
        isGameOver: false
    });
    const [isShooting, setIsShooting] = useState(false);
    const [score, setScore] = useState(0);

    const [hasStarted, setHasStarted] = useState(false);

    const sectionRefs = useRef({});
    const containerRef = useRef(null);
    const lastShotTime = useRef(0);

    // Initialize Targets HP
    useEffect(() => {
        const initialTargets = {};
        RETROSPECTIVA_GAMIFICADA_MOBILE_DATA.levels.forEach(level => {
            level.items?.forEach((_, i) => {
                initialTargets[`${level.id}-${i}`] = { hp: 100, maxHp: 100 };
            });
            if (level.type === 'boss') {
                initialTargets[level.id] = { hp: 300, maxHp: 300 }; // Boss has more HP
            }
        });
        setRetrospectivaState(prev => ({ ...prev, targets: initialTargets }));
    }, []);

    // Start Game Handler
    const handleStartGame = () => {
        initAudio();
        setHasStarted(true);
    };

    // Game Loop: Target Acquisition via Scroll & Collision Check
    useEffect(() => {
        if (!hasStarted) return;

        const handleScroll = () => {
            // "Mira" está posicionada logo abaixo do avião (que agora está no topo)
            // Ajustamos as zonas de gatilho para pegar elementos que estão entrando no meio da tela
            const triggerZoneStart = window.innerHeight * 0.3;
            const triggerZoneEnd = window.innerHeight * 0.8;

            // Jet Position (Fixed)
            // Top is 24 * 4 = 96px usually, let's say roughly 100px.
            // Height approx 60px.
            // Collision Zone: Top 80px to 160px.
            const jetCollisionTop = 80;
            const jetCollisionBottom = 160;

            let foundTarget = null;
            let collidedId = null;

            // Check elements
            Object.entries(sectionRefs.current).forEach(([id, el]) => {
                if (!el || retrospectivaState.unlockedIds.includes(id)) return;

                const rect = el.getBoundingClientRect();

                // 1. Shooting Zone Check
                if (rect.top < triggerZoneEnd && rect.bottom > triggerZoneStart) {
                    foundTarget = id;
                }

                // 2. Physical Collision Check (Ramming Speed!)
                // If the element slides UP into the jet (bottom of element passes top of jet zone, top of element is above bottom of jet zone)
                // Actually, simple check: does rect overlap vertical band [80, 160]?
                if (rect.top < jetCollisionBottom && rect.bottom > jetCollisionTop) {
                    collidedId = id;
                }
            });

            // Handle Collision (Instant Unlock)
            if (collidedId) {
                if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
                playExplosion();

                setRetrospectivaState(prev => {
                    if (prev.unlockedIds.includes(collidedId)) return prev;

                    const isBoss = collidedId === 'level-final';
                    if (isBoss) {
                        playVictory();
                        setTimeout(() => playRocketLaunch(), 500); // Trigger exit sound shortly after
                    }

                    return {
                        ...prev,
                        activeTargetId: null,
                        unlockedIds: [...prev.unlockedIds, collidedId],
                        targets: {
                            ...prev.targets,
                            [collidedId]: { ...prev.targets[collidedId], hp: 0 }
                        },
                        isGameOver: isBoss ? true : prev.isGameOver
                    };
                });
                setScore(s => s + 50); // Bonus for ramming
            }
            // Handle Shooting Target
            else if (foundTarget !== retrospectivaState.activeTargetId) {
                setRetrospectivaState(prev => ({ ...prev, activeTargetId: foundTarget }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [retrospectivaState.unlockedIds, retrospectivaState.activeTargetId, retrospectivaState.isGameOver, hasStarted]);

    // Shooting Logic
    useEffect(() => {
        if (!hasStarted) return;

        let fireInterval;

        if (retrospectivaState.activeTargetId && !retrospectivaState.isGameOver) {
            setIsShooting(true);

            fireInterval = setInterval(() => {
                // Play Laser Sound (Throttle: every 150ms for faster feel)
                const now = Date.now();
                if (now - lastShotTime.current > 150) {
                    playLaser();
                    lastShotTime.current = now;
                }

                setRetrospectivaState(prev => {
                    const id = prev.activeTargetId;
                    if (!id || prev.unlockedIds.includes(id)) return prev;

                    const currentHp = prev.targets[id]?.hp || 0;
                    const damage = 15; // FASTER UNLOCK (was 5)
                    const newHp = Math.max(0, currentHp - damage);

                    if (newHp <= 0) {
                        // Target Destroyed!
                        if (navigator.vibrate) navigator.vibrate(50);
                        playExplosion();

                        const isBoss = id === 'level-final';
                        if (isBoss) {
                            playVictory();
                            setTimeout(() => playRocketLaunch(), 500);
                        }

                        return {
                            ...prev,
                            activeTargetId: null,
                            unlockedIds: [...prev.unlockedIds, id],
                            targets: {
                                ...prev.targets,
                                [id]: { ...prev.targets[id], hp: 0 }
                            },
                            isGameOver: isBoss ? true : prev.isGameOver
                        };
                    }

                    return {
                        ...prev,
                        targets: {
                            ...prev.targets,
                            [id]: { ...prev.targets[id], hp: newHp }
                        }
                    };
                });

                // Add score for hit
                setScore(s => s + 10);

            }, 50); // Rapid fire speed
        } else {
            setIsShooting(false);
        }

        return () => clearInterval(fireInterval);
    }, [retrospectivaState.activeTargetId, retrospectivaState.isGameOver, hasStarted]);

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-950 font-mono text-slate-200 overflow-x-hidden cursor-crosshair pb-64 selection:bg-indigo-500 selection:text-white">
            <style>{`
        @keyframes laser {
          0% { height: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { height: 100vh; opacity: 0; }
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes flyAway {
            0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
            20% { transform: translate(-50%, 20px) scale(0.9); opacity: 1; }
            100% { transform: translate(-50%, -100vh) scale(0.5); opacity: 0; }
        }
        .shake-target { animation: shake 0.5s; }
        .fly-away-exit { animation: flyAway 2s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards; }
        .star-bg {
           background-image: 
             radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
             radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
             radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px);
           background-size: 550px 550px, 350px 350px, 250px 250px;
           background-position: 0 0, 40px 60px, 130px 270px;
        }
      `}</style>

            {/* --- BACKGROUND --- */}
            <div className="fixed inset-0 z-0 star-bg opacity-40"></div>
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 pointer-events-none"></div>

            {/* --- START OVERLAY --- */}
            {!hasStarted && (
                <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
                    <div className="animate-pulse mb-8 text-indigo-500">
                        <Target className="w-16 h-16" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-widest text-center">PILOT READY?</h1>
                    <p className="text-slate-400 text-sm mb-8 text-center max-w-xs">
                        Para uma melhor experiência, ative os sistemas de áudio e vibração.
                    </p>
                    <button
                        onClick={handleStartGame}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-12 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all transform hover:scale-105 active:scale-95 tracking-widest"
                    >
                        START MISSION
                    </button>
                    <div className="mt-8 text-[10px] text-slate-600 font-mono">
                        TAP TO INITIALIZE SYSTEMS
                    </div>
                </div>
            )}

            {/* --- HUD --- */}
            <div className={`fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-1000 ${retrospectivaState.isGameOver || !hasStarted ? 'opacity-0' : 'opacity-100'}`}>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-widest flex items-center gap-2">
                        <Target className="text-red-500 animate-pulse" />
                        SCORE: <span className="text-indigo-400 font-mono">{score.toString().padStart(6, '0')}</span>
                    </h1>
                    <div className="text-[10px] text-slate-400 mt-1">SQUAD VENDAS CAPTAÇÃO // PILOT MODE</div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase text-slate-500 mb-1">Status do Sistema</div>
                    <div className="flex gap-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${i < 3 ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-slate-700'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* --- FIGHTER JET (Hero) --- */}
            {/* POSIÇÃO: TOP (fixo no topo da tela ou animado na saída) */}
            <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-100 ease-out ${retrospectivaState.isGameOver ? 'fly-away-exit' : ''}`}>
                <FighterJet isShooting={isShooting && !retrospectivaState.isGameOver} />

                {/* Lasers: Disparam de cima para baixo */}
                {isShooting && !retrospectivaState.isGameOver && (
                    <>
                        <div className="absolute left-[20px] top-[60px] w-1 bg-cyan-400 h-[100vh] origin-top opacity-60 blur-[1px] shadow-[0_0_10px_cyan]" />
                        <div className="absolute right-[20px] top-[60px] w-1 bg-cyan-400 h-[100vh] origin-top opacity-60 blur-[1px] shadow-[0_0_10px_cyan]" />
                    </>
                )}
            </div>

            {/* --- INTRO SCREEN --- */}
            <div className="h-screen flex flex-col items-center justify-center relative z-10 p-6 text-center">
                <div className="animate-bounce mb-8 text-indigo-500">
                    <ChevronDoubleDown />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-4 tracking-tighter">
                    {RETROSPECTIVA_GAMIFICADA_MOBILE_DATA.intro.title}
                </h1>
                <div className="inline-block border border-indigo-500/50 bg-indigo-900/20 px-4 py-2 rounded mb-8 text-indigo-300 tracking-widest text-sm">
                    {RETROSPECTIVA_GAMIFICADA_MOBILE_DATA.intro.subtitle}
                </div>
                <p className="max-w-md text-slate-400 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4 text-left mx-auto">
                    {RETROSPECTIVA_GAMIFICADA_MOBILE_DATA.intro.briefing} <br />
                    <span className="text-yellow-400 font-bold block mt-2">&gt;&gt; ROLE PARA MERGULHAR</span>
                </p>
            </div>

            {/* --- LEVELS CONTAINER --- */}
            <div className="max-w-md mx-auto px-4 space-y-32 relative z-10">

                {RETROSPECTIVA_GAMIFICADA_MOBILE_DATA.levels.map((level) => (
                    <div key={level.id}>

                        {/* Level Header */}
                        <div className="flex items-center gap-4 mb-8 sticky top-48 z-0 opacity-80 mix-blend-screen">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-indigo-500"></div>
                            <h2 className="text-xl font-bold text-indigo-400 uppercase tracking-widest whitespace-nowrap glow-text">
                                {level.title}
                            </h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-indigo-500"></div>
                        </div>

                        <div className="space-y-12">
                            {/* CONTENT ITEMS */}
                            {level.type !== 'boss' && level.items.map((item, idx) => {
                                const itemId = `${level.id}-${idx}`;
                                const isLocked = !retrospectivaState.unlockedIds.includes(itemId);
                                const isTargeted = retrospectivaState.activeTargetId === itemId;

                                return (
                                    <div
                                        key={idx}
                                        id={itemId}
                                        ref={el => sectionRefs.current[itemId] = el}
                                        className={`relative transition-transform duration-100 ${isTargeted ? 'scale-105 shake-target' : ''}`}
                                    >
                                        <ContentCard isLocked={isLocked}>
                                            {/* SHIELD OVERLAY */}
                                            <ShieldBarrier
                                                hp={retrospectivaState.targets[itemId]?.hp || 0}
                                                maxHp={100}
                                                isLocked={isLocked}
                                            />

                                            {/* ACTUAL CONTENT (Revealed) */}
                                            {!isLocked && (
                                                <div className="animate-fade-in-up">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="text-xs font-bold text-indigo-400 uppercase">{item.tag || "INTEL"}</div>
                                                        {level.type === 'wins' && <Trophy className="w-4 h-4 text-yellow-500" />}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                                    {item.stat && (
                                                        <div className="mt-3 inline-block bg-indigo-900/50 border border-indigo-500/30 px-2 py-1 rounded text-xs font-mono text-cyan-300">
                                                            {item.stat}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </ContentCard>
                                    </div>
                                );
                            })}

                            {/* BOSS FIGHT (Summary) */}
                            {level.type === 'boss' && (
                                <div
                                    id={level.id}
                                    ref={el => sectionRefs.current[level.id] = el}
                                    className={`relative ${retrospectivaState.activeTargetId === level.id ? 'shake-target' : ''}`}
                                >
                                    <div className={`relative bg-black border-4 ${retrospectivaState.unlockedIds.includes(level.id) ? 'border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.5)]' : 'border-red-600'} rounded-2xl p-8 overflow-hidden min-h-[400px] flex flex-col justify-center`}>

                                        <ShieldBarrier
                                            hp={retrospectivaState.targets[level.id]?.hp || 0}
                                            maxHp={300}
                                            isLocked={!retrospectivaState.unlockedIds.includes(level.id)}
                                        />

                                        {!retrospectivaState.unlockedIds.includes(level.id) ? null : (
                                            <div className="text-center animate-zoom-in">
                                                <Star className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-spin-slow" />
                                                <h2 className="text-3xl font-black text-white mb-8 tracking-widest">MISSION ACCOMPLISHED</h2>

                                                <div className="grid grid-cols-2 gap-4">
                                                    {level.stats.map((stat, sIdx) => (
                                                        <div key={sIdx} className="bg-slate-900 p-4 rounded border border-slate-800">
                                                            <div className="text-2xl font-black text-indigo-400">{stat.val}</div>
                                                            <div className="text-[10px] text-slate-500 uppercase">{stat.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-8 text-xs text-slate-600 font-mono">
                                                    END OF TRANSMISSION
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                ))}

                <div className="h-48 flex items-center justify-center text-slate-600 text-xs tracking-widest">
                    RETROSPECTIVA ENGINE V2.5
                </div>
            </div>

        </div>
    );
}
