import { MigrationInterface, QueryRunner } from 'typeorm';

export class Person1716230133908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "person" (
"id" SERIAL NOT NULL,
"email" text NOT NULL,
"name" text,
"institution" text,
"created_at" TIMESTAMP NOT NULL DEFAULT now(),
"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
CONSTRAINT "UQ_bc6748860f99f197a2f3e5aeb0c" UNIQUE ("email"),
CONSTRAINT "PK_5c3ede2b2959b65c86663e58180" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "person"`);
  }
}
