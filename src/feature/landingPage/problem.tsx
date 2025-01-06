"use client";

import { Swords } from "lucide-react";

export default function Problem() {
  return (
    <section id="problem" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl text-background mx-auto bg-accent/70 bg-opacity-25 p-6 rounded-lg medieval-border transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold mb-4">
            Leaders and commanders have a lot of work to manage the house and
            the members
          </h3>
          <p className="text-lg">
            Create sheets for TW, track attendance, share sheet only with
            members of your house
          </p>
        </div>
      </div>
    </section>
  );
}
