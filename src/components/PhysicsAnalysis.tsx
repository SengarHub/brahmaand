import React, { useState } from 'react';
import { Scale, AlertTriangle, Calculator, Sparkles } from 'lucide-react';

export const PhysicsAnalysis: React.FC = () => {
  // Interactive inputs for Tsiolkovsky Equation comparison
  const [structureMassTons, setStructureMassTons] = useState(150000); // 150,000 tons
  const [targetDeltaVKms, setTargetDeltaVKms] = useState(7.8); // 7.8 km/s for LEO
  const [engineIspSec, setEngineIspSec] = useState(450); // Hydrolox (LOX/LH2) Isp ≈ 450s

  // Calculations
  const g0 = 9.80665;
  const exhaustVelocity = engineIspSec * g0; // in m/s
  const deltaVMeters = targetDeltaVKms * 1000;
  const massRatio = Math.exp(deltaVMeters / exhaustVelocity);
  const propellantMassTons = structureMassTons * (massRatio - 1);
  const totalLaunchMassTons = structureMassTons + propellantMassTons;
  const baseWeightMeganewtons = (totalLaunchMassTons * 1000 * g0) / 1000000;

  return (
    <section id="gravitational-mechanics" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
            Astrophysical Fundamental
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Equivalence Principle & Mass Scaling Paradox
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-mono">
          Newtonian gravity accelerates all matter at g ≈ 9.81 m/s² regardless of mass, yet structural loads and propellant mass scale exponentially.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Theoretical Physics Exposition */}
        <div className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Galileo & Newton Formulation
              </span>
              <h3 className="text-lg font-bold text-white">Gravitational Acceleration Invariance</h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Whether analyzing an elemental point-particle or the 1,600-meter Bramhayaan megastructure, Earth’s gravitational acceleration near the surface remains strictly constant:
          </p>

          {/* Mathematical Formula Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono space-y-2">
            <div className="text-base sm:text-lg font-bold text-amber-400 tracking-wider">
              F = G · (M_⊕ · m) / R²  ⟹  a = F / m = g ≈ 9.80665 m/s²
            </div>
            <div className="text-[11px] text-slate-400">
              where G is Newton&apos;s constant, M_⊕ is Earth&apos;s mass, and R is Earth&apos;s radius (6,371 km).
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              While acceleration a = g is invariant of mass, <strong className="text-white">total gravitational weight (F_g = m · g)</strong> scales with volume. A 1,600-meter spire with a base footprint of 280 meters concentrates billions of newtons of downward force.
            </p>
            <p>
              Applying brute-force chemical rocket propulsion underneath such a megastructure triggers the mathematical catastrophe modeled on the right.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-5 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Why Traditional Rocketry Fails at Scale:
            </h4>
            
            <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">The Tsiolkovsky Rocket Trap:</strong>
                  <span className="text-slate-400 block mt-0.5">
                    Chemical fuel carries its own propellant mass penalty. Lifting multimegaton payloads requires an exponential propellant volume exceeding planetary manufacturing capacity.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Atmospheric Acoustic Shear & Tropospheric Bending:</strong>
                  <span className="text-slate-400 block mt-0.5">
                    Accelerating a 1.6 km aerodynamic column through Max-Q creates acoustic resonance waves that induce catastrophic structural buckling along the pylon spines.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Tsiolkovsky Impasse Model */}
        <div className="lg:col-span-6 bg-slate-900/90 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-slate-200 font-bold uppercase tracking-wider">
                Tsiolkovsky Rocket Equation Impasse
              </span>
            </div>
            <span className="text-[11px] font-mono text-rose-400">Δv = v_e · ln(m₀ / m_f)</span>
          </div>

          <div className="space-y-4">
            {/* Input 1: Structure Dry Mass */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Dry Structural Mass (m_f):</span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {structureMassTons.toLocaleString()} metric tons
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="5000"
                value={structureMassTons}
                onChange={(e) => setStructureMassTons(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20k tons (Lightweight frame)</span>
                <span>150k tons (Bramhayaan)</span>
                <span>500k tons (Solid core)</span>
              </div>
            </div>

            {/* Input 2: Target Delta V */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Target Velocity Increment (Δv):</span>
                <span className="text-cyan-400 font-bold tabular-nums">{targetDeltaVKms.toFixed(1)} km/s</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="11.2"
                step="0.2"
                value={targetDeltaVKms}
                onChange={(e) => setTargetDeltaVKms(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>3.0 km/s (Suborbital)</span>
                <span>7.8 km/s (LEO Orbit)</span>
                <span>11.2 km/s (Escape Velocity)</span>
              </div>
            </div>

            {/* Input 3: Chemical Specific Impulse (Isp) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Engine Specific Impulse (I_sp):</span>
                <span className="text-emerald-400 font-bold tabular-nums">{engineIspSec} seconds</span>
              </div>
              <div className="flex gap-2">
                {[
                  { name: 'Solid Booster (265s)', val: 265 },
                  { name: 'Keralox (320s)', val: 320 },
                  { name: 'Hydrolox (450s)', val: 450 },
                ].map((eng) => (
                  <button
                    key={eng.val}
                    onClick={() => setEngineIspSec(eng.val)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all border ${
                      engineIspSec === eng.val
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {eng.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mathematical Output Grid */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Required Propellant</span>
                <span className="text-lg font-bold text-rose-400 tabular-nums">
                  {Math.round(propellantMassTons).toLocaleString()} t
                </span>
                <span className="text-[10px] text-slate-500 block">{(propellantMassTons / structureMassTons).toFixed(1)}× dry mass</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Total Launch Mass</span>
                <span className="text-lg font-bold text-white tabular-nums">
                  {Math.round(totalLaunchMassTons).toLocaleString()} t
                </span>
                <span className="text-[10px] text-slate-500 block">{(massRatio).toFixed(2)} mass ratio</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Liftoff Pad Thrust Required:</span>
              <span className="text-amber-400 font-bold tabular-nums">
                {(baseWeightMeganewtons * 1.3).toFixed(0)} MegaNewtons
              </span>
            </div>
          </div>

          {/* Conclusion callout */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-mono flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>The Bramhayaan Solution:</strong> Eliminate chemical propellant completely at liftoff. Instead, mount a rotating skyhook array to transfer momentum mechanically, converting electrical grid energy into orbital delta-V!
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
