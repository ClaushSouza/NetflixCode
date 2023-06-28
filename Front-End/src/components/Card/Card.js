import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import Int from "./Interestelar.jpg";
import "./Card.css";

const Card = () => {
  const navigate = useNavigate();

  const handleWatchButtonClick = () => {
    navigate("/filme");
  };

  const handleInfoButtonClick = () => {
    console.log("Botão 'Mais informações' clicado!");
  };

  return (
    <div className="card-container">
      <div className="black-overlay"></div>
      <img className="background-image" src={Int} alt="Background" />
      <nav className="navbar-container">
        <img className="navbar-logo" src={Logo} alt="Netflix Logo" />
        <ul className="navbar-links">
          <li className="navbar-link">Home</li>
          <li className="navbar-link">Filmes</li>
          <li className="navbar-link">Series</li>
          <li className="navbar-link">Favoritos</li>
        </ul>
      </nav>
      <div className="content-container">
        <h1 className="title">2014 ‧ Ficção científica/Aventura ‧ 2h 49m</h1>
        <div className="buttons-container">
          <button className="botao" onClick={handleWatchButtonClick}>
            Assistir
          </button>
          <button className="informacao" onClick={handleInfoButtonClick}>
            Mais informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
