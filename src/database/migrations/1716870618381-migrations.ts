import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716870618381 implements MigrationInterface {
  name = 'Migrations1716870618381'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_5dd31f454fdc52a2e336264b076"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_5dd31f454fdc52a2e336264b076" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_5dd31f454fdc52a2e336264b076"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_5dd31f454fdc52a2e336264b076" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
