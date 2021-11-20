import TaskCardCreatorDueDateSelector
  from '@/modules/tasks/components/TaskCardCreatorDueDateSelector';
import { mount } from '@vue/test-utils';
import Datepicker from 'vuejs-datepicker';

const propsData = {
  dueDate: '01.01.2021'
};

describe('TaskCardCreatorDueDateSelector', () => {
  let wrapper;

  const createComponent = options => {
    wrapper = mount(TaskCardCreatorDueDateSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('component rendered', () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('render date picker', () => {
    createComponent({ propsData });
    const datepicker = wrapper.findComponent(Datepicker);
    expect(datepicker.exists()).toBeTruthy();
  });

  it('emit input event', () => {
    createComponent({ propsData });
    const datepicker = wrapper.findComponent(Datepicker);
    datepicker.vm.$emit('input', '02.01.2021');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
