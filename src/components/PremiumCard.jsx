export default function PremiumCard({ zoneData }) {
  const riskColor = {
    'High Risk': { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA' },
    'Medium Risk': { bg: '#FFFBEB', text: '#BA7517', border: '#FDE68A' },
    'Flood Prone': { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA' },
  }

  const colors = riskColor[zoneData.risk] || riskColor['Medium Risk']

  return (
    <div
      style={{
        background: '#F8F9FB',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 4,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Weekly Premium</p>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#0F172A', margin: 0 }}>
            ₹{zoneData.premium}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Coverage Cap</p>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#0F172A', margin: 0 }}>
            ₹{zoneData.cap.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E8F0', marginBottom: 12 }} />

      {/* Risk badge + explanation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {zoneData.risk}
        </span>
        <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
          {zoneData.zone === 'C'
            ? 'Vadapalani has elevated monsoon flood risk'
            : 'Moderate disruption risk based on zone history'}
        </p>
      </div>
    </div>
  )
}