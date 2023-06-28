import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Filme.css";


const Filme = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/filmes");
        setFilmes(response.data);
      } catch (error) {
        console.log("Erro ao obter filmes:", error);
      }
    };

    fetchFilmes();
  }, []);

  const filmesFiltrados = filmes.filter(
    (filme) => filme.nome !== "Interestelar"
  );

  const openFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      console.log("O modo de tela cheia não é suportado.");
    }
  };

  useEffect(() => {
    const videoElements = document.querySelectorAll(".filme-video");
    videoElements.forEach((videoElement) => {
      videoElement.addEventListener("loadedmetadata", () => {
        openFullscreen(videoElement);
      });
    });
  }, [filmes]);

  return (
    <div className="filme-container">
      <div className="filme-list">
        {filmesFiltrados.map((filme) => (
          <div key={filme.id} className="filme-item">
            <video
              className="filme-video"
              src={`http://localhost:3000/videos/${filme.nome}`}
              controls
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filme;
