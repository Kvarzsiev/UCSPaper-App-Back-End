import { MigrationInterface, QueryRunner } from 'typeorm';

export class PersonResult1716234381792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "person_result" ("result_id" integer NOT NULL,
"person_id" integer NOT NULL,
CONSTRAINT "PK_8dfb0a6aa8eb5e2b1329323dcd3" PRIMARY KEY ("result_id", "person_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7fcc8892a76a8e339f976b6261" ON "person_result" ("result_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_bdb712d89b6f4429f6d78b09fb" ON "person_result" ("person_id") `);

    await queryRunner.query(
      `ALTER TABLE "person_result"
ADD CONSTRAINT "FK_7fcc8892a76a8e339f976b6261e"
FOREIGN KEY ("result_id")
REFERENCES "result"("id")
ON DELETE CASCADE
ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_result"
ADD CONSTRAINT "FK_bdb712d89b6f4429f6d78b09fb8"
FOREIGN KEY ("person_id")
REFERENCES "person"("id")
ON DELETE NO ACTION
ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "person_result" DROP CONSTRAINT "FK_bdb712d89b6f4429f6d78b09fb8"`);
    await queryRunner.query(`ALTER TABLE "person_result" DROP CONSTRAINT "FK_7fcc8892a76a8e339f976b6261e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bdb712d89b6f4429f6d78b09fb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7fcc8892a76a8e339f976b6261"`);
    await queryRunner.query(`DROP TABLE "person_result"`);
  }
}
