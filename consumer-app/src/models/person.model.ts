import { Persisted, Properties, BaseModel, SurrealDbService, ModelProps } from '@koakh/nestjs-surrealdb-driver';

export interface Person {
  id?: string;
  title: string;
  name: {
    first: string;
    last: string;
  };
  marketing: boolean;
}

@ModelProps({ tableName: 'person' })
export class PersonModel extends BaseModel implements Person {
  constructor(db: SurrealDbService, data: Person) {
    super(db, data)
  }

  @Persisted
  // @Properties({ fieldName: 'identifier', map: [{ id: 'participantId' }], transform: value => JSON.stringify(value) })
  // @Properties({ returnField: true, map: [{ id: 'participantId' }] })
  title: string;

  @Persisted
  @Properties({ returnField: true })
  name: {
    first: string;
    last: string;
  };

  @Persisted
  // @Properties({ map: [{ id: 'participantId' }] })
  marketing: boolean;
}