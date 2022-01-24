export default function isAdmin({ next, store, nextMiddleware }) {
  if (!store.state.Auth.user?.isAdmin) {
    next('/');
  }
  return nextMiddleware();
}
