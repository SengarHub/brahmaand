import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ScaleComparison } from './components/ScaleComparison.tsx';
import { PhysicsAnalysis } from './components/PhysicsAnalysis.tsx';
import { RotationalSimulator } from './components/RotationalSimulator.tsx';
import { SubsystemsExplorer } from './components/SubsystemsExplorer.tsx';
import { SpireCanvas } from './components/SpireCanvas.tsx';
import { DiscussionSection } from './components/DiscussionSection.tsx';
import { BibliographySection } from './components/BibliographySection.tsx';
import { ReadingToolbar } from './components/ReadingToolbar.tsx';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleFontSize = () => {
    setFontSizeLarge((prev) => !prev);
  };

  return (
    <div className={`min-h-screen bg-[#07090e] text-slate-100 flex flex-col ${fontSizeLarge ? 'text-[17px]' : 'text-[15px]'}`}>
      <span id="top" />

      {/* Top 3-Zone Navigation Bar with reading progress */}
      <Header onPrint={handlePrint} onShare={handleShare} copied={copied} />

      {/* Main Scientific Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section 1: Hero & Executive Briefing */}
        <HeroSection />

        {/* Section 2: Scale Index & Atmospheric Density Gradient */}
        <ScaleComparison />

        {/* Section 3: Galileo Invariance, Newtonian Gravity & Tsiolkovsky Rocket Trap */}
        <PhysicsAnalysis />

        {/* Section 4: Momentum Harvesting & Rotational Array Mechanics */}
        <RotationalSimulator />

        {/* Section 5: Subsystems Specifications & Prototype Test-Bench */}
        <SubsystemsExplorer />

        {/* Section 6: Spire 2D Launch Trajectory Canvas */}
        <SpireCanvas />

        {/* Section 7: Academic Peer Review & Readers Notes */}
        <DiscussionSection />

        {/* Section 8: References, Bibliography & Open License */}
        <BibliographySection />
      </main>

      {/* Floating Reading Toolbar */}
      <ReadingToolbar
        fontSizeLarge={fontSizeLarge}
        onToggleFontSize={handleToggleFontSize}
        onPrint={handlePrint}
        onShare={handleShare}
      />
    </div>
  );
}
