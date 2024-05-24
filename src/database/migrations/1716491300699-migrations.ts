import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716491300699 implements MigrationInterface {
  name = 'Migrations1716491300699'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`,
    )
    await queryRunner.query(
      `ALTER TABLE "list" RENAME COLUMN "userId" TO "owner"`,
    )
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_1616985a23bfff61967e94270d9" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_1616985a23bfff61967e94270d9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "list" RENAME COLUMN "owner" TO "userId"`,
    )
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
