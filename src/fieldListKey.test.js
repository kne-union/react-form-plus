import { resolveDeclaredPath, resolveFieldListKey } from './fieldListKey';

describe('resolveFieldListKey', () => {
  test('优先使用 fieldKey，不拼 list 下标', () => {
    expect(resolveFieldListKey({ props: { name: 'title', fieldKey: 'k1' } }, null)).toBe('k1');
    expect(resolveFieldListKey({ props: { name: 'title' }, key: 'elem' }, null)).toBe('elem');
  });

  test('同名字段在前缀变长后 key 保持稳定', () => {
    const item = { props: { name: 'remark' } };
    expect(resolveFieldListKey(item, null)).toBe('remark');
    expect(resolveFieldListKey(item, null)).toBe('remark');
  });

  test('分组内用 group id 而不是下标', () => {
    const item = { props: { name: 'title' } };
    expect(resolveFieldListKey(item, [{ id: 'g-a', index: 0 }])).toBe('g-a:title');
    expect(resolveFieldListKey(item, [{ id: 'g-a', index: 2 }])).toBe('g-a:title');
  });

  test('兼容旧版 groupArgs 第一项为 id', () => {
    expect(resolveFieldListKey({ props: { name: 'title' } }, ['g-b', { index: 1 }])).toBe('g-b:title');
  });
});

describe('resolveDeclaredPath', () => {
  test('顶层字段用 name', () => {
    expect(resolveDeclaredPath('title')).toBe('title');
  });

  test('分组字段用 groupName 与 index', () => {
    expect(resolveDeclaredPath('title', 'users', 1)).toBe('users["1"].title');
  });

  test('无 name 不登记', () => {
    expect(resolveDeclaredPath(undefined, 'users', 0)).toBe(null);
  });
});
