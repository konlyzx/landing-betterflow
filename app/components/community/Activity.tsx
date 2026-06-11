"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Route, Users, ArrowRight } from "lucide-react";
import { GithubIcon } from "../icons";
import SpotlightCard from "@/app/components/ui/SpotlightCard";
const SECTIONS = [
  {
    id: "discussions",
    icon: MessageSquare,
    title: "Recent Discussions",
    empty: {
      title: "No discussions yet",
      description: "Start the first conversation about features, ideas, or improvements.",
    },
  },
  {
    id: "issues",
    icon: GithubIcon,
    title: "Latest Issues",
    empty: {
      title: "No open issues",
      description: "Be the first to report a bug or suggest an enhancement.",
    },
  },
  {
    id: "roadmap",
    icon: Route,
    title: "Roadmap",
    empty: {
      title: "Planning in progress",
      description: "The roadmap is being shaped by early community input. Stay tuned.",
    },
  },
  {
    id: "feed",
    icon: Users,
    title: "Community Feed",
    empty: {
      title: "Waiting for activity",
      description: "Be the first contributor and your activity will appear here.",
    },
  },
];

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Icon className="h-5 w-5" style={{ color: "rgba(255, 255, 255, 0.2)" }} />
      </div>
      <h4 className="mb-1 text-sm font-medium text-white/50">{title}</h4>
      <p className="max-w-[200px] text-xs leading-relaxed text-[#52525b]">{description}</p>
    </div>
  );
}

function ActivityCard({ section, index }: { section: (typeof SECTIONS)[number]; index: number }) {
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <SpotlightCard
        className="overflow-hidden rounded-xl border-transparent bg-transparent"
        style={{
          background: "rgba(18, 15, 23, 0.45)",
          backdropFilter: "blur(32px) saturate(1.3)",
          WebkitBackdropFilter: "blur(32px) saturate(1.3)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          padding: 0,
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
        >
          <div className="flex items-center gap-2.5">
            <Icon className="h-4 w-4" style={{ color: "rgba(255, 255, 255, 0.3)" }} />
            <h3 className="text-sm font-medium text-white/70">{section.title}</h3>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-xs"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              color: "rgba(255, 255, 255, 0.25)",
            }}
          >
            Coming soon
          </span>
        </div>
        <EmptyState
          icon={section.empty.title === "No open issues" ? GithubIcon : section.icon}
          title={section.empty.title}
          description={section.empty.description}
        />
      </SpotlightCard>
    </motion.div>
  );
}

export default function Activity() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    }),
    [],
  );

  return (
    <section className="relative z-10 overflow-hidden py-32">
      <div className="mx-auto max-w-[1324px] px-6">
        <motion.div
          className="mb-16 max-w-[640px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="mb-4 inline-block text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(164, 69, 255, 0.7)" }}
          >
            Community Activity
          </span>
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            See what the community <span style={{ color: "rgba(255,255,255,0.5)" }}>is building.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SECTIONS.map((section, i) => (
            <ActivityCard key={section.id} section={section} index={i} />
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/betterspacx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium transition-colors duration-200"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            View all activity on GitHub
            <ArrowRight className="h-3 w-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
