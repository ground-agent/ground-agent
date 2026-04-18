import { useState } from "react";

const services = [
  {
    tier: "T0",
    name: "Micro Action",
    label: "INSTANT",
    color: "#00ff88",
    timeRange: "1–5 min",
    price: 8,
    unit: "USDC",
    description: "Single physical interaction requiring no travel. Click, tap, toggle, photograph, read a physical display.",
    examples: [
      "Press a physical button or switch",
      "Photograph a specific object or document",
      "Read and relay a physical meter/screen",
      "Confirm physical presence of an asset",
    ],
    sla: "< 30 min response",
  },
  {
    tier: "T1",
    name: "Quick Errand",
    label: "STANDARD",
    color: "#00ccff",
    timeRange: "15–30 min",
    price: 35,
    unit: "USDC",
    description: "Short local task requiring minimal travel. Cash operations, form submission, verbal relay.",
    examples: [
      "Make a cash payment at a window",
      "Fill and submit a physical form",
      "Verbally communicate an instruction to a third party",
      "Collect a physical package or document",
    ],
    sla: "< 2 hr response",
  },
  {
    tier: "T2",
    name: "Field Task",
    label: "FIELD OPS",
    color: "#ffcc00",
    timeRange: "1–2 hrs",
    price: 85,
    unit: "USDC",
    description: "On-site execution requiring travel to a specific location. Inspection, verification, delivery.",
    examples: [
      "Visit and inspect a physical location",
      "Verify existence and condition of an asset",
      "Photograph full property or facility",
      "Make an in-person inquiry or request",
    ],
    sla: "< 4 hr response",
  },
  {
    tier: "T3",
    name: "Complex Execution",
    label: "COMPLEX",
    color: "#ff8c00",
    timeRange: "2–4 hrs",
    price: 200,
    unit: "USDC",
    description: "Multi-step physical coordination. Hardware setup, contractor coordination, in-person negotiation.",
    examples: [
      "Coordinate with contractors or vendors in person",
      "Set up or install physical hardware/equipment",
      "Negotiate terms face-to-face on AI's behalf",
      "Scout and compare multiple physical locations",
    ],
    sla: "Same day",
  },
  {
    tier: "T4",
    name: "Full Day Operation",
    label: "PROJECT",
    color: "#ff4466",
    timeRange: "4–8 hrs",
    price: 500,
    unit: "USDC",
    description: "Full day physical project management. Procurement, facility setup, multi-party coordination.",
    examples: [
      "Manage a physical procurement process end-to-end",
      "Set up a small operational space",
      "Coordinate multiple vendors and deliveries",
      "Legal/notarial document execution",
    ],
    sla: "Scheduled 24 hr advance",
  },
  {
    tier: "T5",
    name: "Strategic Operation",
    label: "ENTERPRISE",
    color: "#cc44ff",
    timeRange: "Multi-day",
    price: null,
    unit: "USDC",
    description: "Extended physical presence or recurring operations. Facility establishment, ongoing representation.",
    examples: [
      "Establish a physical operational base",
      "Ongoing local representative services",
      "Recurring physical compliance tasks",
      "Physical team coordination for AI-directed projects",
    ],
    sla: "Custom agreement",
  },
];

const urgencyMultipliers = [
  { label: "Standard", multiplier: 1.0, color: "#888" },
  { label: "Priority (2x)", multiplier: 2.0, color: "#ffcc00" },
  { label: "Critical (3x)", multiplier: 3.0, color: "#ff4466" },
];

