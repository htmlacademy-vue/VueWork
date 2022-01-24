import { createLocalVue, mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import TaskEdit from '@/views/index/tasks/edit/_id';
import AppButton from '@/common/components/AppButton';
import { generateMockStore } from '@/store/mocks';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = generateMockStore();

describe('TaskEdit', () => {
  const mocks = {
    $route: {
      params: {
        id: 5
      }
    },
    $router: {
      go: jest.fn()
    },
    $api: {
      tasks: {
        get: jest.fn()
      }
    }
  };

  const stubs = {
    AppButton
  };

  const normalizedTask = {
    'id':5,
    'title':'Задача № 5',
    'description':'Описание задачи № 5',
    'sortOrder':1,
    'dueDate':null,
    'url':null,
    'urlDescription':null,
    'createdAt':'2021-05-15T08:36:01.917Z',
    'updatedAt':'2021-05-15T08:36:01.917Z',
    'tags':'Бекэнд#Срочно#Срочно#Для верски',
    'columnId':null,
    'statusId':1,
    'userId':'29234cd0-f308-432d-bb6a-8b199140ab77',
    'user':{
      'id':'29234cd0-f308-432d-bb6a-8b199140ab77',
      'name':'Игорь Пятин','avatar':'/public/user6.jpg'
    },
    'ticks':[],
    'status':'green',
    'timeStatus':''
  };

  let wrapper;
  const createComponent = options => {
    wrapper = mount(TaskEdit, options);
  };

  beforeEach(() => {
    mocks.$router.go = jest.fn();
    mocks.$api.tasks.get = jest.fn(() => Promise.resolve(normalizedTask));
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('component is displayed after task is loaded', async () => {
    createComponent({ localVue, mocks, stubs, store });
    await flushPromises();
    expect(wrapper.html()).toBeTruthy();
  });

  it('redirects to previous page if request failed', async () => {
    mocks.$api.tasks.get = jest.fn(() => Promise.reject());
    createComponent({ mocks, stubs });
    await flushPromises();
    expect(mocks.$router.go).toHaveBeenCalledWith(-1);
  });
});
