import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaInicial from './componentes/telaInicial';
import TelaTreinamentos from './componentes/telaTreinamentos';
import TelaLogin from './componentes/telaLogin';
import TelaColabCadastrados from './componentes/telaColabCadastrados';
import Dashboard from './componentes/dashboard';
import TelaCadastroUsuario from './componentes/telaCadastroUsuario';
import ChatBotPopup from './componentes/chatBotPopup';
import ChatTest from './componentes/ChatTeste';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/statuscheck" element={<TelaLogin />} />
        <Route path="/colaborador" element={<TelaInicial />} />
        <Route path="/treinamentos" element={<TelaTreinamentos />} />
        <Route path="/treinamentos-colaborador" element={<TelaColabCadastrados />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/acessogerencial" element={<TelaCadastroUsuario/>} />
      </Routes>
    </Router>
  );
};

export default App;

