"use client";

import { Form, FormDescription, FormField } from "@/components/ui/form";

import Footer from "@/components/footer";
import { Sparkles, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  prompt: z.string().min(1),
});

interface FormProps {
  apiUsageCount: number;
  countdown: number;
  form: UseFormReturn<{
    prompt: string;
  }>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabledInput: () => boolean;
  chatLog: { type: string; message: string }[];
}

export default function ChatInput({
  apiUsageCount,
  countdown,
  form,
  onSubmit,
  disabledInput,
  chatLog,
}: FormProps) {
  const router = useRouter();

  function handleClear() {
    localStorage.removeItem("chatLog");
    window.location.reload();
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        {chatLog.length !== 0 && (
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="mb-1 flex h-10 items-center justify-end">
              <Button onClick={handleClear} variant="destructive" size="icon">
                <Trash />
              </Button>
            </div>
          </div>
        )}
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border sm:py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <div className="relative flex items-center justify-center">
                    <Sparkles className="absolute left-0 my-2 ml-3 w-5 text-zinc-600 dark:text-zinc-300" />
                    <input
                      disabled={disabledInput()}
                      className="input_prompt peer"
                      placeholder={
                        countdown === 0
                          ? "Masukkan pesan..."
                          : "Tunggu hingga hitung mundur selesai..."
                      }
                      autoComplete="off"
                      onChange={field.onChange}
                      value={field.value}
                    />
                    {apiUsageCount === 2 ? (
                      <div className="limit">{countdown}</div>
                    ) : (
                      <div className="limit">{2 - apiUsageCount}/2</div>
                    )}
                  </div>
                )}
              />
              <FormDescription className="mt-2 text-rose-400">
                Request limit 2x per-menit.
              </FormDescription>
            </form>
          </Form>
          <Footer />
        </div>
      </div>
    </div>
  );
}
