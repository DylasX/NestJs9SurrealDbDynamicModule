import { Persisted, Properties, BaseModel } from '@koakh/nestjs-surrealdb-driver';

export interface Person {
  id?: string;
  title: string;
  name: {
    first: string;
    last: string;
  };
  marketing: boolean;
}

export class PersonModel extends BaseModel implements Person {
  constructor(data: Person ) {
    super(data)
  }
  
  @Persisted
  // @Properties({ fieldName: 'identifier', map: [{ id: 'participantId' }], transform: value => JSON.stringify(value) })
  @Properties({ map: [{ id: 'participantId' }] })
  title: string;

  @Persisted
  // @Properties({ map: [{ id: 'participantId' }] })
  name: {
    first: string;
    last: string;
  };

  @Persisted
  // @Properties({ map: [{ id: 'participantId' }] })
  marketing: boolean;
}