import React from "react";

const waveBars = [
  { delay: "0s", duration: "6s", opacity: 0.15 },
  { delay: "1s", duration: "8s", opacity: 0.1 },
  { delay: "2s", duration: "7s", opacity: 0.2 },
  { delay: "0.5s", duration: "9s", opacity: 0.12 },
  { delay: "3s", duration: "6.5s", opacity: 0.08 },
  { delay: "1.5s", duration: "10s", opacity: 0.15 },
];

function WaveSide({ side }) {
  return (
    <div
      className={`absolute top-0 ${side === "left" ? "left-0" : "right-0"} h-full w-24 md:w-32 pointer-events-none z-0 overflow-hidden`}
    >
      {/* gold waves */}
      {waveBars.map((w, i) => (
        <div
          key={`gold-${i}`}
          className="absolute w-1 rounded-full"
          style={{
            [side]: `${8 + i * 14}px`,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, rgba(255, 184, 0, 0.6), transparent)",
            opacity: w.opacity,
            animation: `waveDown ${w.duration} ${w.delay} linear infinite`,
          }}
        />
      ))}
      {/* gray waves */}
      {waveBars.map((w, i) => (
        <div
          key={`gray-${i}`}
          className="absolute w-1 rounded-full"
          style={{
            [side]: `${14 + i * 14}px`,
            height: "160px",
            background: "linear-gradient(to bottom, transparent, rgba(142, 145, 150, 0.5), transparent)",
            opacity: w.opacity * 0.8,
            animation: `waveDown ${w.duration} ${w.delay + 2}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function SideWaves() {
  return (
    <>
      <WaveSide side="left" />
      <WaveSide side="right" />
    </>
  );
}