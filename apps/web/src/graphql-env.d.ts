/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: {
    'Boolean': unknown;
    'CreateTaskInput': { kind: 'INPUT_OBJECT'; name: 'CreateTaskInput'; isOneOf: false; inputFields: [{ name: 'title'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'status'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'TaskStatus'; ofType: null; }; }; defaultValue: null }, { name: 'assigneeId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; defaultValue: null }]; };
    'CreateUserInput': { kind: 'INPUT_OBJECT'; name: 'CreateUserInput'; isOneOf: false; inputFields: [{ name: 'fullName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'password'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; }; defaultValue: null }, { name: 'bio'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'Date': unknown;
    'ID': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createTask': { name: 'createTask'; type: { kind: 'OBJECT'; name: 'Task'; ofType: null; } }; 'createUser': { name: 'createUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'deleteTask': { name: 'deleteTask'; type: { kind: 'OBJECT'; name: 'Task'; ofType: null; } }; 'deleteUser': { name: 'deleteUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'updateTask': { name: 'updateTask'; type: { kind: 'OBJECT'; name: 'Task'; ofType: null; } }; 'updateUser': { name: 'updateUser'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; }; };
    'Node': { kind: 'INTERFACE'; name: 'Node'; fields: { 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; }; possibleTypes: 'Task' | 'User'; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'task': { name: 'task'; type: { kind: 'OBJECT'; name: 'Task'; ofType: null; } }; 'tasks': { name: 'tasks'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'Task'; ofType: null; }; } }; 'user': { name: 'user'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'users': { name: 'users'; type: { kind: 'LIST'; name: never; ofType: { kind: 'OBJECT'; name: 'User'; ofType: null; }; } }; }; };
    'String': unknown;
    'Task': { kind: 'OBJECT'; name: 'Task'; fields: { 'assignee': { name: 'assignee'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'createdBy': { name: 'createdBy'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'description': { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'status': { name: 'status'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'ENUM'; name: 'TaskStatus'; ofType: null; }; } }; 'title': { name: 'title'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; }; };
    'TaskStatus': { name: 'TaskStatus'; enumValues: 'TODO' | 'IN_PROGRESS' | 'DONE'; };
    'UpdateTaskInput': { kind: 'INPUT_OBJECT'; name: 'UpdateTaskInput'; isOneOf: false; inputFields: [{ name: 'title'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'description'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'status'; type: { kind: 'ENUM'; name: 'TaskStatus'; ofType: null; }; defaultValue: null }, { name: 'assigneeId'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; defaultValue: null }]; };
    'UpdateUserInput': { kind: 'INPUT_OBJECT'; name: 'UpdateUserInput'; isOneOf: false; inputFields: [{ name: 'fullName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'password'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }, { name: 'bio'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; }; defaultValue: null }]; };
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'bio': { name: 'bio'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; 'email': { name: 'email'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'fullName': { name: 'fullName'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'Date'; ofType: null; }; } }; }; };
  };
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}