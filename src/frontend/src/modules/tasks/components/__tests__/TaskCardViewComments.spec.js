import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import { generateMockStore } from '@/store/mocks';
import users from '@/static/users';
import TaskCardViewComments
  from '@/modules/tasks/components/TaskCardViewComments.vue';
import AppTextarea from '@/common/components/AppTextarea.vue';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('AppTextarea', AppTextarea);

const comments = [{
  createdAt: '2021-05-17T15:42:53.903Z',
  id: 1,
  taskId: 1,
  text: 'foo',
  updatedAt: '2021-05-17T15:42:53.904Z',
  userId: 'cdr09037-1569-4542-as83-gt5d34a48c33',
  user: {
    id:'cdr09037-1569-4542-as83-gt5d34a48c33',
    name:'Админ','avatar':'/public/admin.jpg'
  }
}];

const newComment = {
  createdAt: '2021-05-17T15:42:53.903Z',
  id: 2,
  taskId: 1,
  text: 'New comment',
  updatedAt: '2021-05-17T15:42:53.904Z',
  userId: 'cdr09037-1569-4542-as83-gt5d34a48c33'
};

const user = {
  id: users[0].id,
  name: users[0].name,
  avatar: users[0].avatar
};

describe('TaskCardViewComments', () => {
  const propsData = {
    taskId: 1,
    comments
  };
  const mocks = {
    $api: {
      comments: { post: null }
    }
  };

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskCardViewComments, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$api.comments.post = jest.fn(() => Promise.resolve(newComment));
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders comments', () => {
    createComponent({ localVue, store, mocks, propsData });
    const comments = wrapper.findAll('li');
    expect(Array.from(comments).length).toEqual(propsData.comments.length);
  });

  it ('renders form when authorized', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const form = wrapper.find('form');
    expect(form.exists()).toBeTruthy();
  });

  it ('doesn\'t render form when not authorized', () => {
    createComponent({ localVue, store, mocks, propsData });
    const form = wrapper.find('form');
    expect(form.exists()).toBeFalsy();
  });

  it ('renders error when submit empty comment', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const errorText = 'Поле не заполнено';
    const submitBtn = wrapper.find('[data-test="submit-btn"]');
    await submitBtn.trigger('click');
    const textarea = wrapper.find('[data-test="textarea"]');
    expect(textarea.text()).toContain(errorText);
  });

  it ('posts new comment and submit', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, propsData });
    const textarea = wrapper.find('[data-test="textarea"]');
    textarea.vm.$emit('input', newComment.text);
    const submitBtn = wrapper.find('[data-test="submit-btn"]');
    await submitBtn.trigger('click');
    await flushPromises();
    expect(mocks.$api.comments.post).toHaveBeenCalledWith({
      taskId: newComment.taskId,
      userId: newComment.userId,
      text: newComment.text
    });
    expect(wrapper.emitted()['new-comment'][0][0]).toEqual({
      ...newComment,
      user
    });
  });
});

// Протестировать
/*
  + v-for="comment in comments"
  + <form v-if="user"
  + :error-text="validations.newComment.error"
  + @click.prevent="submit"
  ? --- await this.$api.comments.post
  ? --- this.$emit('new-comment'
 */

// Заменить тест данными
/*
  ...mapState('Auth', ['user'])
 */
