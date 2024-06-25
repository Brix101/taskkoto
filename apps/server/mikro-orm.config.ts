import { GeneratedCacheAdapter, defineConfig } from '@mikro-orm/core';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { SeedManager, Seeder } from '@mikro-orm/seeder';
import { existsSync, readFileSync } from 'node:fs';

const options = {} as Options;

if (process.env.NODE_ENV === 'production' && existsSync('./temp/metadata.json')) {
  options.metadataCache = {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    // temp/metadata.json can be generated via `npx mikro-orm-esm cache:generate --combine`
    options: {
      data: JSON.parse(readFileSync('./temp/metadata.json', { encoding: 'utf8' })),
    },
  };
} else {
  options.metadataProvider = (await import('@mikro-orm/reflection')).TsMorphMetadataProvider;
}

export default defineConfig({
  migrations: {
    path: 'src/migrations',
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    transactional: true,
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  driver: PostgreSqlDriver,
  dbName: 'taskkoto', // replace with your database name
  host: 'localhost',
  port: 5432, // replace with your PostgreSQL port if it's not 5432
  user: 'postgres', // replace with your PostgreSQL username
  password: 'postgres', // replace with your PostgreSQL password
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  highlighter: new SqlHighlighter(),
  extensions: [Migrator, SeedManager],
  debug: true,
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: (id) => import(id),
  ...options,
});
