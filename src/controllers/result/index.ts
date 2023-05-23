import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { PersonProject } from 'entities/PersonProject/PersonProject';
import { Result } from 'entities/Result/Result';
import { Project } from 'entities/Project/Project';
import { Person } from 'entities/Person/Person';
import { CustomError } from 'utils/customError';
import { Repository } from 'typeorm';

export async function getResults(req: Request, res: Response, next: NextFunction) {
  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const results = await resultRepository.find({
      select: ['id', 'description'],
      relations: ['project', 'persons'],
    });
    res.status(200).send(results);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of results', null, err);
    return next(customError);
  }
}

export async function getResultById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const result = await resultRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'description'],
      relations: ['project', 'persons'],
    });

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

  console.log(members);

  const projectRepository = await AppDataSource.getRepository(Project);
  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    var resultPersons: Person[] = [];

    const project = await projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

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

    await resultRepository.save(result);
    res.status(201).send(result);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create result`, null, err);
    return next(customError);
  }
}

async function getPersonProject(projectId: number, personId: number): Promise<PersonProject> {
  const personProjectRepository = await AppDataSource.getRepository(PersonProject);
  return personProjectRepository
    .createQueryBuilder('personProject')
    .select('personProject')
    .where('personProject.person_id = :personId AND personProject.project_id = :projectId', {
      projectId: projectId,
      personId: personId,
    })
    .getOne();
}

async function getPersonsFromProject(projectId: number, personIds: number[]): Promise<Person[]> {
  const personRepository = await AppDataSource.getRepository(Person);
  var resultPersons: Person[] = [];

  for (const personId of personIds) {
    const personProject = await getPersonProject(projectId, personId);

    console.log(personProject);

    if (!personProject) {
      throw new Error('A provided member does not exist or is not a member of the project');
    }

    const person = await personRepository.findOne({
      where: {
        id: personProject.person_id,
      },
    });

    resultPersons.push(person);
  }

  return resultPersons;
}
