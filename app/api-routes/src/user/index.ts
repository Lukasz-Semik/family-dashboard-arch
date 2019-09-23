import { RoutesBase } from '../shared/routes-base';

export class UserRoutes extends RoutesBase {
  public signIn = new RoutesBase(this.apiVer, 'sign-in', this.base);

  public signUp = new RoutesBase(this.apiVer, 'sing-up', this.base);
}
