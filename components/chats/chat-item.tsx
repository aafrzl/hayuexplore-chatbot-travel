"use client";

import { cn } from "@/lib/utils";
import { BotIcon, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessageAction } from "../message-actions";

interface ChatItemProps {
  type: string;
  message: string;
}

export default function ChatItem({ message, type }: ChatItemProps) {
  return (
    <div className="group relative mb-4 flex items-start md:-ml-12">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          type === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground",
        )}
      >
        {type === "user" ? <User className="w-5 h-5" /> : <BotIcon className="w-5 h-5" />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <ReactMarkdown className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 mb-2 break-words text-sm last:mb-0">
          {message}
        </ReactMarkdown>
        <ChatMessageAction message={message} />
      </div>
    </div>
  );
}
