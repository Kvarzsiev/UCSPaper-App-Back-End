import { MigrationInterface, QueryRunner } from 'typeorm';

export class Result1716230766329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "result" (
"id" SERIAL NOT NULL,
"description" text,
"created_at" TIMESTAMP NOT NULL DEFAULT now(),
"updated_at" TIMESTAMP NOT NULL DEFAULT now(),
"project_id" integer,
CONSTRAINT "PK_d3d9d916b472b702f1cacbfd4aa" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "result" 
ADD CONSTRAINT "FK_7dfe26d5f55cf09c36315185b1c" 
FOREIGN KEY ("project_id") 
REFERENCES "project"("id")
ON DELETE CASCADE
ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_7dfe26d5f55cf09c36315185b1c"`);

    await queryRunner.query(`DROP TABLE "result"`);
  }
}
