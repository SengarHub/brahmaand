import React from 'react';
import { Compass, BookOpen, Clock, Building2, ShieldAlert } from 'lucide-react';
import heroImage from '../assets/images/bramhayaan_megastructure_1791905087923.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section id="overview" className="relative pt-6 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Article Unboxed Metadata Ribbon (Zero-Pill discipline) */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
        <span className="text-amber-400 font-semibold uppercase tracking-wider">
          ISRO Advanced Propulsion & Concepts Directorate
        </span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span>White-Paper Ref #DOS-AC-2026-04</span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span>Peer-Reviewed Technical Briefing</span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span className="text-slate-300">Published October 14, 2026</span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span className="inline-flex items-center gap-1 text-slate-300">
          <Clock className="w-3 h-3 text-slate-500" /> 12 min read
        </span>
      </div>

      {/* Main Grid: Headline and Editorial Abstract alongside Imagery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Title, Authorship, Core Abstract */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400/90 font-mono mb-2 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Orbital Mechanics & Structural Astrophysics
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Gravitational Decoupling & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">Momentum Exchange</span> in Megastructures
            </h1>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A rigorous analytical examination of the <strong className="text-white">Bramhayaan</strong>—a 1,600-meter orbital megastructure spire precisely twice the height of the Burj Khalifa. This briefing explores Newtonian mass equivalence, demonstrates the mathematical impasse of chemical propulsion at multimegaton scales, and models rotating gyroscopic skyhook arrays engineered to exchange orbital momentum without vertical propellant burns.
          </p>

          {/* Author Byline */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-white font-medium">Principal Investigator: Dr. K. Radhakrishnan & Megasystems Study Group</div>
              <div className="text-slate-400 font-mono text-[11px] mt-0.5">Computational Astro-mechanics Division, Bangalore Space Center</div>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 shrink-0 flex items-center gap-1">
              <span>● Status: Active Briefing</span>
            </div>
          </div>

          {/* Core Metric Highlights - Clean Hairline Panel */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-mono uppercase tracking-wider">Spire Apex Height</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">1,600 m</span>
              <span className="block text-[10px] text-slate-500 font-mono">5,250 ft (2.0× Burj Khalifa)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-mono uppercase tracking-wider">Propulsion Shift</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">0% Chem</span>
              <span className="block text-[10px] text-slate-500 font-mono">Rotovator skyhook transfer</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="block text-[11px] text-slate-400 font-mono uppercase tracking-wider">Rotational Speed</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums">12–25 RPM</span>
              <span className="block text-[10px] text-slate-500 font-mono">Counter-rotating ring array</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset with Technical Frame */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:h-full overflow-hidden">
            <img
              src={heroImage}
              alt="Bramhayaan 1,600-meter orbital megastructure spire rising through the stratospheric cloud deck with rotating gyroscopic momentum rings"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to public folder path if needed
                (e.currentTarget as HTMLImageElement).src = '/images/bramhayaan_megastructure_1791905087923.jpg';
              }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Scrim overlay with caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
              <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>FIG 1.0 — BRAMHAYAAN ORBITAL APEX PERSPECTIVE</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Architectural elevation rendering at 1,600m altitude. Twin electromagnetic momentum rings levitate around the central carbon-nanotube spire to decouple payload velocity from chemical fuel reserves.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Atmospheric Density at Apex: 0.825 atm</span>
            <span className="text-amber-400 font-semibold">Tricolor Core Spec v4.2</span>
          </div>
        </div>

      </div>
    </section>
  );
};
