import React from 'react';
import styled from 'styled-components';
import ImagemMascote from '../img/mascoteHd.png'; // Importe a imagem local ou use uma URL externa
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color:#1E80B9;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 66%;
  height: auto;
`;

const LoginBox = styled.div`
  background-color: #ffffff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 310px;
  text-align: center;
  margin: auto 325px auto auto; *//////*largura da imagem///////*
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 107%;
  padding: 10px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Login = () => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={ImagemMascote} alt="ImagemMascoteT" />
      </ImageContainer>
      <LoginBox>
        <Title>TreinoCheck</Title>
        <form>
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Senha" required />
          <Button type="submit">Entrar</Button>
        </form>
      </LoginBox>
    </Container>
  );
};

export default Login;
