import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1770289826543 implements MigrationInterface {
    name = 'AutoMigration1770289826543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('learner', 'mentor', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "last_name" character varying(100) NOT NULL, "first_name" character varying(100) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'learner', "password_hash" character varying NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "last_login_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "comment" character varying(255) NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "discussion_id" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discussions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "content" text NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid NOT NULL, "updated_by" uuid, CONSTRAINT "PK_4b3d110d8e5d9077ddc0a0d1b4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_a7449e08115d74692551b12ff1d" FOREIGN KEY ("discussion_id") REFERENCES "discussions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discussions" ADD CONSTRAINT "FK_6bae1005971de66491e2f46037b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discussions" ADD CONSTRAINT "FK_46651927b699c1f0c3b94d6ecb5" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussions" DROP CONSTRAINT "FK_46651927b699c1f0c3b94d6ecb5"`);
        await queryRunner.query(`ALTER TABLE "discussions" DROP CONSTRAINT "FK_6bae1005971de66491e2f46037b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_a7449e08115d74692551b12ff1d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`DROP TABLE "discussions"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
