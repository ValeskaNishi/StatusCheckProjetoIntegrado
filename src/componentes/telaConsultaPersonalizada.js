// src/components/TelaConsultaPersonalizada.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchOptions = styled.div`
  background-color: #c8bfe7;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const OptionTitle = styled.div`
  background-color: #0073e6;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
`;

const OptionRow = styled.div`
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
    color: #0073e6;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
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
      const response = await axios.get('/treinamentos-colaborador/get');
      const filtered = response.data.filter(colaborador =>
        colaborador.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredColaboradores(filtered);
    } catch (error) {
      console.error('Error fetching colaboradores:', error);
    }
  };

  const handleSearchByMatricula = async () => {
    try {
      const response = await axios.get('/treinamentos-colaborador/get');
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
    <>
      <SearchOptions>
        <OptionTitle>Opções de consulta</OptionTitle>
        <OptionRow>
          <label>Nome do Colaborador:</label>
          <OptionInput
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleKeyDownName}  // Adiciona o evento onKeyDown para o nome
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
            onKeyDown={handleKeyDownMatricula}  // Adiciona o evento onKeyDown para a matrícula
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
    </>
  );
};

export default TelaConsultaPersonalizada;
