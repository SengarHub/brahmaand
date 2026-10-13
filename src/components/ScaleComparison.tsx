import React, { useState } from 'react';
import { Layers, ArrowUpRight, Info } from 'lucide-react';

interface StructureRef {
  name: string;
  height: number; // in meters
  city: string;
  completed: string;
  type: string;
  relativeScale: number; // relative to Bramhayaan (1600m)
  volumeScaleEstimate: number; // relative cubic mass factor
}

const STRUCTURES: StructureRef[] = [
  {
    name: 'Bramhayaan Megastructure',
    height: 1600,
    city: 'Shriharikota Aerospace Range, India',
    completed: 'Proposed Project Phase IV',
    type: 'Orbital Mass-Driver Spire',
    relativeScale: 1.0,
    volumeScaleEstimate: 8.0,
  },
  {
    name: 'Burj Khalifa',
    height: 828,
    city: 'Dubai, UAE',
    completed: '2010',
    type: 'Supertall Skyscraper',
    relativeScale: 0.5175,
    volumeScaleEstimate: 1.0,
  },
  {
    name: 'Merdeka 118',
    height: 679,
    city: 'Kuala Lumpur, Malaysia',
    completed: '2023',
    type: 'Supertall Skyscraper',
    relativeScale: 0.424,
    volumeScaleEstimate: 0.55,
  },
  {
    name: 'Empire State Building',
    height: 381,
    city: 'New York City, USA',
    completed: '1931',
    type: 'Art Deco Skyscraper',
    relativeScale: 0.238,
    volumeScaleEstimate: 0.12,
  },
  {
    name: 'Saturn V Rocket',
    height: 110.6,
    city: 'Kennedy Space Center, USA',
    completed: '1967',
    type: 'Chemical Moon Rocket',
    relativeScale: 0.069,
    volumeScaleEstimate: 0.003,
  },
];

export const ScaleComparison: React.FC = () => {
  const [selectedStructure, setSelectedStructure] = useState<StructureRef>(STRUCTURES[1]);

  // Atmospheric pressure formula: P = P0 * exp(-h / H), H ≈ 8400m
  const calculatePressureKpa = (h: number) => {
    return (101.325 * Math.exp(-h / 8400)).toFixed(1);
  };

  return (
    <section id="altitude-index" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
            Structural Altitude & Atmospheric Gradient
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The 1,600-Meter Dimensional Benchmark
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-mono">
          Scaling height linearly doubles vertical clearance, but scales structural cubic mass by a factor of ~8× (V ∝ h³), invalidating conventional building paradigms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Height Histogram Bar Graphic */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Comparative Structural Heights
            </span>
            <span className="text-xs font-mono text-emerald-400">Scale Baseline: 1,600m</span>
          </div>

          <div className="space-y-4">
            {STRUCTURES.map((item) => {
              const isSelected = selectedStructure.name === item.name;
              const isBramhayaan = item.name.includes('Bramhayaan');
              const percent = (item.height / 1600) * 100;

              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedStructure(item)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/50 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-baseline text-xs mb-1.5 font-mono">
                    <span className={`font-semibold ${isBramhayaan ? 'text-amber-400 text-sm' : 'text-slate-200'}`}>
                      {item.name} {isBramhayaan && '★'}
                    </span>
                    <span className="text-slate-300 tabular-nums font-bold">
                      {item.height.toLocaleString()} m <span className="text-slate-500 font-normal">({Math.round(item.height * 3.28084).toLocaleString()} ft)</span>
                    </span>
                  </div>

                  {/* Progress / Height Bar */}
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isBramhayaan
                          ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400'
                          : isSelected
                          ? 'bg-amber-400'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/90 text-xs text-slate-300 font-mono flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Square-Cube Law Implication:</strong> At 1,600m, self-weight compressive stress reaches ~185 MPa at the foundation pylons. Conventional structural steel yield stresses (~250 MPa) allow zero margin of safety; therefore, carbon-nanotube composite matrices (&gt;1,200 MPa) are mathematically mandatory.
            </span>
          </div>
        </div>

        {/* Right: Selected Structural Comparison Inspector & Atmospheric Gradient */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Detailed Comparison
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedStructure.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedStructure.type} · {selectedStructure.city}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {selectedStructure.height} m
                </span>
                <span className="block text-[11px] font-mono text-slate-400">
                  {((selectedStructure.height / 1600) * 100).toFixed(1)}% of Bramhayaan
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Atmospheric Pressure</span>
                <span className="text-base font-bold text-slate-200 tabular-nums">
                  {calculatePressureKpa(selectedStructure.height)} kPa
                </span>
                <span className="text-[10px] text-slate-500 block">Sea level: 101.3 kPa</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Air Density Reduction</span>
                <span className="text-base font-bold text-emerald-400 tabular-nums">
                  {((1 - Math.exp(-selectedStructure.height / 8400)) * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500 block">Aerodynamic drag drop</span>
              </div>
            </div>

            {/* Scale Ratio Highlight */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-400">Height Multiplier (H / H_ref):</span>
                <span className="text-white font-bold tabular-nums">
                  {(1600 / selectedStructure.height).toFixed(2)}×
                </span>
              </div>
              <div className="flex justify-between items-center font-mono">
                <span className="text-slate-400">Structural Volume Factor (~H³):</span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {Math.pow(1600 / selectedStructure.height, 3).toFixed(1)}×
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                Comparing Bramhayaan to {selectedStructure.name}: Elevating the launch apex to 1,600m allows spacecraft to avoid the thickest 18.2% of Earth&apos;s atmospheric pressure column, cutting maximum dynamic pressure (q_max) by 41% during hypersonic release.
              </p>
            </div>
          </div>

          {/* Quick Fact Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
            <span className="text-amber-400 font-semibold uppercase text-[10px] tracking-wider block">
              Astrophysics Engineering Fact
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              At 1,600m, the horizon distance extends to <strong className="text-white">143.1 kilometers</strong> [d ≈ √(2 · R_⊕ · h)], providing line-of-sight telemetry to downrange orbital recovery vessels stationed across the Bay of Bengal.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
