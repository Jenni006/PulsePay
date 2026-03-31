import { useState } from 'react'
import PremiumCard from '../components/PremiumCard'

const ZONE_MAP = {
  Blinkit: { zone: 'C', label: 'Vadapalani — Zone C', premium: 22, cap: 1000, risk: 'High Risk' },
  Zepto: { zone: 'B', label: 'Anna Nagar — Zone B', premium: 18, cap: 800, risk: 'Medium Risk' },
  'Swiggy Instamart': { zone: 'B', label: 'T Nagar — Zone B', premium: 18, cap: 800, risk: 'Medium Risk' },
}

const RISK_COLORS = {
  'High Risk': { bg: '#FEE2E2', text: '#E24B4A', dot: '#E24B4A' },
  'Medium Risk': { bg: '#FEF3C7', text: '#BA7517', dot: '#BA7517' },
}

export default function Onboarding({ onNext }) {
  const [form, setForm] = useState({ name: '', platform: 'Blinkit' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const zoneData = ZONE_MAP[form.platform]
  const riskColor = RISK_COLORS[zoneData.risk]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (!form.name.trim()) { setError('Please enter your full name.'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); onNext({ ...form, zoneData }) }, 600)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F8F9FB; }
        .pp-input:focus { border-color: #185FA5 !important; box-shadow: 0 0 0 3px rgba(24,95,165,0.08); }
        .pp-select:focus { border-color: #185FA5 !important; box-shadow: 0 0 0 3px rgba(24,95,165,0.08); }
        .pp-btn:active { transform: scale(0.98); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease-out both; }
        .platform-btn { transition: all 150ms ease; }
        .platform-btn:hover { border-color: #185FA5 !important; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#F8F9FB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Hero Header */}
        <div style={{
          width: '100%',
          background: 'linear-gradient(135deg, #185FA5 0%, #1271C4 100%)',
          padding: '40px 24px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
            fontSize: 22,
          }}>⚡</div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 28, fontWeight: 800,
            color: 'white', letterSpacing: '-0.5px',
            marginBottom: 8,
          }}>PulsePay</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', maxWidth: 260, lineHeight: 1.5 }}>
            Income protection for delivery workers — auto-pays when disruption hits.
          </p>
        </div>

        {/* Card */}
        <div className="fade-up" style={{
          width: '100%', maxWidth: 390,
          background: 'white',
          borderRadius: '20px 20px 0 0',
          marginTop: -20,
          padding: '28px 24px 40px',
          flex: 1,
          boxShadow: '0 -4px 24px rgba(0,0,0,0.06)',
        }}>

          {/* Section label */}
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
            color: '#94A3B8', textTransform: 'uppercase', marginBottom: 20,
          }}>Get Started</p>

          {/* Name */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              fontSize: 13, fontWeight: 600, color: '#0F172A',
              display: 'block', marginBottom: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Raj Kumar"
              className="pp-input"
              style={{
                width: '100%', height: 48,
                border: '1.5px solid #E2E8F0',
                borderRadius: 12, padding: '0 16px',
                fontSize: 14, color: '#0F172A',
                outline: 'none', transition: 'all 200ms',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {error && (
              <p style={{ fontSize: 12, color: '#E24B4A', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                ⚠ {error}
              </p>
            )}
          </div>

          {/* Platform */}
          <div style={{ marginBottom: 18 }}>
            <label style={{
              fontSize: 13, fontWeight: 600, color: '#0F172A',
              display: 'block', marginBottom: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Platform</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Blinkit', 'Zepto', 'Swiggy Instamart'].map(p => (
                <button
                  key={p}
                  className="platform-btn"
                  onClick={() => { setForm({ ...form, platform: p }); setError('') }}
                  style={{
                    flex: 1, height: 44, borderRadius: 10,
                    border: form.platform === p ? '2px solid #185FA5' : '1.5px solid #E2E8F0',
                    background: form.platform === p ? '#EFF6FF' : 'white',
                    color: form.platform === p ? '#185FA5' : '#64748B',
                    fontSize: p === 'Swiggy Instamart' ? 10 : 12,
                    fontWeight: form.platform === p ? 700 : 500,
                    cursor: 'pointer',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >{p}</button>
              ))}
            </div>
          </div>

          {/* Zone Badge */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              fontSize: 13, fontWeight: 600, color: '#0F172A',
              display: 'block', marginBottom: 8,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Assigned Zone</label>
            <div style={{
              height: 48, borderRadius: 12,
              border: '1.5px solid #E2E8F0',
              background: '#F8F9FB',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{
                  fontSize: 14, color: '#0F172A', fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{zoneData.label}</span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700,
                background: riskColor.bg, color: riskColor.text,
                padding: '3px 10px', borderRadius: 20,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{zoneData.risk}</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#F1F5F9', marginBottom: 20 }} />

          {/* Premium Card */}
          <PremiumCard zoneData={zoneData} />

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className="pp-btn"
            disabled={loading}
            style={{
              width: '100%', height: 52,
              background: loading ? '#94A3B8' : '#185FA5',
              color: 'white', border: 'none',
              borderRadius: 14, fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: loading ? 'none' : '0 4px 14px rgba(24,95,165,0.3)',
              transition: 'all 200ms',
              letterSpacing: '-0.1px',
            }}
          >
            {loading ? 'Activating...' : 'Activate Coverage →'}
          </button>

          <p style={{
            fontSize: 12, color: '#94A3B8',
            textAlign: 'center', marginTop: 14, lineHeight: 1.6,
          }}>
            Premium auto-debited from platform earnings every Monday
          </p>
        </div>
      </div>
    </>
  )
}