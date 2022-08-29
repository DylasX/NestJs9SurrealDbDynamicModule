import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as Surreal from 'surrealdb.js';
import { SURREALDB_OPTIONS } from './constants';
import { EnvConfig, SurrealDbOptions } from './interfaces';
import { SurrealDb } from './interfaces/surrealdb.interface';

@Injectable()
export class SurrealDbService {
  private readonly envConfig: EnvConfig;
  private db: SurrealDb;

  constructor(@Inject(SURREALDB_OPTIONS) private options: SurrealDbOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, options.configPath, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    this.initSurrealDb();
  }

  private async initSurrealDb() {
    // init surrealDb instance
    this.db = new Surreal(this.options.url);
    // signin as a namespace, database, or root user
    await this.db.signin({
      user: this.options.user,
      pass: this.options.pass,
    });
    // select a specific namespace / database
    await this.db.use(this.options.namespace, this.options.database);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  async use(namespace?: string, database?: string): Promise<any> {
    return this.db.use(namespace || this.options.namespace, database || this.options.database);
  }

  // TODO: use generic here, ex pass type, or model from client
  async create(thing: string, data: any): Promise<any> {
    return this.db.create(thing, data);
  }

  // TODO: use generic here, ex pass type, or model from client
  async query(sql: string, vars?: any): Promise<any> {
    return this.db.query(sql, vars);
  }

}
