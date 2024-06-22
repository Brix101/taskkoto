import { initORM } from '@/db.js';
import { UserEntity } from './entities/user.entity.js';

export async function getUserByIds(ids: number[]): Promise<UserEntity[]> {
  const db = await initORM();
  return db.em.find(UserEntity, { id: { $in: ids } });
}
