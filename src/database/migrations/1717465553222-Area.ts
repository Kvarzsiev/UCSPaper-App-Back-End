import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Area1717465553222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS ltree;');

    await queryRunner
      .createTable(
        new Table({
          name: 'area',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'gen_random_uuid()',
            },
            {
              name: 'cnpq_code',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'text',
              isUnique: true,
            },
            {
              name: 'hierarchy',
              type: 'ltree',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
        true,
      )
      .then(async () => {
        await queryRunner.query(
          `
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', '1.00.00.00-3', 'Ciências Exatas e da Terra', 'CIENCIAS_EXATAS_E_DA_TERRA');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af1', '1.03.00.00-7', 'Ciência da Computação', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af2', '1.03.03.00-6', 'Metodologia e Técnicas da Computação', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO.METODOLOGIA_E_TECNICAS_DA_COMPUTACAO');
INSERT INTO area (id, cnpq_code, name, hierarchy) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af3', '1.03.03.02-2 ', 'Engenharia de Software', 'CIENCIAS_EXATAS_E_DA_TERRA.CIENCIA_DA_COMPUTACAO.METODOLOGIA_E_TECNICAS_DA_COMPUTACAO.ENGENHARIA_DE_SOFTWARE');
`,
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('area', true, true, true);
  }
}
