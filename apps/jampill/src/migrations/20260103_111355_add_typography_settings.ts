import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`settings\` ADD \`typography_font_title\` text DEFAULT 'Inter';`)
  } catch (e) {}
  try {
    await db.run(sql`ALTER TABLE \`settings\` ADD \`typography_font_body\` text DEFAULT 'Inter';`)
  } catch (e) {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`typography_font_title\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`typography_font_body\`;`)
}
