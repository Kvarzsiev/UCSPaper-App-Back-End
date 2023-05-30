import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'database/dataSource';

import { Person } from 'entities/Person/Person';
import { CustomError } from 'utils/customError';
import { Project } from 'entities/Project/Project';
import { Result } from 'entities/Result/Result';
import { PersonProject } from 'entities/PersonProject/PersonProject';

export async function getPersons(req: Request, res: Response, next: NextFunction) {
  const personRepository = await AppDataSource.getRepository(Person);

  try {
    const persons = await personRepository.find({
      select: ['id', 'name', 'email', 'institution'],
    });
    res.status(200).send(persons);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Cant retrieve list of persons', null, [err]);
    return next(customError);
  }
}

export async function getPersonById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const personRepository = await AppDataSource.getRepository(Person);

  try {
    const person = await personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.results', 'results')
      .leftJoinAndSelect('person.personProjects', 'personProject')
      .leftJoinAndSelect('personProject.project', 'project')
      .where('person.id = :id', {
        id: id,
      })
      .getOne();

    if (!person) {
      const customError = new CustomError(404, 'Not Found', 'User not found');
      return next(customError);
    }

    res.status(200).send(person);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve user.`, null, [err]);
    return next(customError);
  }
}

export async function createPerson(req: Request, res: Response, next: NextFunction) {
  const { name, email, institution } = req.body;

  const personRepository = await AppDataSource.getRepository(Person);

  try {
    const person = new Person();
    person.name = name;
    person.email = email;
    person.institution = institution;

    await personRepository.save(person);
    res.status(201).send(person);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not create person: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}

export async function editPerson(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { name, email, institution } = req.body;

  const personRepository = await AppDataSource.getRepository(Person);

  try {
    const person = await personRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!person) {
      const customError = new CustomError(404, 'Not Found', 'Person not found');
      return next(customError);
    }

    person.name = name;
    person.email = email;
    person.institution = institution;

    await personRepository.save(person);
    res.status(200).send(person);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Could not update user: ${err.sqlMessage}`, null, [err]);
    return next(customError);
  }
}
