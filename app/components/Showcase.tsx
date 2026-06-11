"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import BorderGlow from "./ui/BorderGlow";

interface ShowcaseItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

const tabs = ["Studios", "Creators", "Teams"];

const showcaseData: Record<string, ShowcaseItem[]> = {
  Studios: [
    {
      id: "1",
      image: "https://placehold.co/400x400/141416/ff7e40?text=Studio+1",
      title: "Studio Shot",
      category: "Design",
    },
    { id: "2", image: "https://placehold.co/400x400/1a1a1c/ff4b72?text=Studio+2", title: "Dashboard", category: "UI" },
    { id: "3", image: "https://placehold.co/400x400/1f1f21/a445ff?text=Studio+3", title: "Landing", category: "Web" },
    {
      id: "4",
      image: "https://placehold.co/400x400/141416/ff7e40?text=Studio+4",
      title: "Mobile App",
      category: "App",
    },
    {
      id: "5",
      image: "https://placehold.co/400x400/1a1a1c/ff4b72?text=Studio+5",
      title: "Components",
      category: "Kit",
    },
  ],
  Creators: [
    {
      id: "6",
      image: "https://placehold.co/400x400/1f1f21/a445ff?text=Creator+1",
      title: "Portfolio",
      category: "Art",
    },
    {
      id: "7",
      image: "https://placehold.co/400x400/141416/ff7e40?text=Creator+2",
      title: "Illustration",
      category: "Creator",
    },
    {
      id: "8",
      image: "https://placehold.co/400x400/1a1a1c/ff4b72?text=Creator+3",
      title: "Concept",
      category: "Design",
    },
  ],
  Teams: [
    {
      id: "9",
      image: "https://placehold.co/400x400/1f1f21/a445ff?text=Team+1",
      title: "Collaboration",
      category: "Team",
    },
    { id: "10", image: "https://placehold.co/400x400/141416/ff7e40?text=Team+2", title: "Project", category: "Work" },
  ],
};

export default function Showcase() {
  const [activeTab, setActiveTab] = useState("Studios");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const items = showcaseData[activeTab] || [];

  return (
    <section ref={sectionRef} id="showcase" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-[1200px] px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 block text-[11px] font-semibold tracking-[0.2em] text-[#a1a1aa] uppercase"
        >
          In the Wild
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl leading-[1.1] font-bold text-white md:text-5xl lg:text-6xl"
        >
          Work that left the canvas
          <br />
          and made it to market
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-[600px] text-lg text-[#a1a1aa]"
        >
          A rolling feed of campaigns, launches, and side projects shipped by people building on our tools every day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#141416] p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab ? "bg-[#1a1a1c] text-white" : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative"
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-40 bg-gradient-to-r from-[#0b0b0c] to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-40 bg-gradient-to-l from-[#0b0b0c] to-transparent" />

        <div
          className="scrollbar-hide flex cursor-grab items-center gap-0 overflow-x-auto px-10 py-4 select-none active:cursor-grabbing"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="flex shrink-0 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="shrink-0"
              >
                <BorderGlow
                  backgroundColor="#141416"
                  borderRadius={16}
                  glowRadius={20}
                  glowIntensity={0.8}
                  edgeSensitivity={20}
                  coneSpread={20}
                  colors={["#ff7e40", "#ff4b72", "#a445ff"]}
                  animated={false}
                  className="group cursor-pointer"
                >
                  <div className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl md:h-[260px] md:w-[260px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      draggable={false}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
                      <span className="text-xs font-medium tracking-wider text-[#ff7e40] uppercase">
                        {item.category}
                      </span>
                      <h4 className="mt-1 font-semibold text-white">{item.title}</h4>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>

              {index < items.length - 1 && (
                <div className="mx-5 hidden items-center md:flex">
                  <div className="h-[2px] w-10 border-t-2 border-dashed border-white/20 lg:w-16" />
                  <div className="mx-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff7e40]" />
                  <div className="h-[2px] w-10 border-t-2 border-dashed border-white/20 lg:w-16" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
