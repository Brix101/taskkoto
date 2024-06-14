import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
// import fs from "fs";
// import { print } from "graphql";

const loadedFiles = loadFilesSync(`${process.cwd()}/src/modules/**/*.graphql`);

const typeDefs = mergeTypeDefs(loadedFiles);
// const printedTypeDefs = print(typeDefs);

// fs.writeFileSync("src/generated/schema.graphql", printedTypeDefs);

export default typeDefs;
