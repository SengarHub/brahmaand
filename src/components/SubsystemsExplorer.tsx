import React, { useState } from 'react';
import { Layers, Shield, Cpu, Anchor, CheckCircle, ExternalLink } from 'lucide-react';

interface SubsystemSpec {
  id: 'core' | 'arrays' | 'skyhook';
  title: string;
  badge: string;
  subtitle: string;
  overview: string;
  cards: {
    index: string;
    label: string;
    title: string;
    description: string;
    specs: { key: string; value: string }[];
  }[];
}

const SUBSYSTEMS_DATA: SubsystemSpec[] = [
  {
    id: 'core',
    title: 'Core Megastructure',
    badge: 'Structural Base & Spire',
    subtitle: '1,600m Aerodynamic Carbon-Nanotube Spire',
    overview:
      'The central spire provides the structural backbone for electromagnetic levitation rails, cryogenic power lines, and payload staging elevators.',
    cards: [
      {
        index: '01',
        label: 'Structural Foundation',
        title: 'Non-Combustible Maglev Base Platform',
        description:
          'A circular reinforced foundation footprint measuring 320 meters in diameter, utilizing active electromagnetic levitation to dampen seismic vibrations and guide vertical clearance.',
        specs: [
          { key: 'Footprint Diameter', value: '320 meters' },
          { key: 'Compensated Load', value: '2.4 × 10⁸ N' },
          { key: 'Levitation Clearance', value: '45 mm active gap' },
        ],
      },
      {
        index: '02',
        label: 'Composite Alloy Hull',
        title: 'Carbon-Nanotube Reinforced Matrix',
        description:
          'Advanced multi-layered composite alloys engineered to withstand compressive loads equivalent to twice the Burj Khalifa’s static mass while preserving flexural elasticity under high-altitude jet streams.',
        specs: [
          { key: 'Yield Strength', value: '1,450 MPa' },
          { key: 'Young’s Modulus', value: '480 GPa' },
          { key: 'Thermal Expansion', value: '< 1.2 × 10⁻⁶ / K' },
        ],
      },
      {
        index: '03',
        label: 'National Branding & Insignia',
        title: 'Indian Tricolor & Telemetry Nodes',
        description:
          'Prominently emblazoned with the national flag motif and optical alignment retro-reflectors, coordinating millimeter-accurate orbital docking telemetry with ISRO tracking stations.',
        specs: [
          { key: 'Laser Telemetry', value: '1,550 nm LIDAR array' },
          { key: 'Tracking Grid', value: '0.2 mm optical tolerance' },
          { key: 'Power Feeder', value: 'High-temp Superconductor' },
        ],
      },
    ],
  },
  {
    id: 'arrays',
    title: 'Rotation Arrays',
    badge: 'Momentum Flywheels',
    subtitle: 'Dual Counter-Rotating Toroidal Momentum Flywheels',
    overview:
      'Toroidal vacuum-jacketed flywheels spinning in opposite directions around the spire to store gigajoules of mechanical energy and decouple payload launch from chemical propellants.',
    cards: [
      {
        index: '01',
        label: 'Momentum Rings',
        title: 'Dual Gyroscopic Ring Arrays',
        description:
          'Massive rotating toroidal rings levitated on non-contact high-temperature superconductor (HTS) tracks spinning around the central spire to store kinetic energy before payload handoff.',
        specs: [
          { key: 'Ring Diameter', value: '450–900 meters' },
          { key: 'Angular Velocity', value: 'Up to 30 RPM' },
          { key: 'Bearing Mechanism', value: 'HTS Magnetic Levitation' },
        ],
      },
      {
        index: '02',
        label: 'Gravity Compensation',
        title: 'Centrifugal Force Balancing & Vectoring',
        description:
          'Directs vector forces outward to relieve compressive stress on the lower pylons during critical launch phases, preventing static fatigue along the tower foundation.',
        specs: [
          { key: 'Outward Pre-Stress', value: '38 MPa vector relief' },
          { key: 'Torque Cancellation', value: '±0.02% net zero' },
          { key: 'Vacuum Shroud', value: '< 10⁻³ Pa envelope' },
        ],
      },
      {
        index: '03',
        label: 'Energy Conservation',
        title: 'Zero-Propellant Kinetic Slingshot',
        description:
          'Reduces chemical propellant dependency by up to 85% by trading angular momentum for initial orbital injection velocity, charged directly from national clean grid solar power.',
        specs: [
          { key: 'Fuel Mass Reduction', value: '~85% chemical cut' },
          { key: 'Grid Recharge Rate', value: '120 MW solar tap' },
          { key: 'Launch Cadence', value: 'Every 42 minutes' },
        ],
      },
    ],
  },
  {
    id: 'skyhook',
    title: 'Skyhook Interface',
    badge: 'Orbital Tether Apex',
    subtitle: 'Apex Tether Terminal & Orbital Catch Loop',
    overview:
      'Mounted at the 1,600m apex, the skyhook interface couples high-altitude atmospheric stabilization with magnetic grapple clamps to catch returning vessels and launch outbound payloads.',
    cards: [
      {
        index: '01',
        label: 'Upper Terminal',
        title: 'High-Altitude Tether Interface at 1,600m',
        description:
          'Located at the megastructure apex, featuring magnetic grapple clamps and linear induction rails that accelerate orbital craft through the upper boundary of the boundary atmospheric layer.',
        specs: [
          { key: 'Terminal Altitude', value: '1,600 meters AGL' },
          { key: 'Linear Rail Accel', value: '4.5 G max human-rated' },
          { key: 'Clamping Speed', value: '< 4 milliseconds lock' },
        ],
      },
      {
        index: '02',
        label: 'Atmospheric Shear Control',
        title: 'Stratospheric Active Stabilization Dampers',
        description:
          'Active tuned-mass dampening systems positioned in the upper 400 meters counteract high-altitude jet stream pressures and boundary vortex shedding to maintain absolute structural alignment.',
        specs: [
          { key: 'Tuned Mass', value: '850 metric tons active' },
          { key: 'Wind Tolerance', value: 'Up to 280 km/h gusts' },
          { key: 'Deflection Limit', value: '< 1.4 m apex sway' },
        ],
      },
      {
        index: '03',
        label: 'Return Trajectory',
        title: 'Gravitational Catch Loop & Momentum Recovery',
        description:
          'Recovers returning spacecraft by matching rotational velocities, recapturing orbital potential energy and converting it back into electrical grid power for subsequent launches.',
        specs: [
          { key: 'Kinetic Recovery', value: '62% energy recaptured' },
          { key: 'Thermal Shielding', value: 'Zero atmospheric entry burn' },
          { key: 'Reusability', value: '100% rapid turn-around' },
        ],
      },
    ],
  },
];

