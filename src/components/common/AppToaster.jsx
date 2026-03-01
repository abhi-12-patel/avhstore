"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

const AUTO_CLOSE_MS = 2400;

const TOAST_STYLES = {
  success: {
    icon: CheckCircle2,
    card: "border-emerald-200/70 bg-white/95 text-emerald-900 shadow-emerald-100",
    iconWrap: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
  },
  info: {
    icon: Info,
    card: "border-slate-200/80 bg-white/95 text-slate-900 shadow-slate-200",
    iconWrap: "bg-slate-100 text-slate-700",
    bar: "bg-slate-500",
  },
  error: {
    icon: XCircle,
    card: "border-rose-200/70 bg-white/95 text-rose-900 shadow-rose-100",
    iconWrap: "bg-rose-100 text-rose-700",
    bar: "bg-rose-500",
  },
};

export default function AppToaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onToast = (event) => {
      const detail = event?.detail || {};
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const next = {
        id,
        message: detail.message || "Done",
        type: detail.type || "success",
      };

      setToasts((prev) => [...prev, next]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, AUTO_CLOSE_MS);
    };

    window.addEventListener("app-toast", onToast);
    return () => window.removeEventListener("app-toast", onToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const tone = TOAST_STYLES[toast.type] || TOAST_STYLES.success;
        const Icon = tone.icon;
        return (
        <div
          key={toast.id}
          className={`pointer-events-auto relative overflow-hidden rounded-xl border px-3 py-3 text-sm shadow-lg backdrop-blur-md ${tone.card}`}
          style={{ animation: "toastEnter 220ms ease-out" }}
        >
          <div className="flex items-start gap-2.5">
            <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tone.iconWrap}`}>
              <Icon size={14} />
            </span>
            <p className="pr-2 text-[13px] font-semibold leading-5">{toast.message}</p>
          </div>
          <span
            className={`absolute bottom-0 left-0 h-[2px] ${tone.bar}`}
            style={{ width: "100%", animation: `shrink ${AUTO_CLOSE_MS}ms linear forwards` }}
          />
        </div>
        );
      })}
      <style jsx>{`
        @keyframes toastEnter {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shrink {
          from {
            transform: scaleX(1);
            transform-origin: left;
          }
          to {
            transform: scaleX(0);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
}
