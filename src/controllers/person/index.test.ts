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

  beforeEach(async () => {
    await personRepository.save(person);
  });

  afterEach(async () => {
    await personRepository.delete(person.id);
  });

  describe('GET /persons', () => {
    it('should return list of all persons', async () => {
      const res = await request(app).get('/persons');
      console.log(res);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.be.above(0);
      expect(res.body[0].email).to.equal('test@example.com');
    });
  });
});
