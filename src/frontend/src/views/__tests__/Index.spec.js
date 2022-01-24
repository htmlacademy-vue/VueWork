import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import { SET_ENTITY } from '@/store/mutations-types';
import users from '@/static/users';
import columns from '@/static/columns';
import { STATUSES } from '@/common/constants';
import Index from '@/views/Index.vue';
import AppIcon from '@/common/components/AppIcon';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.component('AppIcon', AppIcon);
localVue.use(Vuex);

const createColumns = store => {
  store.commit(SET_ENTITY, {
    module: 'Columns',
    entity: 'columns',
    value: columns
  });
};

describe('Index', () => {
  const stubs = ['router-view'];

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(Index, options);
  };

  beforeEach(() => {
    actions = {
      Columns: {
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
      }
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('displays desk with desk--rubber class', () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('.desk--rubber').exists()).toBeTruthy();
  });

  it ('displays desk without desk--rubber class', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('.desk--rubber').exists()).toBeFalsy();
  });

  it ('displays add column button', () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="add-column"]');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Добавить столбец');
  });

  it ('doesn\'t display add column button', () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find('[data-test="add-column"]').exists()).toBeFalsy();
  });

  it ('adds new column', async () => {
    authenticateUser(store);
    createColumns(store);
    createComponent({ localVue, store, stubs });
    const button = wrapper.find('[data-test="add-column"]');
    await button.trigger('click');
    expect(actions.Columns.post).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { title: 'Новый столбец' }
    );
  });

  it ('renders users filters', () => {
    createComponent({ localVue, store, stubs });
    const filters = wrapper.findAll('[data-test="user-filter"]');
    expect(Array.from(filters).length).toEqual(users.length);
  });

  it ('sets active user filter on click', async () => {
    createComponent({ localVue, store, stubs });
    const filter = wrapper.find('[data-test="user-filter"]');
    await filter.trigger('click');
    expect(filter.attributes('class')).toContain('active');
  });

  it ('doesn\'t have active user filter', async () => {
    createComponent({ localVue, store, stubs });
    const filter = wrapper.find('[data-test="user-filter"]');
    expect(filter.attributes('class')).not.toContain('active');
  });

  it ('calls the vuex mutation on user filter click', async () => {
    createComponent({ localVue, store, stubs });
    const spyOnMutation = jest.spyOn(wrapper.vm, 'updateFilters');
    const filter = wrapper.find('[data-test="user-filter"]');
    await filter.trigger('click');
    expect(spyOnMutation).toHaveBeenCalledWith(
      { users: [users[0].id] }
    );
  });

  it ('renders statuses filters', async () => {
    createComponent({ localVue, store, stubs });
    const filters = wrapper.findAll('[data-test="status-filter"]');
    expect(Array.from(filters).length).toEqual(STATUSES.length);
  });

  it ('sets active status filter on click', async () => {
    createComponent({ localVue, store, stubs });
    const filter = wrapper.find('[data-test="status-filter"]');
    await filter.trigger('click');
    expect(filter.attributes('class')).toContain('active');
  });

  it ('doesn\'t have active status filter', async () => {
    createComponent({ localVue, store, stubs });
    const filter = wrapper.find('[data-test="status-filter"]');
    expect(filter.attributes('class')).not.toContain('active');
  });

  it ('calls the vuex mutation on status filter click', async () => {
    createComponent({ localVue, store, stubs });
    const spyOnMutation = jest.spyOn(wrapper.vm, 'updateFilters');
    const filter = wrapper.find('[data-test="status-filter"]');
    await filter.trigger('click');
    expect(spyOnMutation).toHaveBeenCalledWith(
      { statuses: [STATUSES[0].value] }
    );
  });

  it ('renders status filter icon', async () => {
    createComponent({ localVue, store, stubs });
    const filter = wrapper.find('[data-test="status-filter-icon"]');
    expect(filter.attributes('class'))
      .toContain(`meta-filter__status--${STATUSES[0].value}`);
  });

  it ('renders columns', async () => {
    createColumns(store);
    createComponent({ localVue, store, stubs });
    const columnsHtml = wrapper.findAll('[data-test="columns"]');
    expect(Array.from(columnsHtml).length).toEqual(columns.length);
  });

  it ('doesn\'t render columns', async () => {
    createComponent({ localVue, store, stubs });
    const columnsHtml = wrapper.findAll('[data-test="columns"]');
    expect(columnsHtml.exists()).toBeFalsy();
  });

  it ('calls column update action', () => {
    createColumns(store);
    createComponent({ localVue, store, stubs });
    const columnHtml = wrapper.find('[data-test="columns"]');
    columnHtml.vm.$emit('update', 'test');
    expect(actions.Columns.put).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      'test'
    );
  });

  it ('calls column delete action', () => {
    createColumns(store);
    createComponent({ localVue, store, stubs });
    const columnHtml = wrapper.find('[data-test="columns"]');
    columnHtml.vm.$emit('delete', 'test');
    expect(actions.Columns.delete).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      'test'
    );
  });

  it ('renders no-columns text', async () => {
    createComponent({ localVue, store, stubs });
    const text = wrapper.findAll('[data-test="no-columns-text"]');
    expect(text.exists()).toBeTruthy();
  });

  it ('doesn\'t render no-columns text', async () => {
    createColumns(store);
    createComponent({ localVue, store, stubs });
    const text = wrapper.findAll('[data-test="no-columns-text"]');
    expect(text.exists()).toBeFalsy();
  });
});


// Список элементов для тестирования
/*
  + :class="{'desk--rubber': isUserAuthorized}"
  + v-if="getUserAttribute('isAdmin')"
  + @click="addColumn"
  + v-for="user in users"
  + :class="{ active: filters.users.some(id => id === user.id) }"
  + @click="filterTasks(user.id, 'users')"
  + v-for="({ value, label }) in statuses"
  + :class="{ active: filters.statuses.some(s => s === value) }"
  + @click="filterTasks(value, 'statuses')"
  + :class="`meta-filter__status--${value}`"
  + v-if="columns.length"
  + v-for="column in columns"
  + @update="put($event)"
  + @delete="deleteColumn"
  + v-else ... class="desk__emptiness"
  + ...mapActions('Columns', ['post', 'put', 'delete']),
  + ...mapMutations('Tasks'...),
*/

// Данные из тест хранилища
/*
  ...mapState(['users']),
  ...mapState('Auth', ['user']),
  ...mapState('Columns', ['columns']),
  ...mapState('Tasks', ['filters']),
  ...mapGetters('Auth', ['getUserAttribute']),
 */
