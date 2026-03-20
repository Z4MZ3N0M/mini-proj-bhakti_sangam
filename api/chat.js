export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const body = req.body;
    
    // Move system_instruction into first user message
    let contents = body.contents || [];
    if (body.system_instruction) {
      const systemText = body.system_instruction.parts[0].text;
      contents = [
        { role: "user", parts: [{ text: systemText }] },
        { role: "model", parts: [{ text: "Understood. I will follow these instructions." }] },
        ...contents
      ];
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch(error) {
    res.status(500).json({ error: 'API call failed' });
  }
}
