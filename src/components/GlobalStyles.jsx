import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes wobble {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    @keyframes leg-l {
      0%, 100% { transform: rotate(-15deg); }
      50% { transform: rotate(15deg); }
    }
    @keyframes leg-r {
      0%, 100% { transform: rotate(15deg); }
      50% { transform: rotate(-15deg); }
    }
    @keyframes blink {
      0%, 90% { opacity: 1; }
      95% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes bounce-short {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10%); }
    }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-wobble { animation: wobble 0.5s ease-in-out infinite; }
    .animate-leg-l { animation: leg-l 0.5s ease-in-out infinite; }
    .animate-leg-r { animation: leg-r 0.5s ease-in-out infinite; }
    .animate-blink { animation: blink 4s infinite; }
    .animate-bounce-short { animation: bounce-short 0.5s infinite; }
    .shadow-glow { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
  `}</style>
);

export default GlobalStyles;
