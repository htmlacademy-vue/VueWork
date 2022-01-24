import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import users from '@/static/users';
import TaskCardCreatorUserSelector
  from '@/modules/tasks/components/TaskCardCreatorUserSelector.vue';
import AppIcon from '@/common/components/AppIcon';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('AppIcon', AppIcon);

describe('TaskCardCreatorUserSelector', () => {
  const propsData = {
    currentWorkerId: '1'
  };

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskCardCreatorUserSelector, {
      ...options,
      directives: {
        clickOutside: jest.fn()
      }
    });
  };

  beforeEach(() => {
    store = generateMockStore();
    propsData.currentWorkerId = users[0].id;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('displays add button', () => {
    propsData.currentWorkerId = '';
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="add-user-button"]');
    expect(btn.exists()).toBeTruthy();
  });

  it ('doesn\'t display add button', () => {
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="add-user-button"]');
    expect(btn.exists()).toBeFalsy();
  });

  it ('displays users list on add button click', async () => {
    propsData.currentWorkerId = '';
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="add-user-button"]');
    await btn.trigger('click');
    const usersList = wrapper.find('[data-test="users-list"]');
    expect(usersList.exists()).toBeTruthy();
  });

  it ('displays selected user button', async () => {
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="selected-user-button"]');
    expect(btn.exists()).toBeTruthy();
  });

  it ('doesn\'t display selected user button', async () => {
    propsData.currentWorkerId = '';
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="selected-user-button"]');
    expect(btn.exists()).toBeFalsy();
  });

  it ('displays users list on user button image click', async () => {
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="selected-user-button"]');
    const image = btn.find('img');
    await image.trigger('click');
    const usersList = wrapper.find('[data-test="users-list"]');
    expect(usersList.exists()).toBeTruthy();
  });

  it ('displays users list on user name click', async () => {
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="selected-user-button"]');
    const span = btn.find('span');
    await span.trigger('click');
    const usersList = wrapper.find('[data-test="users-list"]');
    expect(usersList.exists()).toBeTruthy();
  });

  it ('emits select on app-icon click', () => {
    createComponent({ localVue, store, propsData });
    const appIcon = wrapper.find('[data-test="app-icon"]');
    appIcon.vm.$emit('click');
    expect(wrapper.emitted().select[0][0]).toEqual(null);
  });

  it ('renders users', async () => {
    propsData.currentWorkerId = '';
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="add-user-button"]');
    await btn.trigger('click');
    const usersElements = wrapper.findAll('[data-test="user"]');
    expect(Array.from(usersElements).length).toEqual(users.length);
  });

  it ('emits on select user and hide list', async () => {
    propsData.currentWorkerId = '';
    createComponent({ localVue, store, propsData });
    const btn = wrapper.find('[data-test="add-user-button"]');
    await btn.trigger('click');
    const userElement = wrapper.find('[data-test="user"]');
    const userBtn = userElement.find('button');
    await userBtn.trigger('click');
    expect(wrapper.emitted().select[0][0]).toEqual(users[0].id);
    const usersList = wrapper.find('[data-test="users-list"]');
    expect(usersList.exists()).toBeFalsy();
  });
});

// Протестировать
/*
  + v-if="!currentWorker"
  + @click.stop="isMenuOpened = !isMenuOpened"
  + <button v-else class="users-list__user"
  + img @click.stop="isMenuOpened = !isMenuOpened"
  + <span @click.stop="isMenuOpened = !isMenuOpened">
  + @click="$emit('select', null)"
  + v-if="isMenuOpened"
  + v-for="user in users"
  + @click="setUser(user.id)"
 */

// Заменить тестовыми данными
/*
  this.$store.state.users;
 */
