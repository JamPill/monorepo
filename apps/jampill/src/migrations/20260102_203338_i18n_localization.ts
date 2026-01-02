import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`DROP INDEX IF EXISTS \`posts_slug_idx\`;`)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts_locales\` (\`slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v_locales\` (\`version_slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`DROP INDEX IF EXISTS \`pages_slug_idx\`;`)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`pages_slug_idx\` ON \`pages_locales\` (\`slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_slug\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_version_slug_idx\` ON \`_pages_v_locales\` (\`version_slug\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`notes\` text,
  	\`published_at\` text,
  	\`featured_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_posts\`("id", "notes", "published_at", "featured_image_id", "updated_at", "created_at", "_status") SELECT "id", "notes", "published_at", "featured_image_id", "updated_at", "created_at", "_status" FROM \`posts\`;`,
  )
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new__posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_notes\` text,
  	\`version_published_at\` text,
  	\`version_featured_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__posts_v\`("id", "parent_id", "version_notes", "version_published_at", "version_featured_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_notes", "version_published_at", "version_featured_image_id", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_posts_v\`;`,
  )
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__posts_v\` RENAME TO \`_posts_v\`;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_pages\`("id", "notes", "updated_at", "created_at", "_status") SELECT "id", "notes", "updated_at", "created_at", "_status" FROM \`pages\`;`,
  )
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_notes", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_notes", "version_updated_at", "version_created_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_pages_v\`;`,
  )
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`posts_blocks_hero\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_hero_locale_idx\` ON \`posts_blocks_hero\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`posts_blocks_content\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_content_locale_idx\` ON \`posts_blocks_content\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_hero\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_hero_locale_idx\` ON \`_posts_v_blocks_hero\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_content\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_content_locale_idx\` ON \`_posts_v_blocks_content\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_hero_locale_idx\` ON \`pages_blocks_hero\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`pages_blocks_content\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_locale_idx\` ON \`pages_blocks_content\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_hero_locale_idx\` ON \`_pages_v_blocks_hero\` (\`_locale\`);`,
  )
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content\` ADD \`_locale\` text NOT NULL;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_locale_idx\` ON \`_pages_v_blocks_content\` (\`_locale\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP INDEX \`posts_blocks_hero_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_hero\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`posts_blocks_content_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_content\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_blocks_hero_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_hero\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_blocks_content_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_content\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_slug\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_meta_description\` text;`)
  await db.run(
    sql`ALTER TABLE \`_posts_v\` ADD \`version_meta_image_id\` integer REFERENCES media(id);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`DROP INDEX \`pages_blocks_hero_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`pages_blocks_content_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_blocks_hero_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_blocks_content_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_content\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_snapshot_idx\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_published_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_slug\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_meta_description\` text;`)
  await db.run(
    sql`ALTER TABLE \`_pages_v\` ADD \`version_meta_image_id\` integer REFERENCES media(id);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`published_locale\`;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`slug\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`slug\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
}
