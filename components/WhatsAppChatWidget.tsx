"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_HEADER_GREEN = "#075E54";

/** WhatsApp number from contact page (E.164: no + or spaces). Override with NEXT_PUBLIC_WHATSAPP_PHONE. */
const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "16476433712";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * Custom WhatsApp-style chat widget for better responsiveness than third-party embeds.
 * Matches the floating FAB + chat panel design with header, message area, and input.
 */
export function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);
  const openWhatsApp = useCallback(() => {
    const text = encodeURIComponent(message || "Hi, I have a question.");
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${text}&type=phone_number&app_absent=0`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [message]);

  return (
    <>
      {/* Chat panel — sits above FAB; on mobile sits above bottom nav */}
      <div
        className="whatsapp-widget-panel fixed right-4 z-[9998] flex flex-col transition-all duration-300 ease-out tablet:left-auto tablet:right-6"
        style={{
          width: "min(100vw, 380px)",
          maxHeight: isOpen ? "min(80vh, 520px)" : "0",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transform: isOpen ? "translateY(0)" : "translateY(0.5rem)",
        }}
      >
        <div
          className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl shadow-xl"
          style={{ borderRadius: "16px" }}
        >
          {/* Header */}
          <header
            className="flex shrink-0 items-center gap-3 px-4 py-3 text-white"
            style={{ background: WHATSAPP_HEADER_GREEN }}
          >
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/30"
              />
              <span
                className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54]"
                style={{ background: WHATSAPP_GREEN }}
                aria-hidden
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">Jane Doe</p>
              <p className="text-xs text-white/90">Online</p>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </header>

          {/* Chat area with subtle pattern */}
          <div
            className="relative flex-1 min-h-0 overflow-y-auto px-3 py-4"
            style={{
              background: "#e5ddd5",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cdc4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            <p className="text-center text-xs text-slate-500/80 mb-3">10:02</p>
            <div className="flex justify-start">
              <div
                className="relative max-w-[85%] rounded-[18px] rounded-bl-[4px] px-3 py-2.5"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                }}
              >
                {/* Bubble tail (points left toward sender) */}
                <span
                  className="absolute -left-1.5 bottom-0 h-0 w-0 border-[6px] border-transparent"
                  style={{
                    borderRightColor: "#ffffff",
                    borderTopColor: "transparent",
                    borderBottomColor: "transparent",
                  }}
                />
                <p className="relative text-slate-800 text-[15px] leading-snug">
                  Hi there 👋
                  <br />
                  How can I help you?
                </p>
              </div>
            </div>
          </div>

          {/* Input row */}
          <div className="flex shrink-0 items-center gap-2 border-t border-slate-200/80 bg-slate-50 px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
              placeholder="Enter Your Message..."
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              aria-label="Message"
            />
            <button
              type="button"
              onClick={openWhatsApp}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              style={{ background: WHATSAPP_GREEN }}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* FAB — on mobile sits above bottom nav */}
      <button
        type="button"
        onClick={toggle}
        className="whatsapp-widget-fab fixed z-[9999] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 tablet:h-16 tablet:w-16"
        style={{
          background: WHATSAPP_GREEN,
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <WhatsAppIcon className="h-7 w-7 tablet:h-8 tablet:w-8" />
        <span
          className="absolute top-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-red-500"
          aria-hidden
        />
      </button>
    </>
  );
}
