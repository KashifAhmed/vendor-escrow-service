import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVendorRequiredFields1685952000000 implements MigrationInterface {
    name = 'AddVendorRequiredFields1685952000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add email and name columns as nullable first
        await queryRunner.query(`
            ALTER TABLE "vendor" 
            ADD COLUMN IF NOT EXISTS "email" character varying,
            ADD COLUMN IF NOT EXISTS "name" character varying;
        `);

        // Update existing records with default values
        await queryRunner.query(`
            UPDATE "vendor"
            SET email = 'default@example.com',
                name = 'Default Vendor Name'
            WHERE email IS NULL OR name IS NULL;
        `);

        // Make columns NOT NULL
        await queryRunner.query(`
            ALTER TABLE "vendor" 
            ALTER COLUMN "email" SET NOT NULL,
            ALTER COLUMN "name" SET NOT NULL;
        `);

        // Make stripe_account_id nullable
        await queryRunner.query(`
            ALTER TABLE "vendor" 
            ALTER COLUMN "stripe_account_id" DROP NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // First make stripe_account_id NOT NULL again
        await queryRunner.query(`
            ALTER TABLE "vendor" 
            ALTER COLUMN "stripe_account_id" SET NOT NULL;
        `);

        // Then drop the new columns
        await queryRunner.query(`
            ALTER TABLE "vendor" 
            DROP COLUMN IF EXISTS "email",
            DROP COLUMN IF EXISTS "name";
        `);
    }
}
