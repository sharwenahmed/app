import React from "react";
import { motion } from "framer-motion";

export default function DemoLoader({ demo }) {
  return (
    <main className="min-h-screen bg-[#030008] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,91,0.12),transparent_42%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.8 }}
        className="relative text-center px-6"
      >
        <p className="text-[#C9A25B] tracking-[0.45em] uppercase text-xs mb-6">
          Opening Experience
        </p>

        <h1 className="font-serif text-5xl md:text-7xl tracking-tight">
          {demo?.name || "Maison Noir"}
        </h1>

        <p className="mt-5 text-white/45">
          Preparing your evening...
        </p>

        <div className="mt-10 w-72 h-px bg-white/10 overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="h-full w-1/2 bg-[#C9A25B]"
          />
        </div>
      </motion.div>
    </main>
  );
}