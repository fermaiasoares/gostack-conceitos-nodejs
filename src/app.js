const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
* {
* id: "uuid",
* title: "Desafio Node.js",
* url: "https://github.com/fermaiasoares/gostack-conceitos-nodejs",
* techs: [
* "Node.JS",
* "React JS",
* "React Native" 
* ]
* }
*/

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository = { id: uuid(), title, url, techs, likes }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Respository not found'});
  }

  const likes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if ( repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id === id);

  if ( repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found'});
  }

  let likes = repositories[repositoryIndex].likes;

  likes = likes + 1;

  const {
    title,
    url,
    techs    
  } = repositories[repositoryIndex];

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});



module.exports = app;