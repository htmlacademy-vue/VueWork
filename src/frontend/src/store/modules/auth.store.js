import users from '@/static/users.json';

export default {
  namespaced: true,
  state: {
    user: users[0]
  }
};
