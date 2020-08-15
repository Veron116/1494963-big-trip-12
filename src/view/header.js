import {createElement} from '../utils';

const createHeaderTemplate = (tabs) => {
  return `<header class="page-header">
      <div class="page-body__container page-header__container">
        <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo" />

        <div class="trip-main">
          <div class="trip-main__trip-controls trip-controls">
            <h2 class="visually-hidden">Switch trip view</h2>
            <h2 class="visually-hidden">Filter events</h2>
          </div>

          <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">
            New event
          </button>
        </div>
      </div>
    </header>`;
};

export default class Header {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderTemplate();
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
