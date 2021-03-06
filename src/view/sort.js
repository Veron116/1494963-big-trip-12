import Abstract from './abstract';
import {
  SortType
} from '../const';

const createSortTemplate = () => {
  return `<main class="page-body__page-main page-main">
            <div class="page-body__container">
                <section class="trip-events">
                <h2 class="visually-hidden">Trip events</h2>
                <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
                            <span class="trip-sort__item  trip-sort__item--day">Day</span>

                            <div class="trip-sort__item  trip-sort__item--event">
                                <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
                                <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.EVENT}">Event</label>
                            </div>

                            <div class="trip-sort__item  trip-sort__item--time">
                                <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
                                <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME}">
                                    Time
                                    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                                    </svg>
                                </label>
                            </div>

                            <div class="trip-sort__item  trip-sort__item--price">
                                <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
                                <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE}">
                                    Price
                                    <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                                    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
                                    </svg>
                                </label>
                            </div>

                            <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
                        </form>
                    </section>
                </div>
            </main>`;
};

export default class Sort extends Abstract {
  constructor() {
    super();
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }
  _getTemplate() {
    return createSortTemplate();
  }
  getSortContainer() {
    return this.getElement().querySelector(`.page-body__container`);
  }

  _sortChangeHandler(evt) {
    if (!evt.target.classList.contains(`trip-sort__btn`)) {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortChangeHandler);
  }
}
