import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { Result } from 'entities/Result/Result';
import { Project } from 'entities/Project/Project';
import { CustomError } from 'utils/customError';

export async function getResults(req: Request, res: Response, next: NextFunction) {
  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const results = await resultRepository.find({
      select: ['id', 'description'],
      relations: ['project'],
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
      relations: ['project'],
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
  const { description, projectId } = req.body;

  const projectRepository = await AppDataSource.getRepository(Project);
  const resultRepository = await AppDataSource.getRepository(Result);

  try {
    const project = await projectRepository.findOne({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      const customError = new CustomError(404, 'Not Found', 'Project not found');
      return next(customError);
    }

    const result = new Result();
    result.description = description;
    result.project = project;

    await resultRepository.save(result);
    res.status(201).send(result);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create result`, null, err);
    return next(customError);
  }
}
