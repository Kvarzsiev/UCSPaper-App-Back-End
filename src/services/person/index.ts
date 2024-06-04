import { Person } from '../../entities/person/Person';
import { AppDataSource } from '../../database/dataSource';
import { Repository } from 'typeorm';

export async function fetchPersons(): Promise<Person[]> {
  const personRepository: Repository<Person> = AppDataSource.getRepository(Person);
  return personRepository.find({
    select: ['id', 'name', 'email', 'institution'],
  });
}

export async function fetchPersonWithRelations(personId: string): Promise<Person> {
  const personRepository: Repository<Person> = AppDataSource.getRepository(Person);
  return (
    personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.results', 'results')
      // .leftJoinAndSelect('person.personProjects', 'person_project')
      // .leftJoinAndSelect('person_project.project', 'project')
      .where('person.id = :id', {
        id: personId,
      })
      .getOne()
  );
}

export async function fetchPerson(personId: string): Promise<Person> {
  const personRepository: Repository<Person> = AppDataSource.getRepository(Person);
  return personRepository.findOne({
    where: {
      id: personId,
    },
  });
}

export async function savePerson(person: Person): Promise<Person> {
  const personRepository: Repository<Person> = AppDataSource.getRepository(Person);
  return personRepository.save(person);
}
