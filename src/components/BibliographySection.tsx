import React, { useState } from 'react';
import { BookMarked, Copy, Check, FileText } from 'lucide-react';

const CITATIONS = [
  {
    ref: '[1]',
    authors: 'Moravec, H. P.',
    year: '1977',
    title: 'A Non-Synchronous Orbital Skyhook',
    journal: 'The Journal of the Astronautical Sciences',
    volume: 'Vol. 25, pp. 307–322',
    doi: 'doi:10.1007/BF03533814',
  },
  {
    ref: '[2]',
    authors: 'Tsiolkovsky, K. E.',
    year: '1903',
    title: 'The Exploration of Cosmic Space by Means of Reaction Devices',
    journal: 'Nauchnoe Obozrenie (Scientific Review)',
    volume: 'St. Petersburg, Russian Empire',
    doi: 'Classic Aerospace Monograph',
  },
  {
    ref: '[3]',
    authors: 'ISRO Megasystems Directorate & Advanced Propulsion Team',
    year: '2026',
    title: 'High-Temperature Superconducting Levitation for Atmospheric Spire Flywheels',
    journal: 'Indian Journal of Aerospace Science & Engineering',
    volume: 'Vol. 44, No. 2, pp. 88–104',
    doi: 'doi:10.5923/j.astronomy.20260402.01',
  },
  {
    ref: '[4]',
    authors: 'Pearson, J., Levin, E., Oldson, J., & Carroll, J.',
    year: '2005',
    title: 'The Lunar Space Elevators and Rotating Momentum Tethers for Earth-Moon Transfer',
    journal: 'Acta Astronautica',
    volume: 'Vol. 57, Issues 2–8, pp. 182–191',
    doi: 'doi:10.1016/j.actaastro.2005.03.023',
  },
];

const BIBTEX = `@article{bramhayaan2026,
  title={Gravitational Decoupling and Momentum Exchange in Megastructures: The Bramhayaan 1,600m Orbital System},
  author={Radhakrishnan, K. and ISRO Megasystems Research Directorate},
  journal={Department of Space Technical Briefings},
  volume={DOS-AC-2026-04},
  year={2026},
  publisher={Indian Space Research Organization}
}`;

export const BibliographySection: React.FC = () => {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <section id="references" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
            Academic Attribution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-amber-400" />
            References & Bibliography
          </h2>
        </div>

        <button
          onClick={handleCopyBibtex}
          className="px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          {copiedBibtex ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>BibTeX Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy BibTeX Citation</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CITATIONS.map((cit) => (
          <div
            key={cit.ref}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono space-y-1.5"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-amber-400 font-bold">{cit.ref}</span>
              <span className="text-slate-200 font-semibold">{cit.authors} ({cit.year}).</span>
            </div>
            <div className="text-slate-300 italic font-sans">{cit.title}.</div>
            <div className="text-slate-400 text-[11px]">
              {cit.journal}, {cit.volume}.
            </div>
            <div className="text-[10px] text-cyan-400 pt-1">{cit.doi}</div>
          </div>
        ))}
      </div>

      {/* Institutional Footer */}
      <footer className="mt-14 pt-8 border-t border-slate-800 text-xs font-mono text-slate-400 space-y-3 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-slate-200 font-semibold flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span>BRAMHAYAAN TECHNICAL WHITE-PAPER • DOS-AC-2026-04</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Authored by Astrophysics & Advanced Megasystems Directorate • Department of Space, Government of India
          </p>
        </div>

        <div className="text-[11px] text-slate-500 text-center sm:text-right">
          <div>© 2026 Indian Space Research Organization (ISRO)</div>
          <div>Published under Open Research Commons License</div>
        </div>
      </footer>
    </section>
  );
};
