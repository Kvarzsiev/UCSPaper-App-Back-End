import { PersonProject } from '../../entities/personProject/PersonProject';
import { AppDataSource } from '../../database/dataSource';
import { Repository } from 'typeorm';

export async function fetchPersonProject(personId: string, projectId: string): Promise<PersonProject> {
  const personProjectRepository = AppDataSource.getRepository(PersonProject);
  return personProjectRepository
    .createQueryBuilder('personProject')
    .select('person_project')
    .where('person_project.person_id = :personId AND person_project.project_id = :projectId', {
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
    personId: personProject.personId,
    projectId: personProject.projectId,
  });
}
