import { shallowMount } from '@vue/test-utils';
import AppIcon from '@/common/components/AppIcon';

describe('AppIcon', () => {
  const listeners = { click: null };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppIcon, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('raises the click event on click', () => {
    createComponent({ listeners });
    wrapper.find('button').trigger('click');
    expect(listeners.click).toHaveBeenCalled();
  });
});
