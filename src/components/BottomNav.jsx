import { Home, Shield, FileText, Bell } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "policy", label: "Policy", icon: Shield },
  { id: "claims", label: "Claims", icon: FileText },
  { id: "alerts", label: "Alerts", icon: Bell },
];

export default function BottomNav({ active, onChange }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#fff", borderTop: "1px solid #E2E8F0",
      display: "flex", zIndex: 100,
    }}>
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button key={id} onClick={() => onChange(id)} style={{
            flex: 1, padding: "10px 0", border: "none", background: "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            color: isActive ? "#185FA5" : "#94A3B8", cursor: "pointer",
          }}>
            <Icon size={20} />
            <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}