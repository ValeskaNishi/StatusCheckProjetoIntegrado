import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaRobot } from 'react-icons/fa';

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 50%;
  background-color: #6257E0;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: #6257E0;
  color: white;
  font-weight: bold;
  text-align: center;
`;

const ChatGreeting = styled.div`
  padding: 10px;
  color: #333;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const ChatBody = styled.div`
  padding: 10px;
  overflow-y: auto;
  flex: 1;
`;

const Message = styled.div.attrs(({ isUser }) => ({
  'data-isuser': isUser
}))`
  margin-bottom: 10px;
  text-align: ${({ isUser }) => (isUser ? 'right' : 'left')};
  color: ${({ isUser }) => (isUser ? '#333' : '#4169E1')};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 8px 12px;
  background-color: #6257E0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ChatBotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch('/funcionalidadesStatusCheck.txt')
      .then((response) => response.text())
      .then((text) => setFileContent(text))
      .catch((error) => console.error('Erro ao carregar o arquivo:', error));
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: "Você é um assistente virtual que ajuda os usuários com informações sobre uma ferramenta de status de treinamento chamada TreinoCheck." },
          { role: 'system', content: fileContent },
          { role: 'user', content: input }
        ],
        max_tokens: 150,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const botMessage = { role: 'assistant', content: response.data.choices[0].message.content };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro ao se comunicar com a API:', error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro.' },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <ChatButton onClick={toggleChat}>
        {isOpen ? '✖' : <FaRobot />}
      </ChatButton>

      {isOpen && (
        <ChatWindow>
          <ChatHeader>Assistente Virtual</ChatHeader>
          <ChatGreeting>Olá! Como posso te ajudar?</ChatGreeting>
          <ChatBody>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.role === 'user'}>
                {message.content}
              </Message>
            ))}
          </ChatBody>
          <InputContainer>
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Envia a mensagem ao pressionar Enter
              placeholder="Digite sua mensagem..."
            />
            <SendButton onClick={sendMessage}>Enviar</SendButton>
          </InputContainer>
        </ChatWindow>
      )}
    </>
  );
};

export default ChatBotPopup;
