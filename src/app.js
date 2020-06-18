const express = require("express");
const cors = require("cors");
const { isUuid, uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ message: "Invalid UUID" });
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ message: `The repository with id "${id}" is not found` });
  }

  repositories[repositoryIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  return response.status(204).json({ message: "the resource has been updated" });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ message: "Invalid UUID" });
  }

  const repository = repositories.find(repository => repository.id === id);

  if(!repository) {
    return response.status(404).json({ message: "Repository not found" });
  }

  repositories.pop(repository);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
});

module.exports = app;
