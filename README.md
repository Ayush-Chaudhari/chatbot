# AI Chatbot with Gemini API

A modern, responsive web-based chatbot that uses Google's Gemini 2.0 Flash API to provide intelligent responses. This project features a clean user interface with real-time message display and typing animations.

## Features

- 🤖 Powered by Google's Gemini 2.0 Flash API
- 💬 Real-time chat interface
- ✨ Smooth typing animations
- 📱 Responsive design
- 🔄 Error handling and loading states
- 🎨 Clean and modern UI

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Google Cloud account with Gemini API access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ayush-Chaudhari/chatbot
cd chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

## Usage

1. Start the server:
```bash
npm start
```

2. Open `index.html` in your web browser or serve it using a local server.

3. Start chatting! Type your message in the input field and press Enter or click the Send button.

## Project Structure

```
chatbot/
├── index.html          # Main HTML file
├── style.css          # CSS styles
├── script.js          # Frontend JavaScript
├── server.js          # Backend server
├── package.json       # Project dependencies
└── README.md          # This file
```

## API Integration

The chatbot uses Google's Gemini 2.0 Flash API for generating responses. The API endpoint is configured in `server.js`. Make sure to:

1. Have a valid API key
2. Keep your API key secure
3. Monitor your API usage

## Error Handling

The application includes comprehensive error handling for:
- API connection issues
- Invalid responses
- Server errors
- Network problems

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API
- Express.js
- Node.js community

## Support

If you encounter any issues or have questions, please:
1. Check the console for error messages
2. Verify your API key is correct
3. Ensure all dependencies are installed
4. Open an issue in the GitHub repository 