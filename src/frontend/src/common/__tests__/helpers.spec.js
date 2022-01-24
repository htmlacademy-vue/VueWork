import {
  capitalize,
  createUUIDv4,
  getTagsArrayFromString,
  getReadableDate,
  getTimeAgo
} from '@/common/helpers';

describe('test helpers functions', () => {

  it('test capitalize', () => {
    expect(capitalize('word')).toBe('Word');
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('test createUUIDv4', () => {
    const uuid = createUUIDv4();
    expect(uuid.length).toBe(36);
  });

  it('test getTagsArrayFromString', () => {
    const tags = '#hello#world';
    const array = getTagsArrayFromString(tags);
    expect(array.length).toBe(2);
    expect(array[0]).toBe('hello');
    expect(array[1]).toBe('world');

    const tagsWithWhitespaces = '# my tag with space #another tag #caramba';
    const anotherArray = getTagsArrayFromString(tagsWithWhitespaces);
    expect(anotherArray.length).toBe(3);
    expect(anotherArray[0]).toBe(' my tag with space ');
    expect(anotherArray[1]).toBe('another tag ');
    expect(anotherArray[2]).toBe('caramba');
  });

  it('test getReadableDate', () => {
    // Note: month in JS is started from 0
    let date = getReadableDate(new Date(2020, 10, 11));
    expect(date).toBe('11.11.2020');

    date = getReadableDate(new Date(2020, 0, 1));
    expect(date).toBe('01.01.2020');
  });

  it('test getTimeAgo', () => {
    const now = new Date();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    const tenSecondsAgo = getTimeAgo(new Date(now - (30 * second)));
    expect(tenSecondsAgo).toBe('сейчас');

    const fiveMinutesAgo = getTimeAgo(new Date(now - (5 * minute)));
    expect(fiveMinutesAgo).toBe('5 минут назад');

    const treeHoursAgo = getTimeAgo(new Date(now - hour * 3));
    expect(treeHoursAgo).toBe('3 часа назад');

    const twoDaysAgo = getTimeAgo(new Date(now - day * 2));
    expect(twoDaysAgo).toBe('2 дня назад');

    const treeMonthsAgo = getTimeAgo(new Date(now - month * 3));
    expect(treeMonthsAgo).toBe('3 месяца назад');

    const fiveYearsAgo = getTimeAgo(new Date(now - year * 5));
    expect(fiveYearsAgo).toBe('5 лет назад');
  });
});
