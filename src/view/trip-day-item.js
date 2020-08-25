// import DayEvent from './day-event';
import Abstract from './abstract';

/**
 *
 * TODO переделать даты вместо slice на встроенные методы даты
 */

const createTripDayItem = (index, date) => {
  return `<li class="trip-days__item  day">
                <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">
                ${date}
                </time>
                </div>
                <ul class="trip-events__list"></ul>
              </li>`;
};

export default class TripDayItem extends Abstract {

  constructor(index, date) {
    super();
    this._index = index;
    this._date = date;
  }

  _getTemplate() {
    return createTripDayItem(
        this._index,
        this._date
    );
  }

  getDayEventContainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
