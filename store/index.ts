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

export const postsState = atom({
  key: 'postsState',
  default: [],
});

export const alreadyReadListState = atom({
  key: 'alreadyReadListState',
  default: [],
});

export const activeSidebarItemState = atom({
  key: 'activeSidebarItemState',
  default: '',
});

export const drawerState = atom<boolean>({
  key: 'drawerState',
  default: false,
});
