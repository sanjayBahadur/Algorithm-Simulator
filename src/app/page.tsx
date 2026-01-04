"use client";

import { algorithms } from "@/algorithms/registry";
import { AlgorithmCard } from "@/components/AlgorithmCard";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">

      {/* Retro Arcade Header */}
      <header className="mb-16 text-center transform -skew-x-6">
        <h1 className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-neon-blue via-neon-pink to-neon-purple drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] crt-glow-text uppercase tracking-tighter"
          style={{ WebkitTextStroke: '2px #fff' }}>
          ALGO SIMULATOR
        </h1>
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-neon-green font-bold text-xl uppercase tracking-widest animate-pulse">
            INSERT TIME TO LEARN
          </p>
          <div className="h-1 w-64 bg-gradient-to-r from-transparent via-neon-pink to-transparent"></div>
        </div>
      </header>

      {/* Algorithm Cards Grid */}
      <div className="w-full space-y-24">
        {algorithms.map((config) => (
          <section key={config.id} id={config.id} className="scroll-mt-20">
            <AlgorithmCard config={config} />
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-32 pb-12 w-full border-t border-card-border pt-8 text-center">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            Built with <span className="text-neon-pink">Next.js</span> & <span className="text-neon-blue">Tailwind</span>
          </p>
          <div className="flex gap-8">
            <a href="https://github.com/sanjayBahadur" className="text-neon-blue hover:text-white transition-colors uppercase text-xs font-bold tracking-tighter">
              [ GITHUB ]
            </a>
            <a href="https://github.com/sanjayBahadur/Algorithm-Simulator" className="text-neon-pink hover:text-white transition-colors uppercase text-xs font-bold tracking-tighter">
              [ Source Code ]
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
