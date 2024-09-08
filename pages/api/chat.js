import axios from 'axios';
import { truncateString } from '../../utils/helpers';

const OPENAI_API_KEY = 'sk-P_PdkEPin5ppd_vH873ZQoU9uR4zCMtEe5YabcWjjOT3BlbkFJDCAQ91AxNfULfEpPbIbAoQTvCtGhQIjPLV5sP4N6oA';


const translateToMaithili = async (text) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a helpful assistant that translates English to Maithili." },
        { "role": "user", "content": `Translate the following English text to Maithili: "${text}"` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error translating to Maithili:', error);
    throw error;
  }
};

const translateToEnglish = async (text) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [
        { "role": "system", "content": "You are a helpful assistant that translates Maithili to English." },
        { "role": "user", "content": `Translate the following Maithili text to English: "${text}"` }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error translating to English:', error);
    throw error;
  }
};

const generateResponse = async (text, history) => {
  try {
    // Truncate text to approximately 650 words
    const maxLength = 650 * 6; // 650 words * 6 characters (average word length + space)
    const truncatedText = truncateString(text, maxLength);

    // Prepare conversation history
    const messages = [
      { "role": "system", "content": "You are a helpful assistant that responds in Maithili. Maintain context from previous messages." },
      ...history.map(msg => ({
        "role": msg.sender === 'user' ? 'user' : 'assistant',
        "content": msg.text
      })),
      { "role": "user", "content": truncatedText }
    ];

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 250
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, history } = req.body;
      let translatedMessage, response, translatedResponse;

      // Detect language and translate if necessary
      if (/[ऀ-ॿ]/.test(message)) {  // If the message contains Devanagari script
        translatedMessage = await translateToEnglish(message);
      } else {
        translatedMessage = message;
      }

      // Generate response in Maithili, considering conversation history
      response = await generateResponse(translatedMessage, history);

      // Translate the response to English
      translatedResponse = await translateToEnglish(response);

      res.status(200).json({
        maithili: response,
        english: translatedResponse
      });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).json({ error: 'An error occurred while processing your message.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
