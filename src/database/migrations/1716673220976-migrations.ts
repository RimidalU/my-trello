import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716673220976 implements MigrationInterface {
  name = 'Migrations1716673220976'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "position" smallint NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "list" integer, "owner" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_0baff9fe54481f3d39d688a4073" FOREIGN KEY ("list") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_79259e749bdc7ec5e59da320b0c" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_d407753bf03609403a31e8ffbb4" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_d407753bf03609403a31e8ffbb4"`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_79259e749bdc7ec5e59da320b0c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_0baff9fe54481f3d39d688a4073"`,
    )
    await queryRunner.query(`DROP TABLE "comment"`)
    await queryRunner.query(`DROP TABLE "card"`)
  }
}
