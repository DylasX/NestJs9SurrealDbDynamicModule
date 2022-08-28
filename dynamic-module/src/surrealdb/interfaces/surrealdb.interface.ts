interface SignIn {
  user: string;
  pass: string;
}

type SignInFunctionType = (signIn: SignIn) => any;
type UseFunctionType = (namespace: string, database: string) => any;
type CreateFunctionType = (thing: string, data: any) => any;

export interface SurrealDb {
  signin: SignInFunctionType;
  use: UseFunctionType;
  create: CreateFunctionType;
}