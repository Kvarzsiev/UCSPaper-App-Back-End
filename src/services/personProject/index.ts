import { PersonProject } from 'entities/personProject/PersonProject';
import { AppDataSource } from 'database/dataSource';
import { Repository } from 'typeorm';

export async function fetchPersonProject(personId: number, projectId: number): Promise<PersonProject> {
  const personProjectRepository = AppDataSource.getRepository(PersonProject);
  return personProjectRepository
    .createQueryBuilder('personProject')
    .select('personProject')
    .where('personProject.person_id = :personId AND personProject.project_id = :projectId', {
      projectId: projectId,
      personId: personId,
    })
    .getOne();
}

export async function savePersonProject(personProject: PersonProject): Promise<PersonProject> {
  const personProjectRepository: Repository<PersonProject> = AppDataSource.getRepository(PersonProject);
  return personProjectRepository.save(personProject);
}

export async function deletePersonProject(personProject: PersonProject): Promise<void> {
  const personProjectRepository: Repository<PersonProject> = AppDataSource.getRepository(PersonProject);
  personProjectRepository.delete({
    id: personProject.id,
  });
}
