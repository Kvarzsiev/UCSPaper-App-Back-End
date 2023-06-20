import { NextFunction, Request, Response } from 'express';

import { Person } from 'entities/person/Person';
import { Result } from 'entities/result/Result';
import { fetchPerson } from 'services/person';
import { fetchPersonProject } from 'services/personProject';
import { fetchRawProject } from 'services/project';
import { fetchRawResult, fetchResults, saveResult } from 'services/result';
import { CustomError } from 'utils/customError';

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
    const customError = new CustomError(400, 'Raw', `Could not create result`, null, [err]);
    return next(customError);
  }
}

export async function editResult(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { description, members } = req.body;

  try {
    const result = await fetchRawResult(id);
    if (!result) {
      console.error('Não há o resultado');
      const customError = new CustomError(400, 'Not Found', null);
      return next(customError);
    }
    // const isAlreadyOnResult = result.persons.some(person => members.includes(person.id));
    // if (isAlreadyOnResult)
    if (members?.length > 0) {
      try {
        const newPersons = await getPersonsFromProject(
          result.project.id,
          members.filter((member) => !result.persons.find((person) => person.id === member)),
        );
        result.persons.push(...newPersons);
      } catch (err) {
        console.error(err);
        const customError = new CustomError(400, 'Not Found', err.message);
        return next(customError);
      }
    }
    if (description) result.description = description;
    res.status(200).send(await saveResult(result));
  } catch (err) {
    console.error(err);
    const customError = new CustomError(400, 'Raw', 'Could not edit result', null, [err]);
    return next(customError);
  }
}

async function getPersonsFromProject(projectId: number, personIds: number[]): Promise<Person[]> {
  const resultPersons: Person[] = [];

  for (const personId of personIds) {
    const personProject = await fetchPersonProject(personId, projectId);

    if (!personProject) {
      throw new Error('A provided member does not exist or is not a member of the project');
    }

    const person = await fetchPerson(personId);

    resultPersons.push(person);
  }

  return resultPersons;
}
