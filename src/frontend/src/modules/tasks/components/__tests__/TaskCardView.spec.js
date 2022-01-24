import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import flushPromises from 'flush-promises';
import TaskCardView from '@/modules/tasks/components/TaskCardView.vue';
import AppTextarea from '@/common/components/AppTextarea.vue';
import AppIcon from '@/common/components/AppIcon.vue';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('AppTextarea', AppTextarea);
localVue.component('AppIcon', AppIcon);

const normalizedTask = {
  'id':5,
  'title':'Задача № 5',
  'description':'Описание задачи № 5',
  'sortOrder':1,
  'dueDate':1621263324730,
  'url':'https://test.com',
  'urlDescription':null,
  'createdAt':'2021-05-15T08:36:01.917Z',
  'updatedAt':'2021-05-15T08:36:01.917Z',
  'tags':'#foo#baz#bar',
  'columnId':null,
  'statusId':1,
  'userId':'cdr09037-1569-4542-as83-gt5d34a48c33',
  'user':{
    'id':'cdr09037-1569-4542-as83-gt5d34a48c33',
    'name':'Админ',
    'avatar':'/public/admin.jpg'
  },
  'ticks':[
    { 'id': 1, text: 'foo', 'done': false, 'taskId': 5 },
    { 'id': 2, text: 'bar', 'done': false, 'taskId': 5 },
    { 'id': 3, text: 'baz', 'done': false, 'taskId': 5 }
  ],
  'status':'green',
  'timeStatus':'',
  'comments': [],
  'avatar':'/public/admin.jpg'
};

const newComment = {
  createdAt: '2021-05-17T15:42:53.903Z',
  id: 1,
  taskId: 2,
  text: 'foo',
  updatedAt: '2021-05-17T15:42:53.904Z',
  user: {
    'id':'cdr09037-1569-4542-as83-gt5d34a48c33',
    'name':'Админ','avatar':'/public/admin.jpg'
  }
};

describe('TaskCardView', () => {
  const mocks = {
    $api: {
      tasks: {
        get: () => Promise.resolve()
      }
    },
    $route: {
      params: { id: 5 }
    },
    $router: {
      push: jest.fn()
    }
  };

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskCardView, options);
  };

  beforeEach(() => {
    actions = {
      Ticks: {
        put: jest.fn()
      }
    };

    store = generateMockStore(actions);
    mocks.$api.tasks.get = () => Promise.resolve(normalizedTask);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('closes dialog on wrapper click', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const wrapperElement = wrapper.find('div');
    await wrapperElement.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith('/');
  });

  it ('closes dialog on ESC keydown', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    await wrapper.trigger('keydown.esc');
    expect(mocks.$router.push).toHaveBeenCalledWith('/');
  });

  it ('closes dialog on close-button click', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const closeBtn = wrapper.find('[data-test="close-btn"]');
    await closeBtn.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith('/');
  });

  it ('closes dialog on close-button click', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const closeBtn = wrapper.find('[data-test="close-btn"]');
    await closeBtn.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith('/');
  });

  it ('task card name has different view for admin', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskName = wrapper.find('[data-test="task-name"]');
    expect(taskName.attributes('class'))
      .toContain('task-card__name--min');
  });

  it ('renders edit button for admin', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const editBtn = wrapper.find('[data-test="edit-btn"]');
    expect(editBtn.exists()).toBeTruthy();
  });

  it ('doesn\'t render edit button for non-admin', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const editBtn = wrapper.find('[data-test="edit-btn"]');
    expect(editBtn.exists()).toBeFalsy();
  });

  it ('redirects to task edit on edit button click', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const editBtn = wrapper.find('[data-test="edit-btn"]');
    await editBtn.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: 'TaskEdit',
      params: { id: mocks.$route.params.id }
    });
  });

  it ('renders task date', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskDate = wrapper.find('[data-test="task-date"]');
    expect(taskDate.exists()).toBeTruthy();
  });

  it ('renders task description', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskDesc = wrapper.find('[data-test="task-description"]');
    expect(taskDesc.exists()).toBeTruthy();
  });

  it ('renders task url', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskUrl = wrapper.find('[data-test="task-url"]');
    expect(taskUrl.exists()).toBeTruthy();
  });

  it ('renders task ticks', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const ticksBlock = wrapper.find('[data-test="task-ticks-block"]');
    expect(ticksBlock.exists()).toBeTruthy();
  });

  it ('updates tick', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const ticksComponent = wrapper.find('[data-test="task-ticks"]');
    ticksComponent.vm.$emit('updateTick', 'test');
    expect(actions.Ticks.put).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      'test'
    );
  });

  it ('renders task tags', async () => {
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskTags = wrapper.find('[data-test="task-tags"]');
    expect(taskTags.exists()).toBeTruthy();
  });

  it ('renders task comments', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskComments = wrapper.find('[data-test="task-comments"]');
    expect(taskComments.exists()).toBeTruthy();
  });

  it ('adds new comment', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks });
    await flushPromises();
    const taskComments = wrapper.find('[data-test="task-comments"]');
    taskComments.vm.$emit('new-comment', newComment);
    expect(normalizedTask.comments[0]).toEqual(newComment);
  });
});



// Протестировать
/*
  + v-if="!!task"
  + @click.self="closeDialog"
  + @keydown.esc="closeDialog"
  + button @click="closeDialog"
  + :class="{ 'task-card__name--min' : isAdmin }"
  + <a v-if="isAdmin"
  + @click="$router.push({ name: 'TaskEdit' ...
  + <li v-if="task && task.user">
  + <li v-if="dueDate">
  + v-if="task && task.description"
  + v-if="task && task.url"
  + v-if="showTicks"
  + @updateTick="put"
  + v-if="showTags"
  + v-if="task && (user || task.comments)"
  + @new-comment="addCommentToList"
  + this.$router.push('/');
 */

// Заменить на тестовые данные
/*
  ...mapGetters('Tasks', ['getTaskById']),
  ...mapGetters('Auth', ['getUserAttribute']),
  ...mapState('Auth', ['user']),
  ...mapActions('Ticks', ['put']),
  this.task = await this.$api.tasks.get(id, TASK_DETAILS_CONFIG);
 */
