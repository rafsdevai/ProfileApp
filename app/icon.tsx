import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background:
            "radial-gradient(circle at 70% 18%, rgba(96,165,250,0.52), transparent 32%), linear-gradient(135deg, #02050d 0%, #071328 60%, #02040a 100%)",
          fontFamily: "Arial",
          fontSize: 116,
          fontWeight: 800,
          letterSpacing: 0,
        }}
      >
        R<span style={{ color: "#60a5fa" }}>.</span>D
      </div>
    ),
    size,
  );
}
