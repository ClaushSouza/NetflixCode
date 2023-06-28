const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db.js");
const path = require("path");
const fs = require("fs");



const app = express();

app.use(
  cors({
    origin: ["http://192.168.18.2:3000", "http://localhost:3001"],
    methods: "GET",
    optionsSuccessStatus: 200,
  })
);

const videosRoot = path.join(__dirname, "src/public/videos");

// Conectar ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});


// Habilitar o CORS
app.use(cors());

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Verifica se o email é válido
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.get("/filmes", (req, res) => {
  const nome = req.query.nome;
  const id = req.query.id;

  const videos = fs
    .readdirSync(videosRoot)
    .filter((file) =>
      [".mp4", ".mkv", ".avi"].includes(path.extname(file.toLowerCase()))
    )
    .map((file, index) => ({
      id: index,
      nome: file,
    }));

  if (id) {
    const videoEncontrado = videos.find((filme) => filme.id == id);
    if (videoEncontrado) {
      res.sendFile(path.join(videosRoot, videoEncontrado.nome));
    } else {
      res.status(404).send("Vídeo não encontrado");
    }
  } else if (nome) {
    const filmesEncontrados = videos.filter((filme) =>
      filme.nome.toLowerCase().includes(nome.toLowerCase())
    );
    res.json(filmesEncontrados);
  } else {
    res.json(videos);
  }
});

// Rota de cadastro
app.post("/cadastro", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "Por favor, preencha todos os campos" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "E-mail inválido" });
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { username, email, password: hashedPassword };

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.log("Erro ao executar a consulta:", err);
        res.status(500).json({ error: "Erro ao realizar o cadastro" });
        return;
      }

      if (results.length > 0) {
        res.json({ error: "Usuário já cadastrado" });
      } else {
        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.log("Erro ao inserir usuário:", err);
              res.status(500).json({ error: "Erro ao realizar o cadastro" });
              return;
            }
            console.log("Usuário cadastrado com sucesso");
            res.json({ message: "Cadastro realizado com sucesso" });
          }
        );
      }
    }
  );
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.log("Erro ao executar a consulta:", err);
      res.status(500).json({ error: "Erro ao realizar o login" });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: "Usuário não encontrado" });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          console.log("Erro ao comparar as senhas:", err);
          res.status(500).json({ error: "Erro ao realizar o login" });
          return;
        }
        if (passwordMatch) {
          res.json({ message: "Login bem-sucedido" });
        } else {
          res.status(401).json({ error: "Senha incorreta" });
        }
      });
    }
  });
});

const port = 3000;
app.use("/videos", express.static(videosRoot));


// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
