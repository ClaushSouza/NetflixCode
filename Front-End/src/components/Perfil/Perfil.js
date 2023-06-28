import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";
import vayne from './vayne.png';
import int from './novoperfil.jpg';

const Perfil = () => {
  const [perfis, setPerfis] = useState([]);
  const [showAdicionarPerfil, setShowAdicionarPerfil] = useState(true);
  const [selectPerfil, setSelectPerfil] = useState("");
  const [editingMode, setEditingMode] = useState(false); // Estado para controlar o modo de edição
  const [inputValue, setInputValue] = useState(""); // Estado para armazenar a quantidade de perfis

  const navigate = useNavigate();

  const adicionarPerfil = () => {
    if (!editingMode) {
      // Verificar se o número máximo de perfis foi atingido (5)
      if (perfis.length >= 5) {
        console.log("Número máximo de perfis atingido");
        setShowAdicionarPerfil(false);
        return;
      }
      const novoPerfil = { foto: vayne, int };
      setPerfis([...perfis, novoPerfil]);
    } else {
      const numPerfis = parseInt(inputValue);
      if (!isNaN(numPerfis) && numPerfis >= 0 && numPerfis <= 5) {
        // Atualizar a quantidade de perfis
        const perfisAtualizados = perfis.slice(0, numPerfis);
        setPerfis(perfisAtualizados);
        setShowAdicionarPerfil(perfisAtualizados.length < 5);
        setEditingMode(false);
      }
    }
  };

  const removerPerfil = (perfil) => {
    const perfisAtualizados = perfis.filter((p) => p.foto !== perfil.foto);
    setPerfis(perfisAtualizados);
    setShowAdicionarPerfil(perfisAtualizados.length < 5);
  };

  const renderPerfilAvatar = (selectPerfil, setSelectPerfil, navigate) => {
    return (
      <>
        {perfis.map((perfil, index) => (
          <img
            key={index}
            src={perfil.foto}
            alt={`Perfil ${index + 1}`}
            className={selectPerfil === perfil.foto ? "selected" : ""}
            onClick={() => {
              setSelectPerfil(perfil.foto);
              navigate("/Card");
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              removerPerfil(perfil);
            }}
          />
        ))}
        {showAdicionarPerfil && (
          <button className="adicionar-perfil-button" onClick={adicionarPerfil}>
            <span>+</span>
          </button>
        )}
      </>
    );
  };

  const handleGerenciarPerfisClick = () => {
    setEditingMode(true);
    setInputValue(perfis.length.toString());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Quem está assistindo</h1>
      <div className="perfil-avatar">
        {renderPerfilAvatar(selectPerfil, setSelectPerfil, navigate)}
      </div>
      {editingMode ? (
        <div>
          <input value={inputValue} onChange={handleInputChange} />
          <button className="gerenciar-perfis-button" onClick={adicionarPerfil}>
            Confirmar
          </button>
        </div>
      ) : (
        <button className="gerenciar-perfis-button" onClick={handleGerenciarPerfisClick}>
          Gerenciar Perfis
        </button>
      )}
    </div>
  );
};

export default Perfil;
