import { MigrationInterface, QueryRunner } from 'typeorm';

export class Project1716230261927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" (
"id" SERIAL NOT NULL,
"title" text,
"description" text,
"sponsor" text,
"start_date" TIMESTAMP,
"finish_date" TIMESTAMP,
"is_finished" boolean NOT NULL DEFAULT false,
"created_at" TIMESTAMP NOT NULL DEFAULT now(),
"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
CONSTRAINT "PK_2725f461500317f74b0c8f11859" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
