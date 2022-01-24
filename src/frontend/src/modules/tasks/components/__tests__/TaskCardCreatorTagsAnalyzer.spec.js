import { mount } from '@vue/test-utils';
import TaskCardCreatorTagsAnalyzer
  from '@/modules/tasks/components/TaskCardCreatorTagsAnalyzer';

const propsData = {
  tags: '#hello#world'
};

describe('TaskCardCreatorTagsAnalyzer', () => {
  let wrapper;

  const createComponent = options => {
    wrapper = mount(TaskCardCreatorTagsAnalyzer, options);
  };

  it('component rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('emits setTags event on blur', async () => {
    createComponent({ propsData });
    const input = wrapper.find('.analyzer');
    await input.trigger('blur');
    expect(wrapper.emitted().setTags).toBeTruthy();
  });

  it('emits setTags event on keydown enter', async () => {
    createComponent({ propsData });
    const input = wrapper.find('.analyzer');
    await input.trigger('keydown.enter');
    expect(wrapper.emitted().setTags).toBeTruthy();
  });
});
