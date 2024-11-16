const axios = require('axios');
require('dotenv').config();

const sendMessageToChatGPT = async (input, fileContent) => {
  if (!input || !fileContent) {
    throw new Error('A mensagem e o conteúdo do arquivo são obrigatórios!');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: "Você é um assistente virtual que ajuda os usuários com informações sobre uma ferramenta de status de treinamento chamada TreinoCheck." },
          { role: 'system', content: fileContent }, // Usa o conteúdo do arquivo
          { role: 'user', content: input }
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro na API do ChatGPT:', error.response ? error.response.data : error.message);
    throw new Error('Erro ao comunicar-se com a API do ChatGPT');
  }
};

module.exports = sendMessageToChatGPT;
