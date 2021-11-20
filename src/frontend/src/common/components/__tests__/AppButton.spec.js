import { shallowMount } from '@vue/test-utils';
import AppButton from '@/common/components/AppButton';

describe('AppButton', () => {
  const slots = { default: 'content' };
  const defaultBtnType = 'button';
  const propsData = { type: 'submit' };
  const listeners = { click: null };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it('raises the click event on click', () => {
    createComponent({ listeners });
    wrapper.find('button').trigger('click');
    expect(listeners.click).toHaveBeenCalled();
  });

  it('button type is button', () => {
    createComponent();
    expect(wrapper.attributes('type')).toBe(defaultBtnType);
  });

  it('button type is submit', () => {
    createComponent({ propsData });
    expect(wrapper.attributes('type')).toBe(propsData.type);
  });
});
