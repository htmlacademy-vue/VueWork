import auth from '@/middlewares/auth';
import isAdmin from '@/middlewares/isAdmin';
import isLoggedIn from '@/middlewares/isLoggedIn';
import middlewarePipeline from '@/middlewares/middlewarePipeline';

export {
  auth,
  isAdmin,
  isLoggedIn,
  middlewarePipeline
};
