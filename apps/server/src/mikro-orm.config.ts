import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const config: Options = {
  driver: PostgreSqlDriver,
  dbName: "postgres", // replace with your database name
  host: "localhost",
  port: 5432, // replace with your PostgreSQL port if it's not 5432
  user: "postgres", // replace with your PostgreSQL username
  password: "openpgpwd", // replace with your PostgreSQL password
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default config;
