import { useState } from "react";

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch(
        "https://alelofuture-ai-multitools-backend.hf.space/run/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [prompt] }),
        }
      );

      const json = await res.json();
      const base64 = json.data[0];

      setImage(`data:image/png;base64,${base64}`);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1>Text → Image Generator</h1>

      <textarea
        placeholder="Tulis prompt di sini..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          minHeight: 120,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #aaa",
        }}
      />

      <button
        onClick={generate}
        style={{
          marginTop: 15,
          width: "100%",
          padding: 12,
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {loading && (
        <p style={{ marginTop: 20, textAlign: "center" }}>
          ⏳ Sedang membuat gambar...
        </p>
      )}

      {image && (
        <img
          src={image}
          alt="Generated"
          style={{
            width: "100%",
            marginTop: 20,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />
      )}
    </div>
  );
}
