import {
  createElement
} from '../utils';;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    // if (!this._addChildComponents()) {
    this._addChildComponents();
    // }

    return this._element;
  }

  _addChildComponents() {
    // return false;
  }

  removeElement() {
    this._element = null;
  }
}
