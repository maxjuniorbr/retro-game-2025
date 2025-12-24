import React, { useEffect, useState } from 'react';
import RetrospectivaGamificadaDesktop from './components/desktop/RetrospectivaGamificadaDesktop';
import RetrospectivaGamificadaMobile from './components/mobile/RetrospectivaGamificadaMobile';

export default function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkDevice = () => {
            // Check width and user agent (with iPad desktop-mode fallback)
            const width = window.innerWidth;
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const isTouchDevice = navigator.maxTouchPoints > 1;
            const isIpadDesktop = navigator.platform === 'MacIntel' && isTouchDevice;
            const isMobileUA = /android|iphone|ipod|iemobile|blackberry|mobile/i.test(userAgent.toLowerCase());
            const isTabletUA = /tablet|playbook|silk/i.test(userAgent.toLowerCase());
            const isMobileDevice = (navigator.userAgentData?.mobile ?? false) || isMobileUA || isTabletUA || isIpadDesktop;

            // Use mobile view only for explicit mobile/tablet devices
            setIsMobile(isMobileDevice);
            setChecking(false);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    if (checking) return <div className="min-h-screen bg-slate-950" />;

    return isMobile ? <RetrospectivaGamificadaMobile /> : <RetrospectivaGamificadaDesktop />;
}
