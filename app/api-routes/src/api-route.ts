import { apiVer } from './api-ver';

export class ApiRoute {
  constructor(public readonly name: string, private readonly apiPrefix = '') {}

  private get withPrefix() {
    return this.apiPrefix ? `${this.apiPrefix}/${name}` : this.name;
  }

  public get base() {
    return this.withPrefix;
  }

  public get route() {
    return `/${this.base}`;
  }

  public get fullRoute() {
    return `/${apiVer}/${this.base}`;
  }
}
