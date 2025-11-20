export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  const BACKEND_URL = process.env.BACKEND_URL;

  if (!BACKEND_URL) {
    return res.status(500).json({
      ok: false,
      error: "BACKEND_URL belum diset di environment variable",
    });
  }

  try {
    const upstreamRes = await fetch(`${BACKEND_URL}/txt2img`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await upstreamRes.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}

