// src/components/TelaColabCadastrados.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaThList, FaUser } from 'react-icons/fa';
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

const Logo = styled.div`
  display: flex;
  align-items: center;
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

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  color: #0073e6;
  text-align: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: #0073e6;
  color: white;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const StatusText = styled.span`
  font-weight: bold;
  color: ${props => {
    switch (props.status) {
      case 'Em dia':
        return 'green';
      case 'Vencido':
        return 'red';
      case 'Não Possui':
        return 'orange';
      default:
        return 'black';
    }
  }};
`;

const TelaColabCadastrados = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredColaboradores, setFilteredColaboradores] = useState([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await axios.get('/treinamentos-colaborador/get');
        setColaboradores(response.data);
        setFilteredColaboradores(response.data);
      } catch (error) {
        console.error('Error fetching colaboradores:', error);
      }
    };

    fetchColaboradores();
  }, []);

  useEffect(() => {
    const filtered = colaboradores.filter(colaborador =>
      colaborador.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredColaboradores(filtered);
  }, [searchText, colaboradores]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoLink to="/treinocheck">
            <img src={ImagemMascote} alt="Treino Check" height="60" />
            <h1>TreinoCheck</h1>
          </LogoLink>
        </Logo>
        <Nav>
          <NavItem to="/pesquisa-colaborador"><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos"><FaThList /> Treinamentos</NavItem>
          <NavItem to="/cadastrocolab"><FaUser /> Colaboradores Cadastrados</NavItem>
        </Nav>
      </Header>
      <Content>
        <Title>Colaboradores Cadastrados</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Pesquisar colaborador"
            value={searchText}
            onChange={handleSearchInputChange}
          />
        </SearchContainer>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Matrícula</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Treinamento</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredColaboradores.map(colaborador => (
                <TableRow key={`${colaborador.matricula}-${colaborador.treinamento}`}>
                  <TableCell>{colaborador.matricula}</TableCell>
                  <TableCell>{colaborador.nome}</TableCell>
                  <TableCell>{colaborador.treinamento}</TableCell>
                  <TableCell><StatusText status={colaborador.status}>{colaborador.status}</StatusText></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default TelaColabCadastrados;
