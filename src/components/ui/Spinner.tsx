"use client";
export function Spinner() {
  return (
    <div
      role="status" aria-label="Loading"
      style={{
        width: 22, height: 22, borderRadius: "50%",
        border: "3px solid #eee", borderTopColor: "var(--accent)",
        animation: "spin 1s linear infinite"
      }}
    />
  );
}