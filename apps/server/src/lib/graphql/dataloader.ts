import { getTaskByIds } from '@/modules/tasks/tasks.service.js';
import { getUserByIds } from '@/modules/users/users.service.js';
import Dataloader from 'dataloader';

export const dataLoaders = {
  userDataloader: new Dataloader(getUserByIds),
  taskDataloader: new Dataloader(getTaskByIds),
};

export type DataLoaders = typeof dataLoaders;
