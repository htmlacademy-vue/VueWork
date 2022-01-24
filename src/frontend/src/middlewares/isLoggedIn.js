export default function isLoggedIn({ next, store, nextMiddleware }) {
  if (store.$jwt.getToken()) {
    next('/');
  }
  return nextMiddleware();
}
