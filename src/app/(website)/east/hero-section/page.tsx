"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, ArrowRight, Download } from "lucide-react";

const LOG_LINES = [
  "[INFO] iot-cloud-sec :: benchmark stream initialised (edge + cloud + orchestration)",
  "[MODEL] random_forest + xgboost :: ensemble vote → benign (p=0.981)",
  "[MODEL] lstm-autoencoder :: reconstruction_error=0.043 :: within baseline",
  "[DRIFT] concept-drift monitor :: distribution shift detected on window t+142",
  "[ADAPT] retraining triggered :: federated update queued across 4 edge nodes",
  "[ALERT] anomaly score 0.92 :: unseen attack pattern flagged for review",
  "[XAI] shap_explainer :: top features → packet_iat, flow_duration, syn_ratio",
  "[PRIVACY] gradients aggregated :: raw telemetry never leaves edge node",
  "[STATUS] hybrid IDS :: edge-cloud-iot pipeline nominal",
];

function ThreatFeed() {
  const [visible, setVisible] = useState<string[]>(LOG_LINES.slice(0, 5));
  const [cursor, setCursor] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((prev) => {
        const next = LOG_LINES[cursor % LOG_LINES.length];
        const updated = [...prev.slice(1), next];
        return updated;
      });
      setCursor((c) => c + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [cursor]);

  const tone = (line: string) => {
    if (line.startsWith("[ALERT]")) return "var(--signal)";
    if (line.startsWith("[DRIFT]") || line.startsWith("[ADAPT]")) return "var(--accent-strong)";
    return "var(--text-muted)";
  };

  return (
    <div
      className="relative w-full max-w-md rounded-xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 0 0 1px rgba(57,230,176,0.06), 0 20px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      {/* window chrome */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-elevated)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f2555a" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--signal)" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)" }} />
        </div>
        <span className="font-mono text-xs tracking-wide" style={{ color: "var(--text-faint)" }}>
          hybrid-ids — live monitor
        </span>
      </div>

      {/* log body */}
      <div className="relative p-4 h-64 overflow-hidden font-mono text-[12px] leading-relaxed">
        <div
          className="scan-sweep pointer-events-none absolute inset-x-0 h-16 opacity-40"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(57,230,176,0.10), transparent)",
          }}
        />
        {visible.map((line, i) => (
          <motion.p
            key={line + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="whitespace-pre-wrap break-words mb-1.5"
            style={{ color: tone(line) }}
          >
            {line}
          </motion.p>
        ))}
        <p className="mt-1" style={{ color: "var(--accent)" }}>
          <span>root@edge-node:~$</span> <span className="caret">▍</span>
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="grid-scan min-h-screen flex items-center w-full px-6 sm:px-8 pt-28 pb-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.15fr_1fr] gap-16 items-center">
        {/* Left: identity */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6"
            style={{ border: "1px solid var(--border-strong)", color: "var(--accent)" }}
          >
            <ShieldCheck size={14} />
            AI for Cybersecurity Researcher
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] mb-6"
            style={{ color: "var(--text)" }}
          >
            Raju Molla
          </h1>

          <p className="max-w-xl text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            MSc researcher in Cybersecurity &amp; Digital Forensics building{" "}
            <span style={{ color: "var(--text)" }}>adaptive intrusion detection</span> for
            edge–cloud–IoT systems, and a full-stack engineer who ships production software in
            .NET, Node.js and React.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 font-mono text-sm" style={{ color: "var(--text-faint)" }}>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> London, United Kingdom
            </span>
            <span className="hidden sm:inline">·</span>
            <span>TryHackMe — Top 3% Global</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => smoothScrollTo("research")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent)", color: "#04120d" }}
            >
              View Research <ArrowRight size={16} />
            </button>
            <button
              onClick={() => smoothScrollTo("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ border: "1px solid var(--border-strong)", color: "var(--text)" }}
            >
              View Projects
            </button>
            <a
              href="/Raju_Molla_Update_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <Download size={16} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Right: signature terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <ThreatFeed />
        </motion.div>
      </div>
    </section>
  );
}
