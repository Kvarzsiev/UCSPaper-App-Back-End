import { MigrationInterface, QueryRunner } from "typeorm";  

export class ProjectRefactor25052023 implements MigrationInterface {

  async up(queryRunner: QueryRunner) : Promise<void>{
    await queryRunner.query(
      `ALTER TABLE "Project" ADD COLUMN "startDate" DATETIME, ADD COLUMN "finishDate" DATETIME, ADD COLUMN "isFinished" BOOLEAN`,
    )
  }

  async down(queryRunner: QueryRunner) : Promise<void> {

  }

}
