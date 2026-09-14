import React, { Fragment, useId, useRef, useEffect, useState } from 'react';
import { useFormContext, useGroup } from '@kne/react-form';
import { createPortal } from 'react-dom';
import { resolveDeclaredPath, resolveFieldListKey } from './fieldListKey';

const FieldList = props => {
  const { list, groupArgs, ignoreFieldProps, itemRender } = Object.assign({}, { ignoreFieldProps: [] }, props);
  const context = useFormContext();
  const { name: groupName, index: groupIndex } = useGroup();
  const sourceId = useId();
  const hiddenRef = useRef(null);
  const contextApi = Object.assign({}, context, groupArgs ? { groupArgs } : {});
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    const openApi = context.openApi;
    if (!openApi || typeof openApi.registerDeclaredPaths !== 'function') {
      return;
    }
    const paths = (Array.isArray(list) ? list : []).map(item => resolveDeclaredPath(item?.props?.name, groupName, groupIndex)).filter(Boolean);
    openApi.registerDeclaredPaths(sourceId, paths);
    return () => {
      openApi.unregisterDeclaredPaths && openApi.unregisterDeclaredPaths(sourceId);
    };
  }, [context.openApi, sourceId, list, groupName, groupIndex]);

  return (
    <>
      <div ref={hiddenRef} style={{ display: 'none' }} />
      {list
        .filter(item => {
          if (typeof item.props.display === 'function') {
            return item.props.display(contextApi);
          }
          return item.props.display !== false;
        })
        .map(item => {
          const key = resolveFieldListKey(item, groupArgs);
          const targetProps = { key, list, props: item.props },
            componentProps = Object.assign({}, item.props),
            ComponentItem = item.type;
          ['display', 'block', 'hidden', 'setExtraProps', 'isBlock', 'fieldKey', ...ignoreFieldProps].forEach(propKey => {
            if (item.props.hasOwnProperty(propKey)) {
              targetProps[propKey] = item.props[propKey];
            }
            delete componentProps[propKey];
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

          return <Fragment key={key}>{targetProps.hidden ? isMount && createPortal(innerComponent, hiddenRef.current) : itemRender(innerComponent, targetProps)}</Fragment>;
        })}
    </>
  );
};

export default FieldList;
