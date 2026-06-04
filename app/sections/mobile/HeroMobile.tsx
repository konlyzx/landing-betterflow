"use client";

import { motion } from "framer-motion";
import NavbarMobile from "../../components/mobile/NavbarMobile";
import DotField from "../../components/ui/DotField";
import GradientButton from "../../components/GradientButton";
import RotatingText from "../../components/ui/RotatingText";
import StudioPlaygroundMobile from "../../components/mobile/StudioPlaygroundMobile";
import { GithubIcon, TwitterIcon } from "../../components/icons";

export default function HeroMobile() {
  return (
    <>
      <NavbarMobile />

      <DotField
        dotRadius={0.8}
        dotSpacing={16}
        cursorRadius={150}
        cursorForce={0.1}
        bulgeOnly={true}
        bulgeStrength={30}
        glowRadius={120}
        gradientFrom="rgba(255, 126, 64, 0.35)"
        gradientTo="rgba(164, 69, 255, 0.25)"
      />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(180deg, #0d0b12 0%, #141216 25%, #10100 60%, #000 100%)",
        }}
      />

      <section className="relative z-10 mt-6 pt-24 pb-12 flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#ff7e40]/10 via-[#ff4b72]/5 to-[#a445ff]/10 rounded-full blur-[60px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "12s" }} />

        <div className="relative w-full max-w-[1324px] mx-auto flex flex-col items-center text-center gap-5 z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(201,212,255,0.08) 0%, rgba(224,212,255,0.05) 100%)',
              border: '1px solid rgba(201,212,255,0.15)',
              color: 'rgba(201,212,255,0.9)',
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #c9d4ff 0%, #e0d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Coming Soon</span>
            <span style={{ color: 'rgba(201,212,255,0.3)' }}>•</span>
            <span style={{
              background: 'linear-gradient(135deg, #e0d4ff 0%, #f5d4e8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Open Source</span>
          </motion.div>

          <motion.div
            className="space-y-3 max-w-[90vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
          >
            <h1 className="text-3xl font-extrabold tracking-[-0.02em] leading-[1.1] text-white">
              <span className="text-white">Better flow for your</span>
              <br />
              <RotatingText 
                texts={["screenshots", "code snippets", "browser mockups", "designs"]} 
                interval={3000}
                className="gradient-text inline-block pb-1"
              />
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed max-w-[320px] mx-auto">
              An open-source screenshot studio and browser tool. Transform raw captures into production-ready graphics instantly.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 justify-center items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
          >
            <motion.a
              href="https://github.com/konlyzx/betterflow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium w-full max-w-[280px]"
              style={{
                background: 'linear-gradient(135deg, rgba(201,212,255,0.12) 0%, rgba(224,212,255,0.08) 100%)',
                border: '1px solid rgba(201,212,255,0.2)',
                color: 'rgba(201,212,255,0.95)',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(201,212,255,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <GithubIcon className="w-4 h-4" />
              Star on GitHub
            </motion.a>
            <motion.a
              href="https://x.com/konlyzx_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium w-full max-w-[280px]"
              style={{
                background: 'linear-gradient(135deg, rgba(224,212,255,0.12) 0%, rgba(245,212,232,0.08) 100%)',
                border: '1px solid rgba(224,212,255,0.2)',
                color: 'rgba(224,212,255,0.95)',
              }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(224,212,255,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <TwitterIcon className="w-4 h-4" />
              Follow Updates
            </motion.a>
          </motion.div>

          <motion.div
            className="w-full mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <StudioPlaygroundMobile />
          </motion.div>
        </div>
      </section>
    </>
  );
}
