"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ChatEmpty from "@/components/chats/chat-empty";
import ChatInput from "@/components/chats/chat-input";
import ChatItem from "@/components/chats/chat-item";
import TypingAnimation from "@/components/typing-animation";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

const formSchema = z.object({
  prompt: z.string().min(1),
});

export default function Chat() {
  const [apiUsageCount, setApiUsageCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topDiv = messageTopRef.current;

    const shouldAutoScroll = () => {
      if (!topDiv) {
        return false;
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [chatLog]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoadingSubmit = form.formState.isSubmitting;

  useEffect(() => {
    const storeChatLog = localStorage.getItem("chatLog");
    if (storeChatLog) {
      setChatLog(JSON.parse(storeChatLog));
    }
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setApiUsageCount(0);
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (apiUsageCount < 2) {
        const updatedChatLog = [
          ...chatLog,
          { type: "user", message: values.prompt },
        ];

        setChatLog(updatedChatLog);
        localStorage.setItem("chatLog", JSON.stringify(updatedChatLog));

        setIsLoading(true);

        await axios
          .post("/api/chatbot", { prompt: values.prompt })
          .then(res => {
            if (res.status !== 200) {
              updatedChatLog.push({
                type: "bot",
                message:
                  "Maaf, terjadi kesalahan pada sistem. Coba lagi nanti.",
              });
            } else {
              if (res.data.response !== null) {
                updatedChatLog.push({
                  type: "bot",
                  message: res.data.response,
                });
              } else {
                updatedChatLog.push({
                  type: "bot",
                  message:
                    "Maaf, saya tidak mengerti apa yang Anda maksud. Coba perintah lain.",
                });
              }
            }
            setIsLoading(false);
          })
          .catch(err => {
            console.log("[ERROR_POSTING_CHATBOT]", err);
            setIsLoading(false);
          });
        setApiUsageCount(apiUsageCount + 1);

        form.reset();
        if (apiUsageCount === 1) {
          setCountdown(60);
        }
      }
    } catch (error) {
      console.error("[ERROR_SUBMITTING_FORM]", error);
    }
  }

  function disabledInput() {
    if (apiUsageCount === 2) {
      return true;
    } else {
      return isLoadingSubmit;
    }
  }

  function setInput(values: z.infer<typeof formSchema>) {
    form.setValue("prompt", values.prompt);
  }

  return (
    <>
      <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
        <div className="group w-full overflow-auto pl-0 duration-300 ease-in-out animate-in peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
          <div className="pb-[200px] pt-4 md:pt-10">
            {chatLog.length === 0 ? (
              <ChatEmpty setInput={setInput} />
            ) : (
              <div className="relative mx-auto max-w-2xl px-4">
                {chatLog.map((chat, index) => (
                  <div key={index}>
                    <ChatItem type={chat.type} message={chat.message} />
                    {index < chat.message.length - 1 && (
                      <Separator className="my-4 md:my-8" />
                    )}
                  </div>
                ))}
                <div ref={messageEndRef} />
                {isLoading && (
                  <div
                    key={chatLog.length}
                    className="flex items-center justify-center"
                  >
                    <div className="max-w-sm rounded-full bg-zinc-800 p-3 text-white">
                      <TypingAnimation />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatInput
        apiUsageCount={apiUsageCount}
        countdown={countdown}
        form={form}
        onSubmit={onSubmit}
        disabledInput={disabledInput}
        chatLog={chatLog}
      />
    </>
  );
}
