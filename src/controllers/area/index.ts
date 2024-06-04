import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/customError';
import { fetchAreas, fetchArea, saveArea } from 'services/area';
import { Area } from 'entities/area/Area';

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    await fetchAreas().then((areas) => {
      res.status(200).send(areas);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of areas', null, [err]);
    return next(customError);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  try {
    await fetchArea(id).then((area) => {
      if (!area) {
        const customError = new CustomError(404, 'Not Found', 'Area not found');
        return next(customError);
      }
      res.status(200).send(area);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve user.`, null, [err]);
    return next(customError);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const { name, hierarchy } = req.body;

  try {
    const area = new Area();
    area.name = name;
    area.hierarchy = hierarchy;

    const newPerson = await saveArea(area);
    res.status(201).send(newPerson);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create area: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}

export async function edit(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const { name, hierarchy } = req.body;

  try {
    const area = await fetchArea(id);

    if (!area) {
      const customError = new CustomError(404, 'Not Found', 'Person not found');
      return next(customError);
    }

    area.name = name;
    area.hierarchy = hierarchy;

    const savedPerson = await saveArea(area);
    res.status(200).send(savedPerson);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not update area: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}
