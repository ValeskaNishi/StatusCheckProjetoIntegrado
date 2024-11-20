import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaThList, FaUsers, FaChartPie, FaUserCog } from 'react-icons/fa';
import ImagemMascote from '../img/logomoderna.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const Header = styled.header`
  background-color: #1c1c28;
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
  margin: 0 20px;
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

const Title = styled.h2`
  color: #000000;
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
        const response = await axios.get('http://localhost:3030/treinamentos/get');
        console.log('Data received from endpoint:', response.data);
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
        <LogoLink to="/statuscheck">
          <img src={ImagemMascote} alt="Treino Check" height="60" />
          <h1>StatusCheck</h1>
        </LogoLink>
        <Nav>
          <NavItem to="/colaborador"><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos"><FaThList /> Treinamentos</NavItem>
          <NavItem to="/treinamentos-colaborador"><FaUsers /> Colaboradores Cadastrados</NavItem>
          <NavItem to="/dashboard"><FaChartPie /> Dashboard</NavItem>
          <NavItem to="/acessogerencial"><FaUserCog /> Acesso Gerencial</NavItem>
        </Nav>
      </Header>
      <Content>
        <Title>Lista de Treinamentos</Title>
        <TrainingList>
          {trainings.map(training => (
            <TrainingItem key={training.id}>
              <TrainingTitle>ID: {training.id} - Nome do Treinamento Cadastrado: {training.treinamento}</TrainingTitle>
            </TrainingItem>
          ))}
        </TrainingList>
      </Content>
    </Container>
  );
};

export default TelaTreinamentos;
