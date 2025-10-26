"use client";

import { useEffect, useRef, useState } from "react";

export default function BasicsPlacement() {
  const doodleRef = useRef<HTMLImageElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging || !cardRef.current || !doodleRef.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();
      const doodleRect = doodleRef.current.getBoundingClientRect();
      const left = e.clientX - cardRect.left - offset.x;
      const top = e.clientY - cardRect.top - offset.y;
      const bottom = cardRect.height - (top + doodleRect.height);
      setX(Math.round(left));
      setY(Math.round(bottom));
    };
    const onMouseUp = () => setDragging(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, offset]);

  const code = `<Doodle\n  src="/doodles/1.svg"\n  alt="Doodle"\n  position="bottom-left"\n  offset={{ x: ${x}, y: ${y} }}\n  desktopScale={${scale.toFixed(2)}}\n  mobilePosition="hidden"\n/>`;

  return (
    <div style={{ minHeight: "100vh", background: "#ebebeb", padding: 24 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          🎨 Doodle Positioning - Basics
        </h1>
        <p style={{ color: "#666", marginBottom: 16 }}>
          Drag the doodle. Use the slider to scale. Copy the code when done.
        </p>

        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontWeight: 600 }}>Scale:</label>
            <input
              type="range"
              min={0.3}
              max={2.0}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
            <span>{scale.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              setX(0);
              setY(0);
              setScale(1.0);
            }}
            style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid #e0e0e0", background: "white", cursor: "pointer" }}
          >
            Reset
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            style={{ padding: "10px 16px", borderRadius: 8, background: "#2e2e2e", color: "white", cursor: "pointer" }}
          >
            📋 Copy Code
          </button>
        </div>

        <div
          ref={cardRef}
          style={{
            position: "relative",
            background: "white",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            padding: 32,
            minHeight: 420,
          }}
        >
          <img
            ref={doodleRef}
            src="/doodles/1.svg"
            alt="Doodle"
            draggable={false}
            onMouseDown={(e) => {
              if (!doodleRef.current) return;
              const rect = doodleRef.current.getBoundingClientRect();
              setDragging(true);
              setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            style={{
              position: "absolute",
              left: x,
              bottom: y,
              transform: `scale(${scale})`,
              transformOrigin: "bottom left",
              cursor: dragging ? "grabbing" : "move",
              maxWidth: "none",
              zIndex: 10,
            }}
          />

          {/* Mock fields */}
          <div style={{ marginTop: 8 }}>
            <div style={{ marginBottom: 16 }}>
              <label>First Name *</label>
              <input style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0e0e0", borderRadius: 8 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Last Name *</label>
              <input style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0e0e0", borderRadius: 8 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Job Title *</label>
              <input style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0e0e0", borderRadius: 8 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Gender *</label>
              <input style={{ width: "100%", padding: "12px 16px", border: "1px solid #e0e0e0", borderRadius: 8 }} />
            </div>
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 12, padding: 16, marginTop: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Generated Code</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{code}</pre>
        </div>
      </div>
    </div>
  );
}
