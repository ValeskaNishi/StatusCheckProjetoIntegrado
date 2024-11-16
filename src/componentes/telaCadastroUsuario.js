import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserShield, FaSearch, FaThList, FaUsers, FaChartPie, FaUserCog } from 'react-icons/fa';
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

const LogoLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
`;

const AdminOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 16px;

  a {
    color: #1c1c28;
    margin-top: 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    svg {
      margin-left: 5px;
    }
  }
`;

const TelaCadastroUsuario = () => {
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
        <Title>Acesso Gerencial StatusCheck</Title>
        <AdminOption>
          <span>
          Para realizar tarefas, como:<br />
           <br />
          - Gerenciamento de Usuários;<br />
          - Gerenciamento de Tabelas de Treinamentos;<br />
          - Gerenciamento de Perfil e troca de senha.<br />
           <br />
          Clique no link abaixo para ser direcionado(a) à Plataforma Gerencial da StatusCheck.<br />
          Lembre-se de ter suas credenciais em mãos para realizar o acesso.
          </span>
          <a href="http://localhost:3030/admin/login" target="_blank" rel="noopener noreferrer">
            Clique Aqui
            <FaUserShield />
          </a>
        </AdminOption>
      </Content>
    </Container>
  );
};

export default TelaCadastroUsuario;
