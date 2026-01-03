import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`settings_contact_us_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`email\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_contact_us_emails_order_idx\` ON \`settings_contact_us_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_contact_us_emails_parent_id_idx\` ON \`settings_contact_us_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`settings_contact_us_phones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_contact_us_phones_order_idx\` ON \`settings_contact_us_phones\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_contact_us_phones_parent_id_idx\` ON \`settings_contact_us_phones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_state\` text DEFAULT 'online' NOT NULL,
  	\`app_name\` text NOT NULL,
  	\`app_name_extended\` text,
  	\`logo_square_light_id\` integer NOT NULL,
  	\`logo_square_dark_id\` integer,
  	\`logo_wide_light_id\` integer NOT NULL,
  	\`logo_wide_dark_id\` integer,
  	\`colors_primary\` text DEFAULT '#000000',
  	\`colors_secondary\` text DEFAULT '#ffffff',
  	\`colors_tertiary\` text DEFAULT '#f0f0f0',
  	\`accessibility_underline_links\` integer DEFAULT false,
  	\`accessibility_accent_focus\` integer DEFAULT true,
  	\`accessibility_high_contrast_borders\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_square_light_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_square_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_wide_light_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_wide_dark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_logo_square_light_idx\` ON \`settings\` (\`logo_square_light_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_logo_square_dark_idx\` ON \`settings\` (\`logo_square_dark_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_logo_wide_light_idx\` ON \`settings\` (\`logo_wide_light_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`settings_logo_wide_dark_idx\` ON \`settings\` (\`logo_wide_dark_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`settings_contact_us_emails\`;`)
  await db.run(sql`DROP TABLE \`settings_contact_us_phones\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
}
