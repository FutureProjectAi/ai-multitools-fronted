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

      const result = await res.json();

      // Extract base64 from Gradio API
      const base64 = result.data[0];
      setImage(`data:image/png;base64,${base64}`);
    } catch (err) {
      console.log("Error:", err);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Text → Image Generator</h1>

      <textarea
        style={{
          width: "100%",
          height: 100,
          padding: 10,
          borderRadius: 8,
        }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Masukkan prompt..."
      />

      <button
        onClick={generate}
        style={{
          padding: 10,
          marginTop: 15,
          borderRadius: 8,
          background: "black",
          color: "white",
        }}
      >
        Generate Image
      </button>

      {loading && <p>Menghasilkan gambar...</p>}

      {image && (
        <img
          src={image}
          alt="Generated"
          style={{
            marginTop: 20,
            maxWidth: "100%",
            borderRadius: 12,
          }}
        />
      )}
    </div>
  );
}
