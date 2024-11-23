import { ObjectId } from 'mongodb'; // Importa a classe ObjectId para criar IDs únicos

import conectarAoBanco from '../config/DAO.js'; // Importa a função de conexão ao banco

// Estabelece a conexão com o banco de dados de forma assíncrona
const cnx = await conectarAoBanco(process.env.STRING_CONEXAO); 

// Função para buscar todos os posts
export async function buscarPosts() {
  const db = cnx.db("imersao-instabyte"); // Obtém referência para o banco de dados
  const colecao = db.collection("posts"); // Obtém referência para a coleção

  // Encontra todos os documentos e os converte em um array
  return colecao.find().toArray();
}

// Função para buscar um post pelo seu ID
export async function buscarPostPorID(id) {
  const db = cnx.db("imersao-instabyte"); // Obtém referência para o banco de dados
  const colecao = db.collection("posts"); // Obtém referência para a coleção

  // Converte o ID da string para um ObjectId para comparação correta
  const objectId = new ObjectId(id);

  // Encontra o primeiro documento com o campo _id correspondente
  return colecao.findOne({ _id: objectId });
}

// Função para criar um novo post
export async function criarPost(novoPost) {
  const db = cnx.db("imersao-instabyte"); // Obtém referência para o banco de dados
  const colecao = db.collection("posts"); // Obtém referência para a coleção

  // Insere o novo documento do post
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
  const db = cnx.db("imersao-instabyte"); // Obtém referência para o banco de dados
  const colecao = db.collection("posts"); // Obtém referência para a coleção

  const objectId = new ObjectId(id);

  // Atualiza o documento com os novos valores
  return colecao.updateOne({_id: objectId}, {$set: post});
}