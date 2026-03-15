export default function TrustScore({ score, unlocked }) {
  const milestones = [
    { score: 65, label: '2-min payout + ₹900 coverage' },
    { score: 80, label: '90-sec payout + 8% discount' },
    { score: 95, label: 'Pre-credit eligible + 15% discount' },
  ]

  const next = milestones.find((m) => m.score > score)

  return (
    <div
      style={{
        background: '#F8F9FB',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        maxWidth: 390,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Trust Score</p>
        {unlocked ? (
          <span
            style={{
              fontSize: 12,
              background: '#F0FDF4',
              color: '#1D9E75',
              border: '1px solid #BBF7D0',
              borderRadius: 6,
              padding: '2px 8px',
            }}
          >
            Unlocked
          </span>
        ) : (
          <span style={{ fontSize: 12, color: '#94A3B8' }}>Locked</span>
        )}
      </div>

      {unlocked ? (
        <>
          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: '#185FA5' }}>{score}</span>
            <span style={{ fontSize: 14, color: '#94A3B8' }}>/ 100</span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 6,
              background: '#E2E8F0',
              borderRadius: 999,
              overflow: 'hidden',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${score}%`,
                background: '#185FA5',
                borderRadius: 999,
                transition: 'width 1s ease',
              }}
            />
          </div>

          {/* Next milestone */}
          {next && (
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              Reach <strong>{next.score}</strong> → {next.label}
            </p>
          )}
        </>
      ) : (
        <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
          Complete your first active week to unlock your Trust Score.
        </p>
      )}
    </div>
  )
}