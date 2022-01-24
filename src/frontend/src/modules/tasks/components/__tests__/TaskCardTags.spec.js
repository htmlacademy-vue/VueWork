import { shallowMount } from '@vue/test-utils';
import TaskCardTags from '@/modules/tasks/components/TaskCardTags.vue';

describe('TaskCardTags', () => {
  const propsData = {
    tags: '#tag1#tag2#tag3'
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(TaskCardTags, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders tags', () => {
    createComponent({ propsData });
    const tags = wrapper.findAll('[data-test="tag"]');
    expect(Array.from(tags).length)
      .toEqual(propsData.tags.split('#').length - 1);
  });
});
