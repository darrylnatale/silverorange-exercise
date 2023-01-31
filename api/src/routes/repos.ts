import { Router, Request, Response } from 'express';

export const repos = Router();
const axios = require('axios');
const fs = require('fs');

interface Repository {
  fork: boolean;
}

repos.get('/', async (_, res) => {
  res.header('Cache-Control', 'no-store');
  res.status(200);
  res.set('Content-Type', 'application/json');

  let repositories = [];

  try {
    const apiResponse = await axios.get('https://api.github.com/users/silverorange/repos');
    repositories = apiResponse.data;
  } catch (error) {
    console.error(error);
  }

  try {
    const fileData = fs.readFileSync('../api/data/repos.json');
    const fileRepos = JSON.parse(fileData);
    repositories = [...repositories, ...fileRepos];
    
  } catch (error) {
    console.error(error);
  }
  
  const filteredRepos = repositories.filter((repo: Repository) => repo.fork === false);


  res.json(filteredRepos);
});