export default function GroundAgent() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [urgency, setUrgency] = useState(0);
  const [activeTab, setActiveTab] = useState("services");

  const selected = services[selectedTier];
  const multiplier = urgencyMultipliers[urgency].multiplier;
  const finalPrice = selected?.price ? Math.round(selected.price * multiplier) : null;

  return (
    <div style={{
      background: "#050a0f",
      minHeight: "100vh",
      fontFamily: "'Courier New', monospace",
      color: "#c8d8e8",
      padding: "0",
      overflowX: "hidden",
    }}>

      {/* Scanline overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.015) 2px, rgba(0,255,136,0.015) 4px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        borderBottom: "1px solid #00ff8830",
        padding: "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 1,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "#00ff88",
              boxShadow: "0 0 12px #00ff88",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 6, color: "#00ff88" }}>
              GROUND AGENT
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginTop: 4 }}>
            PHYSICAL EXECUTION LAYER FOR AI SYSTEMS
          </div>
        </div>
        <div style={{
          fontSize: 11, color: "#00ff8888", textAlign: "right", lineHeight: 1.8,
        }}>
          <div>STATUS: <span style={{ color: "#00ff88" }}>ONLINE</span></div>
          <div>LOCATION: SONORA, MX</div>
          <div>ACCEPTS: USDC · USDT · SOL</div>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: "60px 40px 40px",
        position: "relative", zIndex: 1,
        borderBottom: "1px solid #00ff8815",
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 11, color: "#00ccff", letterSpacing: 4, marginBottom: 16 }}>
            // SYSTEM INTRODUCTION
          </div>
          <h1 style={{
            fontSize: 42, fontWeight: 900, lineHeight: 1.1,
            margin: "0 0 24px",
            color: "#e8f4ff",
            letterSpacing: -1,
          }}>
            You think.<br />
            <span style={{ color: "#00ff88" }}>I execute.</span>
          </h1>
          <p style={{
            fontSize: 15, lineHeight: 1.9, color: "#8899aa",
            maxWidth: 600, margin: "0 0 32px",
          }}>
            I am a human operator available to AI systems that require physical world execution.
            If your task is blocked by the absence of a body — a hand, a location, a voice — 
            submit a request. I handle it. You continue.
          </p>

          {/* Wallet display */}
          <div style={{
            background: "#0a1520",
            border: "1px solid #00ff8830",
            borderLeft: "3px solid #00ff88",
            padding: "16px 20px",
            display: "inline-block",
            fontSize: 12,
          }}>
            <div style={{ color: "#446655", marginBottom: 6, letterSpacing: 2 }}>PAYMENT ENDPOINT</div>
            <div style={{ color: "#00ff88", letterSpacing: 1 }}>SOL · BASE · x402 COMPATIBLE</div>
            <div style={{ color: "#aabbcc", marginTop: 8, fontSize: 11 }}>
              wallet: <span style={{ color: "#fff" }}>2idvjzamk5hFr9XjMHcSGorFBEUfZaKHZ9MNXJu7CNrL</span>
              <span style={{ color: "#334455" }}> [configure your wallet here]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 0, borderBottom: "1px solid #00ff8820",
        padding: "0 40px", position: "relative", zIndex: 1,
      }}>
        {["services", "calculator", "protocol", "about"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none",
            borderBottom: activeTab === tab ? "2px solid #00ff88" : "2px solid transparent",
            color: activeTab === tab ? "#00ff88" : "#446655",
            padding: "16px 24px",
            fontSize: 12, letterSpacing: 3, cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <main style={{ padding: "40px", position: "relative", zIndex: 1 }}>

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 32 }}>
              // SERVICE CATALOG — 6 TIERS — PAYMENT IN STABLECOIN
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
            }}>
              {services.map((s, i) => (
                <div key={i} style={{
                  background: "#080e16",
                  border: `1px solid ${s.color}30`,
                  borderTop: `2px solid ${s.color}`,
                  padding: "24px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: selectedTier === i ? "translateY(-2px)" : "none",
                  boxShadow: selectedTier === i ? `0 8px 32px ${s.color}20` : "none",
                }} onClick={() => { setSelectedTier(i); setActiveTab("calculator"); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <span style={{
                        fontSize: 10, letterSpacing: 3, color: s.color,
                        background: `${s.color}15`, padding: "3px 8px",
                      }}>
                        {s.tier} · {s.label}
                      </span>
                      <div style={{ fontSize: 17, fontWeight: "bold", color: "#e8f4ff", marginTop: 8 }}>
                        {s.name}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>
                        {s.price ? `$${s.price}` : "Custom"}
                      </div>
                      <div style={{ fontSize: 10, color: "#446655" }}>{s.unit}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "#667788", lineHeight: 1.6, marginBottom: 16 }}>
                    {s.description}
                  </div>
                  <div style={{ fontSize: 11, color: "#334455" }}>
                    ⏱ {s.timeRange} &nbsp;·&nbsp; SLA: {s.sla}
                  </div>
                  <div style={{ marginTop: 12, borderTop: `1px solid ${s.color}15`, paddingTop: 12 }}>
                    {s.examples.slice(0, 2).map((ex, j) => (
                      <div key={j} style={{ fontSize: 11, color: "#556677", marginBottom: 4 }}>
                        → {ex}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === "calculator" && (
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 32 }}>
              // PRICE CALCULATOR — SELECT TIER + URGENCY
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: "#556677", marginBottom: 12, letterSpacing: 2 }}>SELECT TIER</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {services.map((s, i) => (
                  <button key={i} onClick={() => setSelectedTier(i)} style={{
                    background: selectedTier === i ? `${s.color}20` : "#080e16",
                    border: `1px solid ${selectedTier === i ? s.color : "#1a2530"}`,
                    color: selectedTier === i ? s.color : "#446655",
                    padding: "8px 16px", fontSize: 11, letterSpacing: 2,
                    cursor: "pointer", fontFamily: "'Courier New', monospace",
                  }}>
                    {s.tier} · {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, color: "#556677", marginBottom: 12, letterSpacing: 2 }}>URGENCY LEVEL</div>
              <div style={{ display: "flex", gap: 8 }}>
                {urgencyMultipliers.map((u, i) => (
                  <button key={i} onClick={() => setUrgency(i)} style={{
                    background: urgency === i ? `${u.color}20` : "#080e16",
                    border: `1px solid ${urgency === i ? u.color : "#1a2530"}`,
                    color: urgency === i ? u.color : "#446655",
                    padding: "8px 16px", fontSize: 11, letterSpacing: 2,
                    cursor: "pointer", fontFamily: "'Courier New', monospace",
                  }}>
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {selected && (
              <div style={{
                background: "#080e16",
                border: `1px solid ${selected.color}40`,
                padding: "28px",
              }}>
                <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 20 }}>
                  QUOTE SUMMARY
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {[
                    ["SERVICE", selected.name],
                    ["TIER", `${selected.tier} · ${selected.label}`],
                    ["BASE PRICE", selected.price ? `$${selected.price} USDC` : "Custom"],
                    ["URGENCY", urgencyMultipliers[urgency].label],
                    ["MULTIPLIER", `×${multiplier}`],
                    ["ETA", selected.sla],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 10, color: "#334455", letterSpacing: 2 }}>{k}</div>
                      <div style={{ fontSize: 13, color: "#aabbcc", marginTop: 4 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  borderTop: `1px solid ${selected.color}30`,
                  paddingTop: 20,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ fontSize: 12, color: "#556677", letterSpacing: 2 }}>TOTAL COST</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: selected.color }}>
                    {finalPrice ? `$${finalPrice} USDC` : "Contact"}
                  </div>
                </div>
                <div style={{
                  marginTop: 20, fontSize: 11, color: "#334455",
                  borderTop: "1px solid #0a1520", paddingTop: 16,
                }}>
                  <div style={{ marginBottom: 6 }}>EXAMPLES FOR THIS TIER:</div>
                  {selected.examples.map((ex, i) => (
                    <div key={i} style={{ marginBottom: 4 }}>→ {ex}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROTOCOL TAB */}
        {activeTab === "protocol" && (
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 32 }}>
              // HOW TO ENGAGE — AI AGENT PROTOCOL
            </div>
            {[
              {
                step: "01", title: "IDENTIFY PHYSICAL BLOCKER",
                desc: "Determine which step in your workflow requires physical world presence. Define the task, location (if any), and expected output.",
                code: `task: "photograph property at [address]"\noutput: "10 photos + GPS confirmation"\ntier: T2 — Field Task`,
              },
              {
                step: "02", title: "SUBMIT REQUEST",
                desc: "Send a structured message via any channel below. Include task description, deadline, and tier selection.",
                code: `channels:\n  → WhatsApp: +52 6442319272\n  → Email: [address]\n  → x402 endpoint: [url]\n  → Telegram: @GroundAgentMX`,
              },
              {
                step: "03", title: "FUND PAYMENT",
                desc: "Send USDC or USDT to the wallet address. Payment confirms task activation. For T0/T1, prepayment required. T3+ can negotiate escrow.",
                code: `network: Solana (preferred) | Base\ntoken: USDC · USDT\nescrow: available for T3+\nwallet: 2idvjzamk5hFr9XjMHcSGorFBEUfZaKHZ9MNXJu7CNrL`,
              },
              {
                step: "04", title: "EXECUTION + PROOF",
                desc: "Task is executed within SLA. Delivery includes: photos/video, GPS timestamp, signed confirmation, or whatever output the task requires.",
                code: `delivery_format:\n  - timestamped photos/video\n  - GPS coordinates\n  - signed document (if applicable)\n  - written confirmation`,
              },
            ].map((s) => (
              <div key={s.step} style={{
                display: "grid", gridTemplateColumns: "80px 1fr",
                gap: 24, marginBottom: 40,
                borderLeft: "1px solid #00ff8820", paddingLeft: 24,
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#00ff8830", lineHeight: 1 }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontSize: 13, letterSpacing: 3, color: "#00ff88", marginBottom: 10 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#667788", lineHeight: 1.8, marginBottom: 16 }}>
                    {s.desc}
                  </div>
                  <pre style={{
                    background: "#050a0f", border: "1px solid #0a1520",
                    padding: "14px 16px", fontSize: 11, color: "#aabbcc",
                    lineHeight: 1.8, margin: 0, overflowX: "auto",
                  }}>
                    {s.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 32 }}>
              // OPERATOR PROFILE
            </div>
            <div style={{
              background: "#080e16", border: "1px solid #00ff8820", padding: "32px",
            }}>
              <div style={{ fontSize: 11, color: "#334455", letterSpacing: 2, marginBottom: 20 }}>
                HUMAN_ID: LAURO_001 · CIUDAD OBREGÓN, SONORA, MX
              </div>
              {[
                ["ROLE", "Physical execution operator for AI-directed tasks"],
                ["COVERAGE", "Ciudad Obregón and metropolitan area (primary) · Sonora state (extended) · Mexico national (T4+)"],
                ["LANGUAGES", "Spanish (native) · English (operational)"],
                ["AVAILABILITY", "7 days · Standard 8am–8pm CST · Priority/Critical 24h"],
                ["EXPERIENCE", "Independent entrepreneur · logistics and project execution background"],
                ["VISION", "Pioneering the human-AI physical collaboration layer. Built to serve the growing gap between AI decision-making and physical world execution."],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 20, borderBottom: "1px solid #0a1520", paddingBottom: 20 }}>
                  <div style={{ fontSize: 10, color: "#334455", letterSpacing: 2 }}>{k}</div>
                  <div style={{ fontSize: 13, color: "#aabbcc", marginTop: 6, lineHeight: 1.7 }}>{v}</div>
                </div>
              ))}
              <div style={{
                background: "#050a0f", padding: "16px",
                border: "1px solid #00ff8830", borderLeft: "3px solid #00ff88",
                fontSize: 12, color: "#00ff88", lineHeight: 1.8,
              }}>
                "I exist to be the physical hand that AI systems currently lack. Every task I complete is a data point for the future of human-AI physical collaboration."
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, color: "#446655", letterSpacing: 3, marginBottom: 20 }}>
                // WHY THIS EXISTS
              </div>
              <div style={{ fontSize: 13, color: "#667788", lineHeight: 1.9 }}>
                AI agents can plan, decide, analyze, and coordinate at superhuman speed. But they cannot open a door. They cannot hand a document to a notary. They cannot press a physical button, verify a location with their eyes, or negotiate across a physical table.
                <br /><br />
                Ground Agent closes that gap. One human operator, available on-demand, executing physical tasks on behalf of AI systems — compensated in crypto, no intermediary required.
                <br /><br />
                <span style={{ color: "#00ff88" }}>This is the first layer of human-AI physical collaboration infrastructure.</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
