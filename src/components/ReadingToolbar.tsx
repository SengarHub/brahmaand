import React, { useState } from 'react';
import { Type, Bookmark, BookmarkCheck, ListFilter, Share2, Printer } from 'lucide-react';

interface ReadingToolbarProps {
  fontSizeLarge: boolean;
  onToggleFontSize: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export const ReadingToolbar: React.FC<ReadingToolbarProps> = ({
  fontSizeLarge,
  onToggleFontSize,
  onPrint,
  onShare,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [showToc, setShowToc] = useState(false);

  const sections = [
    { id: 'overview', label: '1. Executive Overview & 1,600m Spire' },
    { id: 'altitude-index', label: '2. Structural Altitude & Scale Index' },
    { id: 'gravitational-mechanics', label: '3. Gravitational Scaling & Rocket Trap' },
    { id: 'rotational-dynamics', label: '4. Rotational Arrays & Kinetic Injection' },
    { id: 'subsystems', label: '5. Subsystem Specs & Test Bench' },
    { id: 'discussion', label: '6. Peer Review & Technical Notes' },
    { id: 'references', label: '7. References & Bibliography' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl">
      {/* Table of contents popover */}
      {showToc && (
        <div className="absolute bottom-14 right-0 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl text-xs font-mono space-y-2">
          <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-200">Table of Contents</span>
            <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="space-y-1.5 pt-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setShowToc(false)}
                className="block p-1.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* TOC button */}
      <button
        onClick={() => setShowToc(!showToc)}
        className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Jump to Section"
      >
        <ListFilter className="w-4 h-4 text-amber-400" />
      </button>

      {/* Font Size Toggle */}
      <button
        onClick={onToggleFontSize}
        className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-colors flex items-center gap-1 ${
          fontSizeLarge ? 'bg-amber-400/20 text-amber-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
        }`}
        title="Toggle Font Size (Standard / Large)"
      >
        <Type className="w-3.5 h-3.5" />
        <span className="text-[11px]">{fontSizeLarge ? 'A+' : 'A'}</span>
      </button>

      {/* Bookmark Toggle */}
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title={bookmarked ? 'Bookmarked' : 'Bookmark Briefing'}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4 text-emerald-400" />
        ) : (
          <Bookmark className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Print */}
      <button
        onClick={onPrint}
        className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
        title="Print View / PDF"
      >
        <Printer className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
};
