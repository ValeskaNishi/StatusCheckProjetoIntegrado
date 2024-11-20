import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaSearch, FaThList, FaChartBar, FaUserCog, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ImagemMascote from '../img/logomoderna.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
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
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  h1 {
    margin-left: 10px;
    font-size: 24px;
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
    color: #ddd;
  }

  svg {
    margin-right: 5px;
  }
`;

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  justify-content: space-between;
  width: 80%;
  height: 100%;
  margin-top: 20px;
  flex-direction: row;
  padding: 30px;
`;

const ChartWrapper = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 10px;

  &.chartPie {
    height: 500px;
  }

  &.chartBar {
    height: 500px;
  }
  &.chartBar2{
    height: 500px;
  }

  .divContainer {
      margin-top: 20px;
      padding: 10px;
      display: inline-block;
    }

  .barContainer {
      width: 90%;
      height: 100%;
    }

  .bar2Container {
      width: 90%;
      height: 91%;
      
  }    
`;

const Dashboard = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [treinamentosColaborador, setTreinamentosColaborador] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colabRes, statusRes, treinosColabRes] = await Promise.all([
          axios.get('http://localhost:3030/colaborador/get'),
          axios.get('http://localhost:3030/status/get'),
          axios.get('http://localhost:3030/treinamentos-colaborador/get'),
        ]);

        setColaboradores(colabRes.data);
        setStatusList(statusRes.data);
        setTreinamentosColaborador(treinosColabRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // Quantidade de Colaboradores por Status de Treinamento
  const statusReport = statusList.map(status => ({
    status: status.status,
    quantidade: treinamentosColaborador.filter(treino => treino.status === status.status).length,
  }));

  const statusChartData = {
    labels: statusReport.map(item => item.status),
    datasets: [
      {
        label: 'Quantidade de Colaboradores',
        data: statusReport.map(item => item.quantidade),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de Resumo de Treinamentos por Colaborador
  const colaboradorReport = colaboradores.map(colaborador => ({
    nome: colaborador.nome,
    totalTreinamentos: treinamentosColaborador.filter(
      treino => treino.matricula === colaborador.matricula
    ).length,
  }));

  const colaboradorChartData = {
    labels: colaboradorReport.map(item => item.nome),
    datasets: [
      {
        label: 'Total de Treinamentos',
        data: colaboradorReport.map(item => item.totalTreinamentos),
        backgroundColor: 'rgba(224, 87, 98, 0.5)',
      },
    ],
  };

  const tiposDeTreinamento = treinamentosColaborador.reduce((acc, treino) => {
    acc[treino.treinamento] = acc[treino.treinamento] ? acc[treino.treinamento] + 1 : 1;
    return acc;
  }, {});

  const tiposDeTreinamentoChartData = {
    labels: Object.keys(tiposDeTreinamento),
    datasets: [
      {
        label: 'Quantidade de Colaboradores por Tipo de Treinamento',
        data: Object.values(tiposDeTreinamento),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };


  return (
    <Container>
      <Header>
        <Logo>
          <LogoLink to="/statuscheck">
            <img src={ImagemMascote} alt="StatusCheck" height="40" />
            <h1>StatusCheck</h1>
          </LogoLink>
        </Logo>
        <Nav>
          <NavItem to="/colaborador"><FaSearch /> Pesquisa Colaborador</NavItem>
          <NavItem to="/treinamentos"><FaThList /> Treinamentos</NavItem>
          <NavItem to="/treinamentos-colaborador"><FaUsers /> Colaboradores Cadastrados</NavItem>
          <NavItem to="/dashboard"><FaChartBar /> Dashboard</NavItem>
          <NavItem to="/acessogerencial"><FaUserCog /> Acesso Gerencial</NavItem>
        </Nav>
      </Header>
      <DashboardContainer>
  <SectionTitle>Dashboard de Treinamentos</SectionTitle>
  <ChartContainer>
    <ChartWrapper className="chartPie">
      <SectionTitle>Quantidade de Colaboradores por Status de Treinamento</SectionTitle>
      <div className="divContainer">
        <Pie data={statusChartData} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>
    </ChartWrapper>
    <ChartWrapper className="chartBar2">
          <SectionTitle>Tipos de Treinamentos e Quantidade de Colaboradores</SectionTitle>
          <div className="bar2Container">
            <Bar data={tiposDeTreinamentoChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </ChartWrapper>
    <ChartWrapper className="chartBar">
      <SectionTitle>Resumo de Treinamentos por Colaborador</SectionTitle>
      <div className="barContainer">
        <Bar data={colaboradorChartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </ChartWrapper>
  </ChartContainer>
</DashboardContainer>
    </Container>
  );
};

export default Dashboard;
