import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716846607007 implements MigrationInterface {
  name = 'Migrations1716846607007'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" integer, "cardId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "position" smallint NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" integer, "listId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "position" smallint NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" integer, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_d407753bf03609403a31e8ffbb4" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_5dd31f454fdc52a2e336264b076" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_79259e749bdc7ec5e59da320b0c" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "card" DROP CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0"`,
    )
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_79259e749bdc7ec5e59da320b0c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_5dd31f454fdc52a2e336264b076"`,
    )
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_d407753bf03609403a31e8ffbb4"`,
    )
    await queryRunner.query(`DROP TABLE "list"`)
    await queryRunner.query(`DROP TABLE "card"`)
    await queryRunner.query(`DROP TABLE "comment"`)
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
