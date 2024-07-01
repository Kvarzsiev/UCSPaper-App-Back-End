import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Project1716230261927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'project',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'gen_random_uuid()',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'sponsor',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'sponsored_value',
              type: 'NUMERIC(15, 2)',
              isNullable: true,
            },
            {
              name: 'start_date',
              type: 'date',
            },
            {
              name: 'finish_date',
              type: 'date',
              isNullable: true,
            },
            { name: 'is_finished', type: 'boolean', isNullable: false, default: false },
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
          "INSERT INTO project (id, title, description, sponsor, sponsored_value, start_date) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'Projeto de Laboratório de Software', 'Projeto de desenvolvimento de uma plataforma para controle e consulta de trabalhos científicos.', 'FUCS', 10000.25, NOW())",
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project', true, true, true);
  }
}
