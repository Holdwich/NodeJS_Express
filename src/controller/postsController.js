import { buscarPosts, buscarPostPorID, criarPost } from "../models/postsModel.js";
import * as fs from 'fs';

// Função para listar todos os posts
export async function listarPosts (req, res){
  // Chama a função buscarPosts do modelo para obter todos os posts
  const posts = await buscarPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
}

// Função para listar um post específico por ID
export async function listarPostsPorID (req, res){
  // Obtém o ID do post a partir dos parâmetros da requisição
  const post = await buscarPostPorID(req.params.id);
  // Envia o post encontrado como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(post);
}

// Função para criar um novo post
export async function postarNovoPost(req, res){
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função criarPost do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
}

// Função para fazer upload de imagem e criar um novo post
export async function uploadImagem(req, res){
  // Cria um objeto com os dados do novo post, incluindo a URL da imagem
  const novoPost = {
    descricao: "descrição da imagem",
    imgUrl: req.file.originalname,
    alt: "descrição da imagem"
  };

  try {
    // Cria o novo post
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo da imagem para incluir o ID do post
    const imagemAtualizada = 'uploads/' + postCriado.insertedId + '.png';
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
}