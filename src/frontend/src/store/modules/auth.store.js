import { SET_ENTITY } from '@/store/mutations-types.js';

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null
  },

  getters: {
    getUserAttribute: state => attr => state.user ? state.user[attr] : ''
  },

  actions: {
    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch('getMe');
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: 'Auth', entity: 'isAuthenticated', value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module: 'Auth', entity: 'user', value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: 'Auth', entity: 'isAuthenticated', value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: 'Auth', entity: 'user', value: data },
          { root: true }
        );
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch('logout', false);
      }
    }
  }
};
