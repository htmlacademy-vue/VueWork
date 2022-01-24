import { createLocalVue, mount } from '@vue/test-utils';
import TaskCardViewTicksList
  from '@/modules/tasks/components/TaskCardViewTicksList.vue';
import AppIcon from '@/common/components/AppIcon.vue';

const localVue = createLocalVue();
localVue.component('AppIcon', AppIcon);

describe('TaskCardViewTicksList', () => {
  const propsData = {
    disabled: false,
    ticks: [
      { 'id': 1, text: 'foo', 'done': true, 'taskId': 5 },
      { 'id': 2, text: 'bar', 'done': false, 'taskId': 5 },
      { 'id': 3, text: 'baz', 'done': false, 'taskId': 5 }
    ]
  };

  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskCardViewTicksList, options);
  };

  beforeEach(() => {
    propsData.disabled = false;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it ('is rendered', async () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it ('renders create new tick button', () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="create-tick"]');
    expect(btn.exists()).toBeTruthy();
  });

  it ('doesn\'t render create new tick button', () => {
    propsData.disabled = true;
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="create-tick"]');
    expect(btn.exists()).toBeFalsy();
  });

  it ('emits createTick on new tick button click', async () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="create-tick"]');
    await btn.trigger('click');
    expect(wrapper.emitted().createTick).toBeTruthy();
  });

  it ('renders ticks list', () => {
    createComponent({ localVue, propsData });
    const list = wrapper.findAll('[data-test="tick"]');
    expect(Array.from(list).length).toEqual(propsData.ticks.length);
  });

  it ('emits updateTick on checkbox selection', async () => {
    createComponent({ localVue, propsData });
    const tickCheckbox = wrapper
      .find('[data-test="tick"]')
      .find('input');
    await tickCheckbox.trigger('click');
    expect(wrapper.emitted().updateTick[0][0]).toEqual({
      ...propsData.ticks[0],
      done: !propsData.ticks[0].done
    });
  });

  it ('emits updateTick on tick text input change', async () => {
    createComponent({ localVue, propsData });
    const tickTextInput = wrapper.find('[data-test="tick-text-input"]');
    tickTextInput.element.value = 'test';
    await tickTextInput.trigger('change');
    expect(wrapper.emitted().updateTick[0][0]).toEqual({
      ...propsData.ticks[0],
      text: 'test'
    });
  });

  it ('renders tick text when disabled', () => {
    propsData.disabled = true;
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="tick-text"]');
    expect(btn.exists()).toBeTruthy();
  });

  it ('doesn\'t render tick text', () => {
    createComponent({ localVue, propsData });
    const btn = wrapper.find('[data-test="tick-text"]');
    expect(btn.exists()).toBeFalsy();
  });

  it ('doesn\'t display tick icon when disabled', () => {
    propsData.disabled = true;
    createComponent({ localVue, propsData });
    const iconsBlock = wrapper.find('[data-test="icons-block"]');
    expect(iconsBlock.attributes('class')).toContain('--hidden');
  });

  it ('emits removeTick on delete-icon click', async () => {
    createComponent({ localVue, propsData });
    const deleteIcon = wrapper.find('[data-test="delete-icon"]');
    await deleteIcon.trigger('click');
    expect(wrapper.emitted().removeTick[0][0]).toEqual({
      uuid: undefined
    });
  });
});

// Протестировать
/*
  + <button v-if="!disabled"
  + @click="$emit('createTick')"
  + <ul v-if="ticks.length"
  + <li v-for="tick in ticks"
  + @click="updateTick(tick, 'done', !tick.done)"
  + <input v-if="!disabled"
  + @change="updateTick(tick, 'text', $event.target.value)"
  + <span v-else>{{ tick.text }}</span>
  + :class="{'task-card__icons--hidden': disabled}"
  + @click="$emit('removeTick', { uuid: tick.uuid })"
  + this.$emit('updateTick', tickCopy);
*/

// Заменить тестовыми данными
/*
  props: ticks, disabled.
 */
