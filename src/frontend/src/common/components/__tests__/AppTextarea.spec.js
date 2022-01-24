import { shallowMount } from '@vue/test-utils';
import AppTextarea from '@/common/components/AppTextarea';

describe('AppTextarea', () => {
  const errorClass = 'text-field__input--error';
  let propsData;

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppTextarea, options);
  };

  beforeEach(() => {
    propsData = {
      value: 'testValue',
      name: 'testName',
      type: 'text',
      placeholder: 'Test',
      errorText: 'Error',
      required: true
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('It sets the initial model value', () => {
    createComponent({ propsData });
    expect(wrapper.find('textarea').element.value).toBe(propsData.value);
  });

  it('It emits an input event when typing', async () => {
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    await textarea.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('emits the current textarea value when typing', async () => {
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    textarea.element.value = 'test';
    await textarea.trigger('input');
    expect(wrapper.emitted().input[0][0]).toEqual('test');
  });

  it('textarea name is prop name', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    expect(textarea.attributes('name')).toBe(propsData.name);
  });

  it('textarea type is prop type', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    expect(textarea.attributes('type')).toBe(propsData.type);
  });

  it('textarea placeholder is prop placeholder', () => {
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe(propsData.placeholder);
  });

  it('textarea has error class', () => {
    propsData.value = '';
    createComponent({ propsData });
    let textarea = wrapper.find('textarea');
    expect(textarea.attributes('class')).toContain(errorClass);
  });

  it('textarea has error message', () => {
    propsData.value = '';
    createComponent({ propsData });
    expect(wrapper.html()).toContain('span');
  });

  it('textarea does not have error message', () => {
    createComponent({ propsData });
    expect(wrapper.html()).not.toContain('span');
  });
});
