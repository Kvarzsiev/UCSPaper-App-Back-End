import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';
import { Project } from 'entities/Project/Project';

import { app } from '../../';

describe('Project', () => {
  let projectRepository: Repository<Project>;

  const projectDescription: string = 'test project';
  const projectSponsor: string = 'test sponsor';

  const project = new Project();
  project.description = projectDescription;
  project.sponsor = projectSponsor;

  before(async () => {
    await AppDataSource.initialize();
    projectRepository = await AppDataSource.getRepository(Project);
  });

  beforeEach(async () => {
    await projectRepository.save(project);
  });

  afterEach(async () => {
    await projectRepository.delete(project.id);
  });

  describe('GET /projects', () => {
    it('should return list of all projects', async () => {
      const res = await request(app).get('/projects');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.be.above(0);
    });

    it('should return project by Id', async () => {
      const res = await request(app).get(`/projects/${project.id}`);
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(project.id);
    });

    it('should return 404 if no project is found', async () => {
      const res = await request(app).get('/projects/0');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /projects', () => {
    it('should return created project', async () => {
      const res = await request(app).post('/projects').set('ContentType', 'application/json').send({
        description: 'test project',
        sponsor: 'test sponsor',
      });

      console.log(res.body);
      expect(res.status).to.equal(201);
      expect(res.body.description).to.equal('test project');
      await projectRepository.delete(res.body.id);
    });
  });
});
