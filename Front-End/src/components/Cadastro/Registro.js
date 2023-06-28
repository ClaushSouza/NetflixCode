import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registro.css";
import logo from "./Logo.png";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [registroError, setRegistroError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!username || !email || !senha) {
      setRegistroError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro bem-sucedido
        setRegistroError("");
        navigate("/Login"); // Redirecionar para a página de login
      } else {
        // Erro de registro
        if (response.status === 400) {
          setRegistroError(data.error);
        } else {
          setRegistroError(
            "Erro ao fazer registro. Por favor, tente novamente mais tarde."
          );
        }
      }
    } catch (error) {
      console.log("Erro ao fazer registro:", error);
      setRegistroError(
        "Erro ao fazer registro. Por favor, tente novamente mais tarde."
      );
    }

    setUsername("");
    setEmail("");
    setSenha("");
  };

  const handleLoginLink = () => {
    navigate("/Login"); // Navegar para a página de login
  };

  return (
    <div className="create-account-container">
      <div className="create-account-wrapper">
        <img className="logo" src={logo} alt="Netflix Logo" />
        <input
          type="text"
          placeholder="Nome"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={handleSenhaChange}
        />
        <a href="/Login" className="create-account-button" onClick={handleRegistro}>
          Criar Conta
        </a>
        <a href="/" className="login-link" onClick={handleLoginLink}>
          Já tem uma conta? Faça login.
        </a>
        <div className="error-message">{registroError}</div>
      </div>
    </div>
  );
};

export default Registro;
