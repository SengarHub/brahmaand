import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Crosshair, Sparkles } from 'lucide-react';

export const SpireCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [telemetry, setTelemetry] = useState({
    altitude: 0,
    velocity: 0,
    gForce: 1.0,
    stage: 'Standby on Base Platform',
  });

  // Launch state ref so the animation loop can read and write without re-binding
  const launchRef = useRef({
    active: false,
    t: 0, // time in frames
    payloadY: 0, // canvas coordinates
    payloadX: 0,
    ringAngle: 0,
  });

  const handleLaunch = () => {
    setIsLaunching(true);
    launchRef.current.active = true;
    launchRef.current.t = 0;
  };

  const handleReset = () => {
    setIsLaunching(false);
    launchRef.current.active = false;
    launchRef.current.t = 0;
    setTelemetry({
      altitude: 0,
      velocity: 0,
      gForce: 1.0,
      stage: 'Standby on Base Platform',
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      // Dimensions
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark space backdrop
      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);

      // Draw starry sky
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const x = (i * 97) % width;
        const y = (i * 47) % (height * 0.7);
        ctx.fillRect(x, y, 1.2, 1.2);
      }

      // Draw Earth curve at bottom
      const groundY = height - 40;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, groundY, width, 40);

      // Ground grid line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Atmospheric gradient band (troposphere vs stratosphere)
      const grad = ctx.createLinearGradient(0, groundY, 0, 50);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.6)');
      grad.addColorStop(0.5, 'rgba(30, 58, 138, 0.15)');
      grad.addColorStop(1, 'rgba(7, 9, 14, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, groundY);

      // Clouds band around middle (height * 0.55)
      ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.beginPath();
      ctx.ellipse(width * 0.3, height * 0.52, 180, 24, 0, 0, Math.PI * 2);
      ctx.ellipse(width * 0.75, height * 0.58, 220, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      // Megastructure Spire Coordinates
      const spireBaseX = width * 0.5;
      const spireApexY = 70; // 1,600m
      const spireBaseY = groundY;
      const spireHeightPx = spireBaseY - spireApexY;

      // Draw Spire Tower
      ctx.save();
      // Outer pylon frame
      ctx.strokeStyle = '#ff9933';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(spireBaseX - 35, spireBaseY);
      ctx.lineTo(spireBaseX - 4, spireApexY);
      ctx.lineTo(spireBaseX + 4, spireApexY);
      ctx.lineTo(spireBaseX + 35, spireBaseY);
      ctx.closePath();
      ctx.fillStyle = '#0b0f19';
      ctx.fill();
      ctx.stroke();

      // Internal lattice bracing
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let y = spireBaseY - 30; y > spireApexY; y -= 45) {
        const factor = (y - spireApexY) / spireHeightPx;
        const halfWidth = 4 + 31 * factor;
        ctx.beginPath();
        ctx.moveTo(spireBaseX - halfWidth, y);
        ctx.lineTo(spireBaseX + halfWidth, y);
        ctx.stroke();
      }

      // Spire Apex Beacon
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(spireBaseX, spireApexY - 6, 3, 0, Math.PI * 2);
      ctx.fill();

      // Height Reference Markers on Left side
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'right';

      // 1,600m mark (Apex)
      ctx.fillText('1,600m APEX —', spireBaseX - 45, spireApexY + 4);
      // Burj Khalifa reference at ~52% height
      const burjY = spireBaseY - spireHeightPx * 0.5175;
      ctx.strokeStyle = '#3b82f6';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(spireBaseX - 120, burjY);
      ctx.lineTo(spireBaseX - 40, burjY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('828m BURJ KHALIFA —', spireBaseX - 45, burjY + 4);

      // Sea level base
      ctx.fillStyle = '#64748b';
      ctx.fillText('0m GROUND PAD —', spireBaseX - 45, spireBaseY - 6);

      // Rotation Ring Arrays (located at height ~65% and ~75%)
      launchRef.current.ringAngle += 0.04;
      const angle = launchRef.current.ringAngle;

      const ring1Y = spireBaseY - spireHeightPx * 0.65;
      const ring2Y = spireBaseY - spireHeightPx * 0.78;

      // Draw Ring 1 (Toroid ellipse)
      ctx.save();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(spireBaseX, ring1Y, 70, 14, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Spinning indicator beads on Ring 1
      const bead1X = spireBaseX + Math.cos(angle) * 70;
      const bead1Y = ring1Y + Math.sin(angle) * 14;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(bead1X, bead1Y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Ring 2 (Toroid ellipse, counter-rotating)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(spireBaseX, ring2Y, 55, 11, 0, 0, Math.PI * 2);
      ctx.stroke();

      const bead2X = spireBaseX + Math.cos(-angle) * 55;
      const bead2Y = ring2Y + Math.sin(-angle) * 11;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(bead2X, bead2Y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Launch Animation Processing
      if (launchRef.current.active) {
        launchRef.current.t += 1;
        const t = launchRef.current.t;

        if (t < 90) {
          // Phase 1: Vertical Maglev Lift (up the spire to apex)
          const progress = t / 90;
          const currentY = spireBaseY - progress * spireHeightPx;
          const currentAlt = Math.round(progress * 1600);
          const currentVel = Math.round(progress * 420); // m/s
          
          launchRef.current.payloadX = spireBaseX;
          launchRef.current.payloadY = currentY;

          setTelemetry({
            altitude: currentAlt,
            velocity: currentVel,
            gForce: 2.4,
            stage: 'Phase 1: Vertical Maglev Rail Acceleration',
          });
        } else if (t < 150) {
          // Phase 2: Ring Angular Momentum Lock & Exchange
          const subProgress = (t - 90) / 60;
          const orbitAngle = subProgress * Math.PI * 4;
          launchRef.current.payloadX = spireBaseX + Math.cos(orbitAngle) * 55;
          launchRef.current.payloadY = ring2Y + Math.sin(orbitAngle) * 11;

          setTelemetry({
            altitude: 1250,
            velocity: Math.round(420 + subProgress * 1200),
            gForce: 4.8,
            stage: 'Phase 2: Toroidal Flywheel Momentum Exchange',
          });
        } else if (t < 280) {
          // Phase 3: Orbital Slingshot Release Trajectory
          const launchT = (t - 150) / 130;
          // Parabolic orbital injection path curving upward and rightward
          const currentX = spireBaseX + launchT * (width * 0.55);
          const currentY = spireApexY - launchT * 50 - Math.sin(launchT * Math.PI * 0.5) * 30;
          const currentAlt = Math.round(1600 + launchT * 8400); // reaching LEO threshold
          const currentVel = Math.round(1620 + launchT * 6180); // reaching ~7,800 m/s LEO velocity

          launchRef.current.payloadX = currentX;
          launchRef.current.payloadY = currentY;

          // Draw trajectory trail
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(spireBaseX, spireApexY);
          ctx.quadraticCurveTo(spireBaseX + width * 0.2, spireApexY - 30, currentX, currentY);
          ctx.stroke();

          setTelemetry({
            altitude: currentAlt,
            velocity: currentVel,
            gForce: 1.2,
            stage: 'Phase 3: Hypersonic Orbital Injection (Zero Chemical)',
          });
        } else {
          // Reached orbit
          setTelemetry({
            altitude: 10000,
            velocity: 7800,
            gForce: 0.0,
            stage: 'Target Orbit Achieved • Low Earth Orbit (LEO) insertion nominal',
          });
        }

        // Draw the payload capsule
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(launchRef.current.payloadX, launchRef.current.payloadY, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Glow trail around capsule
        ctx.fillStyle = 'rgba(255, 153, 51, 0.6)';
        ctx.beginPath();
        ctx.arc(launchRef.current.payloadX, launchRef.current.payloadY, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-8 bg-slate-900/60 p-6 sm:p-7 rounded-2xl border border-slate-800 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
            Interactive Dynamic Simulation
          </span>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-amber-400" />
            Bramhayaan Spire Trajectory Engine
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {!isLaunching ? (
            <button
              onClick={handleLaunch}
              className="px-4 py-2 text-xs font-mono font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-all flex items-center gap-1.5 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Launch Sequence</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sequence</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#07090e] aspect-[16/9] max-h-[420px] w-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full h-full object-contain"
        />

        {/* Floating Telemetry HUD in top right of Canvas */}
        <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5 min-w-[210px]">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
            Flight Telemetry HUD
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Altitude:</span>
            <span className="text-amber-400 font-bold tabular-nums">{telemetry.altitude.toLocaleString()} m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Velocity:</span>
            <span className="text-cyan-400 font-bold tabular-nums">{telemetry.velocity.toLocaleString()} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">G-Force:</span>
            <span className="text-slate-200 font-bold tabular-nums">{telemetry.gForce.toFixed(1)} G</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-medium pt-1 border-t border-slate-800/80 truncate">
            {telemetry.stage}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>● Real-time Canvas Renderer: 60 FPS kinematic vector integration</span>
        <span className="text-amber-400">ISRO Advanced Flight Simulator Kernel v4.2</span>
      </div>
    </section>
  );
};
