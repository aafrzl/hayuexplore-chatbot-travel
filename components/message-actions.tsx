"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: string;
}

export function ChatMessageAction({ message }: ChatMessageActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (isCopied) return;

    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0">
      <Button variant="ghost" size="icon" onClick={onCopy} className="w-6 h-6">
        {isCopied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
        <span className="sr-only">Copy message</span>
      </Button>
    </div>
  );
}
