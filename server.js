const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Gemini API endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('Received message from client:', message);
        
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY';
        console.log('Sending request to Gemini API...');
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        console.log('Gemini API response status:', response.status);
        const data = await response.json();
        console.log('Gemini API response data:', data);
        
        if (data.error) {
            console.error('Gemini API Error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        // Updated response handling for Gemini 2.0 Flash
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log('Sending response to client:', responseText);
            res.json({ response: responseText });
        } else {
            console.error('Unexpected API Response:', data);
            throw new Error('Invalid response format from Gemini API');
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini API' });
    }
});

// Start server with error handling
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please try a different port or close the application using this port.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
}); 
