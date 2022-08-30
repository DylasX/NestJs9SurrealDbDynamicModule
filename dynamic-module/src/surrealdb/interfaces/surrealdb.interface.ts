interface SignIn {
  user: string;
  pass: string;
}

// TODO:
// type SignInFunctionType = (signIn: SignIn) => any;
// type UseFunctionType = (namespace: string, database: string) => any;
// type CreateFunctionType = (thing: string, data: any) => any;
// type QueryFunctionType = (sql: string, vars?: any) => any;
// type SelectFunctionType = (thing: string) => any;
// type ChangeFunctionType = (thing: string, data: any) => any;

export interface SurrealDb {
  signin: (signIn: SignIn) => any;
  use: (namespace: string, database: string) => any;
  create: (thing: string, data: any) => any;
  query: (sql: string, vars?: any) => any;
  select: (thing: string) => any;
  change: (thing: string, data: any) => any;
  delete: (thing: string) => any;
}