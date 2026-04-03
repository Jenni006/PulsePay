function Pill({ label, value, status, icon }) {
  const colors = {
    red:   { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA', dot: '#E24B4A' },
    amber: { bg: '#FFFBEB', text: '#BA7517', border: '#FDE68A', dot: '#BA7517' },
    green: { bg: '#F0FDF4', text: '#1D9E75', border: '#BBF7D0', dot: '#1D9E75' },
    gray:  { bg: '#F8F9FB', text: '#64748B', border: '#E2E8F0', dot: '#CBD5E1' },
  }

  const c = colors[status] || colors.gray

  return (
    <div style={{
      background: 'white',
      border: `1px solid ${c.border}`,
      borderRadius: 12,
      padding: '12px 14px',
      transition: 'all 400ms ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {/* Label row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 6, marginBottom: 8,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: c.dot, flexShrink: 0,
          boxShadow: status !== 'gray' ? `0 0 0 2px ${c.bg}` : 'none',
        }} />
        <p style={{
          fontSize: 10, fontWeight: 700,
          color: '#94A3B8', margin: 0,
          textTransform: 'uppercase', letterSpacing: '0.07em',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>{label}</p>
      </div>

      {/* Value */}
      <p style={{
        fontSize: 13, fontWeight: 700,
        color: c.text, margin: 0,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: '-0.1px',
      }}>{value}</p>

      {/* Status tag */}
      <div style={{
        display: 'inline-block',
        marginTop: 8,
        background: c.bg,
        borderRadius: 20, padding: '2px 8px',
        fontSize: 10, fontWeight: 700,
        color: c.text,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {status === 'red' ? 'Critical'
          : status === 'amber' ? 'Watch'
          : status === 'green' ? 'Clear'
          : 'Normal'}
      </div>
    </div>
  )
}

export default function TriggerPill({ rainfall, orderDrop, wbgt, aqi }) {
  const rainfallStatus = rainfall >= 15 ? 'red' : rainfall >= 8 ? 'amber' : 'green'
  const orderStatus   = orderDrop >= 75 ? 'red' : orderDrop >= 50 ? 'amber' : 'gray'
  const wbgtStatus    = wbgt >= 35 ? 'red' : wbgt >= 32 ? 'amber' : 'gray'
  const aqiStatus     = aqi >= 400 ? 'red' : aqi >= 300 ? 'amber' : 'gray'

  return (
    <>
      <style>{`
        @keyframes pill-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(226,75,74,0.15); }
          50%       { box-shadow: 0 0 0 4px rgba(226,75,74,0.05); }
        }
      `}</style>

      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 14,
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        {/* Section header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 12,
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700,
            color: '#94A3B8', margin: 0,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Live Triggers</p>
          <p style={{ fontSize: 11, color: '#CBD5E1', margin: 0 }}>
            Updated 3 min ago
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}>
          <Pill
            label="Rainfall"
            value={`${rainfall.toFixed(1)} mm/hr`}
            status={rainfallStatus}
          />
          <Pill
            label="Order Velocity"
            value={orderDrop > 0 ? `-${orderDrop}% vs avg` : 'Normal'}
            status={orderStatus}
          />
          <Pill
            label="Heat Stress"
            value={`WBGT ${wbgt.toFixed(1)}°C`}
            status={wbgtStatus}
          />
          <Pill
            label="Civic Alerts"
            value="No active alerts"
            status={aqiStatus === 'red' || aqiStatus === 'amber' ? aqiStatus : 'gray'}
          />
        </div>
      </div>
    </>
  )
}