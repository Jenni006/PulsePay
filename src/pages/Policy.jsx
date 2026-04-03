export default function Policy({ worker }) {
  const zone = worker?.zone || "Vadapalani — Zone C";
  const premium = worker?.premium || 22;
  const coverage = worker?.coverage || 1000;

  return (
    <div style={{ padding: "16px", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: "#185FA5", borderRadius: 16, padding: 16, color: "#fff", marginBottom: 16 }}>
        <div style={{ fontSize: 11, opacity: 0.8 }}>Active Policy</div>
        <div style={{ fontSize: 20, fontWeight: 600, margin: "4px 0" }}>{zone}</div>
        <span style={{ background: "#1D9E75", borderRadius: 20, padding: "2px 12px", fontSize: 11 }}>● ACTIVE</span>
      </div>

      {/* Coverage Card */}
      <div style={card}>
        <Row label="Platform" value={worker?.platform || "Blinkit"} />
        <Row label="Weekly Premium" value={`₹${premium}`} />
        <Row label="Coverage Cap" value={`₹${coverage}`} />
        <Row label="Active Hours" value="8am–10pm" />
        <Row label="Days Remaining" value="5 days" />
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>Coverage used</div>
          <div style={{ background: "#E2E8F0", borderRadius: 99, height: 6 }}>
            <div style={{ background: "#185FA5", width: "22.4%", height: 6, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>₹224 of ₹1,000</div>
        </div>
      </div>

      {/* Premium Breakdown */}
      <div style={card}>
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>Premium Breakdown</div>
        <Row label="Base Rate" value="₹16" />
        <Row label="Zone C Multiplier (1.2×)" value="₹4" />
        <Row label="Monsoon Seasonal Factor" value="₹2" />
        <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 8, paddingTop: 8 }}>
          <Row label="Total Weekly" value={`₹${premium}`} bold />
        </div>
        <div style={{ fontSize: 11, color: "#BA7517", marginTop: 8 }}>
          ⚠ Your zone has 3× higher monsoon risk than average
        </div>
      </div>

      {/* Renew Button */}
      <button style={{
        width: "100%", padding: "14px", background: "#185FA5", color: "#fff",
        border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer",
      }}>
        Renew Policy — ₹{premium}/week
      </button>
    </div>
  );
}

const card = {
  background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
  padding: 16, marginBottom: 12,
};

function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
      <span style={{ color: "#64748B" }}>{label}</span>
      <span style={{ fontWeight: bold ? 600 : 400 }}>{value}</span>
    </div>
  );
}