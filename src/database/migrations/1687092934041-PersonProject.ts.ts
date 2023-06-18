import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonProject1687092934041 implements MigrationInterface {
    name = 'PersonProject.ts1687092934041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PersonProject\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`PersonProject\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'member'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PersonProject\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`PersonProject\` ADD \`role\` enum ('coordinator', 'member') NOT NULL DEFAULT 'member'`);
    }

}
