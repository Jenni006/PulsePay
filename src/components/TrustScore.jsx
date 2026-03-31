export default function TrustScore({ score, unlocked }) {
  const milestones = [
    { score: 65, label: '2-min payouts',       perk: '₹900 coverage' },
    { score: 80, label: '90-sec payouts',      perk: '8% discount'   },
    { score: 95, label: 'Pre-credit eligible', perk: '15% discount'  },
  ]

  const next = milestones.find((m) => m.score > score)
  const pointsAway = next ? next.score - score : 0

  return (
    <>
      <style>{`
        @keyframes bar-grow {
          from { width: 0%; }
          to   { width: ${score}%; }
        }
        @keyframes lock-shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-2px); }
          75%       { transform: translateX(2px); }
        }
      `}</style>

      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 16,
        padding: '16px 18px',
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 14,
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700,
            color: '#94A3B8', margin: 0,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>🏅 Trust Score</p>
          {unlocked ? (
            <span style={{
              fontSize: 11, fontWeight: 700,
              background: '#F0FDF4', color: '#1D9E75',
              border: '1px solid #BBF7D0',
              borderRadius: 20, padding: '3px 10px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Unlocked</span>
          ) : (
            <span style={{
              fontSize: 11, fontWeight: 700,
              background: '#F8F9FB', color: '#94A3B8',
              border: '1px solid #E2E8F0',
              borderRadius: 20, padding: '3px 10px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>🔒 Locked</span>
          )}
        </div>

        {unlocked ? (
          <>
            {/* Score */}
            <div style={{
              display: 'flex', alignItems: 'baseline',
              gap: 4, marginBottom: 12,
            }}>
              <span style={{
                fontSize: 36, fontWeight: 800,
                color: '#185FA5', letterSpacing: '-1px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{score}</span>
              <span style={{ fontSize: 14, color: '#CBD5E1', fontWeight: 500 }}>/100</span>
            </div>

            {/* Progress bar with milestone markers */}
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div style={{
                height: 8, background: '#F1F5F9',
                borderRadius: 4, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #185FA5, #1D9E75)',
                  borderRadius: 4,
                  animation: 'bar-grow 1s ease-out both',
                }} />
              </div>

              {/* Milestone tick marks */}
              {milestones.map((m) => (
                <div key={m.score} style={{
                  position: 'absolute', top: 0,
                  left: `${m.score}%`,
                  transform: 'translateX(-50%)',
                  width: 2, height: 8,
                  background: score >= m.score ? 'white' : '#CBD5E1',
                  opacity: 0.6,
                }} />
              ))}
            </div>

            {/* Next milestone callout */}
            {next && (
              <div style={{
                background: '#EFF6FF',
                borderRadius: 10, padding: '10px 12px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{
                    fontSize: 12, fontWeight: 700, color: '#185FA5',
                    margin: '0 0 2px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{next.label}</p>
                  <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
                    Unlocks at {next.score} · {next.perk}
                  </p>
                </div>
                <span style={{
                  fontSize: 13, fontWeight: 800,
                  color: '#185FA5',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  whiteSpace: 'nowrap', marginLeft: 12,
                }}>+{pointsAway} pts</span>
              </div>
            )}
          </>
        ) : (
          /* Locked state */
          <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
            <div style={{
              fontSize: 32, marginBottom: 10,
              animation: 'lock-shake 3s ease-in-out infinite',
              display: 'inline-block',
            }}>🔒</div>
            <p style={{
              fontSize: 13, fontWeight: 600,
              color: '#0F172A', margin: '0 0 6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Unlock your Trust Score</p>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 14px', lineHeight: 1.5 }}>
              Complete your first protected event to start building your score.
            </p>

            {/* Milestone preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {milestones.map((m) => (
                <div key={m.score} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#F8F9FB', borderRadius: 8,
                  padding: '8px 12px',
                  opacity: 0.7,
                }}>
                  <span style={{
                    fontSize: 12, color: '#64748B',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>{m.label}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: '#94A3B8',
                    background: '#E2E8F0',
                    borderRadius: 20, padding: '2px 8px',
                  }}>at {m.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}