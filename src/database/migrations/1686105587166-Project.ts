import { MigrationInterface, QueryRunner } from "typeorm";

export class Project_ts1686105587166 implements MigrationInterface {
    name = 'Project.ts1686105587166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`title\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`title\``);
    }

}
