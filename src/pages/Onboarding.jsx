import { useState } from 'react'
import PremiumCard from '../components/PremiumCard'

const ZONE_MAP = {
  Blinkit: { zone: 'C', label: 'Vadapalani — Zone C', premium: 22, cap: 1000, risk: 'High Risk' },
  Zepto: { zone: 'B', label: 'Anna Nagar — Zone B', premium: 18, cap: 800, risk: 'Medium Risk' },
  'Swiggy Instamart': { zone: 'B', label: 'T Nagar — Zone B', premium: 18, cap: 800, risk: 'Medium Risk' },
}

export default function Onboarding({ onNext }) {
  const [form, setForm] = useState({
    name: '',
    platform: 'Blinkit',
    city: 'Chennai',
  })
  const [error, setError] = useState('')

  const zoneData = ZONE_MAP[form.platform]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError('Please enter your full name.')
      return
    }
    onNext({ ...form, zoneData })
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <div
        className="w-full bg-white rounded-2xl p-8"
        style={{
          maxWidth: 390,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo */}
        <div className="mb-1">
          <h1
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              color: '#185FA5',
              margin: 0,
            }}
          >
            PulsePay
          </h1>
        </div>

        {/* Tagline */}
        <p style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>
          Income protection for delivery workers
        </p>
        <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>
          Protect your weekly earnings from weather and city disruptions.
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{
              width: '100%',
              height: 44,
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '0 14px',
              fontSize: 14,
              color: '#0F172A',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: '#E24B4A', marginTop: 4 }}>{error}</p>
          )}
        </div>

        {/* Platform */}
        <div className="mb-4">
          <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>
            Platform
          </label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            style={{
              width: '100%',
              height: 44,
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '0 14px',
              fontSize: 14,
              color: '#0F172A',
              outline: 'none',
              background: 'white',
              boxSizing: 'border-box',
            }}
          >
            <option>Blinkit</option>
            <option>Zepto</option>
            <option>Swiggy Instamart</option>
          </select>
        </div>

        {/* City */}
        <div className="mb-4">
          <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>
            City
          </label>
          <input
            value="Chennai"
            disabled
            style={{
              width: '100%',
              height: 44,
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '0 14px',
              fontSize: 14,
              color: '#94A3B8',
              background: '#F8F9FB',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Zone */}
        <div className="mb-6">
          <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 6 }}>
            Zone
          </label>
          <input
            value={zoneData.label}
            disabled
            style={{
              width: '100%',
              height: 44,
              border: '1px solid #E2E8F0',
              borderRadius: 10,
              padding: '0 14px',
              fontSize: 14,
              color: '#94A3B8',
              background: '#F8F9FB',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Premium Card */}
        <PremiumCard zoneData={zoneData} />

        {/* CTA */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            height: 48,
            background: '#185FA5',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 16,
            transition: 'background 200ms',
          }}
          onMouseEnter={e => (e.target.style.background = '#134d87')}
          onMouseLeave={e => (e.target.style.background = '#185FA5')}
        >
          Activate Coverage →
        </button>

        {/* Footer note */}
        <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginTop: 12 }}>
          Premium auto-debited from platform earnings every Monday
        </p>
      </div>
    </div>
  )
}