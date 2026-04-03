import { useState, useCallback } from "react"

import BottomNav from "./components/BottomNav"
import Registration from "./pages/Registration"
import Onboarding from "./pages/Onboarding"
import Dashboard from "./pages/Dashboard"
import Policy from "./pages/Policy"
import Claims from "./pages/Claims"
import Alerts from "./pages/Alerts"
import Payout from "./pages/Payout"

export default function App() {
  const [screen, setScreen] = useState("register")
  const [workerData, setWorkerData] = useState(null)
  const [direction, setDirection] = useState("forward")
  const [tab, setTab] = useState("home")

  // ─── Navigation Handlers ───────────────────────────────
  const goToDashboard = useCallback((data) => {
    setDirection("forward")
    setWorkerData(data)
    setTab("home") // reset tab
    setScreen("dashboard")
  }, [])

  const goToPayout = useCallback(() => {
    setDirection("forward")
    setScreen("payout")
  }, [])

  const goBack = useCallback(() => {
    setDirection("back")
    setTab("home") // reset tab when returning
    setScreen("dashboard")
  }, [])

  // ─── Tab Renderer ─────────────────────────────────────
  const renderTab = () => {
    if (!workerData) return null

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

  // ─── Screen Renderer ──────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case "register":
        return (
          <Registration
            onComplete={(data) => {
              setWorkerData(data)
              setDirection("forward")
              setTab("home")
              setScreen("dashboard") // skipping onboarding (premium flow)
            }}
          />
        )

      case "onboarding":
        return <Onboarding onNext={goToDashboard} />

      case "dashboard":
        return (
          <>
            <div style={{ paddingBottom: 80 }}>
              {renderTab()}
            </div>
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

  // ─── App Layout ───────────────────────────────────────
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