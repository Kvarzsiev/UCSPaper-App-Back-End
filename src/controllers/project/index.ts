import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { Person } from 'entities/Person/Person';
import { Project } from 'entities/Project/Project';
import { CustomError } from 'utils/customError';
import { PersonProject } from 'entities/PersonProject/PersonProject';

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  const projectRepository = await AppDataSource.getRepository(Project);

  try {
    const projects = await projectRepository.find({
      select: ['id', 'description', 'sponsor'],
      relations: ['personProjects', 'results'],
    });
    res.status(200).send(projects);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of projects', null, err);
    return next(customError);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const projectRepository = await AppDataSource.getRepository(Project);

  try {
    const project = await projectRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'description', 'sponsor'],
      relations: ['personProjects', 'results'],
    });

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    res.status(200).send(project);
  } catch (err) {
    console.error(err);

    const customError = new CustomError(400, 'Raw', `Can't retrieve project.`, null, err);
    return next(customError);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  const { description, sponsor, createDate, finishDate, isFinished } = req.body;

  const projectRepository = await AppDataSource.getRepository(Project);

  try {
    const project = new Project();
    project.description = description;
    project.sponsor = sponsor;
    project.startDate = parseDateStr(createDate); 
    project.finishDate = parseDateStr(finishDate, true); 

    await projectRepository.save(project);
    res.status(201).send(project);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function editProject(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { description, sponsor, persons } = req.body;

  const projectRepository = await AppDataSource.getRepository(Project);
  const personProjectRepository = await AppDataSource.getRepository(PersonProject);

  try {
    const project = await projectRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'description', 'sponsor'],
      relations: ['personProjects', 'results'],
    });

    if (persons?.length > 0) {
      persons.forEach(async (person) => {
        if (!project.personProjects.some((pp) => pp.id === person.id)) {
          const newPersonProject = new PersonProject();
          newPersonProject.project_id = id;
          newPersonProject.person_id = person.id;
          newPersonProject.role = person.role;

          await personProjectRepository.save(newPersonProject);
        }
      });
    }
    await projectRepository.save(project);
    res.status(201).send(project);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

function parseDateStr(dateStr: string, returnNullIfInvalid : boolean = false): Date {
  const ticks = Date.parse(dateStr);
  if(!ticks) {
    return returnNullIfInvalid ? null : new Date()
  }
  return new Date(ticks);
}
