import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716742185462 implements MigrationInterface {
  name = 'Migrations1716742185462'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" ADD "listId" integer`)
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0"`,
    )
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "listId"`)
  }
}
