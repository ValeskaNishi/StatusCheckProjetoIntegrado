import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelaInicial from './componentes/telaInicial';
import TelaTreinamentos from './componentes/telaTreinamentos';
import TelaBemVindo from './componentes/telaBemVindo';
import TelaColabCadastrados from './componentes/telaColabCadastrados';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/treinocheck" element={<TelaBemVindo />} />
        <Route path="/colaborador" element={<TelaInicial />} />
        <Route path="/treinamentos" element={<TelaTreinamentos />} />
        <Route path="/cadastrocolab" element={<TelaColabCadastrados />} />
      </Routes>
    </Router>
  );
};

export default App;

