"use client";

import { useToast } from "@/lib/toast-context";

export default function Toast() {
  const { toasts } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 border border-ink bg-bone px-5 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-2"
        >
          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ink text-bone">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-ink">
            {toast.text}
          </p>
        </div>
      ))}
    </div>
  );
}