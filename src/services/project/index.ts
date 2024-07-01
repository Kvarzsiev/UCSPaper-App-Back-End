import { Project } from '../../entities/project/Project';
import { AppDataSource } from '../../database/dataSource';
import { ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Area } from 'entities/area/Area';
import { convertToCSV } from '../../utils/csvWriter';

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

export async function fetchProjectsCsvByFilters(filters: {
  description?: string;
  sponsor?: string;
  isFinished?: string;
  startDateStart?: string;
  startDateEnd?: string;
  finishDateStart?: string;
  finishDateEnd?: string;
}): Promise<string> {
  console.log(filters);
  const projectRepository: Repository<Project> = AppDataSource.getRepository(Project);

  let index = 1;

  let query = `
select 
  project.*, person_project.role, person.*, area.name as area, area.cnpq_code, result.description as result
from 
  project 
left join 
  person_project on person_project.project_id = project.id 
left join 
  person on person.id = person_project.person_id
left join 
  project_areas_area on project_areas_area.project_id = project.id
left join 
  area on area.id = project_areas_area.area_id
left join 
  result on result.project_id = project.id
`;
  const where = [];

  if (filters.description) {
    index == 1 ? (query += 'where project.description ilike $1') : (query += 'and project.description ilike $' + index);
    where.push(`%${filters.description}%`);
  }

  if (filters.sponsor) {
    index == 1 ? (query += 'where project.sponsor ilike $1') : (query += 'and project.description ilike $' + index);
    where.push(`%${filters.sponsor}%`);
  }

  if (filters.isFinished != null && filters.isFinished != undefined) {
    switch (filters.isFinished) {
      case '0': {
        index == 1 ? (query += 'where project.is_finished = $1') : (query += 'and project.is_finished = $' + index);
        where.push(true);
        break;
      }
      case '1': {
        index == 1 ? (query += 'where project.is_finished = $1') : (query += 'and project.is_finished = $' + index);
        where.push(false);
        break;
      }
    }
  }

  if (filters.startDateStart) {
    index == 1 ? (query += 'where project.start_date >= $1') : (query += 'and project.start_date >= $' + index);
    where.push(filters.startDateStart);
  }

  if (filters.startDateEnd) {
    index == 1 ? (query += 'where project.start_date <= $1') : (query += 'and project.start_date <= $' + index);
    where.push(filters.startDateEnd);
  }

  if (filters.finishDateStart) {
    index == 1 ? (query += 'where project.finish_date >= $1') : (query += 'and project.finish_date >= $' + index);
    where.push(filters.finishDateStart);
  }

  if (filters.finishDateEnd) {
    index == 1 ? (query += 'where project.finish_date <= $1') : (query += 'and project.finish_date <= $' + index);
    where.push(filters.finishDateEnd);
  }

  console.log('QUERY', query);
  console.log('WHERE ', where);

  const projects = await projectRepository.query(query, where);

  console.log(projects);
  const csv = convertToCSV(projects);

  return csv;
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
