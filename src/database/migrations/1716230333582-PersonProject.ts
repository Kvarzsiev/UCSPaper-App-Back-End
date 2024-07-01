import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class PersonProject1716230263582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'person_project',
          columns: [
            {
              name: 'person_id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'project_id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'role',
              type: 'text',
              isNullable: false,
              default: "'member'",
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
          .createForeignKeys('person_project', [
            new TableForeignKey({
              columnNames: ['person_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'person',
              onDelete: 'CASCADE',
            }),
            new TableForeignKey({
              columnNames: ['project_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
          ])
          .then(async () => {
            await queryRunner.query(
              `INSERT INTO person_project (person_id, project_id, role) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'e26118b2-7f7c-457e-b1d6-aa413e519af0', 'member');
              INSERT INTO person_project (person_id, project_id, role) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af1', 'e26118b2-7f7c-457e-b1d6-aa413e519af0', 'member');
              INSERT INTO person_project (person_id, project_id, role) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af2', 'e26118b2-7f7c-457e-b1d6-aa413e519af0', 'coordinator');`,
            );
          });
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person_project', true, true, true);
  }
}
