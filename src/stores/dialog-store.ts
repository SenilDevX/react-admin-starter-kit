import { create } from 'zustand';

export const DIALOG_KEY = {
  CREATE_TODO: 'createTodo',
  CREATE_USER: 'createUser',
  CREATE_ROLE: 'createRole',
} as const;

type DialogKey = (typeof DIALOG_KEY)[keyof typeof DIALOG_KEY];

type DialogState = {
  openDialogs: Record<string, boolean>;
  openDialog: (key: DialogKey) => void;
  closeDialog: (key: DialogKey) => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  openDialogs: {},
  openDialog: (key) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [key]: true },
    })),
  closeDialog: (key) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [key]: false },
    })),
}));
