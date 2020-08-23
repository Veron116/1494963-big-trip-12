import {
  createElement
} from '../utils';;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    this._addChildComponents();

    return this._element;
  }

  _addChildComponents() {}

  removeElement() {
    this._element = null;
  }
}