export const SubsystemsExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'arrays' | 'skyhook'>('core');

  const activeSubsystem = SUBSYSTEMS_DATA.find((s) => s.id === activeTab)!;

  return (
    <section id="subsystems" className="py-10 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
            Engineering Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Bramhayaan Subsystem Specifications
          </h2>
        </div>

        {/* Tab Controls (Functional buttons, single-line controls) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('core')}
            className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'core'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Core Spire
          </button>
          <button
            onClick={() => setActiveTab('arrays')}
            className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'arrays'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rotation Arrays
          </button>
          <button
            onClick={() => setActiveTab('skyhook')}
            className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
              activeTab === 'skyhook'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Skyhook Tether
          </button>
        </div>
      </div>

      {/* Subsystem Header Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-amber-400 uppercase font-semibold">{activeSubsystem.badge}</span>
            <span className="text-slate-600">/</span>
            <h3 className="text-lg font-bold text-white">{activeSubsystem.subtitle}</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{activeSubsystem.overview}</p>
        </div>
        <div className="text-xs font-mono text-emerald-400 shrink-0 flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Validated in Simulation v4.2</span>
        </div>
      </div>

      {/* 3 Technical Subsystem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {activeSubsystem.cards.map((card) => (
          <div
            key={card.index}
            className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                {card.index} · {card.label}
              </div>
              <h4 className="text-base font-bold text-white mb-2 leading-snug">{card.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{card.description}</p>
            </div>

            <div className="border-t border-slate-800/80 pt-3 space-y-1.5 font-mono text-[11px]">
              {card.specs.map((spec) => (
                <div key={spec.key} className="flex justify-between items-center text-slate-400">
                  <span>{spec.key}:</span>
                  <span className="text-slate-200 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Test-Bench Laboratory Technical Photography Callout */}
      <div className="rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Laboratory Verification & Prototype Hardware</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Momentum Ring Test-Bench & Induction Array
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Experimental 1:50 scale electromagnetic levitation and momentum induction bench evaluated at the Advanced Concepts Propulsion Rig in Bangalore. 
            </p>
            
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Levitation Coils:</span>
                <span className="text-cyan-400 font-semibold">Dual YBCO Superconductors</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Drive Induction Coils:</span>
                <span className="text-amber-400 font-semibold">Polyphase Linear Stator</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Tested Levitation Gap:</span>
                <span className="text-emerald-400 font-semibold">4.2 mm @ 77 Kelvin</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            Documented under ISRO Propulsion Report #DOS-TR-2026-91
          </div>
        </div>

        <div className="lg:col-span-7 relative bg-slate-950">
          <img
            src="/src/assets/images/momentum_ring_lattice_1791905111187.jpg"
            alt="Aerospace laboratory test bench testing electromagnetic momentum transfer coils and carbon-nanotube levitation track"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover max-h-[380px] lg:max-h-full"
          />
        </div>
      </div>
    </section>
  );
};
