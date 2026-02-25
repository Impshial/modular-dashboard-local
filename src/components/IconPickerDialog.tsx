import React, { useMemo, useState } from "react";
import * as Phosphor from "@phosphor-icons/react";

type IconComponent = React.ComponentType<{
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
}>;

const ICON_NAMES = Object.keys(Phosphor).filter((k) => {
    if (k === "IconContext") return false;
  
    const v = (Phosphor as unknown as Record<string, unknown>)[k];
    return (typeof v === "function") || (typeof v === "object" && v !== null);
  });

  const getIconByName = (name: string): IconComponent | null => {
    const candidate = (Phosphor as unknown as Record<string, unknown>)[name];
  
    if (typeof candidate === "function") return candidate as IconComponent;
    if (typeof candidate === "object" && candidate !== null) return candidate as IconComponent;
  
    return null;
  };

export type IconPickerDialogProps = {
  open: boolean;
  onClose: () => void;
  onPick: (iconName: string) => void;
};

export function IconPickerDialog({ open, onClose, onPick }: IconPickerDialogProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICON_NAMES;
    return ICON_NAMES.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        placeItems: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "min(900px, 95vw)",
          height: "min(650px, 90vh)",
          background: "#111",
          color: "#fff",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "#0b0b0b",
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              onClick={onClose}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "transparent",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
          <div style={{ marginTop: 8, opacity: 0.75, fontSize: 12 }}>
            Showing {filtered.length} of {ICON_NAMES.length}
          </div>
        </div>

        <div style={{ padding: 16, overflow: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
              gap: 12,
            }}
          >
            {filtered.map((name) => {
            const Icon = getIconByName(name);
            if (!Icon) return null;

            return (
                <button
                key={name}
                onClick={() => onPick(name)}
                title={name}
                style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#0b0b0b",
                    color: "#fff",
                    padding: 10,
                    cursor: "pointer",
                    display: "grid",
                    gap: 8,
                    justifyItems: "center",
                }}
                >
                <Icon size={28} />
                <span style={{ fontSize: 11, opacity: 0.8, textAlign: "center" }}>
                    {name}
                </span>
                </button>
            );
            })}
            
          </div>
        </div>
      </div>
    </div>
  );
}