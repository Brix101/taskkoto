import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
import { Options } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config";

export interface Services {
  orm: MikroORM;
  em: EntityManager<IDatabaseDriver<Connection>>;
}

let cache: Services;

export async function initORM(options?: Options) {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  return (cache = {
    orm,
    em: orm.em,
  });
}
