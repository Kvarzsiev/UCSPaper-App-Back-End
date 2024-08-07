import { AppDataSource } from 'database/dataSource';
import { NextFunction, Request, Response } from 'express';

import { Project } from 'entities/project/Project';
import {
  fetchProjectWithRelations,
  fetchProjectsCsvByFilters,
  fetchProjects,
  fetchRawProject,
  saveProject,
  deleteProject,
} from 'services/project';
import { CustomError } from 'utils/customError';
import { fetchArea, fetchAreasById } from 'services/area';
import { Area } from 'entities/area/Area';

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  try {
    let area: Area | undefined = undefined;
    if (req.query?.areaId) {
      area = await fetchArea(req.query?.areaId.toString());
    }

    await fetchProjects(area).then((projects) => {
      const projectsResponse = projects.map((project) => buildResponseProject(project));

      res.status(200).send(projectsResponse);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of projects', null, [err]);
    return next(customError);
  }
}

export async function getProjectCsv(req: Request, res: Response, next: NextFunction) {
  try {
    await fetchProjectsCsvByFilters(req.query).then((csvText) => {
      res.type('text/csv');
      res.attachment('projects.csv').send(csvText);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve projects.`, null, err);
    return next(customError);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

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
  const { title, description, sponsor, sponsoredValue, createDate, finishDate, isFinished } = req.body;

  const projectRepository = AppDataSource.getRepository(Project);

  try {
    const project = new Project();
    project.title = title;
    project.description = description;
    project.sponsor = sponsor;
    project.sponsoredValue = sponsoredValue;
    project.startDate = parseDateStr(createDate);
    project.finishDate = parseDateStr(finishDate, true);
    project.isFinished = isFinished;

    await projectRepository.save(project);
    res.status(201).send(await fetchProjectWithRelations(project.id));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, [err]);
    return next(customError);
  }
}

export async function editProject(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { title, description, sponsor, sponsoredValue, startDate, finishDate, isFinished } = req.body;

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    project.title = title;
    project.sponsor = sponsor;
    project.sponsoredValue = sponsoredValue;
    project.startDate = startDate;
    project.finishDate = finishDate;
    project.isFinished = isFinished;
    project.description = description;

    await saveProject(project);
    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not edit project`, null, [err]);
    return next(customError);
  }
}

export async function delProject(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  try {
    await deleteProject(id);
    res.status(200).end();
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not delete project`, null, [err]);
    return next(customError);
  }
}

export async function editProjectAreas(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { areas } = req.body;

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    const fetchedAreas = await fetchAreasById(areas);

    if (fetchedAreas?.length > 0) {
      await project.editAreas(fetchedAreas);
    }

    res.status(201).send(buildResponseProject(await fetchProjectWithRelations(id)));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not edit project`, null, err);
    return next(customError);
  }
}

export async function editProjectPersons(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { persons } = req.body;

  try {
    const project = await fetchRawProject(id);

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    if (persons?.length > 0) {
      await project.editMembers(persons);
    }

    res.status(201).send(buildResponseProject(await fetchProjectWithRelations(id)));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not edit project`, null, err);
    return next(customError);
  }
}

export async function deleteProjectPersons(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { personsIds } = req.body;

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

    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create project`, null, err);
    return next(customError);
  }
}

export async function deleteProjectResults(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
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
          await project.removeResultFromProject(resultId);
        } catch (err) {
          const customError = new CustomError(400, 'Raw', err.message, null, [err]);
          return next(customError);
        }
      }
    }

    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
    res.status(201).send(responseProject);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not delete result from project`, null, [err]);
    return next(customError);
  }
}

export async function editProjectResults(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
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
          const customError = new CustomError(400, 'General', err.message, null, [err]);
          return next(customError);
        }
      }
    }

    const responseProject = buildResponseProject(await fetchProjectWithRelations(id));
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
    title: project.title,
    sponsor: project.sponsor,
    sponsoredValue: project.sponsoredValue,
    startDate: project.startDate,
    finishDate: project.finishDate,
    isFinished: project.isFinished,
    results: project.results,
    areas: project.areas,
    persons: project.personProjects.map((personProject) => ({ ...personProject.person, role: personProject.role })),
    created_at: project.createdAt,
    updated_at: project.updatedAt,
  };
}
