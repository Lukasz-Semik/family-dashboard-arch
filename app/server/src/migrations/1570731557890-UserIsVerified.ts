import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserIsVerified1570731557890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`, undefined);
  }
}
