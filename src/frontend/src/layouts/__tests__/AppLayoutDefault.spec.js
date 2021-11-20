import { shallowMount } from '@vue/test-utils';
import AppLayoutDefault from '@/layouts/AppLayoutDefault';

const stubs = {
  AppNotifications: { template: '<div>App Notification</div>' }
};
const slots = {
  default: 'test'
};


describe('AppLayoutDefault', () => {
  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppLayoutDefault, options);
  };


  afterEach(() => {
    wrapper.destroy();
  });

  it('is rendered', () => {
    createComponent({ stubs, slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('AppLayoutDefault renders out the slot content', () => {
    createComponent({ stubs, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
