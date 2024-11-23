# Projeto: Imersão Backend Alura (Node.js + Express)

Este repositório contém o código desenvolvido durante a **Imersão Backend** da Alura, utilizando Node.js e Express para o backend. Adicionalmente, foram feitas **modificações pessoais** tanto no backend quanto no frontend, com o objetivo de personalizar e expandir o aprendizado.

## 📋 Visão Geral

O projeto é voltado para **fins educacionais**, servindo como base para estudos de **Express** e a construção de uma API REST, portanto, o site possui funcionalidades limitadas (como aceitar imagens somente em .png), com foco no funcionamento básico do backend e consumo da API no frontend.

## ⚙️ Tecnologias Utilizadas

- **Node.js**: Para a execução do servidor backend.
- **Express**: Framework minimalista para criação de APIs em Node.js.
- **MongoDB**: Banco de dados.
- **Postman**: Utilizado para testes da API.
- **API Google Gemini**: Utilizado para gerar automaticamente uma descrição para as imagens inseridas no banco de dados.
- **Frontend (customizado)**: Feito com tecnologias simples para consumir a API e apresentar dados.

## 🛠️ Modificações Pessoais

- **Backend**: Ajustes e melhorias no código base da API REST para atender diferentes endpoints e manipular dados fictícios.
- **Frontend**: Modificações para integração personalizada com a API, estilização e experimentos com layouts.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado em sua máquina.
- npm instalado.

Para executar o projeto localmente, você precisará iniciar dois consoles: **um para o backend (porta 3000) e outro para o frontend (porta 8000)**.

Em ambos os consoles, as dependências para ambas as pastas, podem ser instaladas utilizando o seguinte comando nos consoles:
```
npm install
```

Ambos os back e front podem ser 'abertos' com o seguinte comando no console, nas suas respectivas pastas:
```
npm run dev
```

Deverá, também, criar um banco de dados NoSQL (Como o MongoDB, que foi utilizado nesse projeto) e utilizar uma collection com o mesmo nome especificado no código; deve especificar a connection string num arquivo .env no back (STRING_CONEXAO). **(Caso opte por outro banco, mudanças podem ser necessárias no código para adequar ao seu novo banco)**

O código utiliza a API do Google Gemini, portanto, você deve gerar a sua própria chave de API e colocar num arquivo .env no back (GEMINI_API_KEY). 

Para conveniência, no front já está configurado o arquivo .env para se conectar com o back.

Postman foi utilizado para enviar as mensagens para a API, porém qualquer outro serviço similar pode ser utilizado.
