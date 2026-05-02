require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, './')));

// Initialize Google Generative AI
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        if (!genAI) {
            // Fallback for when API key is missing
            return res.json({ 
                reply: "I am currently in demo mode as no API key was provided. I can still help you learn about the election process! Try asking about registration, EVMs, or polling." 
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Convert messages to Gemini format
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));
        
        const currentMessage = messages[messages.length - 1].text;
        
        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 250,
            },
        });

        const systemPrompt = `You are an AI Election Assistant for India. Your goal is to help citizens understand the electoral process, voting steps, EVMs, registration timelines, and other election-related queries. Keep your answers concise, informative, and neutral. Do not endorse any political party. Respond in a friendly and helpful tone.`;

        // We append the system prompt context to the user's message
        const result = await chat.sendMessage(`${systemPrompt}\n\nUser Question: ${currentMessage}`);
        const response = result.response.text();
        
        res.json({ reply: response });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// For any other route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
