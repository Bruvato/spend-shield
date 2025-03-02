import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Navbar() {
  const isSignedIn = (await (
    await (await supabaseServer()).auth.getUser()
  ).data)
    ? 1
    : 0;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold ">
              RCM GAMES
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Resources
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Community
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Download
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isSignedIn && (
              <Link href="/auth/login">
                <Button variant="ghost" className="text-sm cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/">
              <Button className="text-sm hover:opacity-90 cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
