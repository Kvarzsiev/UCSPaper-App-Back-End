import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';
import { Project } from 'entities/Project/Project';

import { app } from '../../';
import { Person } from 'entities/Person/Person';
import { PersonProject } from 'entities/PersonProject/PersonProject';

describe('Project', () => {
  let projectRepository: Repository<Project>;
  let personRepository: Repository<Person>;
  let personProjectRepository: Repository<PersonProject>;

  const projectDescription: string = 'test project';
  const projectSponsor: string = 'test sponsor';

  const project = new Project();
  project.description = projectDescription;
  project.sponsor = projectSponsor;

  const personEmail: string = 'test@example.com';
  const personName: string = 'Test Person';
  const personInstitution: string = 'Test Institution';

  const person = new Person();
  person.email = personEmail;
  person.name = personName;
  person.institution = personInstitution;

  before(async () => {
    await AppDataSource.initialize();
    projectRepository = await AppDataSource.getRepository(Project);
    personRepository = await AppDataSource.getRepository(Person);
    personProjectRepository = await AppDataSource.getRepository(PersonProject);
  });

  after(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await projectRepository.save(project);
    await personRepository.save(person);
  });

  afterEach(async () => {
    await personProjectRepository.clear(); // clears all person projects links
    await personRepository.delete(person.id);
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
        createdDate: new Date(),
        finishDate: null,
        isFinish: false,
      });

      console.log(res.body);
      expect(res.status).to.equal(201);
      expect(res.body.description).to.equal('test project');
      await projectRepository.delete(res.body.id);
    });
  });

  describe('PUT /projects', () => {
    it('should create a personProject link when a person is provided', async () => {
      const res = await request(app)
        .put(`/projects/${project.id}`)
        .set('ContentType', 'application/json')
        .send({
          persons: [{ id: person.id, role: 'member' }],
        });

      console.log(res.body);
      expect(res.body.personProjects[0].person_id).to.equal(person.id);
    });
  });
});
