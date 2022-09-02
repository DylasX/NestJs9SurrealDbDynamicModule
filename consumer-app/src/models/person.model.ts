import { Persisted, Properties, BaseModel, SurrealDbService, ModelProps } from '@koakh/nestjs-surrealdb';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export interface Person {
  id?: string;
  title: string;
  name: {
    first: string;
    last: string;
  };
  marketing: boolean;
  age: number;
}

@ModelProps({ tableName: 'person' })
export class PersonModel extends BaseModel implements Person {
  constructor(db: SurrealDbService, data: Person) {
    super(db, data)
  }

  @IsString()
  @Persisted
  // @Properties({ fieldName: 'identifier', map: [{ id: 'participantId' }], transform: value => JSON.stringify(value) })
  // @Properties({ returnField: true, map: [{ id: 'participantId' }] })
  title: string;

  @IsNotEmpty()
  @Persisted
  @Properties({ returnField: true })
  name: {
    first: string;
    last: string;
  };

  @IsBoolean()
  @Persisted
  // @Properties({ map: [{ id: 'participantId' }] })
  marketing: boolean;

  @Persisted
  // @Properties({ map: [{ id: 'participantId' }] })
  age: number;
}