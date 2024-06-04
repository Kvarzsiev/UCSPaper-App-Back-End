import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';
import { Project } from 'entities/project/Project';
import { Result } from 'entities/result/Result';

import { app } from '../../';

describe('Result', () => {
  let resultRepository: Repository<Result>;
  let projectRepository: Repository<Project>;

  const projectDescription: string = 'test project';
  const projectSponsor: string = 'test sponsor';

  const project = new Project();
  project.description = projectDescription;
  project.title = 'Test Project Title';
  project.startDate = new Date();
  project.sponsor = projectSponsor;

  before(async () => {
    await AppDataSource.initialize();
    projectRepository = AppDataSource.getRepository(Project);
    resultRepository = AppDataSource.getRepository(Result);
  });

  after(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await projectRepository.save(project);
  });

  afterEach(async () => {
    await projectRepository.delete(project.id);
  });

  describe('POST /results', () => {
    it('should return created project', async () => {
      const res = await request(app).post('/results').set('ContentType', 'application/json').send({
        description: 'test result',
        projectId: project.id,
      });

      expect(res.status).to.equal(201);
      expect(res.body.description).to.equal('test result');
      expect(res.body.project.id).to.equal(project.id);

      await resultRepository.delete(res.body.id);
    });

    it('should return 400 if project not found', async () => {
      const res = await request(app).post('/results').set('ContentType', 'application/json').send({
        description: 'test result',
        projectId: '848a56a8-28e0-430d-8695-d7ca9a15c7b4',
      });

      expect(res.status).to.equal(400);
    });
  });
});
