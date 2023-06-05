import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { Person } from 'entities/Person/Person';
import { Project } from 'entities/Project/Project';
import { CustomError } from 'utils/customError';
import { PersonProject } from 'entities/PersonProject/PersonProject';
import { Result } from 'entities/Result/Result';
import { fetchProjectWithRelations, fetchProjects, fetchRawProject, saveProject } from 'services/project';
import { fetchRawResult } from 'services/result';

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  try {
    await fetchProjects().then((projects) => {
      const projectsResponse = projects.map((project) => buildResponseProject(project));
      res.status(200).send(projectsResponse);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of projects', null, err);
    return next(customError);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  try {
    await fetchProjectWithRelations(id).then((project) => {
      if (!project) {
        const customError = new CustomError(404, 'Not Found', 'Project not found');
        return next(customError);
      }

      const responseProject = buildResponseProject(project);

      res.status(200).send(responseProject);
    });
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

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    if (resultIds?.length > 0) {
      for (const resultId of resultIds) {
        if (project.hasResult(resultId)) {
          try {
            const newResult = await fetchRawResult(resultId);
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

    project.sponsor = sponsor || project.sponsor;
    project.startDate = startDate || project.startDate;
    project.finishDate = finishDate || project.finishDate;
    project.isFinished = isFinished || project.isFinished;
    project.description = description || project.description;

    await saveProject(project);
    const responseProject = buildResponseProject(project);
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function editProjectPersons(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { persons } = req.body;

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    if (persons?.length > 0) {
      await project.addPersonsToProject(persons);
    }

    await saveProject(project);
    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function deleteProjectPersons(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { personsIds } = req.body;

  console.log(req);

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    if (personsIds?.length > 0) {
      for (const personId of personsIds) {
        try {
          await project.removePersonToProject(personId);
        } catch (err) {
          const customError = new CustomError(400, 'Raw', err.message, null, [err]);
          return next(customError);
        }
      }
    }

    console.log(await fetchProjectWithRelations(id));
    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function editProjectResults(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { resultIds } = req.body;

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    if (resultIds?.length > 0) {
      for (const resultId of resultIds) {
        try {
          await project.addResultToProject(resultId);
        } catch (err) {
          const customError = new CustomError(400, 'Raw', err.message, null, [err]);
          return next(customError);
        }
      }
    }

    const responseProject = buildResponseProject(project);
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, [err]);
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
    persons: project.personProjects.map((personProject) => ({ ...personProject.person, role: personProject.role })),
    created_at: project.created_at,
    updated_at: project.updated_at,
  };
}
