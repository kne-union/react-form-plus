import React, { useRef } from 'react';
import { GroupList, useFormContext } from '@kne/react-form';
import get from 'lodash/get';

const SubList = props => {
  const { title, itemTitle, name, column, list, listRender, maxLength, minLength, isUnshift, beforeAdd, afterDelete, defaultLength, className, empty, children } = Object.assign(
    {},
    {
      minLength: 0,
      column: 2,
      isUnshift: true,
      defaultLength: 1
    },
    props
  );

  const groupRef = useRef(null);
  const context = useFormContext();
  const { formData } = context;
  const allowAdd = !(maxLength && maxLength <= get(formData, `${name}.length`, 0));
  return children(
    <GroupList name={name} defaultLength={defaultLength} ref={groupRef} empty={empty}>
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
      title,
      className,
      allowAdd,
      isUnshift,
      onAdd: () => {
        if (
          typeof beforeAdd === 'function'
            ? beforeAdd(name, context, {
                isUnshift,
                group: groupRef.current
              }) !== false
            : true
        ) {
          groupRef.current.onAdd({ isUnshift });
        }
      }
    }
  );
};

export default SubList;
