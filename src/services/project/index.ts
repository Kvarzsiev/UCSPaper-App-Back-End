import { Project } from '../../entities/project/Project';
import { AppDataSource } from '../../database/dataSource';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Area } from 'entities/area/Area';

export async function fetchProjects(area: Area | undefined): Promise<Project[]> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  if (!area) {
    return projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.results', 'results')
      .leftJoinAndSelect('project.personProjects', 'member')
      .leftJoinAndSelect('member.person', 'person')
      .leftJoinAndSelect('project.areas', 'areas')
      .getMany();
  } else {
    return projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.results', 'results')
      .leftJoinAndSelect('project.personProjects', 'member')
      .leftJoinAndSelect('member.person', 'person')
      .leftJoinAndSelect('project.areas', 'areas')
      .where(
        `EXISTS (
        	select
        		*
         	from
         		project_areas_area paa
         	inner join area a on
         		a.id = paa.area_id
         	where
         		paa.project_id = project.id
         	and a.hierarchy <@ :hierarchy
         		)`,
        { hierarchy: area.hierarchy },
      )
      .getMany();
  }
}

export async function fetchRawProject(projectId: string): Promise<Project> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);

  return projectRepository.findOne({
    where: {
      id: projectId,
    },
    select: ['id', 'description', 'sponsor'],
    relations: ['personProjects', 'results', 'areas'],
  });
}

export async function fetchProjectWithRelations(projectId: string): Promise<Project> {
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);
  return projectRepository
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.results', 'results')
    .leftJoinAndSelect('project.personProjects', 'personProject')
    .leftJoinAndSelect('personProject.person', 'person')
    .leftJoinAndSelect('project.areas', 'areas')
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
