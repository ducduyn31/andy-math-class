export enum FileStateCategory {
  NEW = "new",
  REMOVE = "remove",
  CHANGE_ORDER = "change_order",
  ONLINE = "online",
}

export interface ExistingFileState {
  state:
    | FileStateCategory.ONLINE
    | FileStateCategory.CHANGE_ORDER
    | FileStateCategory.REMOVE;
  value: string;
  order: number;
}

export interface NewFileState {
  state: FileStateCategory.NEW;
  value: File;
  order: number;
}

export type FileState = ExistingFileState | NewFileState;

export const getNewFileStates = (fileStates: FileState[]): NewFileState[] => {
  return fileStates.filter(
    (fileState) => fileState.state === FileStateCategory.NEW
  ) as NewFileState[];
};

export const getDeletingFiles = (
  fileStates: FileState[]
): ExistingFileState[] => {
  return fileStates.filter(
    (fileState) => fileState.state === FileStateCategory.REMOVE
  ) as ExistingFileState[];
};

export const getNextOrder = (fileStates: FileState[]): number => {
  if (fileStates.length === 0) return 0;
  const maxOrder = fileStates.reduce((max, fileState) => {
    return fileState.order > max ? fileState.order : max;
  }, 0);
  return maxOrder + 1;
};

export const findStateIndex = (
  allStates: FileState[],
  state: FileState
): number => {
  const isSameExistingFileState = (
    state1: FileState,
    state2: FileState
  ): boolean => {
    return (
      typeof state1.value === "string" &&
      typeof state2.value === "string" &&
      state1.value === state2.value
    );
  };

  const isSameNewFileState = (
    state1: FileState,
    state2: FileState
  ): boolean => {
    return (
      state1.state === FileStateCategory.NEW &&
      state2.state === FileStateCategory.NEW &&
      state1.value.name === state2.value.name
    );
  };

  for (let i = 0; i < allStates.length; i++) {
    if (
      isSameExistingFileState(state, allStates[i]) ||
      isSameNewFileState(state, allStates[i])
    ) {
      return i;
    }
  }
  return -1;
};
