import { defineConfig } from "@mikro-orm/core";
import { Migrator, TSMigrationGenerator } from "@mikro-orm/migrations"; // or `@mikro-orm/migrations-mongodb`
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export default defineConfig({
  migrations: {
    path: "src/migrations",
    tableName: "mikro_orm_migrations", // name of database table with log of executed transactions
    transactional: true,
  },
  driver: PostgreSqlDriver,
  dbName: "postgres", // replace with your database name
  host: "localhost",
  port: 5433, // replace with your PostgreSQL port if it's not 5432
  user: "postgres", // replace with your PostgreSQL username
  password: "postgres", // replace with your PostgreSQL password
  entities: ["dist/**/*.entity.js"],
  // entitiesTs: ["src/**/*.entity.ts"],
  highlighter: new SqlHighlighter(),
  extensions: [Migrator],
  debug: true,
});
