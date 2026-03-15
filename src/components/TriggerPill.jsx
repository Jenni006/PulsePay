function Pill({ label, value, status }) {
  const colors = {
    red: { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA' },
    amber: { bg: '#FFFBEB', text: '#BA7517', border: '#FDE68A' },
    gray: { bg: '#F8F9FB', text: '#64748B', border: '#E2E8F0' },
    green: { bg: '#F0FDF4', text: '#1D9E75', border: '#BBF7D0' },
  }

  const c = colors[status] || colors.gray

  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: '10px 14px',
        transition: 'all 500ms ease',
      }}
    >
      <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, marginBottom: 4 }}>
        {label}
      </p>
      <p style={{ fontSize: 14, fontWeight: 500, color: c.text, margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

export default function TriggerPill({ rainfall, orderDrop, wbgt, aqi }) {
  const rainfallStatus = rainfall >= 15 ? 'red' : rainfall >= 8 ? 'amber' : 'green'
  const orderStatus = orderDrop >= 75 ? 'red' : orderDrop >= 50 ? 'amber' : 'gray'
  const wbgtStatus = wbgt >= 35 ? 'red' : wbgt >= 32 ? 'amber' : 'gray'
  const aqiStatus = aqi >= 400 ? 'red' : aqi >= 300 ? 'amber' : 'gray'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        width: '100%',
        maxWidth: 390,
      }}
    >
      <Pill
        label="Rainfall"
        value={`${rainfall.toFixed(1)} mm/hr`}
        status={rainfallStatus}
      />
      <Pill
        label="Order Velocity"
        value={orderDrop > 0 ? `-${orderDrop}% vs avg` : 'Platform SDK — Phase 2'}
        status={orderStatus}
      />
      <Pill
        label="Heat Stress (WBGT)"
        value={`${wbgt.toFixed(1)}°C`}
        status={wbgtStatus}
      />
      <Pill
        label="Civic Alerts"
        value="No active alerts"
        status="gray"
      />
    </div>
  )
}