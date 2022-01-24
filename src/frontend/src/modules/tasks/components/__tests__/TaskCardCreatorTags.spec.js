import { mount } from '@vue/test-utils';
import TaskCardCreatorTags
  from '@/modules/tasks/components/TaskCardCreatorTags';
import TaskCardCreatorTagsAnalyzer
  from '@/modules/tasks/components/TaskCardCreatorTagsAnalyzer'

const propsData = {
  tags: '#hello#world'
};

describe('TaskCardCreatorTags', () => {
  let wrapper;

  const createComponent = options => {
    wrapper = mount(TaskCardCreatorTags, options);
  };

  it('component rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders tags analyzer', () => {
    createComponent({ propsData });
    const analyzer = wrapper.findComponent(TaskCardCreatorTagsAnalyzer);
    expect(analyzer.exists()).toBeTruthy();
  });

  it('emit setTags event', () => {
    createComponent({ propsData });
    const analyzer = wrapper.findComponent(TaskCardCreatorTagsAnalyzer);
    analyzer.vm.$emit('setTags', '');
    expect(wrapper.emitted().setTags).toBeTruthy();
  });
});
