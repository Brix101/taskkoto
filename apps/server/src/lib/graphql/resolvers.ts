import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

const resolversArray = loadFilesSync(path.join(process.cwd(), './**/*.resolver.*'));

const resolvers: any = mergeResolvers(resolversArray);

export default resolvers;
