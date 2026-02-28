import { create } from 'zustand';

export const DIALOG_KEY = {
  CREATE_TODO: 'createTodo',
  CREATE_USER: 'createUser',
  CREATE_ROLE: 'createRole',
} as const;

type DialogKey = (typeof DIALOG_KEY)[keyof typeof DIALOG_KEY];

type DialogData = Record<string, unknown>;

type DialogState = {
  openDialogs: Record<string, boolean>;
  dialogData: Record<string, DialogData>;
  openDialog: (key: DialogKey, data?: DialogData) => void;
  closeDialog: (key: DialogKey) => void;
  getDialogData: <T = DialogData>(key: DialogKey) => T | undefined;
};

export const useDialogStore = create<DialogState>((set, get) => ({
  openDialogs: {},
  dialogData: {},
  openDialog: (key, data) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [key]: true },
      dialogData: data
        ? { ...state.dialogData, [key]: data }
        : state.dialogData,
    })),
  closeDialog: (key) =>
    set((state) => {
      const { [key]: _, ...remainingData } = state.dialogData;
      return {
        openDialogs: { ...state.openDialogs, [key]: false },
        dialogData: remainingData,
      };
    }),
  getDialogData: <T = DialogData>(key: DialogKey) =>
    get().dialogData[key] as T | undefined,
}));
