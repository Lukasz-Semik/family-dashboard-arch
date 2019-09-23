export class RoutesBase {
  constructor(
    protected readonly apiVer: string,
    public readonly base: string,
    private readonly prefix?: string
  ) {}

  protected slash(route: string) {
    return `/${route}`;
  }

  public get route() {
    return this.slash(this.base);
  }

  public get api() {
    return this.slash(`${this.apiVer}${this.prefix ? `/${this.prefix}` : ''}/${this.base}`);
  }
}
