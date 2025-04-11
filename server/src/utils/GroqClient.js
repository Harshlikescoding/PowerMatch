const axios = require('axios');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const getGroqReply = async (userMessage) => {
  const headers = {
    'Authorization': `Bearer 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`,
    'Content-Type': 'application/json',
  };

  const payload = {
    model: 'llama3-8b-8192', 
    messages: [
      { role: 'system', content: 'You are a gym coach AI helping users with workouts, nutrition, and motivation. Dont use ** or any other formating, give spaces between points, do not answer anything not related to GYM (dont even provide any suggestions), give clear and consice response.' },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
  };

  const response = await axios.post(GROQ_API_URL, payload, { headers });

  return response?.data?.choices?.[0]?.message?.content?.trim() || 'No response from AI';
};

module.exports = { getGroqReply };
