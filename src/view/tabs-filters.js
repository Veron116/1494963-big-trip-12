import {createElement} from '../utils';

const createFiterTemplate = ({name, isChecked}) => {
  return `<div class="trip-filters__filter">
                <input
                id="filter-${name.toLowerCase()}"
                class="trip-filters__filter-input
                visually-hidden" type="radio" name="trip-filter"
                value="${name.toLowerCase()}"
                ${isChecked ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
            </div>`;
};

const createTabsFilters = (filterTypes) => {
  const filterTemplate = filterTypes.map((filterType) => createFiterTemplate(filterType)).join(``);
  return `<form class="trip-filters" action="#" method="get">
        ${filterTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`;
};

export default class TabsFilters {
  constructor(filterTypes) {
    this._element = null;
    this._filterTypes = filterTypes;
  }

  getTemplate() {
    return createTabsFilters(this._filterTypes);
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
