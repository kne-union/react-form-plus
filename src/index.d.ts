import { ReactNode, ComponentType, FC, ForwardRefExoticComponent, RefAttributes } from 'react';

// 基础类型定义
export interface ContextApi {
  groupArgs?: any[];
  [key: string]: any;
}

export interface TargetProps {
  key: string | number;
  list: any[];
  props: any;
  display?: boolean | ((context: ContextApi) => boolean);
  block?: boolean;
  hidden?: boolean;
  setExtraProps?: (params: { props: any; contextApi: ContextApi }) => any;
  isBlock?: boolean;
  span?: number;
  [key: string]: any;
}

export interface GroupArgs {
  id: string;
  index: number;
  onRemove: (id: string) => void;
  length: number;
  [key: string]: any;
}

export interface TableHeaderProps {
  children: (headers: ReactNode[], props: { width: string }) => ReactNode;
  headerItemRender?: (label: ReactNode, props: { isReq: boolean; id: string }) => ReactNode;
  display?: boolean;
}

export interface SubListRenderProps {
  id: string;
  column?: number;
  list?: ReactNode[] | ((...groupArgs: any[]) => ReactNode[]);
  title?: ReactNode;
  groupArgs: any[];
  allowRemove: boolean;
  onRemove: () => void;
  [key: string]: any;
}

export interface SubListControlProps {
  list?: ReactNode[] | ((...groupArgs: any[]) => ReactNode[]);
  dataLength: number;
  minLength?: number;
  maxLength?: number;
  allowAdd: boolean;
  reverseOrder?: boolean;
  onAdd: (options?: { isUnshift?: boolean }) => void;
}

// FieldList 组件 Props
export interface FieldListProps {
  list: Array<{
    type: ComponentType<any>;
    props: {
      name?: string;
      display?: boolean | ((context: ContextApi) => boolean);
      block?: boolean;
      hidden?: boolean;
      setExtraProps?: (params: { props: any; contextApi: ContextApi }) => any;
      isBlock?: boolean;
      onChange?: (...args: any[]) => any;
      [key: string]: any;
    };
  }>;
  groupArgs?: any[];
  ignoreFieldProps?: string[];
  itemRender?: (children: ReactNode, targetProps: TargetProps) => ReactNode;
}

// FormInfo 组件 Props
export interface FormInfoProps {
  list: Array<{
    type: ComponentType<any>;
    props: any;
  }>;
  groupArgs?: any[];
  column?: number;
  itemRender?: (children: ReactNode, targetProps: TargetProps) => ReactNode;
  children: (content: ReactNode, others: any) => ReactNode;
  [key: string]: any;
}

// MultiField 组件 Props
export interface MultiFieldProps {
  name: string;
  label?: ReactNode;
  rule?: string;
  field: ComponentType<any>;
  defaultLength?: number;
  minLength?: number;
  maxLength?: number;
  children: (content: ReactNode, controls: { allowAdd: boolean; reverseOrder: boolean; onAdd: (options?: { isUnshift?: boolean }) => void }) => ReactNode;
  itemRender?: (field: ReactNode, groupArgs: GroupArgs) => ReactNode;
  empty?: ReactNode;
  reverseOrder?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

// SubList 组件 Props
export interface SubListProps {
  itemTitle?: ReactNode | ((params: { index: number; id: string; onRemove: (id: string) => void }) => ReactNode);
  name: string;
  column?: number;
  list?: ReactNode[] | ((...groupArgs: any[]) => ReactNode[]);
  listRender?: (props: SubListRenderProps) => ReactNode;
  maxLength?: number;
  minLength?: number;
  reverseOrder?: boolean;
  beforeAdd?: (name: string, context: any, params: { reverseOrder: boolean; group: any }) => boolean | void;
  afterDelete?: (...groupArgs: any[]) => void;
  defaultLength?: number;
  empty?: ReactNode;
  children: (content: ReactNode, controls: SubListControlProps) => ReactNode;
  [key: string]: any;
}

// TableList 组件 Props
export interface TableListProps {
  list?: ReactNode[] | ((...groupArgs: any[]) => ReactNode[]);
  children?: (inner: ReactNode, others: SubListControlProps) => ReactNode;
  listRender?: (content: ReactNode, props: SubListRenderProps & { width: string }) => ReactNode;
  itemRender?: (children: ReactNode, targetProps: TargetProps) => ReactNode;
  headerRender?: (headers: ReactNode[], props: { width: string }) => ReactNode;
  headerItemRender?: (label: ReactNode, props: { isReq: boolean; id: string }) => ReactNode;
  itemTitle?: ReactNode | ((params: { index: number; id: string; onRemove: (id: string) => void }) => ReactNode);
  name: string;
  column?: number;
  maxLength?: number;
  minLength?: number;
  reverseOrder?: boolean;
  beforeAdd?: (name: string, context: any, params: { reverseOrder: boolean; group: any }) => boolean | void;
  afterDelete?: (...groupArgs: any[]) => void;
  defaultLength?: number;
  empty?: ReactNode;
  [key: string]: any;
}

// 组件类型声明
export declare const FieldList: FC<FieldListProps>;
export declare const FormInfo: FC<FormInfoProps>;
export declare const MultiField: FC<MultiFieldProps>;
export declare const SubList: FC<SubListProps>;
export declare const TableList: FC<TableListProps>;

// TableHeader 组件类型声明
export declare const TableHeader: ForwardRefExoticComponent<TableHeaderProps & RefAttributes<any>>;

// 默认导出
export default FormInfo;
