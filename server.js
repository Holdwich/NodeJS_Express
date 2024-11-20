import express from 'express'

const posts = [
    {
        id: 1,
        descricao: "Descricao da foto do post 1",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Descrição da foto do post 2",
        imagem: "https://placecats.com/garfield/300/150"
    },
    {
        id: 3,
        descricao: "Descrição da foto do post 3",
        imagem: "https://placecats.com/marceline/300/150"
    },
    {
        id: 4,
        descricao: "Descrição da foto do post 4",
        imagem: "https://placecats.com/felix/300/150"
    },
    {
        id: 5,
        descricao: "Descrição da foto do post 5",
        imagem: "https://placecats.com/snowball/300/150"
    },
    {
        id: 6,
        descricao: "Descrição da foto do post 6",
        imagem: "https://placecats.com/happy/300/150"
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});


function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorID(req.params.id)

    res.status(200).json(posts[index]);
});