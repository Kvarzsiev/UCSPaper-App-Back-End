import { MigrationInterface, QueryRunner } from 'typeorm';

export class PersonProject1716230263582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .query(
        `CREATE TABLE "person_project" ("id" SERIAL NOT NULL,
"person_id" integer NOT NULL,
"project_id" integer NOT NULL,
"role" text NOT NULL DEFAULT 'member',
CONSTRAINT "PK_4cf840852334b738ac68d9f8f91" PRIMARY KEY ("id", "person_id", "project_id"))`,
      )
      .then(async () => {
        await queryRunner.query(
          `ALTER TABLE "person_project"
ADD CONSTRAINT "FK_cf65f78143e2d8a77647e8368b5"
FOREIGN KEY ("project_id")
REFERENCES "project"("id") 
ON DELETE CASCADE
ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
          `ALTER TABLE "person_project"
ADD CONSTRAINT "FK_4000330c318303194f9d2d3c51b"
FOREIGN KEY ("person_id")
REFERENCES "person"("id")
ON DELETE NO ACTION
ON UPDATE NO ACTION`,
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person_project" DROP CONSTRAINT "FK_4000330c318303194f9d2d3c51b"`);
    await queryRunner.query(`ALTER TABLE "person_project" DROP CONSTRAINT "FK_cf65f78143e2d8a77647e8368b5"`);

    await queryRunner.query(`DROP TABLE "person_project"`);
  }
}
