"use client";

import { ModeToggle } from "@/components/toggle-themes";
import { Button } from "@/components/ui/button";
import { Github, MapPin } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Link
          href="/"
          className="group flex cursor-pointer items-center justify-center"
        >
          <MapPin className="h-5 w-5 transition ease-in-out group-hover:rotate-45" />
          <div className="flex flex-col">
            <h2 className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100">
              Hayu{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-lg font-extrabold text-transparent">
                Explore
              </span>
            </h2>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://github.com/aafrzl/hayuexplore-chatbot-travel")
          }
        >
          <Github className="mr-1 h-5 w-5" />
          Github
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}
