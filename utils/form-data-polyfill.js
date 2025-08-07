// Browser polyfill for form-data
export default class FormData {
  constructor() {
    return new globalThis.FormData();
  }
}
