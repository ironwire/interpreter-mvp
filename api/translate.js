export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, isZh } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing text" });
  }

  const sysPrompt = isZh
    ? "You are a professional consecutive interpreter. Translate the following spoken Mandarin Chinese into natural, fluent English. Preserve the speaker's tone and intent. Output ONLY the translation, nothing else."
    : "你是一位专业口译员。将以下英语口语翻译成自然流畅的普通话。保留说话者的语气和意图。只输出翻译内容，不要其他内容。";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: sysPrompt,
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const translation = data.content?.[0]?.text?.trim() || "";
    return res.status(200).json({ translation });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
