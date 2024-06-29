// src/components/TelaTreinamentos.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaCog, FaThList } from 'react-icons/fa';
import ImagemMascote from '../img/mascoteHd.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #0073e6;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: white;
  margin: 0 60px;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 5px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  color: #0073e6;
  text-align: center;
  margin-bottom: 20px;
`;

const TrainingList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TrainingItem = styled.li`
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TrainingTitle = styled.h3`
  color: #333;
  margin: 0;
  margin-bottom: 10px;
`;

const LogoLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const TelaTreinamentos = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('/treinamentos/get');
        console.log('Data received from endpoint:', response.data); // Adiciona um log para verificar os dados recebidos
        setTrainings(response.data);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <Container>
      <Header>
        <LogoLink to="/treinocheck">
          <img src={ImagemMascote} alt="Treino Check" height="60" />
          <h1>TreinoCheck</h1>
        </LogoLink>
        <Nav>
          <NavItem to="/colaborador"><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos"><FaThList /> Treinamentos</NavItem>
          <NavItem to="/cadastrocolab"><FaCog /> Colaboradores Cadastrados</NavItem>
        </Nav>
      </Header>
      <Content>
        <Title>Lista de Treinamentos</Title>
        <TrainingList>
          {trainings.map(training => (
            <TrainingItem key={training.id}>
              <TrainingTitle> ID: {training.id} - Nome do Treinamento Cadastrado: {training.treinamento}</TrainingTitle>
            </TrainingItem>
          ))}
        </TrainingList>
      </Content>
    </Container>
  );
};

export default TelaTreinamentos;
