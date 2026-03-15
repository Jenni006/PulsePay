import { useState } from 'react'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Payout from './pages/Payout'

export default function App() {
  const [screen, setScreen] = useState('onboarding')
  const [workerData, setWorkerData] = useState(null)

  const goToDashboard = (data) => {
    setWorkerData(data)
    setScreen('dashboard')
  }

  const goToPayout = () => setScreen('payout')
  const goBack = () => setScreen('dashboard')

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#F8F9FB]">
      
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-6 pb-2">
        {['onboarding', 'dashboard', 'payout'].map((s) => (
          <div
            key={s}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: screen === s ? '#185FA5' : '#CBD5E1'
            }}
          />
        ))}
      </div>

      {/* Screen transition wrapper */}
      <div key={screen} className="animate-fade">
        {screen === 'onboarding' && (
          <Onboarding onNext={goToDashboard} />
        )}
        {screen === 'dashboard' && (
          <Dashboard worker={workerData} onPayout={goToPayout} />
        )}
        {screen === 'payout' && (
          <Payout worker={workerData} onBack={goBack} />
        )}
      </div>
    </div>
  )
}
