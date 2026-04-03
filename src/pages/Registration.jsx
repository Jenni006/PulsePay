import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. Global Design System & Animation Variants ---
const COLORS = {
  navy: "#0B1A2B",
  electricBlue: "#185FA5",
  aqua: "#2EE6C9",
  white: "#FFFFFF",
  glass: "rgba(255, 255, 255, 0.06)",
  glassBorder: "rgba(255, 255, 255, 0.12)",
};

const panelVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 200,
      staggerChildren: 0.12,
      delayChildren: 0.2
    } 
  },
  exit: { 
    x: "-100%", 
    opacity: 0,
    transition: { ease: "easeInOut", duration: 0.3 } 
  }
};

const childVariants = {
  initial: { y: 24, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

// --- 2. Shared Visual Components ---

function Bokeh() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {[[15, 10, 120, 0.04], [80, 5, 80, 0.03], [60, 70, 160, 0.03], [90, 40, 60, 0.05]].map(([x, y, s, o], i) => (
        <motion.div
          key={i}
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: "absolute", left: `${x}%`, top: `${y}%`, width: s, height: s, 
            borderRadius: "50%", background: "white", opacity: o, filter: "blur(40px)" 
          }}
        />
      ))}
    </div>
  );
}

function GlassStack({ angle = false, bright = false, count = 4 }) {
  return (
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: 140, height: 160, margin: "0 auto" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: i * 18,
          width: 130 * (1 - i * 0.06), height: 30,
          transform: `translateX(-50%) rotateX(${angle ? 52 : 48}deg)${angle ? ` rotateZ(${-8 + i * 3}deg)` : ""}`,
          borderRadius: "50%",
          background: bright && i === count - 1 ? "rgba(46,230,201,0.2)" : "rgba(24,95,165,0.18)",
          border: `1px solid ${i === 0 ? COLORS.aqua : "rgba(255,255,255,0.1)"}`,
          backdropFilter: "blur(12px)",
          boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
        }} />
      ))}
    </motion.div>
  );
}

