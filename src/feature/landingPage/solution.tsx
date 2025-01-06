"use client";

import {
  CheckCircle,
  Shield,
  Users,
  Calendar,
  ClipboardList,
  Lock,
  LogIn,
} from "lucide-react";

export default function Solution() {
  const features = [
    {
      icon: Shield,
      text: "Team Builder - to easy sheet create, based on your house members surveys",
    },
    {
      icon: Users,
      text: "Prepare Preview for Members - create nice and easy to read preview",
    },
    {
      icon: Calendar,
      text: "TW Attendance tracing - bot checking 3 times your discord channels to create attendance list with players",
    },
    {
      icon: ClipboardList,
      text: "Track Surveys - easy way to check members surveys",
    },
    {
      icon: Lock,
      text: "Permissions management - decide who should be able to create teams in your house",
    },
    {
      icon: LogIn,
      text: "Easy Way to Login - Login with Discord account or behalf our discord bot ",
    },
  ];

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-background flex items-center bg-accent/70 p-4 rounded-lg medieval-border transform hover:scale-105 transition-transform duration-300"
            >
              <feature.icon className="mr-2 mt-1 flex-shrink-0" />
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
