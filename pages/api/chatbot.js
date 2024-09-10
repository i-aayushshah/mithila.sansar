// File: api/chatbot.js

import axios from 'axios';

const OPENAI_API_KEY = 'API_key';

// Function to format the response to ensure proper separation
const formatResponse = (response) => {
  // Custom formatting logic
  // Adjust based on how you want to separate Maithili and English sections
  // For this example, we are assuming the response might have 'Maithili:' and 'English:' markers
  return response
    .replace(/Maithili:\s*/i, '') // Remove 'Maithili:' label if present
    .replace(/English:\s*/i, '') // Remove 'English:' label if present
    .replace(/^\s*$/, '\n\n')    // Ensure double new lines between responses
    .trim(); // Remove any extra spaces around the content
};

const generateResponse = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini", // Ensure you are using the correct model name
      messages: [
        {
          "role": "system",
          "content": `
          You are a helpful assistant that provides information about Mithila and its cultural aspects.
          Please respond in both Maithili and English.
          For each response, format it as follows:
          1. Provide the answer in Maithili, followed by a blank line.
          2. Provide the same answer in English, followed by another blank line.
          `
        },
        {"role": "user", "content": prompt}
      ],
      max_tokens: 500 // Increased max_tokens to allow for longer responses
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    let formattedResponse = response.data.choices[0].message.content.trim();
    formattedResponse = formatResponse(formattedResponse);

    return formattedResponse;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      // Generate the response
      const response = await generateResponse(prompt);

      res.status(200).json({
        response
      });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
