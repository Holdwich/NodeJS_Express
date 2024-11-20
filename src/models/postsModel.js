import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/DAO.js';

const cnx = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function buscarPosts(){
    const db = cnx.db("imersao-instabyte");
    const colecao = db.collection("posts");

    return colecao.find().toArray()
}

export async function buscarPostPorID(id){
    // return posts.findIndex((post) => {
    //     return post.id === Number(id)
    // })
    
    const db = cnx.db("imersao-instabyte");
    const colecao = db.collection("posts");

    return colecao.findOne({ _id: new ObjectId(id) })
}