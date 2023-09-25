"use client";

import { ArrowRight } from "lucide-react";
import { ExternalLink } from "../external-link";
import { Button } from "../ui/button";

interface ChatEmptyProps {
  setInput: (values: { prompt: string }) => void;
}

const examplePrompt = [
  {
    heading: "Cari tempat wisata",
    prompt: "Apa destinasi wisata di Bandung?",
  },
  {
    heading: "Cari tempat wisata alam",
    prompt: "Apa destinasi wisata alam di Bandung?",
  },
  {
    heading: "Cari tempat wisata kuliner",
    prompt: "Apa destinasi wisata kuliner di Bandung?",
  },
];

export default function ChatEmpty({ setInput }: ChatEmptyProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border border-zinc-800/50 p-8 shadow-2xl dark:border-zinc-200/50 dark:bg-[#1E1E1E]">
        <h1 className="mb-2 text-3xl font-extrabold leading-[1.15]">
          <span className="bg-gradient-to-tr from-rose-400 via-orange-400 to-yellow-50 bg-clip-text text-transparent">
            Selamat datang
          </span>{" "}
          <br /> Di{" "}
          <span className="bg-gradient-to-tr from-rose-400 via-orange-400 to-yellow-50 bg-clip-text text-transparent">
            HayuExplore
          </span>{" "}
          Chatbot Travel
        </h1>
        <h2 className="mb-2 text-2xl font-extrabold leading-6"></h2>
        <p className="mb-2 text-sm leading-normal text-muted-foreground">
          Chatbot yang dapat membantu Anda menemukan informasi seputar tempat
          wisata di Bandung. Di buat dengan menggunakan{" "}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> dan{" "}
          <ExternalLink href="https://ui.shadcn.com/">Shadcn/ui</ExternalLink>{" "}
          sebagai component UI library.
        </p>
        <p className="leading-normal text-muted-foreground text-sm">
          Kamu bisa memulai percakapan ini atau coba contoh pertanyaan berikut:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2 text-sm">
          {examplePrompt.map((item, index) => (
            <Button
              onClick={() => setInput({ prompt: item.prompt })}
              key={index}
              variant="link"
              className="h-auto p-0 text-sm"
            >
              <ArrowRight className="mr-2 text-muted-foreground" />
              {item.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
