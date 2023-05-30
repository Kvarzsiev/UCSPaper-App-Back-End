import { getProjects, getProject, postProject, putProject, removeProjectPersons } from './api/project.swagger';
import { getPersons, getPerson } from './api/person.swagger';
import { getResults, getResult, postResult } from './api/result.swagger';
import { createPerson } from 'controllers/person';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Lattes App API',
    description: 'Documentação da API do projeto Lattes',
    termsOfService: '',
    contact: {
      name: 'Marcello',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  paths: {
    '/persons': {
      get: getPersons,
      post: createPerson,
    },
    '/persons/{id}': {
      get: getPerson,
    },
    '/projects': {
      get: getProjects,
      post: postProject,
    },
    '/projects/{id}': {
      get: getProject,
      put: putProject,
    },
    '/projects/editPersons/{id}': {
      delete: removeProjectPersons,
    },  
    '/results': {
      get: getResults,
      post: postResult,
    },
    '/results/{id}': {
      get: getResult,
    },
  },
  definitions: {},
};
