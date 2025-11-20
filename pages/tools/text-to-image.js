import { useState } from "react";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("Seorang petani di sawah pagi hari, sinematik");
  const [style, setStyle] = useState("realistic");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setImage("");
    setError("");

    try {
      const res = await fetch("/api/txt2img", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Gagal generate gambar");
      }

      setImage(data.image_base64);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Text → Image (Backend Lokal)</h1>
      <p>Backend Python harus jalan di laptop / Colab agar fitur ini bekerja.</p>

      <form onSubmit={handleGenerate} style={{ marginTop: 16 }}>
        <label>
          Prompt:
          <textarea
            rows={4}
            style={{ width: "100%", marginTop: 4 }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>

        <label style={{ display: "block", marginTop: 8 }}>
          Style:
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="realistic">Realistic</option>
            <option value="anime">Anime</option>
            <option value="cartoon">Cartoon</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 12,
            padding: "6px 14px",
            cursor: "pointer",
            background: "#222",
            color: "white",
            borderRadius: "6px",
            border: "none",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <h2>Hasil</h2>
          <img
            src={image}
            alt="hasil-ai"
            style={{
              maxWidth: "100%",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
          <div style={{ marginTop: 8 }}>
            <a href={image} download="ai-image.png">
              Download gambar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
