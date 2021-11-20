import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY
} from '@/store/mutations-types';
import { capitalize } from '@/common/helpers';

const entity = 'columns';
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    columns: []
  },
  actions: {
    async query({ commit }) {
      const data = await this.$api.columns.query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    async post({ commit }, column) {
      const data = await this.$api.columns.post(column);
      commit(ADD_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    async put({ commit }, column) {
      await this.$api.columns.put(column);
      commit(UPDATE_ENTITY,
        {
          ...namespace,
          value: column
        }, { root: true }
      );
    },

    async delete({ commit }, id) {
      await this.$api.columns.delete(id);
      commit(DELETE_ENTITY,
        {
          ...namespace,
          id
        }, { root: true }
      );
    }
  }
};
