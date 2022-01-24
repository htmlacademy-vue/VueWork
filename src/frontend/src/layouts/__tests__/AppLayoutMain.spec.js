import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { generateMockStore } from '@/store/mocks';
import AppLayoutMain from '@/layouts/AppLayoutMain';
import AppNotifications from '@/common/components/AppNotifications.vue';
import { authenticateUser } from '@/common/helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('AppNotifications', AppNotifications);

describe('AppLayoutMain', () => {
  const mocks = {
    $route: {
      name: 'test'
    }
  };

  const stubs = ['router-link'];

  let store;
  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLayoutMain, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ localVue, store, mocks, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders sidebar', () => {
    authenticateUser(store);
    createComponent({ localVue, store, mocks, stubs });
    const sidebar = wrapper.find('[data-test="sidebar"]');
    expect(sidebar.exists()).toBeTruthy();
  });

  it ('doesn\'t render sidebar', () => {
    createComponent({ localVue, store, mocks, stubs });
    const sidebar = wrapper.find('[data-test="sidebar"]');
    expect(sidebar.exists()).toBeFalsy();
  });
});
