import React from "react";

export default function DataStreams() {
  const streams = [
    { left: "8%", delay: "0s", duration: "8s" },
    { left: "16%", delay: "2s", duration: "12s" },
    { left: "25%", delay: "4s", duration: "9s" },
    { left: "33%", delay: "1s", duration: "11s" },
    { left: "42%", delay: "3s", duration: "7s" },
    { left: "50%", delay: "5s", duration: "10s" },
    { left: "58%", delay: "0.5s", duration: "13s" },
    { left: "67%", delay: "2.5s", duration: "8s" },
    { left: "75%", delay: "4.5s", duration: "11s" },
    { left: "83%", delay: "1.5s", duration: "9s" },
    { left: "92%", delay: "3.5s", duration: "12s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {streams.map((s, i) => (
        <div
          key={i}
          className="absolute top-0 w-px h-full"
          style={{ left: s.left }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#8E9196]/5 to-transparent" />
          <div
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-[#FFB800]/20 to-transparent"
            style={{
              animation: `dataStreamVertical ${s.duration} ${s.delay} linear infinite`,
            }}
          />
        </div>
      ))}
    </div>
  );
}