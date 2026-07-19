import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

import {
  conciergeOpeningMessage,
  conciergeQuickActions,
  createConciergeContext,
  getConciergeResponse,
} from "./maisonConciergeKnowledge";

const createMessage = (role, content) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  content,
});

export default function MaisonConcierge({
  visible = true,
  onStartOrder = () => {},
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [semanticStatus, setSemanticStatus] = useState("idle");
  const [conversationContext, setConversationContext] = useState(() =>
    createConciergeContext()
  );
  const [messages, setMessages] = useState(() => [
    createMessage("assistant", conciergeOpeningMessage),
  ]);

  const endRef = useRef(null);
  const semanticModuleRef = useRef(null);
  const semanticLoadPromiseRef = useRef(null);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      setOpen(false);
    }
  }, [visible]);

  const loadSemanticConcierge = useCallback(() => {
    if (semanticModuleRef.current) {
      return Promise.resolve(semanticModuleRef.current);
    }

    if (!semanticLoadPromiseRef.current) {
      setSemanticStatus("loading");

      semanticLoadPromiseRef.current = import("./maisonConciergeSemantic")
        .then(async (module) => {
          await module.prepareSemanticConcierge();
          semanticModuleRef.current = module;
          setSemanticStatus("ready");
          return module;
        })
        .catch((error) => {
          console.warn("Maison Concierge semantic setup failed:", error);
          setSemanticStatus("failed");
          return null;
        });
    }

    return semanticLoadPromiseRef.current;
  }, []);

  useEffect(() => {
    if (open) {
      loadSemanticConcierge();
    }
  }, [loadSemanticConcierge, open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, typing, reduceMotion]);

  useEffect(() => {
    const queuedTimeouts = timeoutsRef.current;

    return () => {
      queuedTimeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const queueTimeout = (callback, delay) => {
    const timeout = window.setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
  };

  const scrollToReservation = () => {
    const reservationTarget =
      document.querySelector("#reserve") || document.querySelector("#reservation");

    if (!reservationTarget) return;

    reservationTarget.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const submitMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || typing) return;

    const userMessage = createMessage("user", text);
    const fallbackResponse = getConciergeResponse(text, conversationContext);
    const responsePromise = loadSemanticConcierge().then((module) =>
      module
        ? module.getSemanticConciergeResponse(
            text,
            conversationContext,
            fallbackResponse
          )
        : fallbackResponse
    );
    const replyDelay = 500 + Math.floor(Math.random() * 401);

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    queueTimeout(
      () => {
        responsePromise.then((response) => {
          setTyping(false);
          setConversationContext(response.context);
          setMessages((current) => [
            ...current,
            createMessage("assistant", response.message),
          ]);

          if (response.action === "reserve") {
            queueTimeout(
              () => {
                scrollToReservation();
                setOpen(false);
              },
              reduceMotion ? 0 : 520
            );
          }
        });
      },
      replyDelay
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitMessage(input);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  };

  const handleQuickAction = (action) => {
    if (action === "Start an order") {
      onStartOrder();
      setOpen(false);
      return;
    }

    submitMessage(action);
  };

  const quickActions = [...conciergeQuickActions, "Start an order"];

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 28, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 18, scale: 0.97 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      };

  const launcherMotion = reduceMotion
    ? {}
    : {
        animate: {
          boxShadow: [
            "0 18px 70px -38px rgba(201,162,91,0.72)",
            "0 22px 86px -34px rgba(92,42,108,0.72)",
            "0 18px 70px -38px rgba(201,162,91,0.72)",
          ],
        },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      };

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      style={{ zIndex: 2147483200 }}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6"
    >
      <AnimatePresence>
        {open ? (
          <motion.aside
            {...panelMotion}
            className="fixed bottom-4 left-4 right-4 flex h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[1.75rem] border border-[#C9A25B]/25 bg-black/[0.88] text-[#F5F2EB] shadow-[0_34px_120px_-48px_rgba(92,42,108,0.8)] backdrop-blur-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:h-auto sm:max-h-[70vh] sm:w-[390px]"
            role="dialog"
            aria-label="Maison Concierge"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.16, 0.28, 0.16], scale: [1, 1.04, 1] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-[#4A1418]/55 blur-[95px]"
              />
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.12, 0.24, 0.12], scale: [1.02, 1, 1.02] }
                }
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[#3B1A57]/60 blur-[105px]"
              />
            </div>

            <header className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/25 bg-black/35 px-3 py-1 text-[9px] uppercase tracking-[0.26em] text-[#C9A25B]">
                  <Sparkles className="h-3 w-3" />
                  Concierge
                </div>
                <h3 className="font-serif text-3xl leading-none text-white">
                  Maison Concierge
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Maison Concierge"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B]"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-3" aria-live="polite">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[1.15rem] px-4 py-3 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "border border-[#C9A25B]/35 bg-[#C9A25B]/15 text-white"
                          : "border border-white/10 bg-white/[0.055] text-white/72"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {semanticStatus === "loading" ? (
                  <div className="flex justify-start">
                    <div className="max-w-[88%] rounded-[1.15rem] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm leading-relaxed text-white/72">
                      Preparing the Maison Concierge…
                    </div>
                  </div>
                ) : null}

                {typing ? (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={
                            reduceMotion
                              ? undefined
                              : { opacity: [0.35, 1, 0.35], y: [0, -3, 0] }
                          }
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: dot * 0.12,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-[#C9A25B]"
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                <div ref={endRef} />
              </div>
            </div>

            <div className="relative z-10 border-t border-white/10 px-5 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    disabled={typing}
                    className="rounded-full border border-[#C9A25B]/20 bg-black/25 px-3 py-2 text-[11px] text-white/62 transition hover:border-[#C9A25B]/45 hover:text-[#C9A25B] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Ask about the evening..."
                  className="min-h-[3.25rem] flex-1 resize-none rounded-[1rem] border border-white/10 bg-black/45 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/30 focus:border-[#C9A25B]/45"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-[#C9A25B] text-black transition hover:bg-[#d9b56d] disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-white/30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Maison Concierge"
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        {...launcherMotion}
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A25B]/45 bg-black/[0.78] font-serif text-xl tracking-[-0.02em] text-[#C9A25B] shadow-[0_18px_70px_-38px_rgba(201,162,91,0.72)] backdrop-blur-2xl transition hover:border-[#C9A25B]/80 hover:bg-[#120909]"
      >
        <span className="absolute inset-2 rounded-full border border-white/10" />
        <span className="relative">MN</span>
        <MessageCircle className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#C9A25B] p-1 text-black" />
      </motion.button>
    </div>,
    document.body
  );
}
