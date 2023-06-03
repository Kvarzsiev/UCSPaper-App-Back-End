import { Person } from 'entities/Person/Person';
import { AppDataSource } from 'database/dataSource';
import { Repository } from 'typeorm';

export async function fetchPersons(): Promise<Person[]> {
  const personRepository: Repository<Person> = await AppDataSource.getRepository(Person);
  return personRepository.find({
    select: ['id', 'name', 'email', 'institution'],
  });
}

export async function fetchPersonWithRelations(personId: number): Promise<Person> {
  const personRepository = await AppDataSource.getRepository(Person);
  return personRepository
    .createQueryBuilder('person')
    .leftJoinAndSelect('person.results', 'results')
    .leftJoinAndSelect('person.personProjects', 'personProject')
    .leftJoinAndSelect('personProject.project', 'project')
    .where('person.id = :id', {
      id: personId,
    })
    .getOne();
}

export async function fetchPerson(personId: number): Promise<Person> {
  const personRepository = await AppDataSource.getRepository(Person);
  return personRepository.findOne({
    where: {
      id: personId,
    },
  });
}

export async function savePerson(person: Person): Promise<Person> {
  const personRepository = await AppDataSource.getRepository(Person);
  return personRepository.save(person);
}
