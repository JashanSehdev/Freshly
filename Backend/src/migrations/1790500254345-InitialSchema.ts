import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1790500254345 implements MigrationInterface {
    name = 'InitialSchema1790500254345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "servings" integer NOT NULL, "cookTimeMinutes" integer NOT NULL, "imageUrl" text NOT NULL, "isPublic" boolean NOT NULL DEFAULT false, "ingredients" jsonb NOT NULL, "directions" jsonb NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "category" character varying NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipes"`);
    }

}
