const resolveGroupMeta = groupArgs => {
  if (!groupArgs) {
    return {};
  }
  const first = groupArgs[0];
  if (first && typeof first === 'object') {
    return { id: first.id, index: first.index };
  }
  if (typeof first === 'string' || typeof first === 'number') {
    return { id: first, index: groupArgs[1]?.index };
  }
  return {};
};

export const resolveFieldListKey = (item, groupArgs) => {
  const props = (item && item.props) || {};
  if (props.fieldKey != null && props.fieldKey !== '') {
    return String(props.fieldKey);
  }
  if (item && item.key != null && item.key !== '') {
    return String(item.key);
  }
  const { id: groupId } = resolveGroupMeta(groupArgs);
  const name = props.name;
  if (name != null && name !== '') {
    return groupId != null && groupId !== '' ? `${groupId}:${name}` : String(name);
  }
  return groupId != null && groupId !== '' ? `${groupId}:$unnamed` : '$unnamed';
};

export const resolveDeclaredPath = (name, groupName, groupIndex) => {
  if (name == null || name === '') {
    return null;
  }
  if (groupName && groupIndex != null && groupIndex !== -1) {
    return `${groupName}["${groupIndex}"].${name}`;
  }
  return String(name);
};

export { resolveGroupMeta };
