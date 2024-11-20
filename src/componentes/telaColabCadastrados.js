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

const Header = styled.header`
  background-color: #1c1c28;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  padding: 10px;
  z-index: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: sticky;
  top: 50px;
  background-color: #f5f5f5;
  padding: 10px;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 8px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Table = styled.table`
  width: 80%;
  max-width: 1000px;
  min-height: 400px;
  border-collapse: collapse;
  background-color: white;
`;

const TableHead = styled.thead`
  background-color: rgb(97, 109, 248);
  color: white;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  min-width: 150px;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  min-width: 150px;
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
        const [colabResponse, treinamentosResponse] = await Promise.all([
          axios.get('http://localhost:3030/colaborador/get'),
          axios.get('http://localhost:3030/treinamentos-colaborador/get')
        ]);

        const colaboradoresData = colabResponse.data;
        const treinamentosData = treinamentosResponse.data;

        const combinedData = treinamentosData.map(treinamento => {
          const colaborador = colaboradoresData.find(
            colab => colab.matricula === treinamento.matricula
          );
          return {
            ...treinamento,
            nome: colaborador ? colaborador.nome : 'N/A'
          };
        });

        setColaboradores(combinedData);
        setFilteredColaboradores(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchColaboradores();
  }, []);

  const handleSearch = () => {
    const filtered = colaboradores.filter(colaborador =>
      colaborador.matricula && colaborador.matricula.toString().includes(searchText)
    );
    setFilteredColaboradores(filtered);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoLink to="/statuscheck">
            <img src={ImagemMascote} alt="Treino Check" height="60" />
            <h1>StatusCheck</h1>
          </LogoLink>
        </Logo>
        <Nav>
          <NavItem to="/colaborador"><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos"><FaThList /> Treinamentos</NavItem>
          <NavItem to="/treinamentos-colaborador"><FaUsers /> Colaboradores Cadastrados</NavItem>
          <NavItem to="/dashboard"><FaChartPie /> Dashboard</NavItem>
          <NavItem to="/acessogerencial"><FaUserCog /> Acesso Gerencial</NavItem>
        </Nav>
      </Header>
      <Content>
        <Title>Colaboradores Cadastrados</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Matrícula colaborador"
            value={searchText}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown} 
          />
          <SearchButton onClick={handleSearch}>
            <FaSearch size={20} color="#1c1c28" />
          </SearchButton>
        </SearchContainer>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Matrícula</TableHeader>
                <TableHeader>Treinamento</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Início</TableHeader>
                <TableHeader>Fim</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredColaboradores.map((colaborador, index) => (
                <TableRow key={`${colaborador.matricula}-${index}`}>
                  <TableCell>{colaborador.nome}</TableCell>
                  <TableCell>{colaborador.matricula}</TableCell>
                  <TableCell>{colaborador.treinamento}</TableCell>
                  <TableCell><StatusText status={colaborador.status}>{colaborador.status}</StatusText></TableCell>
                  <TableCell>{colaborador.inicio}</TableCell>
                  <TableCell>{colaborador.termino}</TableCell>
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
