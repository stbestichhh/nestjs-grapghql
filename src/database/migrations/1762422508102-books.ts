import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1762422508102 implements MigrationInterface {
  name = 'Migrations1762422508102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text, "genre" character varying NOT NULL, "publicationYear" integer NOT NULL, "author_id" uuid, CONSTRAINT "PK_book_id" PRIMARY KEY ("id"), CONSTRAINT "FK_book_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_book_author"`,
    );
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
