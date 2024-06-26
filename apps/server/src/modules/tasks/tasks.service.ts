import { initORM } from '@/lib/db.js';
import { TaskEntity } from './entities/task.entity.js';

export async function getTaskByIds(ids: number[]): Promise<TaskEntity[]> {
  const db = await initORM();
  return db.em.find(TaskEntity, ids);
}
