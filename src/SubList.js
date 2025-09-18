import React, { useRef } from 'react';
import { GroupList, useFormContext } from '@kne/react-form';
import get from 'lodash/get';

const SubList = props => {
  const { itemTitle, name, column, list, listRender, maxLength, minLength, reverseOrder, beforeAdd, afterDelete, defaultLength, empty, children, ...others } = Object.assign(
    {},
    {
      minLength: 0,
      column: 2,
      reverseOrder: false,
      defaultLength: 1
    },
    props
  );

  const groupRef = useRef(null);
  const context = useFormContext();
  const { formData } = context;
  const dataLength = get(formData, `${name}.length`, 0);
  const allowAdd = !(maxLength && maxLength <= dataLength);
  return children(
    <GroupList name={name} defaultLength={defaultLength} ref={groupRef} empty={empty} reverseOrder={reverseOrder}>
      {(...groupArgs) => {
        //这里兼容一下新老版本
        const {
          id: key,
          index,
          onRemove,
          length
        } = (groupArgs => {
          if (typeof groupArgs[0] === 'object') {
            return groupArgs[0];
          }
          const [key, { index, onRemove, length }] = groupArgs;
          return { id: key, index, onRemove, length };
        })(groupArgs);

        return listRender({
          ...others,
          id: key,
          column,
          list: typeof list === 'function' ? list(...groupArgs, context) : list,
          title:
            typeof itemTitle === 'function'
              ? itemTitle({
                  index,
                  id: key,
                  onRemove
                })
              : itemTitle,
          groupArgs,
          allowRemove: !(minLength && minLength >= length),
          onRemove: () => {
            onRemove(key);
            afterDelete && afterDelete(...groupArgs, context);
          }
        });
      }}
    </GroupList>,
    {
      list,
      dataLength,
      minLength,
      maxLength,
      allowAdd,
      reverseOrder,
      onAdd: options => {
        if (
          typeof beforeAdd === 'function'
            ? beforeAdd(name, context, {
                reverseOrder,
                group: groupRef.current
              }) !== false
            : true
        ) {
          groupRef.current.onAdd(Object.assign({}, { isUnshift: true }, options));
        }
      }
    }
  );
};

export default SubList;
