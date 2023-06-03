import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { PersonProject } from 'entities/PersonProject/PersonProject';
import { Result } from 'entities/Result/Result';
import { Project } from 'entities/Project/Project';
import { Person } from 'entities/Person/Person';
import { CustomError } from 'utils/customError';
import { Repository } from 'typeorm';
import { fetchPerson } from 'services/person';
import { fetchRawResult, fetchResults, saveResult } from 'services/result';
import { fetchRawProject } from 'services/project';
import { fetchPersonProject } from 'services/personProject';

export async function getResults(req: Request, res: Response, next: NextFunction) {
  try {
    await fetchResults().then((results) => {
      res.status(200).send(results);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of results', null, err);
    return next(customError);
  }
}

export async function getResultById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const result = await fetchRawResult(id);

    if (!result) {
      const customError = new CustomError(404, 'Not Found', 'Result not found');
      return next(customError);
    }

    res.status(200).send(result);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve result.`, null, err);
    return next(customError);
  }
}

export async function createResult(req: Request, res: Response, next: NextFunction) {
  const { description, projectId, members } = req.body;

  try {
    const project = await fetchRawProject(projectId);

    if (!project) {
      const customError = new CustomError(400, 'Not Found', 'Project not found');
      return next(customError);
    }

    const result = new Result();
    result.description = description;
    result.project = project;

    if (members?.length > 0) {
      try {
        result.persons = await getPersonsFromProject(projectId, members);
      } catch (err) {
        const customError = new CustomError(400, 'Not Found', err.message);
        return next(customError);
      }
    }

    res.status(201).send(await saveResult(result));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create result`, null, err);
    return next(customError);
  }
}

async function getPersonsFromProject(projectId: number, personIds: number[]): Promise<Person[]> {
  var resultPersons: Person[] = [];

  for (const personId of personIds) {
    const personProject = await fetchPersonProject(projectId, personId);

    if (!personProject) {
      throw new Error('A provided member does not exist or is not a member of the project');
    }

    const person = await fetchPerson(personId);

    resultPersons.push(person);
  }

  return resultPersons;
}
