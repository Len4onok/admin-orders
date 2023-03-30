export interface IAnyObject<T> {
  [key: string]: T
}

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ORDER_STATUS {
  COMPLETE = 'Выполнен',
  NEW = 'Новый',
}
export interface IOrder {
  id: number,
  name: string,
  address: string,
  date: string,
  status: string,
  comment: string,
}

// TABLES

export interface ITableHead {
  title?: string,
  columns: IAnyObject<string>
  sortable?: string[]
}

export const enum TABLE_CELL_COMPONENT {
  DEFAULT = 'TableCellDefault',
  BUTTONS = 'TableCellButtons',
}

export interface IButtonItem<R = IAnyObject<any>> {
  name: string,
  mode?: string
  disabled?: boolean,
  handler: (row: R) => void
}

export interface ITableConfigCellButton<R = IAnyObject<any>> {
  type: TABLE_CELL_COMPONENT.BUTTONS,
  items: (row: R) => IButtonItem<R>[]
}

export type TTableConfigCell<R> = ((row: R) => string)
  | ITableConfigCellButton<R>

export interface ITableConfig<R = IAnyObject<any>> {
  grid?: Partial<CSSStyleDeclaration>,
  otherStyle?: (row: R) => Partial<CSSStyleDeclaration>,
  values?: { [key: string]: TTableConfigCell<R> }
}

export interface ISelectionButton {
  name: string,
  label?: string,
  value?: string
}
