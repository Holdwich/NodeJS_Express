
import { buscarPosts, buscarPostPorID } from "../models/postsModel.js";

export async function listarPosts (req, res){
    const posts = await buscarPosts();
    res.status(200).json(posts);
}

export async function listarPostsPorID (req, res){
    const post = await buscarPostPorID(req.params.id);
    res.status(200).json(post);
}