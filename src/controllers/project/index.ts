import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { Person } from 'entities/Person/Person';
import { Project } from 'entities/Project/Project';
import { CustomError } from 'utils/customError';
import { PersonProject } from 'entities/PersonProject/PersonProject';
import { Result } from 'entities/Result/Result';

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  const projectRepository = await AppDataSource.getRepository(Project);

  try {
    const projects = await projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.results', 'results')
      .leftJoinAndSelect('project.personProjects', 'personProject')
      .leftJoinAndSelect('personProject.person', 'person')
      .getMany();

    const projectsResponse = projects.map((project) => buildResponseProject(project));
    res.status(200).send(projectsResponse);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of projects', null, err);
    return next(customError);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const projectRepository = await AppDataSource.getRepository(Project);

  try {
    const project = await projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.results', 'results')
      .leftJoinAndSelect('project.personProjects', 'personProject')
      .leftJoinAndSelect('personProject.person', 'person')
      .where('project.id = :id', {
        id: id,
      })
      .getOne();

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    const responseProject = buildResponseProject(project);

    res.status(200).send(responseProject);
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
    //TODO: move this to ProjectService
    const project = new Project();
    project.description = description;
    project.sponsor = sponsor;
    project.startDate = parseDateStr(createDate);
    project.finishDate = parseDateStr(finishDate, true);
    project.isFinished = isFinished;

    await projectRepository.save(project);
    res.status(201).send(project);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function editProject(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { description, sponsor, startDate, finishDate, isFinished, persons, resultIds } = req.body;

  const projectRepository = await AppDataSource.getRepository(Project);
  const personProjectRepository = await AppDataSource.getRepository(PersonProject);
  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const project = await projectRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'description', 'sponsor'],
      relations: ['personProjects', 'results'],
    });

    if (persons?.length > 0) {
      for (const person of persons) {
        if (!project.personAlreadyMember(person.id)) {
          //TODO: move this to PersonProjectService
          const newPersonProject = new PersonProject();
          newPersonProject.project_id = id;
          newPersonProject.person_id = person.id;
          newPersonProject.role = person.role;

          await personProjectRepository.save(newPersonProject);
          project.personProjects.push(newPersonProject);
        }
      }
    }

    console.log(resultIds);
    if (resultIds?.length > 0) {
      for (const resultId of resultIds) {
        if (project.hasResult(resultId)) {
          try {
            //TODO: move this to ResultService
            const newResult = await resultRepository.findOneByOrFail({
              id: resultId,
            });
            project.results.push(newResult);
          } catch (err) {
            const customError = new CustomError(400, 'Raw', `Provided result id could not be found`, null, [err]);
            return next(customError);
          }
        } else {
          const customError = new CustomError(400, 'Raw', `Provided result already in the list of results`);
          return next(customError);
        }
      }
    }

    //bruh
    project.sponsor = sponsor || project.sponsor;
    project.startDate = startDate || project.startDate;
    project.finishDate = finishDate || project.finishDate;
    project.isFinished = isFinished || project.isFinished;
    project.description = description || project.description;

    const responseProject = buildResponseProject(project);
    await projectRepository.save(responseProject);
    res.status(201).send(project);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

function parseDateStr(dateStr: string, returnNullIfInvalid: boolean = false): Date {
  const ticks = Date.parse(dateStr);
  if (!ticks) {
    return returnNullIfInvalid ? null : new Date();
  }
  return new Date(ticks);
}

function buildResponseProject(project: Project) {
  return {
    id: project.id,
    description: project.description,
    sponsor: project.sponsor,
    startDate: project.startDate,
    finishedDate: project.finishDate,
    isFinished: project.isFinished,
    results: project.results,
    persons: project.personProjects.map((personProject) => personProject.person),
    created_at: project.created_at,
    updated_at: project.updated_at,
  };
}
