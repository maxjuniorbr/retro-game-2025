import React, { useEffect, useRef, useState } from 'react';
import Cloud from '../Cloud';
import GlobalStyles from '../GlobalStyles';
import Ground from '../Ground';
import Player from '../Player';
import Rocket from '../Rocket';
import CerimoniasSection from '../sections/CerimoniasSection';
import Ciclo1Section from '../sections/Ciclo1Section';
import EntregasSection from '../sections/EntregasSection';
import HeroSection from '../sections/HeroSection';
import MetricasSection from '../sections/MetricasSection';
import SpaceportSection from '../sections/SpaceportSection';
import TimelineSection from '../sections/TimelineSection';
import { BASE_GROUND, PLATFORMS, ROCKET_START_X, WORLD_WIDTH } from '../../data/retrospectivaGamificadaWorld';
import { playJump, playLand, playRocketLaunch, playVictory, initAudio } from '../../utils/audio';

const RetrospectivaGamificadaDesktop = () => {
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(130);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpVelocity, setJumpVelocity] = useState(0);

  const [touchInput, setTouchInput] = useState(null);

  const [rocketX, setRocketX] = useState(ROCKET_START_X);
  const [rocketY, setRocketY] = useState(130);
  const [isFlying, setIsFlying] = useState(false);
  const [flightPhase, setFlightPhase] = useState('ground');

  const MOVEMENT_SPEED = 6;
  const JUMP_FORCE = 25;
  const GRAVITY = 1.5;
  const PLAYER_WIDTH = 60;
  const WINDOW_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const ROCKET_CRUISE_Y = 720;
  const IMPACT_CARD_WIDTH = 900;
  const IMPACT_CARD_MARGIN_LEFT = 192;
  const impactSectionLeft = Math.max(
    0,
    WORLD_WIDTH - WINDOW_WIDTH / 2 - (IMPACT_CARD_MARGIN_LEFT + IMPACT_CARD_WIDTH / 2)
  );
  const ROCKET_CRUISE_X = impactSectionLeft + IMPACT_CARD_MARGIN_LEFT + IMPACT_CARD_WIDTH / 2;

  const keys = useRef({});
  const hasPlayedVictory = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      initAudio(); // Ensure audio is unlocked
      keys.current[e.code] = true;
      if (e.code === 'Space' && !isJumping && !isFlying) {
        setIsJumping(true);
        setJumpVelocity(JUMP_FORCE);
        playJump();
      }
    };
    const handleKeyUp = (e) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, isFlying]);

  const handlePointerDown = (e) => {
    initAudio(); // Ensure audio is unlocked
    e.preventDefault();
    const width = window.innerWidth;
    const x = e.clientX;
    const y = e.clientY;
    const isTopZone = y < window.innerHeight * 0.4;
    const isLeftZone = x < width * 0.4;
    const isRightZone = x > width * 0.6;

    const triggerJump = () => {
      if (!isJumping && !isFlying) {
        setIsJumping(true);
        setJumpVelocity(JUMP_FORCE);
        playJump();
      }
      setTouchInput('jump');
    };

    if (isTopZone) {
      triggerJump();
      return;
    }

    if (isLeftZone) {
      setTouchInput('left');
      return;
    }

    if (isRightZone) {
      setTouchInput('right');
      return;
    }

    triggerJump();
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    setTouchInput(null);
  };

  useEffect(() => {
    let animationFrameId;

    const updateGame = () => {
      if (isFlying) {
        let nextRx = rocketX;
        let nextRy = rocketY;

        if (rocketY < ROCKET_CRUISE_Y) {
          if (flightPhase === 'ground') {
            playRocketLaunch();
          }
          setFlightPhase('liftoff');
          nextRy += 4;
          nextRx += 1;
        } else {
          setFlightPhase('cruise');
          nextRx = Math.min(nextRx + 10, ROCKET_CRUISE_X);
          nextRy = ROCKET_CRUISE_Y;
          if (nextRx >= ROCKET_CRUISE_X && !hasPlayedVictory.current) {
            playVictory();
            hasPlayedVictory.current = true;
          }
        }

        setRocketX(nextRx);
        setRocketY(nextRy);

        if (isFlying) {
          setPlayerX(nextRx + 20);
          setPlayerY(nextRy + 40);
        }
      } else {
        let nextX = playerX;
        let nextY = playerY;
        let nextVy = jumpVelocity;
        let nextIsJumping = isJumping;

        if (keys.current['ArrowRight'] || keys.current['KeyD'] || touchInput === 'right') {
          nextX = Math.min(playerX + MOVEMENT_SPEED, WORLD_WIDTH);
          setDirection(1);
          setVelocity(MOVEMENT_SPEED);
        } else if (keys.current['ArrowLeft'] || keys.current['KeyA'] || touchInput === 'left') {
          nextX = Math.max(playerX - MOVEMENT_SPEED, 0);
          setDirection(-1);
          setVelocity(MOVEMENT_SPEED);
        } else {
          setVelocity(0);
        }

        if (Math.abs(nextX - rocketX) < 50 && !isFlying && rocketX === ROCKET_START_X) {
          setIsFlying(true);
        }

        nextVy -= GRAVITY;
        nextY += nextVy;

        let onPlatform = false;

        for (const platform of PLATFORMS) {
          const playerRight = nextX + PLAYER_WIDTH;
          const playerLeft = nextX;
          const platformRight = platform.x + platform.w;

          const isHorizontallyAligned = playerRight > platform.x && playerLeft < platformRight;

          const isAbovePlatform = playerY >= platform.topY;
          const willBeAtOrBelowPlatform = nextY <= platform.topY;
          const isFalling = nextVy < 0;

          if (isHorizontallyAligned && isAbovePlatform && willBeAtOrBelowPlatform && isFalling) {
            nextY = platform.topY;
            nextVy = 0;
            if (nextIsJumping) {
              // Landed
              playLand();
            }
            nextIsJumping = false;
            onPlatform = true;
            break;
          }
        }

        if (!onPlatform && nextY <= BASE_GROUND) {
          nextY = BASE_GROUND;
          nextVy = 0;
          if (nextIsJumping) {
            // Landed
            playLand();
          }
          nextIsJumping = false;
        }

        setPlayerX(nextX);
        setPlayerY(nextY);
        setJumpVelocity(nextVy);
        setIsJumping(nextIsJumping);
      }

      animationFrameId = requestAnimationFrame(updateGame);
    };

    animationFrameId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [playerX, playerY, jumpVelocity, isJumping, isFlying, rocketX, rocketY, touchInput, flightPhase]);

  const cameraOffset = Math.max(0, Math.min(playerX - WINDOW_WIDTH / 3, WORLD_WIDTH - WINDOW_WIDTH));

  const handleReturnToStart = () => {
    setPlayerX(100);
    setPlayerY(BASE_GROUND);
    setVelocity(0);
    setDirection(1);
    setIsJumping(false);
    setJumpVelocity(0);
    setTouchInput(null);
    setRocketX(ROCKET_START_X);
    setRocketY(130);
    setIsFlying(false);
    setFlightPhase('ground');
    hasPlayedVictory.current = false;
  };

  return (
    <div
      className="w-full h-screen overflow-hidden bg-slate-50 font-sans select-none relative"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <GlobalStyles />
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">RETROSPECTIVA <span className="text-indigo-600">GAMIFICADA</span></h1>
        <div className="bg-white/80 backdrop-blur px-3 py-1 rounded border border-slate-200 shadow-sm mt-2 inline-block">
          <span className="font-mono font-bold text-indigo-600">{Math.round(playerX)}m</span>
        </div>
      </div>

      {/* ... Victory Modal ... */}
      {isFlying && (
        <div className="fixed bottom-8 right-8 z-[100] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border-2 border-indigo-100 text-center animate-in slide-in-from-bottom duration-700 pointer-events-auto max-w-sm">
            <h2 className="text-xl font-black text-slate-800 mb-1">Jornada Concluída! 🚀</h2>
            <p className="text-slate-500 text-sm mb-4">Pronto para o próximo ciclo?</p>
            <button
              onClick={handleReturnToStart}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-md font-bold px-6 py-2 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}

      <div
        className="absolute top-0 h-full transition-transform duration-75 ease-linear will-change-transform"
        style={{ transform: `translateX(-${cameraOffset}px)` }}
      >
        <div className="absolute -top-20 left-0 w-[20000px] h-full bg-gradient-to-b from-blue-100 via-indigo-50 to-white -z-20"></div>
        <div className="relative h-full w-full">
          <Ground />

          <Cloud x={200} y={100} scale={1.2} />
          <Cloud x={600} y={50} scale={0.8} />
          <Cloud x={1500} y={150} scale={1.5} />
          <Cloud x={3000} y={80} scale={1} />
          <Cloud x={5000} y={120} scale={1.3} />

          {PLATFORMS.map((p) => (
            <div
              key={p.id}
              className="absolute bg-slate-800 border-t-4 border-indigo-500 rounded-sm shadow-xl"
              style={{ left: p.x, bottom: p.topY, width: p.w, height: 20 }}
            ></div>
          ))}

          <HeroSection playerX={playerX} onReturnToStart={handleReturnToStart} />
          <CerimoniasSection playerX={playerX} />
          <Ciclo1Section playerX={playerX} />
          <TimelineSection playerX={playerX} />
          <EntregasSection playerX={playerX} />
          <MetricasSection playerX={playerX} />
          <SpaceportSection leftX={impactSectionLeft} />

          <Rocket x={rocketX} y={rocketY} isFlying={isFlying} flightPhase={flightPhase} className="z-50" />

          {!isFlying && rocketX === ROCKET_START_X && (
            <div className="absolute animate-bounce" style={{ left: ROCKET_START_X, bottom: 280 }}>
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                DECOLAR! 🚀
              </div>
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-red-600 border-r-[10px] border-r-transparent mx-auto"></div>
            </div>
          )}

          <Player
            x={playerX}
            y={playerY}
            direction={direction}
            isMoving={velocity > 0}
            isJumping={isJumping}
            isFlying={isFlying}
            isHidden={isFlying}
          />
        </div>
      </div>
    </div>
  );
};

export default RetrospectivaGamificadaDesktop;
