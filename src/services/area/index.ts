import { AppDataSource } from '../../database/dataSource';
import { Repository } from 'typeorm';
import { Area } from 'entities/area/Area';

export function fetchAreas(): Promise<Area[]> {
  const repository: Repository<Area> = AppDataSource.getRepository(Area);
  return repository.find({
    select: ['id', 'name', 'hierarchy'],
  });
}

// export async function fetchPersonWithRelations(personId: string): Promise<Person> {
//   const personRepository: Repository<Person> = AppDataSource.getRepository(Person);
//   return (
//     personRepository
//       .createQueryBuilder('person')
//       .leftJoinAndSelect('person.results', 'results')
//       // .leftJoinAndSelect('person.personProjects', 'person_project')
//       // .leftJoinAndSelect('person_project.project', 'project')
//       .where('person.id = :id', {
//         id: personId,
//       })
//       .getOne()
//   );
// }

export function fetchArea(id: string): Promise<Area> {
  const repository: Repository<Area> = AppDataSource.getRepository(Area);
  return repository.findOne({
    where: {
      id: id,
    },
  });
}

export function saveArea(area: Area): Promise<Area> {
  const repository: Repository<Area> = AppDataSource.getRepository(Area);
  return repository.save(area);
}
