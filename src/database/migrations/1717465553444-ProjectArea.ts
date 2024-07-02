import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class ProjectArea1717465553444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .createTable(
        new Table({
          name: 'project_areas_area',
          columns: [
            {
              name: 'project_id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'area_id',
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
          .createForeignKeys('project_areas_area', [
            new TableForeignKey({
              columnNames: ['project_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'project',
              onDelete: 'CASCADE',
            }),
            new TableForeignKey({
              columnNames: ['area_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'area',
              onDelete: 'CASCADE',
            }),
          ])
          .then(async () => {
            await queryRunner.query(
              "INSERT INTO project_areas_area (project_id, area_id) VALUES ('e26118b2-7f7c-457e-b1d6-aa413e519af0', 'e26118b2-7f7c-457e-b1d6-aa413e519af3')",
            );
          });
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_areas_area', true, true, true);
  }
}
