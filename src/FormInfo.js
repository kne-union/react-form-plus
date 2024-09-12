import React from 'react';
import FieldList from './FieldList';

const FormInfo = props => {
  const { list, groupArgs, column, itemRender, children, ...others } = Object.assign({}, { column: 2 }, props);
  return children(
    <FieldList
      list={list}
      itemRender={(children, targetProps) =>
        itemRender(
          children,
          Object.assign({}, targetProps, {
            span: targetProps.block === true ? 24 : Math.round(24 / (column || 1))
          })
        )
      }
    />,
    others
  );
};

export default FormInfo;
