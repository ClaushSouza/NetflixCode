import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        setLoginError("");
        navigate("/Perfil");
      } else {
        // Erro de login
        if (response.status === 401) {
          setLoginError(data.error);
        } else {
          setLoginError(
            "Erro ao fazer login. Por favor, tente novamente mais tarde."
          );
        }
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      setLoginError(
        "Erro ao fazer login. Por favor, tente novamente mais tarde."
      );
    }

    setEmail("");
    setPassword("");
  };

  const handleSignup = () => {
    navigate("/Registro"); // Navegar para a página de registro
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <img className="logo" src={logo} alt="Logo da Netflix" />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
        <span className="forgot-password">Esqueceu a senha?</span>
        <div className="error-message">{loginError}</div> {/* Display error message */}
        <button className="signup-button" onClick={handleSignup}>
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Login;
