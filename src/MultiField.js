import React, { useRef } from 'react';
import { GroupList, useFormContext } from '@kne/react-form';
import get from 'lodash/get';

const MultiField = props => {
  const { name, label, rule, field, defaultLength, minLength, maxLength, children, itemRender, empty, ...others } = Object.assign({}, { defaultLength: 1, minLength: 0 }, props);
  const ref = useRef(null);
  const CurrentFiled = field;
  const context = useFormContext();
  const { formData } = context;
  const allowAdd = !(maxLength && maxLength <= get(formData, `${name}.length`, 0));
  return children(
    <GroupList ref={ref} name={name} defaultLength={Math.max(defaultLength, minLength, 1)} empty={empty}>
      {(...groupArgs) => {
        //这里兼容一下新老版本
        const { id, index, onRemove, length } = (groupArgs => {
          if (typeof groupArgs[0] === 'object') {
            return groupArgs[0];
          }
          const [key, { index, onRemove, length }] = groupArgs;
          return { id: key, index, onRemove, length };
        })(groupArgs);

        const allowRemove = length > Math.max(minLength, 1);
        return itemRender(<CurrentFiled {...others} name={name} label={label} rule={rule} />, {
          id,
          index,
          allowRemove,
          onRemove
        });
      }}
    </GroupList>,
    {
      allowAdd,
      onAdd: () => {
        ref.current.onAdd();
      }
    }
  );
};

export default MultiField;
