import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';

// Load .env.local if present (common in many projects), otherwise fall back to .env
const localEnvPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Basic rate limiting for API endpoints (help protect your server during development or public testing)
app.set('trust proxy', 1);
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // limit each IP to 60 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use('/api', apiLimiter);

app.post('/api/polish', async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes || typeof notes !== 'string') return res.status(400).json({ error: 'Missing notes' });

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a romantic storyteller and wedding planner. Transform the following bullet points into a beautiful, cohesive, and emotional paragraph for a wedding website "Our Story" section. Keep it under 150 words. Notes: ${notes}`,
      config: { temperature: 0.8, topP: 0.9 }
    });

    res.json({ text: response.text ?? '' });
  } catch (err) {
    console.error('Server /api/polish error:', err);
    res.status(500).json({ error: 'AI generation failed' });
  }
});

app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
