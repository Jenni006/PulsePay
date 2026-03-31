export default function PremiumCard({ zoneData }) {
  const riskColor = {
    'High Risk':   { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA', dot: '#E24B4A' },
    'Medium Risk': { bg: '#FFFBEB', text: '#BA7517', border: '#FDE68A', dot: '#BA7517' },
    'Flood Prone': { bg: '#FEF2F2', text: '#E24B4A', border: '#FECACA', dot: '#E24B4A' },
  }

  const colors = riskColor[zoneData.risk] || riskColor['Medium Risk']

  const explanation = zoneData.zone === 'C'
    ? 'Vadapalani has 3× higher monsoon flood risk than Chennai average'
    : 'Moderate disruption risk based on zone history'

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '16px 18px',
        marginBottom: 4,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 14,
        }}>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700,
              color: '#94A3B8', margin: '0 0 4px',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Weekly Premium</p>
            <p style={{
              fontSize: 28, fontWeight: 800,
              color: '#0F172A', margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.5px',
            }}>₹{zoneData.premium}
              <span style={{ fontSize: 13, fontWeight: 500, color: '#94A3B8', marginLeft: 4 }}>/wk</span>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontSize: 11, fontWeight: 700,
              color: '#94A3B8', margin: '0 0 4px',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Coverage Cap</p>
            <p style={{
              fontSize: 28, fontWeight: 800,
              color: '#1D9E75', margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.5px',
            }}>₹{zoneData.cap.toLocaleString()}</p>
          </div>
        </div>

        {/* Value ratio bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{
            width: '100%', height: 5,
            background: '#F1F5F9', borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(zoneData.premium / zoneData.cap) * 100 * 6}%`,
              background: 'linear-gradient(90deg, #185FA5, #1D9E75)',
              borderRadius: 3,
            }} />
          </div>
          <p style={{ fontSize: 11, color: '#CBD5E1', margin: '5px 0 0', textAlign: 'right' }}>
            {((zoneData.cap / zoneData.premium) * 1).toFixed(0)}× coverage ratio
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F1F5F9', marginBottom: 12 }} />

        {/* Risk badge + explanation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 20, padding: '4px 10px',
            fontSize: 11, fontWeight: 700,
            whiteSpace: 'nowrap',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: colors.dot, flexShrink: 0,
            }} />
            {zoneData.risk}
          </span>
          <p style={{
            fontSize: 12, color: '#64748B',
            margin: 0, lineHeight: 1.5,
          }}>{explanation}</p>
        </div>

      </div>
    </>
  )
}