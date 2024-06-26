import { initORM } from '@/lib/db.js';
import { TaskEntity } from './entities/task.entity.js';

export async function getTaskByIds(ids: number[]): Promise<TaskEntity[]> {
  const db = await initORM();
  const record: Record<number, TaskEntity> = {};
  const data = await db.em.find(TaskEntity, ids);

  data.forEach((task) => {
    record[task.id] = task;
  });

  return ids.map((id) => record[id]);
}
