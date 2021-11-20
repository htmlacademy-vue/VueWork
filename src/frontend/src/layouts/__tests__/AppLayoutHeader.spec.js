import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutHeader', () => {
  const directives = {
    clickOutside: jest.fn()
  };

  const mocks = {
    $router: {
      push: jest.fn()
    },
    $notifier: {
      success: jest.fn()
    }
  };

  const propsData = {
    showMenu: true,
    showLogin: false
  };

  const stubs = ['router-link'];

  let actions;
  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn()
      }
    };
    directives.clickOutside = jest.fn();
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
    propsData.showMenu = true;
    propsData.showLogin = false;
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders header items', () => {
    createComponent({ localVue, store, mocks, stubs });
    const headerMenu = wrapper.find('[data-test="header-items"]');
    expect(headerMenu.exists()).toBeTruthy();
  });

  it ('doesn\'t render header items', () => {
    propsData.showMenu = false;
    createComponent({ localVue, propsData, store, mocks, stubs });
    const headerMenu = wrapper.find('[data-test="header-items"]');
    expect(headerMenu.exists()).toBeFalsy();
  });

  it ('renders create task button', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const createTaskBtn = wrapper.find('[data-test="create-task-btn"]');
    expect(createTaskBtn.exists()).toBeTruthy();
  });

  it ('doesn\'t render create task button', () => {
    createComponent({ localVue, store, mocks, stubs });
    const createTaskBtn = wrapper.find('[data-test="create-task-btn"]');
    expect(createTaskBtn.exists()).toBeFalsy();
  });

  it ('renders menu on button click', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, directives, stubs });
    const btn = wrapper.find('[data-test="show-menu-btn"]');
    await btn.trigger('click');
    const headerMenu = wrapper.find('[data-test="header-menu"]');
    expect(headerMenu.exists()).toBeTruthy();
  });

  it ('doesn\'t renders menu', async () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, directives, stubs });
    const headerMenu = wrapper.find('[data-test="header-menu"]');
    expect(headerMenu.exists()).toBeFalsy();
  });

  it ('calls logout on logout button click', async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, directives, stubs });
    const btn = wrapper.find('[data-test="show-menu-btn"]');
    await btn.trigger('click');
    const logoutBtn = wrapper.find('[data-test="logout-btn"]');
    await logoutBtn.trigger('click');
    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith('/login');
  });

  it ('renders login button', () => {
    propsData.showLogin = true;
    createComponent({ localVue, propsData, store, mocks, stubs });
    const loginBtn = wrapper.find('[data-test="login-btn"]');
    expect(loginBtn.exists()).toBeTruthy();
  });

  it ('doesn\'t render login button', () => {
    createComponent({ localVue, propsData, store, mocks, stubs });
    const loginBtn = wrapper.find('[data-test="login-btn"]');
    expect(loginBtn.exists()).toBeFalsy();
  });

  it ('redirects to login on click', async () => {
    propsData.showLogin = true;
    createComponent({ localVue, propsData, store, mocks, stubs });
    const loginBtn = wrapper.find('[data-test="login-btn"]');
    await loginBtn.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith('/login');
  });
});

// Протестировать
/*
  + <div v-if="showMenu"
  + <router-link v-if="getUserAttribute('isAdmin')"
  + <a @click.stop="isMenuOpened = true"
  + v-if="isMenuOpened"
  + <a @click="$logout"
  + <a v-if="showLogin"
  + @click="$router.push('/login')"
 */

// Заменить тест данными
/*
  props:
    showMenu,
    showLogin
 */
