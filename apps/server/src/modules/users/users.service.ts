import { initORM } from '@/lib/db.js';
import { UserEntity } from './entities/user.entity.js';

export async function getUserByIds(ids: number[]): Promise<UserEntity[]> {
  const db = await initORM();
  const record: Record<number, UserEntity> = {};
  const data = await db.em.find(UserEntity, ids);

  data.forEach((user) => {
    record[user.id] = user;
  });

  return ids.map((id) => record[id]);
}
