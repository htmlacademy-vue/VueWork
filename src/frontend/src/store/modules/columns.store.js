import { cloneDeep } from 'lodash';
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY
} from '@/store/mutations-types';
import { capitalize } from '@/common/helpers';
import jsonColumns from '@/static/columns.json';

const entity = 'columns';
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    columns: []
  },
  actions: {
    query({ commit }) {
      const data = jsonColumns; // TODO: Add api call
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    post({ commit }, column) {
      const data = cloneDeep(column); // TODO: Add api call
      commit(ADD_ENTITY,
        {
          ...namespace,
          value: data
        }, { root: true }
      );
    },

    put({ commit }, column) {
      // TODO: Add api call
      commit(UPDATE_ENTITY,
        {
          ...namespace,
          value: column
        }, { root: true }
      );
    },

    delete({ commit }, id) {
      // TODO: Add api call
      commit(DELETE_ENTITY,
        {
          ...namespace,
          id
        }, { root: true }
      );
    }
  }
};
