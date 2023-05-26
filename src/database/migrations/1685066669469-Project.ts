import { MigrationInterface, QueryRunner } from "typeorm";

export class Project_1685066669469 implements MigrationInterface {
    name = 'Project.ts1685066669469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`startDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`finishDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`Project\` ADD \`isFinished\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`isFinished\``);
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`finishDate\``);
        await queryRunner.query(`ALTER TABLE \`Project\` DROP COLUMN \`startDate\``);
    }

}
