import {createElement} from '../utils';

const createTabHeaderTemplate = (tab) => {
  return `<a class="trip-tabs__btn ${tab.isActive ? `trip-tabs__btn--active` : ``}" href="#">${tab.name}</a>`;
};

const createTabsHeader = (tabs) => {
  const tabHeaderTemplate = tabs.map((tab) => createTabHeaderTemplate(tab)).join(``);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${tabHeaderTemplate}
          </nav>`;
};

export default class TabsHeader {
  constructor(tabs) {
    this._element = null;
    this._tabs = tabs;
  }

  getTemplate() {
    return createTabsHeader(this._tabs);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
