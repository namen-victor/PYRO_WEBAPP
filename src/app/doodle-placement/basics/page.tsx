"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/StepShell";
import DoodleDevOverlay from "@/components/DoodleDevOverlay";
import { getStepMetadata } from "@/lib/onboarding";
import { GenderSelect } from "@/components/GenderSelect";

export default function BasicsPlacementReplica() {
  const metadata = useMemo(() => getStepMetadata(0), []);

  const colors = {
    text: "#1a1a1a",
    border: "#e0e0e0",
    error: "#dc2626",
    white: "#ffffff",
    accent: "#7aa3a1"
  } as const;

  return (
    <StepShell
      title={metadata.title}
      subtitle={metadata.subtitle}
      onContinue={() => {}}
      isContinueLoading={false}
      showBackButton={false}
    >
      {/* IMPORTANT: Dev overlay is mounted exactly where production <Doodle /> lives */}
      <DoodleDevOverlay
        src="/doodles/1.svg"
        alt="Person working on laptop"
        position="bottom-left"
        initialScale={0.6}
        maxWidth="none"
      />

      {/* Replica form content (static) to preserve exact spacing/anchors */}
      <form onSubmit={(e) => e.preventDefault()}>
        {/* First Name */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 8
            }}
          >
            First Name <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            defaultValue="Osayenamen"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 8
            }}
          >
            Last Name <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            defaultValue="Omoregie"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Job Title */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              marginBottom: 8
            }}
          >
            Current/Desired Job Title <span style={{ color: colors.error }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Software Engineer, Product Manager"
            defaultValue="Software Engineer"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              fontSize: 15,
              backgroundColor: colors.white,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = colors.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = colors.border)}
          />
        </div>

        {/* Gender - reuse same component for spacing */}
        <GenderSelect
          value={"Male"}
          onChange={() => {}}
          error={undefined}
          customValue={""}
          onCustomChange={() => {}}
        />
      </form>
    </StepShell>
  );
}
