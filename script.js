document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatDisplay = document.getElementById('chat-display');

    // Add loading state
    let isLoading = false;

    async function getAIResponse(userMessage) {
        try {
            console.log('Sending request to server with message:', userMessage);
            
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            return data.response;
        } catch (error) {
            console.error('Detailed error:', error);
            return "I apologize, but I'm having trouble connecting right now. Please try again later.";
        }
    }

    function displayUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.innerHTML = message;
        chatDisplay.appendChild(messageDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }

    async function displayBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message');
        chatDisplay.appendChild(messageDiv);
        
        // Handle multiline messages
        if (typeof message === 'string') {
            message = message.replace(/\n/g, '<br>');
        } else {
            message = 'Error: Invalid response format';
        }

        // Type out the message character by character
        const text = message;
        let index = 0;
        
        function typeNextChar() {
            if (index < text.length) {
                // Handle HTML tags
                if (text[index] === '<') {
                    const endTag = text.indexOf('>', index);
                    if (endTag !== -1) {
                        messageDiv.innerHTML += text.substring(index, endTag + 1);
                        index = endTag + 1;
                    } else {
                        messageDiv.innerHTML += text[index];
                        index++;
                    }
                } else {
                    messageDiv.innerHTML += text[index];
                    index++;
                }
                chatDisplay.scrollTop = chatDisplay.scrollHeight;
                setTimeout(typeNextChar, 30); // Adjust speed here (lower = faster)
            }
        }

        typeNextChar();
    }

    async function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === '' || isLoading) return;

        console.log('Sending message:', messageText);
        
        // Display user message
        displayUserMessage(messageText);
        
        // Clear input immediately
        userInput.value = '';
        
        // Show loading state
        isLoading = true;
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot-message', 'loading');
        loadingDiv.textContent = '...';
        chatDisplay.appendChild(loadingDiv);

        try {
            // Get AI response
            const botResponse = await getAIResponse(messageText);
            console.log('Received bot response:', botResponse);
            
            // Remove loading message
            if (loadingDiv.parentNode === chatDisplay) {
                chatDisplay.removeChild(loadingDiv);
            }
            
            // Display bot response with typing animation
            await displayBotMessage(botResponse);
        } catch (error) {
            console.error('Error in sendMessage:', error);
            // Remove loading message
            if (loadingDiv.parentNode === chatDisplay) {
                chatDisplay.removeChild(loadingDiv);
            }
            
            // Display error message
            await displayBotMessage("I apologize, but I'm having trouble connecting right now. Please try again later.");
        } finally {
            isLoading = false;
        }
    }

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
}); 