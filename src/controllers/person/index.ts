import { Request, Response, NextFunction } from 'express';

import { Person } from 'entities/Person/Person';
import { CustomError } from 'utils/customError';
import { fetchPerson, fetchPersonWithRelations, fetchPersons, savePerson } from 'services/person';

export async function getPersons(req: Request, res: Response, next: NextFunction) {
  try {
    await fetchPersons().then((persons) => {
      res.status(200).send(persons);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of persons', null, [err]);
    return next(customError);
  }
}

export async function getPersonById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  try {
    await fetchPersonWithRelations(id).then((person) => {
      if (!person) {
        const customError = new CustomError(404, 'Not Found', 'User not found');
        return next(customError);
      }
      res.status(200).send(person);
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve user.`, null, [err]);
    return next(customError);
  }
}

export async function createPerson(req: Request, res: Response, next: NextFunction) {
  const { name, email, institution } = req.body;

  try {
    const person = new Person();
    person.name = name;
    person.email = email;
    person.institution = institution;

    const newPerson = await savePerson(person);
    res.status(201).send(newPerson);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create person: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}

export async function editPerson(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { name, email, institution } = req.body;

  try {
    const person = await fetchPerson(id);

    if (!person) {
      const customError = new CustomError(404, 'Not Found', 'Person not found');
      return next(customError);
    }

    person.name = name;
    person.email = email;
    person.institution = institution;

    const savedPerson = await savePerson(person);
    res.status(200).send(savedPerson);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not update user: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}
