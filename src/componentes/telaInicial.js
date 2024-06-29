// src/components/TelaInicial.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaThList, FaFilter, FaUser } from 'react-icons/fa';
import axios from 'axios';
import ImagemMascote from '../img/mascoteHd.png'; 
import ImagemMascoteNot from '../img/mascoteNot.png';
import TelaConsultaPersonalizada from './telaConsultaPersonalizada';
import { Link } from 'react-router-dom';

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
  padding: 75px;
`;

const SearchContainer = styled.div`
  background-color: #ffcc66;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 72px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    color: #0073e6;
  }
`;


const FilterLink = styled.a`
  margin-left: 10px;
  color: #0073e6;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 5px;
  }
`;

const BottomRightImage = styled.img`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 220px;  // Ajuste o tamanho conforme necessário
  height: auto;
  margin: 50px;
`;

const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const ResultItem = styled.li`
  background: #fff;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
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

const TelaInicial = () => {
  const [showCustomSearch, setShowCustomSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState([]);

  useEffect(() => {
    // Fetch all colaboradores on component mount
    const fetchColaboradores = async () => {
      try {
        const response = await axios.get('/treinamentos-colaborador/get');
        setColaboradores(response.data);
      } catch (error) {
        console.error('Error fetching colaboradores:', error);
      }
    };

    fetchColaboradores();
  }, []);

  const handleSearch = () => {
    const filtered = colaboradores.filter(colaborador =>
      colaborador.nome.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredColaboradores(filtered);
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
          <LogoLink to="/treinocheck">
            <img src={ImagemMascote} alt="Treino Check" height="60" />
            <h1>TreinoCheck</h1>
          </LogoLink>
        </Logo>
        <Nav>
          <NavItem to="/colaborador" onClick={() => setShowCustomSearch(false)}><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos" onClick={() => setShowCustomSearch(false)}><FaThList /> Treinamentos</NavItem>
          <NavItem to="/cadastrocolab"><FaUser /> Colaboradores Cadastrados</NavItem>
        </Nav>
      </Header>
      <Content>
        {showCustomSearch ? (
          <TelaConsultaPersonalizada />
        ) : (
          <>
            <h2>Pesquisar Colaborador:</h2>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Pesquisar"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchButton onClick={handleSearch}><FaSearch /></SearchButton>
              <FilterLink onClick={() => setShowCustomSearch(true)}>
                <FaFilter /> Consulta personalizada
              </FilterLink>
            </SearchContainer>
            <ResultList>
              {filteredColaboradores.map(colaborador => (
                <ResultItem key={colaborador.id}>
                  <strong>Colaborador:</strong> {colaborador.nome} - <strong>Matrícula:</strong> {colaborador.matricula} - <strong>Treinamento:</strong> {colaborador.treinamento} - <strong>Status:</strong> <StatusText status={colaborador.status}>{colaborador.status}</StatusText>
                </ResultItem>
              ))}
            </ResultList>
          </>
        )}
      </Content>
      <BottomRightImage src={ImagemMascoteNot} />
    </Container>
  );
};

export default TelaInicial;
