import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import { SET_ENTITY } from '@/store/mutations-types';
import tasks from '@/static/tasks';
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

const addTasks = store => {
  store.commit(SET_ENTITY, {
    module: 'Tasks',
    entity: 'tasks',
    value: tasks
  });
};

const filteredTasks = tasks.filter(t => !t.columnId);

describe('AppLayoutMainSidebar', () => {
  const mocks = {
    $router: {
      push: jest.fn()
    }
  };

  let store;
  beforeEach(() => {
    store = generateMockStore();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLayoutMainSidebar, options);
  };

  it('is rendered', () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toBeTruthy();
  });

  it('renders backlog btn', async () => {
    createComponent({ localVue, store });
    const backlogBtn = wrapper.find('[data-test="backlog-btn"]');
    expect(backlogBtn.isVisible()).toBeTruthy();
  });

  it('doesn\'t render backlog btn', async () => {
    createComponent({ localVue, store });
    const backlogTitle = wrapper.find('[data-test="backlog-title"]');
    await backlogTitle.trigger('click');
    const backlogBtn = wrapper.find('[data-test="backlog-btn"]');
    expect(backlogBtn.isVisible()).toBeFalsy();
  });

  it('renders backlog content', async () => {
    createComponent({ localVue, store });
    const backlogContent = wrapper.find('[data-test="backlog-content"]');
    expect(backlogContent.isVisible()).toBeTruthy();
  });

  it ('renders backlog tasks', () => {
    addTasks(store);
    authenticateUser(store);
    createComponent({ localVue, store });
    const tasksList = wrapper.findAll('[data-test="task"]');
    expect(Array.from(tasksList).length).toEqual(filteredTasks.length);
  });

  it ('moves task on drop on task', () => {
    addTasks(store);
    authenticateUser(store);
    createComponent({ localVue, store });
    const spyOnMoveTask = jest.spyOn(wrapper.vm, '$moveTask');
    const task = wrapper.find('[data-test="task"]');
    task.vm.$emit('drop', filteredTasks[0]);
    expect(spyOnMoveTask).toHaveBeenCalled();
  });

  it ('redirects to task details on task click', async () => {
    addTasks(store);
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    const task = wrapper.find('[data-test="task"]');
    task.vm.$emit('click');
    expect(mocks.$router.push).toHaveBeenCalledWith({
      path: `/${filteredTasks[0].id}`
    });
  });
});

// Протестировать
/*
  + @click="backlogIsHidden = !backlogIsHidden"
  + <span v-show="!backlogIsHidden"
  + v-for="task in sidebarTasks"
  + @drop="$moveTask($event, task)"
  @click="$router.push({ path: `/${task.id}` })"
 */

// Заменить тестовыми данными
/*
  ...mapState('Auth', ['user']),
  ...mapState('Tasks', ['tasks']),
 */
