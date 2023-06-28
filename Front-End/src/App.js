import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Registro from './components/Cadastro/Registro';
import Perfil from './components/Perfil/Perfil';
import Card from './components/Card/Card';
import Filme from './components/Filme/Filme';

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="Login" />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path="/Registro/*" element={<Registro />} />
        <Route path="/Perfil/*" element={<Perfil />} />
        <Route path="/Card/*" element={<Card />} />
        <Route path="/Filme/*" element={<Filme />} />
      </Routes>
    </Router>
  );
};

export default App;
