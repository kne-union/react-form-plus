import React, { Fragment } from 'react';
import { useFormContext } from '@kne/react-form';

const FieldList = props => {
  const { list, groupArgs, ignoreFieldProps, itemRender } = Object.assign({}, { ignoreFieldProps: [] }, props);
  const context = useFormContext();
  const contextApi = Object.assign({}, context, groupArgs ? { groupArgs } : {});
  return (
    <>
      {list
        .filter(item => {
          if (typeof item.props.display === 'function') {
            return item.props.display(contextApi);
          }
          return item.props.display !== false;
        })
        .map((item, index) => {
          const key = item.props.name + index || (groupArgs && groupArgs[0] + index) || index;
          const targetProps = { key, list, props: item.props },
            componentProps = Object.assign({}, item.props),
            ComponentItem = item.type;
          ['display', 'block', 'hidden', 'setExtraProps', 'isBlock', ...ignoreFieldProps].forEach(key => {
            if (item.props.hasOwnProperty(key)) {
              targetProps[key] = item.props[key];
            }
            delete componentProps[key];
          });

          if (targetProps.hasOwnProperty('isBlock')) {
            componentProps['block'] = targetProps.isBlock;
          }
          const innerComponent = (
            <ComponentItem
              {...Object.assign(
                {},
                componentProps,
                typeof targetProps.setExtraProps === 'function'
                  ? targetProps.setExtraProps({
                      props: componentProps,
                      contextApi
                    })
                  : {}
              )}
              onChange={(...args) => {
                return item.props.onChange && item.props.onChange(...args, contextApi);
              }}
            />
          );

          return <Fragment key={key}>{itemRender(innerComponent, targetProps)}</Fragment>;
        })}
    </>
  );
};

export default FieldList;
