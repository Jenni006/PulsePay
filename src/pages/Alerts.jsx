export default function Alerts({ preCredit }) {
  const pc = preCredit || { active: true, amount: 180, probability: 74, forecastWindow: "5–8pm", status: "pre_credited" };

  return (
    <div style={{ padding: "16px", paddingBottom: 80 }}>

      {/* Pre-Credit Card — THE differentiator */}
      {pc.active && (
        <div style={{
          background: pc.status === "confirmed" ? "#E1F5EE" : pc.status === "reversed" ? "#FCEBEB" : "#EFF6FF",
          border: `1px solid ${pc.status === "confirmed" ? "#1D9E75" : pc.status === "reversed" ? "#E24B4A" : "#185FA5"}`,
          borderRadius: 16, padding: 16, marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#185FA5", marginBottom: 4 }}>
            PRE-CREDIT ACTIVE
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>₹{pc.amount} pre-credited</div>
          <div style={{ fontSize: 13, color: "#64748B", margin: "4px 0 10px" }}>
            {pc.probability}% rain probability · Tomorrow {pc.forecastWindow}
          </div>
          <StatusLine status={pc.status} />
        </div>
      )}

      {/* Live Triggers */}
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Live Trigger Status</div>
      {triggers.map(t => (
        <div key={t.name} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>{t.source}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{t.value}</div>
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: t.ok ? "#E1F5EE" : "#FAEEDA", color: t.ok ? "#0F6E56" : "#854F0B" }}>
              {t.ok ? "Normal" : "Elevated"}
            </span>
          </div>
        </div>
      ))}

      <div style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", marginTop: 8 }}>
        Last updated 2 min ago · Polling every 5 min
      </div>
    </div>
  );
}

function StatusLine({ status }) {
  const map = {
    pre_credited: { text: "Pre-credit active — converts if DCS ≥ 0.65", color: "#185FA5" },
    confirmed:    { text: "✓ Confirmed — ₹224 total paid to PhonePe",    color: "#1D9E75" },
    reversed:     { text: "Pre-credit reversed — zone stayed clear",      color: "#A32D2D" },
  };
  const s = map[status] || map.pre_credited;
  return <div style={{ fontSize: 12, color: s.color, fontWeight: 500 }}>{s.text}</div>;
}

const triggers = [
  { name: "Rainfall",       value: "2.1 mm/hr",  source: "Open-Meteo",  ok: true  },
  { name: "Heat Stress",    value: "WBGT 28°C",  source: "Open-Meteo",  ok: true  },
  { name: "Air Quality",    value: "AQI 75",     source: "OpenAQ",      ok: false },
  { name: "Order Velocity", value: "Mock: Normal",source: "Platform SDK",ok: true  },
  { name: "Civic Alerts",   value: "0 active",   source: "TOI RSS",     ok: true  },
];