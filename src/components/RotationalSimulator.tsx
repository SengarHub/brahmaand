import React, { useState } from 'react';
import { RotateCw, Zap, Gauge, Flame, CheckCircle2 } from 'lucide-react';

export const RotationalSimulator: React.FC = () => {
  const [rpm, setRpm] = useState<number>(14.5);
  const [radiusMeters, setRadiusMeters] = useState<number>(450); // Ring radius in meters
  const [payloadMassTons, setPayloadMassTons] = useState<number>(45); // Spacecraft payload

  // Physics formulas
  const omega = (2 * Math.PI * rpm) / 60; // rad/s
  const tipVelocityMps = omega * radiusMeters; // m/s
  const tipVelocityKmh = tipVelocityMps * 3.6; // km/h
  const machNumber = tipVelocityMps / 340.29; // Mach
  const centripetalAcceleration = Math.pow(omega, 2) * radiusMeters; // m/s²
  const gForce = centripetalAcceleration / 9.80665; // g-units

  // Ring mass estimation (12,000 tons for dual rings)
  const ringMassKg = 12000 * 1000;
  const storedKineticEnergyGj = (0.5 * ringMassKg * Math.pow(tipVelocityMps, 2)) / 1e9; // Gigajoules

  // Equivalent chemical fuel mass saved (hydrolox Isp 450s, equivalent delta-V)
  const equivalentDeltaVKms = tipVelocityMps / 1000;
  const fuelSavedPercent = Math.min(88, Math.round((tipVelocityMps / 1200) * 85));

  // Dynamic animation duration for the spinning ring: 60 / rpm seconds per rotation
  const rotationDuration = Math.max(0.8, Number((60 / rpm).toFixed(2)));

  return (
    <section id="rotational-dynamics" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
            Kinematic Propulsion Engineering
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Momentum Harvesting & Rotational Array Dynamics
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-md font-mono">
          Rotational arrays don&apos;t defy gravitation—they store grid-charged rotational kinetic energy in counter-balanced flywheels to fling payloads directly into low-Earth orbit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Physical Controls & Telemetry */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-cyan-400" />
                Dual-Toroid Gyroscope Calibration
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold tabular-nums">
                {rpm.toFixed(1)} RPM
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-5">
              {/* Slider 1: RPM */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Array Rotational Velocity:</span>
                  <span className="text-cyan-400 font-bold tabular-nums">{rpm.toFixed(1)} RPM ({omega.toFixed(2)} rad/s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1.0 RPM (Sub-critical)</span>
                  <span>14.5 RPM (Optimal Exchange)</span>
                  <span>30.0 RPM (Max Structural Limit)</span>
                </div>
              </div>

              {/* Slider 2: Array Radius */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Flywheel Array Radius (r):</span>
                  <span className="text-amber-400 font-bold tabular-nums">{radiusMeters} meters</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="800"
                  step="25"
                  value={radiusMeters}
                  onChange={(e) => setRadiusMeters(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>150 m (Compact spire ring)</span>
                  <span>450 m (Standard dual toroidal)</span>
                  <span>800 m (Maximum perimeter)</span>
                </div>
              </div>

              {/* Slider 3: Spacecraft Payload Mass */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Orbital Spacecraft Payload Mass:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{payloadMassTons} metric tons</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={payloadMassTons}
                  onChange={(e) => setPayloadMassTons(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 t (Small satellite constellation)</span>
                  <span>45 t (Gaganyaan-Max crew capsule)</span>
                  <span>120 t (Lunar transit module)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time calculated telemetry grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Tangential Tip Velocity</span>
              <span className="text-lg font-bold font-mono text-cyan-300 tabular-nums">
                {Math.round(tipVelocityMps)} m/s
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">Mach {machNumber.toFixed(2)}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Rim Centripetal Accel</span>
              <span className="text-lg font-bold font-mono text-amber-300 tabular-nums">
                {centripetalAcceleration.toFixed(0)} m/s²
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">{gForce.toFixed(1)} G-force</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Stored Kinetic Energy</span>
              <span className="text-lg font-bold font-mono text-emerald-300 tabular-nums">
                {storedKineticEnergyGj.toFixed(1)} GJ
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">Mechanical flywheel</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Chemical Fuel Saved</span>
              <span className="text-lg font-bold font-mono text-orange-400 tabular-nums">
                ~{fuelSavedPercent}%
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">Zero propellant burn</span>
            </div>
          </div>

          <div className="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-xs text-cyan-200 font-mono flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Kinetic Injection: At {rpm.toFixed(1)} RPM with a {radiusMeters}m radius, release at the apex imparts {tipVelocityMps.toFixed(0)} m/s tangential velocity directly at the 1,600m stratospheric threshold.
            </span>
          </div>
        </div>

        {/* Right Column: Visual Kinetic Gyroscope Animator */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              Live Kinetic Gyroscope Model
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
              {rotationDuration}s / rev
            </span>
          </div>

          {/* SVG Animated Torus */}
          <div className="relative aspect-square max-w-[280px] mx-auto flex items-center justify-center">
            {/* Ambient center glow */}
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl" />

            <svg viewBox="0 0 300 300" className="w-full h-full relative z-10">
              {/* Outer track */}
              <circle
                cx="150"
                cy="150"
                r="130"
                fill="none"
                stroke="#1e293b"
                strokeWidth="6"
                strokeDasharray="4 4"
              />

              {/* Counter-rotating Ring 1 (Clockwise) */}
              <g
                style={{
                  transformOrigin: '150px 150px',
                  animation: `spin ${rotationDuration}s linear infinite`,
                }}
              >
                <circle
                  cx="150"
                  cy="150"
                  r="115"
                  fill="none"
                  stroke="url(#ringGrad1)"
                  strokeWidth="8"
                  strokeDasharray="180 80"
                />
                <circle cx="150" cy="35" r="5" fill="#38bdf8" />
                <circle cx="150" cy="265" r="5" fill="#38bdf8" />
              </g>

              {/* Counter-rotating Ring 2 (Counter-Clockwise for zero angular net torque on spire) */}
              <g
                style={{
                  transformOrigin: '150px 150px',
                  animation: `spin ${rotationDuration}s linear infinite reverse`,
                }}
              >
                <circle
                  cx="150"
                  cy="150"
                  r="85"
                  fill="none"
                  stroke="url(#ringGrad2)"
                  strokeWidth="8"
                  strokeDasharray="120 60"
                />
                <circle cx="65" cy="150" r="4.5" fill="#f59e0b" />
                <circle cx="235" cy="150" r="4.5" fill="#f59e0b" />
              </g>

              {/* Center Spire Cross Section */}
              <circle cx="150" cy="150" r="28" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="150" cy="150" r="14" fill="#ff9933" />
              <circle cx="150" cy="150" r="4" fill="#ffffff" />

              {/* Gradients */}
              <defs>
                <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inline CSS animation keyframe for this component */}
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400">Net Angular Momentum (L_net):</span>
              <span className="text-emerald-400 font-bold">0.00 kg·m²/s (Balanced)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>Torque Cancellation:</strong> Two concentric rings spin in opposite directions at synchronized speeds. Their angular momentum vectors (+L and -L) sum to zero, preventing any torsional twisting force on the 1,600m spire foundation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
