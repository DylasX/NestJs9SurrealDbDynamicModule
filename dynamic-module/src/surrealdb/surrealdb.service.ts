import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as Surreal from 'surrealdb.js';
import { SURREALDB_OPTIONS } from './constants';
import { SurrealDbResponseDto } from './dto/surrealdb-response.dto';
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

  /**
   * surrealdb create proxy method
   * @param thing tableName
   * @param data arbitrary data
   * @returns 
   */
  async create(thing: string, data: any): Promise<any> {
    return this.db.create(thing, data);
  }

  /**
   * surrealdb query proxy method
   * @param sql some query
   * // TODO: use vars
   * @param vars pass vars to query
   * @returns 
   */
  async query(sql: string, vars?: any): Promise<SurrealDbResponseDto> {
    return this.db.query(sql, vars);
  }

  /**
   * surrealdb create proxy method
   * @param thing tableName
   * @param data arbitrary data
   * @returns 
   */
  async select(thing: string): Promise<SurrealDbResponseDto> {
    return this.db.select(thing);
  }

  /**
   * surrealdb delete proxy method
   * @param data arbitrary data
   * @returns 
   */
  async change(thing: string, data: any): Promise<SurrealDbResponseDto> {
    return this.db.change(thing, data);
  }

  /**
 * surrealdb delete proxy method
 * @param data arbitrary data
 * @returns 
 */
  async delete(thing: string): Promise<SurrealDbResponseDto> {
    return this.db.delete(thing);
  }

}
