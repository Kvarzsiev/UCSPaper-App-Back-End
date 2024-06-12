import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Person1716230133908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'person',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'gen_random_uuid()',
            },
            {
              name: 'email',
              type: 'text',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'institution',
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
        await queryRunner.query(
          `INSERT INTO person (id, email, name, institution) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'ebaroni@ucs.br', 'Enzo Baroni', 'UCS');
          INSERT INTO person (id, email, name, institution) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af1', 'wtbecker@ucs.br', 'William Tomazini Becker', 'UCS')`,
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('person', true, true, true);
  }
}
