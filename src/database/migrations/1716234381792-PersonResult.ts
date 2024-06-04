import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class PersonResult1716234381792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'result_persons_person',
          columns: [
            {
              name: 'result_id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'person_id',
              type: 'uuid',
              isPrimary: true,
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
          .createForeignKeys('result_persons_person', [
            new TableForeignKey({
              columnNames: ['person_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'person',
            }),
            new TableForeignKey({
              columnNames: ['result_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'result',
              onDelete: 'CASCADE',
            }),
          ])
          .then(async () => {
            await queryRunner.query(
              "INSERT INTO result_persons_person (result_id, person_id) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'e26118b2-7f7c-457e-b1d6-aa413e519af0')",
            );
          });
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('result_persons_person', true, true, true);
  }
}
