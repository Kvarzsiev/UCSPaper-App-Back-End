import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Result1716230766329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'result',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'gen_random_uuid()',
            },
            {
              name: 'project_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'description',
              type: 'text',
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
        await queryRunner
          .createForeignKey(
            'result',
            new TableForeignKey({
              columnNames: ['project_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          )
          .then(async () => {
            await queryRunner.query(
              "INSERT INTO result (id, project_id, description) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'e26118b2-7f7c-457e-b1d6-aa413e519af0', 'Result Description')",
            );
          });
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('result', true, true, true);
  }
}
