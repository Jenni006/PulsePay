import { useState, useCallback } from "react"

import BottomNav from "./components/BottomNav"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"
import Policy from "./pages/Policy"
import Claims from "./pages/Claims"
import Alerts from "./pages/Alerts"
import Payout from "./pages/Payout"

export default function App() {
  const [screen, setScreen] = useState("onboarding")
  const [workerData, setWorkerData] = useState(null)
  const [direction, setDirection] = useState("forward")
  const [tab, setTab] = useState("home")

  // Navigation handlers (memoized for performance)
  const goToDashboard = useCallback((data) => {
    setDirection("forward")
    setWorkerData(data)
    setScreen("dashboard")
  }, [])

  const goToPayout = useCallback(() => {
    setDirection("forward")
    setScreen("payout")
  }, [])

  const goBack = useCallback(() => {
    setDirection("back")
    setScreen("dashboard")
  }, [])

  // Tab renderer (clean & scalable)
  const renderTab = () => {
    switch (tab) {
      case "home":
        return (
          <Dashboard
            worker={workerData}
            onPayout={goToPayout}
          />
        )
      case "policy":
        return <Policy worker={workerData} />
      case "claims":
        return <Claims />
      case "alerts":
        return <Alerts preCredit={workerData?.preCredit} />
      default:
        return null
    }
  }

  // Screen renderer (main navigation)
  const renderScreen = () => {
    switch (screen) {
      case "onboarding":
        return <Onboarding onNext={goToDashboard} />

      case "dashboard":
        return (
          <>
            {renderTab()}
            <BottomNav active={tab} onChange={setTab} />
          </>
        )

      case "payout":
        return (
          <Payout
            worker={workerData}
            onBack={goBack}
          />
        )

      default:
        return null
    }
  }

  return (
    <>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #E2E8F0;
          display: flex;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
        }

        #root {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        @keyframes slide-forward {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-back {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .forward { animation: slide-forward 0.3s ease-out; }
        .back { animation: slide-back 0.3s ease-out; }

        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* App Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          minHeight: "100vh",
          background: "#F8F9FB",
          position: "relative",
          boxShadow: "0 0 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          key={screen}
          className={direction === "forward" ? "forward" : "back"}
        >
          {renderScreen()}
        </div>
      </div>
    </>
  )
}