import { UserRoutes } from './user';

const apiVer = 'api/v1';

export const apiRoutes = {
  user: new UserRoutes(apiVer, 'user'),
};
