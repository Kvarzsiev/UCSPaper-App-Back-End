import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { Repository } from 'typeorm';

import { AppDataSource } from 'database/dataSource';

import { app } from '../../';
import { Area } from 'entities/area/Area';

describe('Area', () => {
  let areaRepository: Repository<Area>;

  const areaName: string = 'Area';
  const hierarchy: string = 'area';

  const area = new Area();
  area.name = areaName;
  area.hierarchy = hierarchy;

  before(async () => {
    await AppDataSource.initialize();
    areaRepository = AppDataSource.getRepository(Area);
  });

  after(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await areaRepository.save(area);
  });

  afterEach(async () => {
    await areaRepository.delete(area.id);
  });

  describe('GET /areas', () => {
    it('should return list of all areas', async () => {
      const res = await request(app).get('/areas');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.be.above(0);
    });

    it('should return area by Id', async () => {
      const res = await request(app).get(`/areas/${area.id}`);
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(area.id);
    });

    it('should return 404 if no area is found', async () => {
      const res = await request(app).get('/areas/81c158c0-efc3-4728-8a58-873b0d5489d5');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /areas', () => {
    it('should return created area', async () => {
      const res = await request(app).post('/areas').set('ContentType', 'application/json').send({
        name: 'test area',
        hierarchy: 'area.test_area',
      });
      expect(res.status).to.equal(201);
      expect(res.body.hierarchy).to.equal('area.test_area');
      await areaRepository.delete(res.body.id);
    });

    it('should return 400 if duplicated area', async () => {
      const res = await request(app).post('/areas').set('ContentType', 'application/json').send(area).catch();

      expect(res.status).to.equal(400);
      await areaRepository.delete(area.id);
    });
  });

  describe('PUT /areas', () => {
    it('should return edited person with new fields', async () => {
      const res = await request(app).put(`/areas/${area.id}`).set('ContentType', 'application/json').send({
        name: 'Area 2',
        hierarchy: 'area2',
      });

      expect(res.body.name).to.equal('Area 2');
      expect(res.body.hierarchy).to.equal('area2');
    });
  });
});
