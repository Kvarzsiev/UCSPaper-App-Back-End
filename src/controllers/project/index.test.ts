import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';
import { Project } from 'entities/project/Project';

import { app } from '../../';
import { Person } from 'entities/person/Person';
import { PersonProject } from 'entities/personProject/PersonProject';

describe('Project', () => {
  let projectRepository: Repository<Project>;
  let personRepository: Repository<Person>;
  let personProjectRepository: Repository<PersonProject>;

  const projectDescription: string = 'test project';
  const projectSponsor: string = 'test sponsor';

  const project = new Project();
  project.description = projectDescription;
  project.title = 'Test Project Title';
  project.startDate = new Date();
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
    projectRepository = AppDataSource.getRepository(Project);
    personRepository = AppDataSource.getRepository(Person);
    personProjectRepository = AppDataSource.getRepository(PersonProject);
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

    it('should return project filtered by Area', async () => {
      const res = await request(app).get(`/projects?areaId=e26118b2-7f7c-457e-b1d6-aa413e519af3`);
      expect(res.status).to.equal(200);
      expect(res.body.length == 1);
      expect(res.body[0].id).to.equal('e26118b2-7f7c-457e-b1d6-aa413e519af0');
    });

    it('should return projects csv', async () => {
      const res = await request(app).get(`/projects/csv`);
      expect(res.headers['content-type']).to.equal('text/csv; charset=utf-8');
      expect(res.headers['content-disposition']).to.equal('attachment; filename="projects.csv"');
    });

    it('should return 404 if no project is found', async () => {
      const res = await request(app).get('/projects/38b3f25a-2ad6-4c7c-bc4f-92b662bbb0e3');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /projects', () => {
    it('should return created project', async () => {
      const res = await request(app).post('/projects').set('ContentType', 'application/json').send({
        description: 'test project',
        sponsor: 'test sponsor',
        title: 'Bom dia e CIA',
        createdDate: new Date(),
        finishDate: null,
        isFinish: false,
      });

      expect(res.status).to.equal(201);
      expect(res.body.description).to.equal('test project');
      await projectRepository.delete(res.body.id);
    });
  });

  describe('PUT /projects', () => {
    it('should create a personProject link when a person is provided', async () => {
      const res = await request(app)
        .put(`/projects/persons/${project.id}`)
        .set('ContentType', 'application/json')
        .send({
          persons: [{ id: person.id, role: 'member' }],
        });

      expect(res.body.persons[0].id).to.equal(person.id);
    });
  });
});
