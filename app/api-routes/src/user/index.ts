import { ApiRoute } from '../api-route';

export class UserRoute extends ApiRoute {
  public confirm = new ApiRoute('confirm', this.name);
}
