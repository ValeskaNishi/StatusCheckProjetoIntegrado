import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  padding: 0px;
  overflow-y: auto;
`;

const SearchOptions = styled.div`
  background-color: rgb(97, 109, 248);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const OptionTitle = styled.div`
  background-color: #2f227a;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

const OptionRow = styled.div`
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const OptionInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const SmallSearchButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    color: #000000;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 0px;
  width: 100%;
  max-width: 600px;
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

const TelaConsultaPersonalizada = () => {
  const [searchText, setSearchText] = useState('');
  const [matricula, setMatricula] = useState('');
  const [filteredColaboradores, setFilteredColaboradores] = useState([]);

  const handleSearchByName = async () => {
    try {
      const response = await axios.get('http://localhost:3030/treinamentos-colaborador/get');
      const filtered = response.data.filter(colaborador =>
        colaborador.nome && colaborador.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredColaboradores(filtered);
    } catch (error) {
      console.error('Error fetching colaboradores:', error);
    }
  };

  const handleSearchByMatricula = async () => {
    try {
      const response = await axios.get('http://localhost:3030/treinamentos-colaborador/get');
      const filtered = response.data.filter(colaborador =>
        colaborador.matricula.toString().includes(matricula)
      );
      setFilteredColaboradores(filtered);
    } catch (error) {
      console.error('Error fetching colaboradores:', error);
    }
  };

  const handleKeyDownName = (e) => {
    if (e.key === 'Enter') {
      handleSearchByName();
    }
  };

  const handleKeyDownMatricula = (e) => {
    if (e.key === 'Enter') {
      handleSearchByMatricula();
    }
  };

  return (
    <Container>
      <SearchOptions>
        <OptionTitle>Opções de consulta</OptionTitle>
        <OptionRow>
          <label>Nome do Colaborador:</label>
          <OptionInput
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleKeyDownName}
          />
          <SmallSearchButton onClick={handleSearchByName}>
            <FaSearch />
          </SmallSearchButton>
        </OptionRow>
        <OptionRow>
          <label>Número da Matrícula:</label>
          <OptionInput
            type="text"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
            onKeyDown={handleKeyDownMatricula}
          />
          <SmallSearchButton onClick={handleSearchByMatricula}>
            <FaSearch />
          </SmallSearchButton>
        </OptionRow>
      </SearchOptions>
      <ResultsContainer>
        <ResultList>
          {filteredColaboradores.map(colaborador => (
            <ResultItem key={colaborador.id}>
              <strong>Colaborador:</strong> {colaborador.nome} - <strong>Matrícula:</strong> {colaborador.matricula} - <strong>Treinamento:</strong> {colaborador.treinamento} - <strong>Status:</strong> <StatusText status={colaborador.status}>{colaborador.status}</StatusText>
            </ResultItem>
          ))}
        </ResultList>
      </ResultsContainer>
    </Container>
  );
};

export default TelaConsultaPersonalizada;
