import {
  getProjects,
  getProject,
  postProject,
  putProject,
  removeProjectPersons,
  editProjectPersons,
  deleteProject,
} from './api/project.swagger';
import { getPersons, getPerson, postPerson, deletePerson } from './api/person.swagger';
import { getResults, getResult, postResult } from './api/result.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'UCSPaper App API',
    description: 'Documentação da API do projeto UCSPaper',
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
      post: postPerson,
    },
    '/persons/{id}': {
      get: getPerson,
      delete: deletePerson,
    },
    '/projects': {
      get: getProjects,
      post: postProject,
    },
    '/projects/{id}': {
      get: getProject,
      put: putProject,
      delete: deleteProject,
    },
    '/projects/persons/{id}': {
      delete: removeProjectPersons,
      put: editProjectPersons,
    },
    '/projects/results/{id}': {
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
