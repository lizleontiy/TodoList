import { IndexedDB } from '@/utils/IndexedDB'

export interface IFormView {
  root: HTMLDivElement,
  input: HTMLInputElement,
  submitButton: HTMLButtonElement,
  init: () => void,
  createElement: (tag: string, className?: string | string[], text?: string) => HTMLElement,
  disableSubmitButton: () => void,
  enableSubmitButton: () => void,
}

export interface ITodoModel {
  indexedDB: IndexedDB,
  init: () => void,
}