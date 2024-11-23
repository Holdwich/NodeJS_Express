import { buscarPosts, buscarPostPorID, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
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

    // Constrói a URL da imagem considerando o endereço do servidor
    const urlImg = 'http://localhost:3000/'+postCriado.insertedId+".png";
    
    // Lê o conteúdo da imagem como um buffer.
    const imgBuffer = fs.readFileSync(imagemAtualizada)
    // Utiliza o serviço Gemini para gerar uma descrição detalhada da imagem.
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    // Atualiza o post com a descrição gerada pelo Gemini e a URL da imagem no servidor.
    const postAtualizado = {
      imgUrl: urlImg,
      descricao: descricao,
      alt: "uma imagem"
    }
    await atualizarPost(postCriado.insertedId, postAtualizado)

    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch(erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
}

export async function atualizarNovoPost(req, res){

  // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição.
  const id = req.params.id;
  // Constrói a URL completa da imagem do post, com base no ID.
  const urlImagem='http://localhost:3000/'+id+".png"

  try {
    // Lê o conteúdo da imagem como um buffer para processamento posterior.
    const imgBuffer = fs.readFileSync('uploads/'+id+'.png')
    // Utiliza o serviço Gemini para gerar uma descrição detalhada da imagem.
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    // Cria um objeto com os dados atualizados do post, incluindo a nova descrição e a URL da imagem.
    const post ={
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }

    // Chama a função `atualizarPost` do modelo para atualizar o post no banco de dados.
    const postCriado = await atualizarPost(id, post);
    // Retorna o post atualizado como resposta, indicando sucesso.
    res.status(200).json(postCriado);
  } catch(erro) {
    // Captura qualquer erro que possa ocorrer durante o processo de atualização.
    console.error(erro.message);
    // Retorna uma resposta de erro com status 500 e uma mensagem genérica. 
    res.status(500).json({"Erro" : "Falha na requisição"})
  }
}