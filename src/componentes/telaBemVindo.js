// src/components/TelaBemVindo.js
import React from 'react';
import styled from 'styled-components';
import ImagemMascote from '../img/mascoteHd.png'; // Importe a imagem local ou use uma URL externa
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1E80B9;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 64%;
  height: auto;
`;

const WelcomeBox = styled.div`
  background-color: #ffffff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 310px;
  text-align: center;
  margin: auto 335px auto auto; /* largura da imagem */
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #333333;
`;

const Text = styled.p`
  margin-bottom: 20px;
  color: #333333;
`;

const Button = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #0073e6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`;

const TelaBemVindo = () => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={ImagemMascote} alt="Imagem Mascote" />
      </ImageContainer>
      <WelcomeBox>
        <Title>TreinoCheck</Title>
        <Text>Seja Bem-vindo ao TreinoCheck! 
            No que posso te ajudar hoje?</Text>
        <Button to="/colaborador">Pesquisar Colaborador</Button>
        <Button to="/treinamentos">Treinamentos Cadastrados</Button>
        <Button to="/cadastrocolab">Colaboradores Cadastrados</Button>
      </WelcomeBox>
    </Container>
  );
};

export default TelaBemVindo;
