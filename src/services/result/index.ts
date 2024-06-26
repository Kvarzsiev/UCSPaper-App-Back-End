import { Result } from '../../entities/result/Result';
import { AppDataSource } from '../../database/dataSource';
import { Repository } from 'typeorm';

export async function fetchResults(): Promise<Result[]> {
  const resultRepository: Repository<Result> = AppDataSource.getRepository(Result);
  return resultRepository.find({
    select: ['id', 'description'],
    relations: ['project', 'persons'],
  });
}

export async function fetchRawResult(resultId: string): Promise<Result> {
  const resultRepository: Repository<Result> = AppDataSource.getRepository(Result);
  return resultRepository.findOne({
    where: {
      id: resultId,
    },
    select: ['id', 'description'],
    relations: ['project', 'persons'],
  });
}

export async function saveResult(result: Result): Promise<Result> {
  const resultRepository: Repository<Result> = AppDataSource.getRepository(Result);
  return resultRepository.save(result);
}

export async function deleteResult(resultId: string): Promise<void> {
  const resultRepository: Repository<Result> = AppDataSource.getRepository(Result);
  resultRepository.delete({
    id: resultId,
  });
}
