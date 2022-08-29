interface SignIn {
  user: string;
  pass: string;
}

type SignInFunctionType = (signIn: SignIn) => any;
type UseFunctionType = (namespace: string, database: string) => any;
type CreateFunctionType = (thing: string, data: any) => any;
type QueryFunctionType = (sql: string, vars?: any) => any;

export interface SurrealDb {
  signin: SignInFunctionType;
  use: UseFunctionType;
  create: CreateFunctionType;
  query: QueryFunctionType;
}