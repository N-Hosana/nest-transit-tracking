import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1768921342892 implements MigrationInterface {
  name = 'Init1768921342892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "route_stops" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "route_stops" DROP COLUMN "longitude"`,
    );
    await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "bus" DROP COLUMN "latitude"`);
    await queryRunner.query(`ALTER TABLE "bus" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "route_stops" ADD "location" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" ADD "from" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" ADD "to" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "bus" ADD "currentLocation" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "route_stops" DROP CONSTRAINT "FK_352e45964a86c097a435f643004"`,
    );
    await queryRunner.query(`ALTER TABLE "route_stops" DROP COLUMN "routeId"`);
    await queryRunner.query(`ALTER TABLE "route_stops" ADD "routeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "bus" DROP CONSTRAINT "FK_965c21e73b29c7266510b60cabb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" DROP CONSTRAINT "PK_08affcd076e46415e5821acf52d"`,
    );
    await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "route" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "route" ADD CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "bus" DROP COLUMN "routeId"`);
    await queryRunner.query(`ALTER TABLE "bus" ADD "routeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "route_stops" ADD CONSTRAINT "FK_352e45964a86c097a435f643004" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bus" ADD CONSTRAINT "FK_965c21e73b29c7266510b60cabb" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bus" DROP CONSTRAINT "FK_965c21e73b29c7266510b60cabb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "route_stops" DROP CONSTRAINT "FK_352e45964a86c097a435f643004"`,
    );
    await queryRunner.query(`ALTER TABLE "bus" DROP COLUMN "routeId"`);
    await queryRunner.query(`ALTER TABLE "bus" ADD "routeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "route" DROP CONSTRAINT "PK_08affcd076e46415e5821acf52d"`,
    );
    await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "route" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" ADD CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "bus" ADD CONSTRAINT "FK_965c21e73b29c7266510b60cabb" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "route_stops" DROP COLUMN "routeId"`);
    await queryRunner.query(`ALTER TABLE "route_stops" ADD "routeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "route_stops" ADD CONSTRAINT "FK_352e45964a86c097a435f643004" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "bus" DROP COLUMN "currentLocation"`);
    await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "to"`);
    await queryRunner.query(`ALTER TABLE "route" DROP COLUMN "from"`);
    await queryRunner.query(`ALTER TABLE "route_stops" DROP COLUMN "location"`);
    await queryRunner.query(
      `ALTER TABLE "bus" ADD "longitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "bus" ADD "latitude" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "route_stops" ADD "longitude" numeric(10,6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "route_stops" ADD "latitude" numeric(10,6) NOT NULL`,
    );
  }
}
