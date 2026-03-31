import { useState } from 'react'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Payout from './pages/Payout'

export default function App() {
  const [screen, setScreen]         = useState('onboarding')
  const [workerData, setWorkerData] = useState(null)
  const [direction, setDirection]   = useState('forward')

  const goToDashboard = (data) => {
    setDirection('forward')
    setWorkerData(data)
    setScreen('dashboard')
  }

  const goToPayout = () => {
    setDirection('forward')
    setScreen('payout')
  }

  const goBack = () => {
    setDirection('back')
    setScreen('dashboard')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #E2E8F0;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        #root {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        @keyframes slide-in-forward {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-back {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .screen-forward {
          animation: slide-in-forward 0.3s ease-out both;
        }
        .screen-back {
          animation: slide-in-back 0.3s ease-out both;
        }

        ::-webkit-scrollbar { width: 0px; }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: 390,
        minHeight: '100vh',
        background: '#F8F9FB',
        position: 'relative',
        boxShadow: '0 0 40px rgba(0,0,0,0.12)',
      }}>
        <div
          key={screen}
          className={direction === 'forward' ? 'screen-forward' : 'screen-back'}
        >
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
    </>
  )
}