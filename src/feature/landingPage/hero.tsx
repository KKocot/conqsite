"use client";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-5xl font-bold mb-4 animate-fade-in-down text-ac">
          Conquerors Blade House Management
        </h2>
        <p className="text-xl mb-8 animate-fade-in-up">
          Save time, automate your house management for free
        </p>
        <div className="flex justify-center space-x-8 text-background">
          <div className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg medieval-border bg-accent/70">
            <p className="text-3xl font-bold">17</p>
            <p>Houses using our website and bot</p>
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg medieval-border bg-accent/70">
            <p className="text-3xl font-bold">1572</p>
            <p>Warriors surveys</p>
          </div>
        </div>
      </div>
    </section>
  );
}
