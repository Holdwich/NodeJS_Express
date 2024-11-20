import express from "express";
import { listarPosts, listarPostsPorID } from "../controller/postsController.js";

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);
    app.get("/posts/:id", listarPostsPorID);
}

export default routes;
