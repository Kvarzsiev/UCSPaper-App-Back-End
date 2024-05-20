import { Project } from '../../entities/project/Project';
import { AppDataSource } from '../../database/dataSource';
import { Repository } from 'typeorm';

export async function fetchProjects(): Promise<Project[]> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  return projectRepository
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.results', 'results')
    .leftJoinAndSelect('project.personProjects', 'member')
    .leftJoinAndSelect('member.person', 'person')
    .getMany();
}

export async function fetchRawProject(projectId: number): Promise<Project> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);

  return projectRepository.findOne({
    where: {
      id: projectId,
    },
    select: ['id', 'description', 'sponsor'],
    relations: ['personProjects', 'results'],
  });
}

export async function fetchProjectWithRelations(projectId: number): Promise<Project> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  return projectRepository
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.results', 'results')
    .leftJoinAndSelect('project.personProjects', 'personProject')
    .leftJoinAndSelect('personProject.person', 'person')
    .where('project.id = :id', {
      id: projectId,
    })
    .getOne();
}

export async function saveProject(project: Project): Promise<Project> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  return projectRepository.save(project);
}

export async function deleteProject(projectId: number): Promise<void> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  await projectRepository
    .createQueryBuilder('project')
    .delete()
    .from(Project)
    .where('id = :id', {
      id: projectId,
    })
    .execute();
}
