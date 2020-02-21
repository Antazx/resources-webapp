import AccessControl from 'accesscontrol';
const ac = new AccessControl();

ac.grant('basic')
  .readOwn('profile')
  .updateOwn('profile');

ac.grant('maintainer')
  .extend('basic')
  .readAny('profile');

ac.grant('admin')
  .extend('basic')
  .extend('maintainer')
  .updateAny('profile')
  .deleteAny('profile');

export default ac;
