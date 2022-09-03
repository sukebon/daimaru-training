import { atom } from 'recoil';

export const authState = atom<string>({
  key: 'authState',
  default: '',
});

export const spinnerState = atom<boolean>({
  key: 'spinnerState',
  default: false,
});

export const categoriesState = atom({
  key: 'categoriesState',
  default: [],
});

export const subCategoriesState = atom({
  key: 'subCategoriesState',
  default: [],
});
