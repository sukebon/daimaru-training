import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: '',
});

export const spinnerState = atom({
  key: 'spinnerState',
  default: false,
});
