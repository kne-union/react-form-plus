import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import SubList from './SubList';
import FieldList from './FieldList';
import clone from 'lodash/clone';

const TableHeader = forwardRef((props, ref) => {
  const { children, headerItemRender } = Object.assign({}, props);
  const [headers, setHeaders] = useState(new Map());
  useImperativeHandle(ref, () => {
    return targetProps => {
      setTimeout(() => {
        setHeaders(headers => {
          if (headers.has(targetProps.key)) {
            return headers;
          }
          const newHeaders = clone(headers);
          newHeaders.set(targetProps.key, targetProps.props);
          return newHeaders;
        });
      });
    };
  }, []);
  return children(
    Array.from(headers).map(([id, { label, rule }]) => {
      return headerItemRender(label, {
        isReq: (rule || '').split(' ').indexOf('REQ') === 0,
        id
      });
    }),
    {
      width: `${100 / headers.size}%`
    }
  );
});

const TableList = props => {
  const headerRef = useRef(null);
  const { list, children, listRender, itemRender, headerRender, headerItemRender, ...others } = Object.assign(
    {},
    {
      children: inner => inner
    },
    props
  );
  return (
    <SubList
      {...others}
      list={list}
      listRender={({ list, groupArgs, id, ...props }) => {
        return listRender(
          <FieldList
            list={list}
            groupArgs={groupArgs}
            itemRender={(children, targetProps) => {
              headerRef.current(targetProps);
              return itemRender(children, targetProps);
            }}
          />,
          {
            width: `${100 / list.length}%`,
            ...props
          }
        );
      }}
    >
      {(inner, others) => {
        return children(
          <>
            <TableHeader ref={headerRef} headerItemRender={headerItemRender}>
              {headerRender}
            </TableHeader>
            {inner}
          </>,
          others
        );
      }}
    </SubList>
  );
};

export default TableList;