function Keypad({ onTap, isVerify = false }) {
  const keys = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["⌫", "0", isVerify ? "✓" : "→"]];
  return (
    <div style={{ display: "grid", gridTemplateRows: "repeat(4,1fr)", gap: 8, padding: 20 }}>
      {keys.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {row.map(k => (
            <motion.button
              key={k}
              whileTap={{ scale: 0.92, backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={() => onTap(k)}
              style={{ 
                padding: "16px 0", borderRadius: 16, background: COLORS.glass, 
                border: "none", color: (k === "→" || k === "✓") ? COLORS.aqua : COLORS.white, 
                fontSize: 22, fontWeight: 600, cursor: "pointer" 
              }}
            >
              {k}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
}

// --- 3. Main Application ---

export default function Registration({ onComplete }) {
  const [screen, setScreen] = useState("hero");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const slideData = [
    { title: "Disruptions happen.", hi: "Rain. Heat. Shutdowns.", sub: "Your income shouldn't depend on them.", angle: false },
    { title: "We detect income loss", hi: "in real time.", sub: "No claims. No waiting. No forms.", angle: true },
    { title: "Starts at", hi: "₹22/week.", sub: "Less than your daily chai.", mini: true },
  ];

  const handleNextSlide = (idx) => setScreen(idx < 2 ? `slide${idx + 1}` : "phone");

  return (
    <div style={{ width: "100%", height: "100vh", background: COLORS.navy, overflow: "hidden", position: "relative", color: COLORS.white, fontFamily: "sans-serif" }}>
      <Bokeh />
      <AnimatePresence mode="wait">
        
        {/* PANEL 1: HERO */}
        {screen === "hero" && (
          <motion.div key="hero" variants={panelVariants} initial="initial" animate="animate" exit="exit" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 30px" }}>
            <motion.div variants={childVariants}>
              <div style={{ letterSpacing: 3, opacity: 0.4, fontSize: 12, fontWeight: 700 }}>PULSEPAY</div>
              <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: 10, lineHeight: 1.1 }}>Income Protection<br/>for Every Ride.</h1>
            </motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}>
              <GlassStack bright />
            </motion.div>
            <motion.div variants={childVariants} style={{ textAlign: "center" }}>
              <p style={{ opacity: 0.5, marginBottom: 30 }}>We pay before disruption stops you.</p>
              <button onClick={() => setScreen("slide0")} style={{ width: "100%", padding: 20, borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.aqua})`, border: "none", color: "#fff", fontSize: 18, fontWeight: 800, boxShadow: `0 10px 30px rgba(46,230,201,0.2)` }}>Get Protected →</button>
            </motion.div>
          </motion.div>
        )}

        {/* PANELS 2-4: ONBOARDING SLIDES */}
        {slideData.map((slide, i) => screen === `slide${i}` && (
          <motion.div key={`slide${i}`} variants={panelVariants} initial="initial" animate="animate" exit="exit" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 30px" }}>
            <div style={{ textAlign: "right" }}><button onClick={() => setScreen("phone")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)" }}>Skip</button></div>
            <motion.div variants={childVariants} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <GlassStack angle={slide.angle} />
              <h2 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>{slide.title}<br/><span style={{ color: COLORS.aqua }}>{slide.hi}</span></h2>
              <p style={{ opacity: 0.4, marginTop: 15, lineHeight: 1.5 }}>{slide.sub}</p>
            </motion.div>
            <motion.div variants={childVariants}>
               <button onClick={() => handleNextSlide(i)} style={{ width: "100%", padding: 20, borderRadius: 20, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, color: "#fff", fontSize: 18, fontWeight: 700 }}>Next →</button>
            </motion.div>
          </motion.div>
        ))}

        {/* PANEL 5: PHONE INPUT */}
        {screen === "phone" && (
          <motion.div key="phone" variants={panelVariants} initial="initial" animate="animate" exit="exit" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <motion.h2 variants={childVariants} style={{ fontSize: 32, fontWeight: 800 }}>Mobile Number</motion.h2>
              <motion.div variants={childVariants} style={{ display: "flex", gap: 15, borderBottom: `2px solid ${COLORS.aqua}`, padding: "15px 0", marginTop: 20 }}>
                <span style={{ fontSize: 24, opacity: 0.3 }}>+91</span>
                <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>{mobile || "00000 00000"}</span>
              </motion.div>
            </div>
            <motion.div variants={childVariants} style={{ background: "rgba(255,255,255,0.03)", borderTop: `1px solid ${COLORS.glassBorder}` }}>
              <Keypad onTap={(k) => {
                if (k === "⌫") setMobile(m => m.slice(0, -1));
                else if (k === "→") { if (mobile.length === 10) setScreen("otp"); }
                else if (mobile.length < 10 && !isNaN(k)) setMobile(m => m + k);
              }} />
            </motion.div>
          </motion.div>
        )}

        {/* PANEL 6: OTP VERIFICATION (UPDATED) */}
        {screen === "otp" && (
          <motion.div key="otp" variants={panelVariants} initial="initial" animate="animate" exit="exit" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.h2 variants={childVariants} style={{ fontSize: 32, fontWeight: 800 }}>Verify</motion.h2>
              <motion.p variants={childVariants} style={{ opacity: 0.4 }}>Sent to +91 {mobile}</motion.p>
              
              <motion.div 
                variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
                style={{ display: "flex", gap: 12, marginTop: 40 }}
              >
                {[0, 1, 2, 3].map(i => {
                  const isCurrent = otp.length === i;
                  return (
                    <motion.div 
                      key={i}
                      variants={{ initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } }}
                      animate={isCurrent ? { scale: 1.1, borderColor: COLORS.aqua } : { scale: 1 }}
                      style={{ 
                        width: 60, height: 74, borderRadius: 16, 
                        border: `2px solid ${otp[i] ? COLORS.aqua : isCurrent ? COLORS.aqua : COLORS.glassBorder}`, 
                        background: COLORS.glass, display: "flex", alignItems: "center", justifyContent: "center", 
                        fontSize: 28, fontWeight: 800, color: COLORS.aqua,
                        boxShadow: isCurrent ? `0 0 15px rgba(46,230,201,0.2)` : "none"
                      }}
                    >
                      {otp[i]}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            
            <motion.div variants={childVariants} style={{ background: "rgba(255,255,255,0.03)", borderTop: `1px solid ${COLORS.glassBorder}` }}>
              <Keypad isVerify onTap={(k) => {
                if (k === "⌫") setOtp(o => o.slice(0, -1));
                else if (k === "✓") { 
                   if (otp.length === 4) setScreen("kyc"); 
                }
                else if (otp.length < 4 && !isNaN(k)) setOtp(o => o + k);
              }} />
            </motion.div>
          </motion.div>
        )}

        {/* PANEL 7: KYC & ZONE MAPPING */}
        {screen === "kyc" && (
          <PanelKYC key="kyc" mobile={mobile} onComplete={onComplete} />
        )}

      </AnimatePresence>
    </div>
  );
}

// --- Internal KYC Component ---

function PanelKYC({ mobile, onComplete }) {
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");

  const zoneMap = {
    Blinkit: { zone: "Vadapalani — Zone C", premium: 22, coverage: 1000, risk: "High" },
    Zepto: { zone: "Anna Nagar — Zone B", premium: 18, coverage: 800, risk: "Medium" },
    "Swiggy Instamart": { zone: "T Nagar — Zone B", premium: 18, coverage: 800, risk: "Medium" },
  };

  const handleFinish = () => {
    const workerData = {
      name,
      mobile,
      platform,
      ...zoneMap[platform]
    };
    localStorage.setItem("worker", JSON.stringify(workerData));
    onComplete(workerData);
  };

  return (
    <motion.div variants={panelVariants} initial="initial" animate="animate" exit="exit" style={{ height: "100%", padding: 40, display: "flex", flexDirection: "column", gap: 30, justifyContent: "center" }}>
      <motion.div variants={childVariants}>
        <h2 style={{ fontSize: 32, fontWeight: 800 }}>Profile</h2>
        <p style={{ opacity: 0.4 }}>Verify your work platform.</p>
      </motion.div>

      <motion.div variants={childVariants}>
        <label style={{ fontSize: 12, opacity: 0.4, letterSpacing: 1 }}>FULL NAME</label>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="e.g. Dinesh R." 
          style={{ width: "100%", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, padding: 20, borderRadius: 16, color: "#fff", fontSize: 16, marginTop: 10, outline: "none" }} 
        />
      </motion.div>

      <motion.div variants={childVariants}>
        <label style={{ fontSize: 12, opacity: 0.4, letterSpacing: 1 }}>PLATFORM</label>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {Object.keys(zoneMap).map(p => (
            <button 
              key={p} 
              onClick={() => setPlatform(p)} 
              style={{ flex: 1, padding: 14, borderRadius: 12, border: `1px solid ${platform === p ? COLORS.aqua : COLORS.glassBorder}`, background: platform === p ? "rgba(46,230,201,0.1)" : "transparent", color: platform === p ? COLORS.aqua : "#fff", fontWeight: 700, fontSize: 11 }}
            >
              {p}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={childVariants}>
        <button 
          disabled={!name || !platform} 
          onClick={handleFinish} 
          style={{ width: "100%", padding: 22, borderRadius: 20, background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.aqua})`, border: "none", color: "#fff", fontSize: 18, fontWeight: 800, marginTop: 20, opacity: (name && platform) ? 1 : 0.3 }}
        >
          Activate Shield 🛡️
        </button>
      </motion.div>
    </motion.div>
  );
}