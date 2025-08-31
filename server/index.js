import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;
const geminiApiKey = process.env.GEMINI_API_KEY || '';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is working!', 
        timestamp: new Date().toISOString(),
        hasApiKey: !!geminiApiKey,
        apiKeyLength: geminiApiKey ? geminiApiKey.length : 0
    });
});

app.post('/api/gemini/generate', async (req, res) => {
    console.log('Received Gemini API request:', {
        bodySize: JSON.stringify(req.body).length,
        hasContents: !!req.body.contents,
        contentsLength: req.body.contents?.length
    });
    
    if (!geminiApiKey) {
        console.error('Gemini API key not configured');
        return res.status(500).json({ error: 'Server Gemini API key not configured' });
    }
    
    const payload = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;
    
    try {
        console.log('Calling Gemini API with payload size:', JSON.stringify(payload).length);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        console.log('Gemini API response status:', response.status);
        
        if (!response.ok) {
            console.error('Gemini API error:', response.status, data);
            return res.status(response.status).json(data);
        }
        
        console.log('Gemini API call successful');
        res.json(data);
    } catch (err) {
        console.error('Error calling Gemini API:', err);
        res.status(500).json({ error: 'Upstream request failed', details: String(err) });
    }
});

app.listen(port, () => {
    console.log(`[server] listening on http://localhost:${port}`);
});


