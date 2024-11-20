import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaSearch, FaThList, FaSpinner, FaChartPie, FaUserCog, FaUsers } from 'react-icons/fa';
import axios from 'axios';
import ImagemMascote from '../img/logomoderna.png'; 
import { Link } from 'react-router-dom';
import ChatBotPopup from './chatBotPopup'; 

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

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  margin-right: 10px;
  outline: none;
  ::placeholder {
    color: #888;
    font-style: italic;
  }
  &:focus {
    background-color: #e8e8fc;
    box-shadow: 0px 0px 8px rgba(98, 87, 224, 0.5);
  }
  transition: background-color 0.3s, box-shadow 0.3s;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SearchButton = styled.button`
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  svg {
    color: #6257E0;
    ${props => props.loading && css`
      animation: ${rotate} 1s linear infinite;
    `}
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

const FilterSelect = styled.select`
  margin-left: 10px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  color: #6257E0;
  background-color: #ffffff;
`;

const ClearButton = styled.button`
  background-color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  color: #6257E0;
  font-weight: bold;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const SearchContainer = styled.div`
  background-color: #6257E0;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 800px;
`;

const ResultItem = styled.li`
  background: #FFFFFF;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
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
  const [statusFilter, setStatusFilter] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchText && !statusFilter) return;
    setLoading(true);

    try {
      const [colabResponse, treinamentosResponse] = await Promise.all([
        axios.get('http://localhost:3030/colaborador/get'),
        axios.get('http://localhost:3030/treinamentos-colaborador/get')
      ]);

      const colaboradoresData = colabResponse.data;
      const treinamentosData = treinamentosResponse.data;

      const combinedData = colaboradoresData.map(colaborador => {
        const treinamentos = treinamentosData.filter(
          treinamento => treinamento.matricula === colaborador.matricula
        );

        return {
          ...colaborador,
          treinamentos: treinamentos.length > 0 ? treinamentos : [{ treinamento: 'Nenhum treinamento', status: 'Sem Status' }]
        };
      });

      const filtered = combinedData.filter(colaborador => {
        const matchesSearchText = colaborador.nome.toLowerCase().includes(searchText.toLowerCase()) ||
          colaborador.matricula.toString().includes(searchText);
        const matchesStatus = !statusFilter || colaborador.treinamentos.some(treinamento => treinamento.status === statusFilter);

        return matchesSearchText && matchesStatus;
      });

      setFilteredColaboradores(filtered);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClearFilter = () => {
    setStatusFilter('');
    setFilteredColaboradores([]);
    setSearchText('');
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoLink to="/statuscheck">
            <img src={ImagemMascote} alt="StatusCheck" height="60" />
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
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Pesquisar Colaborador:</h2>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Digite o nome ou matrícula do colaborador..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={handleSearch} loading={loading ? 1 : 0}>
            {loading ? <FaSpinner /> : <FaSearch />}
          </SearchButton>
          <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">Todos os Status</option>
            <option value="Em dia">Em dia</option>
            <option value="Vencido">Vencido</option>
            <option value="Não Possui">Não Possui</option>
          </FilterSelect>
          {statusFilter && <ClearButton onClick={handleClearFilter}>Limpar Filtro</ClearButton>}
        </SearchContainer>
        {filteredColaboradores.length > 0 && (
          <ResultList>
            {filteredColaboradores.map(colaborador => (
              <ResultItem key={colaborador.id}>
                <strong>Colaborador:</strong> {colaborador.nome} - <strong>Matrícula:</strong> {colaborador.matricula}
                <ul>
                  {colaborador.treinamentos.map((treinamento, index) => (
                    <li key={index}>
                      <strong>Treinamento:</strong> {treinamento.treinamento} - 
                      <strong>Status:</strong> <StatusText status={treinamento.status}>{treinamento.status}</StatusText> - 
                      <strong>Início:</strong> {treinamento.inicio || 'N/A'} - 
                      <strong>Fim:</strong> {treinamento.termino || 'N/A'}
                    </li>
                  ))}
                </ul>
              </ResultItem>
            ))}
          </ResultList>
        )}
      </Content>
      {/* Renderiza o ChatBotPopup */}
      <ChatBotPopup />
    </Container>
  );
};

export default TelaInicial;
