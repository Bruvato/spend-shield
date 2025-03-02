import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] w-full max-w-screen mx-auto flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          Spend Smarter with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            SpendShield
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10">
          A social media finance app that gamifies saving and helps build better
          spending habits.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg">
            Try it for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
