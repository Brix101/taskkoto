"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var migrations_1 = require("@mikro-orm/migrations"); // or `@mikro-orm/migrations-mongodb`
var postgresql_1 = require("@mikro-orm/postgresql");
var reflection_1 = require("@mikro-orm/reflection");
var sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
var config = {
    migrations: {
        path: "src/migrations",
        tableName: "mikro_orm_migrations", // name of database table with log of executed transactions
        transactional: true,
        emit: "ts", // migration generation mode
        generator: migrations_1.TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    },
    tsNode: true,
    driver: postgresql_1.PostgreSqlDriver,
    dbName: "postgres", // replace with your database name
    host: "localhost",
    port: 5433, // replace with your PostgreSQL port if it's not 5432
    user: "postgres", // replace with your PostgreSQL username
    password: "postgres", // replace with your PostgreSQL password
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"],
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    extensions: [migrations_1.Migrator],
    debug: true,
};
exports.default = config;
