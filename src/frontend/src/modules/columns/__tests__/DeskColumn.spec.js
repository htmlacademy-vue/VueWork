import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import { SET_ENTITY } from '@/store/mutations-types';
import tasks from '@/static/tasks';
import columns from '@/static/columns';
import DescColumn from '@/modules/columns/components/DeskColumn';
import AppIcon from '@/common/components/AppIcon';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('AppIcon', AppIcon);

const addTasks = store => {
  store.commit(SET_ENTITY, {
    module: 'Tasks',
    entity: 'tasks',
    value: tasks
  });
};

describe('DescColumn', () => {
  const propsData = {
    column: columns[0]
  };

  const mocks = {
    $router: {
      push: jest.fn()
    }
  };

  const filteredTasks = tasks.filter(t => {
    return t.columnId === propsData.column.id;
  });

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(DescColumn, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders column title', () => {
    createComponent({ localVue, store, propsData });
    const columnTitle = wrapper.find('[data-test="column-title"]');
    expect(columnTitle.text()).toContain(propsData.column.title);
  });

  it ('doesn\'t render column title', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const editIcon = wrapper.find('[data-test="edit-icon"]');
    await editIcon.trigger('click');
    const columnTitle = wrapper.find('[data-test="column-title"]');
    expect(columnTitle.exists()).toBeFalsy();
  });

  it ('renders column title input on edit icon click', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const editIcon = wrapper.find('[data-test="edit-icon"]');
    expect(editIcon.exists()).toBeTruthy();
    await editIcon.trigger('click');
    const titleInput = wrapper.find('[data-test="title-input"]');
    expect(titleInput.exists()).toBeTruthy();
  });

  it ('emits update for column title on input blur', async () => {
    const columnNewTitle = 'Column new title';
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const editIcon = wrapper.find('[data-test="edit-icon"]');
    await editIcon.trigger('click');
    const titleInput = wrapper.find('[data-test="title-input"]');
    titleInput.element.value = columnNewTitle;
    await titleInput.trigger('input');
    await titleInput.trigger('blur');
    expect(wrapper.emitted().update[0][0]).toEqual({
      id: propsData.column.id,
      title: columnNewTitle
    });
  });

  it ('doesn\'t render edit icon if not admin', () => {
    createComponent({ localVue, store, propsData });
    const editIcon = wrapper.find('[data-test="edit-icon"]');
    expect(editIcon.exists()).toBeFalsy();
  });

  it ('renders delete icon', () => {
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const deleteIcon = wrapper.find('[data-test="delete-icon"]');
    expect(deleteIcon.exists()).toBeTruthy();
  });

  it ('emits delete for column on delete icon click', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const deleteIcon = wrapper.find('[data-test="delete-icon"]');
    await deleteIcon.trigger('click');
    expect(wrapper.emitted().delete[0][0]).toEqual(propsData.column.id);
  });

  it ('renders tasks', () => {
    addTasks(store);
    createComponent({ localVue, store, propsData });
    const tasksList = wrapper.findAll('[data-test="task"]');
    expect(Array.from(tasksList).length).toEqual(filteredTasks.length);
  });

  it ('moves task on drop on task', () => {
    addTasks(store);
    authenticateUser(store);
    createComponent({ localVue, store, propsData });
    const spyOnMoveTask = jest.spyOn(wrapper.vm, '$moveTask');
    const task = wrapper.find('[data-test="task"]');
    task.vm.$emit('drop', filteredTasks[0]);
    expect(spyOnMoveTask).toHaveBeenCalled();
  });

  it ('redirects to task on task card click', () => {
    addTasks(store);
    createComponent({ localVue, store, propsData, mocks });
    const task = wrapper.find('[data-test="task"]');
    task.vm.$emit('click');
    expect(mocks.$router.push).toHaveBeenCalledWith({
      path: `/${filteredTasks[0].id}`
    });
  });
});

// Список элементов для тестирования
/*
  + <span v-if="!isInputShowed">
  + <input ... v-else
  + @blur="updateInput"
  + v-if="!isInputShowed && isAdmin"
  + @click="showInput"
  + v-if="!isInputShowed && isAdmin && !columnTasks.length"
  + @click="$emit('delete', column.id)"
  + v-for="task in columnTasks"
  + @drop="$moveTask($event, task)"
  + @click="$router.push({ path: `/${task.id}` })"
 */

// Данные из тест хранилища
/*
  ...mapState('Tasks', ['tasks']),
  ...mapGetters('Tasks', ['filteredTasks']),
  ...mapGetters('Auth', ['getUserAttribute']),
 */
