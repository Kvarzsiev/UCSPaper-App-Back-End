import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';
import { Person } from 'entities/Person/Person';

import { app } from '../../';

describe('Person', () => {
  let personRepository: Repository<Person>;

  const personEmail: string = 'test@example.com';
  const personName: string = 'Test Person';
  const personInstitution: string = 'Test Institution';

  const person = new Person();
  person.email = personEmail;
  person.name = personName;
  person.institution = personInstitution;

  before(async () => {
    await AppDataSource.initialize();
    personRepository = await AppDataSource.getRepository(Person);
  });

	after(async () => {
		await AppDataSource.destroy();
	});

  beforeEach(async () => {
    await personRepository.save(person);
  });

  afterEach(async () => {
    await personRepository.delete(person.id);
  });

  describe('GET /persons', () => {
    it('should return list of all persons', async () => {
      const res = await request(app).get('/persons');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.be.above(0);
    });

    it('should return person by Id', async () => {
      const res = await request(app).get(`/persons/${person.id}`);
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(person.id);
    });

    it('should return 404 if no person is found', async () => {
      const res = await request(app).get('/persons/0');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /persons', () => {
    it('should return created person', async () => {
      const res = await request(app).post('/persons').set('ContentType', 'application/json').send({
        name: 'test person',
        email: 'postTestPerson@test.com',
        institution: 'test',
      });

      console.log(res.body);
      expect(res.status).to.equal(201);
      expect(res.body.email).to.equal('postTestPerson@test.com');
      await personRepository.delete(res.body.id);
    });

    it('should return 400 if duplicated person', async () => {
      const firstPerson = new Person();
      firstPerson.name = 'test person';
      firstPerson.email = 'postTestPerson@test.com';
      firstPerson.institution = 'test';

      await personRepository.save(firstPerson);

      const res = await request(app).post('/persons').set('ContentType', 'application/json').send({
        name: 'test person',
        email: 'postTestPerson@test.com',
        institution: 'test',
      });

      expect(res.status).to.equal(400);
      await personRepository.delete(firstPerson.id);
    });
  });
});
