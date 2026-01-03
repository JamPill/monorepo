import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260102_004631_initial_schema from './20260102_004631_initial_schema';
import * as migration_20260102_133348_add_seo_fields from './20260102_133348_add_seo_fields';
import * as migration_20260102_152728_add_excerpt_and_notes_to_posts from './20260102_152728_add_excerpt_and_notes_to_posts';
import * as migration_20260102_161348_add_pages_collection_and_blocks from './20260102_161348_add_pages_collection_and_blocks';
import * as migration_20260102_195633_refactor_blocks_and_posts from './20260102_195633_refactor_blocks_and_posts';
import * as migration_20260102_203338_i18n_localization from './20260102_203338_i18n_localization';
import * as migration_20260103_100055_add_settings_global from './20260103_100055_add_settings_global';
import * as migration_20260103_104921_update_settings_defaults from './20260103_104921_update_settings_defaults';
import * as migration_20260103_111355_add_typography_settings from './20260103_111355_add_typography_settings';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260102_004631_initial_schema.up,
    down: migration_20260102_004631_initial_schema.down,
    name: '20260102_004631_initial_schema',
  },
  {
    up: migration_20260102_133348_add_seo_fields.up,
    down: migration_20260102_133348_add_seo_fields.down,
    name: '20260102_133348_add_seo_fields',
  },
  {
    up: migration_20260102_152728_add_excerpt_and_notes_to_posts.up,
    down: migration_20260102_152728_add_excerpt_and_notes_to_posts.down,
    name: '20260102_152728_add_excerpt_and_notes_to_posts',
  },
  {
    up: migration_20260102_161348_add_pages_collection_and_blocks.up,
    down: migration_20260102_161348_add_pages_collection_and_blocks.down,
    name: '20260102_161348_add_pages_collection_and_blocks',
  },
  {
    up: migration_20260102_195633_refactor_blocks_and_posts.up,
    down: migration_20260102_195633_refactor_blocks_and_posts.down,
    name: '20260102_195633_refactor_blocks_and_posts',
  },
  {
    up: migration_20260102_203338_i18n_localization.up,
    down: migration_20260102_203338_i18n_localization.down,
    name: '20260102_203338_i18n_localization',
  },
  {
    up: migration_20260103_100055_add_settings_global.up,
    down: migration_20260103_100055_add_settings_global.down,
    name: '20260103_100055_add_settings_global',
  },
  {
    up: migration_20260103_104921_update_settings_defaults.up,
    down: migration_20260103_104921_update_settings_defaults.down,
    name: '20260103_104921_update_settings_defaults',
  },
  {
    up: migration_20260103_111355_add_typography_settings.up,
    down: migration_20260103_111355_add_typography_settings.down,
    name: '20260103_111355_add_typography_settings'
  },
];
