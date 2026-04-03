export default function Policy({ worker }) {
  const zone = worker?.zone || "Vadapalani — Zone C";
  const premium = worker?.premium || 22;
  const coverage = worker?.coverage || 1000;

  return (
    <div style={{ padding: "16px", paddingBottom: 80, background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header - Curved with Shadow */}
      <div 
        style={{ 
          background: "#185FA5", 
          borderRadius: "28px", 
          padding: "24px 20px", 
          color: "#fff", 
          marginBottom: 20,
          boxShadow: "0 10px 20px rgba(24, 95, 165, 0.2)",
          position: "relative"
        }}
      >
        <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Active Policy
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, margin: "6px 0 12px" }}>{zone}</div>
        <span style={{ background: "#1D9E75", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700 }}>
          ● ACTIVE
        </span>
      </div>

      {/* Coverage Card */}
      <div style={card}>
        <Row label="Platform" value={worker?.platform || "Blinkit"} />
        <Row label="Weekly Premium" value={`₹${premium}`} />
        <Row label="Coverage Cap" value={`₹${coverage}`} />
        <Row label="Active Hours" value="8am–10pm" />
        <Row label="Days Remaining" value="5 days" />
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, fontWeight: 500 }}>Coverage used</div>
          <div style={{ background: "#E2E8F0", borderRadius: 99, height: 8 }}>
            <div style={{ background: "#185FA5", width: "22.4%", height: 8, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 6, fontWeight: 600 }}>₹224 of ₹1,000</div>
        </div>
      </div>

      {/* Premium Breakdown */}
      <div style={card}>
        <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15, color: "#1E293B" }}>Premium Breakdown</div>
        <Row label="Base Rate" value="₹16" />
        <Row label="Zone C Multiplier (1.2×)" value="₹4" />
        <Row label="Monsoon Seasonal Factor" value="₹2" />
        <div style={{ borderTop: "1px solid #F1F5F9", marginTop: 12, paddingTop: 12 }}>
          <Row label="Total Weekly" value={`₹${premium}`} bold />
        </div>
        <div style={{ fontSize: 11, color: "#B45309", marginTop: 12, background: "#FFFBEB", padding: "8px", borderRadius: "8px" }}>
          ⚠ Your zone has 3× higher monsoon risk than average
        </div>
      </div>

      {/* Renew Button */}
      <button style={{
        width: "100%", padding: "16px", background: "#185FA5", color: "#fff",
        border: "none", borderRadius: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer",
        boxShadow: "0 4px 12px rgba(24, 95, 165, 0.3)"
      }}>
        Renew Policy — ₹{premium}/week
      </button>
    </div>
  );
}

const card = {
  background: "#fff", 
  borderRadius: "24px", // Matches the modern curved aesthetic
  padding: "20px", 
  marginBottom: 16,
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)", // Soft shadow
  border: "1px solid #F1F5F9"
};

function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
      <span style={{ color: "#64748B", fontWeight: 400 }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 500, color: bold ? "#185FA5" : "#1E293B" }}>{value}</span>
    </div>
  );
}