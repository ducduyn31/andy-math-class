export interface SelectableOption {
  uniqueKey: string;
  value: any;
  label: string;
  isDefault?: boolean;
  disabled?: boolean;
}

export enum SelectOptions {
  ANY_DEFAULT = "Any",
  NONE = "None",
}

export const isSelectableOption = (
  option: SelectOption
): option is SelectableOption => {
  return (option as SelectableOption).uniqueKey !== undefined;
};

export type SelectOption = SelectableOption | SelectOptions;
