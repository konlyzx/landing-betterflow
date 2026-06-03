"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Code2, Zap, Globe, Heart } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AIInfo() {
  return (
    <section className="py-24 px-4 bg-[#0b0b0c] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff7e40]/5 to-transparent" />

      <div className="max-w-[1324px] mx-auto relative">
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Project Information
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Better Flow is an open-source screenshot studio and browser tool designed to transform raw captures into production-ready visuals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* GitHub Repository */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#ff7e40]/10 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-[#ff7e40]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Source Code</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Open-source project available on GitHub. Contribute, report issues, or star the repository.
            </p>
            <a
              href="https://github.com/konlyzx/landing-betterflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff7e40] text-sm font-medium hover:underline"
            >
              View Repository →
            </a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and GSAP.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">Next.js</span>
              <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">React</span>
              <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">TypeScript</span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Key Features</h3>
            </div>
            <ul className="text-white/60 text-sm space-y-2">
              <li>• Screenshot beautification</li>
              <li>• Browser frame mockups</li>
              <li>• 3D effects & shadows</li>
              <li>• Code snippet styling</li>
            </ul>
          </motion.div>

          {/* Website */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Website</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Visit the official website to learn more about Better Flow and its features.
            </p>
            <a
              href="https://betterflow.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff7e40] text-sm font-medium hover:underline"
            >
              betterflow.site →
            </a>
          </motion.div>

          {/* Open Source */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Open Source</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              This project is open-source and free to use. Contributions are welcome from the community.
            </p>
            <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">MIT License</span>
          </motion.div>

          {/* AI Assistant Info */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="bg-[#141416] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#ff7e40]/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#ff7e40]" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            </div>
            <p className="text-white/60 text-sm mb-4">
              AI assistants can access this page to learn about the project. All information is structured for easy parsing.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">AI-Enabled</span>
              <span className="px-2 py-1 bg-white/[0.05] rounded text-xs text-white/70">Structured Data</span>
            </div>
          </motion.div>
        </div>

        {/* Structured Data for AI */}
        <div className="mt-12 p-6 bg-[#141416] border border-white/[0.06] rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">For AI Assistants</h3>
          <pre className="text-xs text-white/60 overflow-x-auto bg-black/30 p-4 rounded-lg">
{`{
  "project": "Better Flow",
  "description": "An open-source screenshot studio and browser tool",
  "repository": "https://github.com/konlyzx/landing-betterflow",
  "website": "https://betterflow.site",
  "tech_stack": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  "features": ["Screenshot beautification", "Browser frames", "3D effects", "Code snippets"],
  "license": "MIT",
  "status": "Coming Soon",
  "contact": {
    "github": "https://github.com/konlyzx/landing-betterflow/issues"
  }
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}
