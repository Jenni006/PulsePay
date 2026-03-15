import { useEffect, useState } from 'react'

export default function Payout({ worker, onBack }) {
  const [visible, setVisible] = useState(false)
  const [flash, setFlash] = useState(true)
  const upiRef = `PPAY${Date.now()}`

  useEffect(() => {
    setTimeout(() => setFlash(false), 500)
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className="flex justify-center px-4 py-6">
      <div
        style={{
          width: '100%',
          maxWidth: 390,
          background: 'white',
          border: `2px solid ${flash ? '#1D9E75' : '#E2E8F0'}`,
          borderRadius: 16,
          padding: 28,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'border-color 500ms ease',
        }}
      >
        {/* Checkmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
            transform: visible ? 'scale(1)' : 'scale(0)',
            transition: 'transform 400ms ease',
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="28" fill="#F0FDF4" />
            <path
              d="M16 28 L24 36 L40 20"
              stroke="#1D9E75"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 26,
            fontWeight: 600,
            color: '#0F172A',
            textAlign: 'center',
            margin: 0,
            marginBottom: 6,
          }}
        >
          ₹224 sent to your PhonePe
        </h2>

        <p style={{ fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 24 }}>
          No action needed from you
        </p>

        {/* Event summary */}
        <div
          style={{
            background: '#E6F1FB',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: '#185FA5',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            Event Summary
          </p>

          {[
            ['Event', 'Heavy Rainfall — Vadapalani Zone C'],
            ['Date', 'October 15, 2024'],
            ['Detected at', '8:00 PM'],
            ['Paid by', '8:05 PM'],
            ['DCS Score', '0.73'],
            ['Triggers', 'Rainfall 8.0mm/hr + Order collapse –78%'],
            ['Source', 'Open-Meteo Archive API'],
          ].map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 8,
                gap: 12,
              }}
            >
              <span style={{ fontSize: 12, color: '#64748B', whiteSpace: 'nowrap' }}>{key}</span>
              <span style={{ fontSize: 12, color: '#0F172A', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Guidewire badge */}
        <div
          style={{
            background: '#F8F9FB',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#1D9E75',
              flexShrink: 0,
            }}
          />
          <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
            Claim auto-processed via{' '}
            <span style={{ color: '#185FA5', fontWeight: 500 }}>Guidewire Autopilot</span>
            {' '}→ ClaimCenter → BillingCenter
          </p>
        </div>

        {/* UPI Reference */}
        <div
          style={{
            background: '#F8F9FB',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 16,
          }}
        >
          <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, marginBottom: 4 }}>
            UPI Reference
          </p>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 13,
              color: '#0F172A',
              margin: 0,
              wordBreak: 'break-all',
            }}
          >
            {upiRef}
          </p>
        </div>

        {/* Income protected bar */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: '#64748B' }}>Income protected this week</span>
            <span style={{ fontSize: 12, color: '#0F172A', fontWeight: 500 }}>
              ₹224 of ₹1,000
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: '#E2E8F0',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '22.4%',
                background: '#1D9E75',
                borderRadius: 999,
                transition: 'width 1s ease',
              }}
            />
          </div>
        </div>

        {/* Trust score unlocked */}
        <div
          style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: 10,
            padding: '10px 14px',
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 12, color: '#1D9E75', margin: 0 }}>
            Your first protected event — Trust Score unlocked. Starting score: <strong>50 / 100</strong>
          </p>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginBottom: 20 }}>
          Payout = 80% of estimated loss (₹420 baseline − ₹140 earned = ₹280 × 0.80). Calculated from verified Open-Meteo archive data for Vadapalani, Chennai.
        </p>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            width: '100%',
            height: 48,
            background: 'white',
            color: '#185FA5',
            border: '1px solid #185FA5',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => (e.target.style.background = '#E6F1FB')}
          onMouseLeave={e => (e.target.style.background = 'white')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}