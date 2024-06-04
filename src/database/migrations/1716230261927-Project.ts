import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Project1716230261927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project', true, true, true);
  }
}
