import { shallowMount } from '@vue/test-utils';
import AppModal from '@/common/components/AppModal';
import AppButton from '@/common/components/AppButton';

describe('AppModal', () => {
  const stubs = {
    AppButton
  };
  const slots = {
    default: 'content'
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppModal, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders out the slot content', () => {
    createComponent({ stubs, slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
