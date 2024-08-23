


const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from the current directory
app.use(express.static(__dirname));

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize the Google Generative AI model
const API_KEY = 'AIzaSyANB3JdbGoTs3MH5p8mnsOvVvfgsG54kW0'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Handle form submission to generate a poem
app.get('/generate-poem', async (req, res) => {
  const topic = req.query.topic;

  try {
    const prompt = `generate a four-line poem in English using the words: ${topic} with at least five words per line and should include all words that were given as inputs and Make sure the poem is meaningful and connects all the words in a creative way`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const poem = response.text();

    // Send the poem with line breaks
    res.send(poem.replace(/\n/g, '<br>'));
  } catch (error) {
    console.error('Error generating poem:', error);
    res.status(500).send('Error generating poem. Please try again later.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
