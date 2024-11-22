import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o middleware Multer para upload de arquivos

// Importa as funções controladoras do arquivo postsController.js
import {
  listarPosts,
  listarPostsPorID,
  postarNovoPost,
  uploadImagem,
} from "../controller/postsController.js";

// Configura o armazenamento de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar as imagens enviadas
    cb(null, "uploads/"); // Altera para o diretório desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  },
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ storage }); // Utiliza o storage configurado acima

// Define as rotas da API
const routes = (app) => {
  // Habilita o parsing de dados JSON na requisição
  app.use(express.json());

  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para listar um post específico por ID
  app.get("/posts/:id", listarPostsPorID);

  // Rota para criar um novo post (enviando dados no corpo da requisição)
  app.post("/posts", postarNovoPost);

  // Rota para upload de imagem (enviando a imagem como multipart/form-data)
  app.post("/upload", upload.single("imagem"), uploadImagem); // Utiliza o middleware upload para a imagem 'imagem'
};

export default routes; // Exporta a função routes para uso em outros arquivos