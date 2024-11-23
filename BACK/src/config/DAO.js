import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try{
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao BD...');
        await mongoClient.connect();
        console.log('Conectado com sucesso!');

        return mongoClient;
    } catch (erro) {
        console.error('Falha na conexão ao banco: ' + erro);
        process.exit();
    }
}