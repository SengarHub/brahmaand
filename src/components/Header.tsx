import React, { useEffect, useState } from 'react';
import { Share2, Check, Printer } from 'lucide-react';

interface HeaderProps {
  onPrint: () => void;
  onShare: () => void;
  copied: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onPrint, onShare, copied }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Bar - 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Bramhayaan Briefing</span>
          </a>

          {/* Zone 2: 4–5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-300">
            <a
              href="#overview"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#altitude-index"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Scale Index
            </a>
            <a
              href="#gravitational-mechanics"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Gravitational Scaling
            </a>
            <a
              href="#rotational-dynamics"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Rotational Simulator
            </a>
            <a
              href="#subsystems"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Subsystems
            </a>
            <a
              href="#discussion"
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Peer Notes
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onShare}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              title="Copy share link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Briefing</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
