import { useState } from "react";

const allClaims = [
  { id: "GW-2024-VAD-001", date: "Oct 15 2024", type: "Heavy Rain", dcs: 0.65, amount: 224, time: "5 min", status: "Auto-Approved" },
  { id: "GW-2024-VAD-002", date: "Sep 3 2024",  type: "Flooding",   dcs: 0.71, amount: 280, time: "4 min", status: "Auto-Approved" },
  { id: "GW-2024-VAD-003", date: "Aug 19 2024", type: "Heat Stress", dcs: 0.66, amount: 180, time: "6 min", status: "Auto-Approved" },
  { id: "GW-2024-VAD-004", date: "Aug 2 2024",  type: "Rain",       dcs: 0.60, amount: 0,   time: "—",     status: "Reversed" },
];

const filters = ["All Time", "This Month", "This Week"];

const statusColor = {
  "Auto-Approved": { bg: "#E1F5EE", color: "#0F6E56" },
  "Under Review":  { bg: "#FAEEDA", color: "#854F0B" },
  "Reversed":      { bg: "#FCEBEB", color: "#A32D2D" },
};

export default function Claims() {
  const [filter, setFilter] = useState("All Time");

  return (
    <>
      <div 
        style={{ 
          background: "#185FA5", 
          padding: "44px 20px 40px", 
          marginBottom: 0,
          borderBottomLeftRadius: "30px", 
          borderBottomRightRadius: "30px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.12)",
          position: "relative",
          zIndex: 10 
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Claims</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
          Your payout history
        </div>
      </div>
      <div style={{ padding: "16px", paddingBottom: 80 }}>
        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[["Total Paid Out", "₹684"], ["Claims Filed", "4"]].map(([l, v]) => (
            <div key={l} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#64748B" }}>{l}</div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 12px", borderRadius: 20, border: "1px solid #E2E8F0", fontSize: 12,
              background: filter === f ? "#185FA5" : "#fff",
              color: filter === f ? "#fff" : "#64748B", cursor: "pointer",
            }}>{f}</button>
          ))}
        </div>

        {/* Claims List */}
        {allClaims.map(c => (
          <div key={c.id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{c.type}</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{c.date} · {c.id}</div>
              </div>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 500, ...statusColor[c.status] }}>
                {c.status}
              </span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748B" }}>
              <span>DCS: <b style={{ color: "#0F172A" }}>{c.dcs}</b></span>
              <span>Amount: <b style={{ color: "#185FA5" }}>₹{c.amount}</b></span>
              <span>Processed: <b style={{ color: "#0F172A" }}>{c.time}</b></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}