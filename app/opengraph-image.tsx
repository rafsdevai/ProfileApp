import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/seo";

export const alt =
  "Rafael.Dev - AI automation, Python, FastAPI and full-stack web development portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background:
            "radial-gradient(circle at 76% 16%, rgba(37,99,235,0.42), transparent 32%), radial-gradient(circle at 16% 76%, rgba(34,211,238,0.22), transparent 30%), linear-gradient(135deg, #02050d 0%, #071328 58%, #02040a 100%)",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            Rafael<span style={{ color: "#60a5fa" }}>.</span>Dev
          </div>
          <div
            style={{
              border: "1px solid rgba(147,197,253,0.36)",
              borderRadius: 999,
              padding: "12px 20px",
              color: "#bfdbfe",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            AI Systems & Web Apps
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 870,
              fontSize: 70,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            AI Automation Developer & Full-Stack Developer Romania
          </div>
          <div
            style={{
              maxWidth: 880,
              color: "#cbd5e1",
              fontSize: 30,
              lineHeight: 1.32,
            }}
          >
            {siteConfig.shortDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 18,
            color: "#93c5fd",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span>FastAPI</span>
          <span>Python</span>
          <span>RAG Systems</span>
          <span>SaaS</span>
          <span>Mentoring</span>
        </div>
      </div>
    ),
    size,
  );
}
