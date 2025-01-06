"use client";

import Link from "next/link";
import { Sword } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section id="cta" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in-down">
          Ready to lead your house to glory?
        </h2>
        <p className="text-xl mb-8 animate-fade-in-up">
          Join thousands of commanders already using our battle-tested platform
        </p>
        <Link href="/member/create-house">
          <Button variant="custom" className="px-8 py-6 rounded-3xl text-xl">
            <Sword className="mr-2" />
            Create Your House (Free)
          </Button>
        </Link>
      </div>
    </section>
  );
}
