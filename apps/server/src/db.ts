import { Connection, EntityManager, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Options } from '@mikro-orm/postgresql';
import config from '../mikro-orm.config.js';

export interface DBServices {
  orm: MikroORM;
  em: EntityManager<IDatabaseDriver<Connection>>;
}

let cache: DBServices;

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
  } as DBServices);
}
