"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  className?: string;
};

export default function SubmitButton({
  label,
  pendingLabel = "Sending…",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        "rounded-full bg-brand-red px-8 py-3 font-bold text-white transition hover:bg-brand-red-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
        className,
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
