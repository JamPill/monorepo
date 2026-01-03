import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_state\` text DEFAULT 'construction' NOT NULL,
  	\`app_name\` text,
  	\`app_name_extended\` text,
  	\`logo_square_light_id\` integer,
  	\`logo_square_dark_id\` integer,
  	\`logo_wide_light_id\` integer,
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
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "site_state", "app_name", "app_name_extended", "logo_square_light_id", "logo_square_dark_id", "logo_wide_light_id", "logo_wide_dark_id", "colors_primary", "colors_secondary", "colors_tertiary", "accessibility_underline_links", "accessibility_accent_focus", "accessibility_high_contrast_borders", "updated_at", "created_at") SELECT "id", "site_state", "app_name", "app_name_extended", "logo_square_light_id", "logo_square_dark_id", "logo_wide_light_id", "logo_wide_dark_id", "colors_primary", "colors_secondary", "colors_tertiary", "accessibility_underline_links", "accessibility_accent_focus", "accessibility_high_contrast_borders", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`settings_logo_square_light_idx\` ON \`settings\` (\`logo_square_light_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_square_dark_idx\` ON \`settings\` (\`logo_square_dark_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_wide_light_idx\` ON \`settings\` (\`logo_wide_light_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_wide_dark_idx\` ON \`settings\` (\`logo_wide_dark_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_settings\`("id", "site_state", "app_name", "app_name_extended", "logo_square_light_id", "logo_square_dark_id", "logo_wide_light_id", "logo_wide_dark_id", "colors_primary", "colors_secondary", "colors_tertiary", "accessibility_underline_links", "accessibility_accent_focus", "accessibility_high_contrast_borders", "updated_at", "created_at") SELECT "id", "site_state", "app_name", "app_name_extended", "logo_square_light_id", "logo_square_dark_id", "logo_wide_light_id", "logo_wide_dark_id", "colors_primary", "colors_secondary", "colors_tertiary", "accessibility_underline_links", "accessibility_accent_focus", "accessibility_high_contrast_borders", "updated_at", "created_at" FROM \`settings\`;`)
  await db.run(sql`DROP TABLE \`settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_settings\` RENAME TO \`settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`settings_logo_square_light_idx\` ON \`settings\` (\`logo_square_light_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_square_dark_idx\` ON \`settings\` (\`logo_square_dark_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_wide_light_idx\` ON \`settings\` (\`logo_wide_light_id\`);`)
  await db.run(sql`CREATE INDEX \`settings_logo_wide_dark_idx\` ON \`settings\` (\`logo_wide_dark_id\`);`)
}
