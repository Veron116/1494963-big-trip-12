import Abstract from './abstract';
import {
  shortFormatDate
} from '../utils/event-utils';


const createTripDayItem = (date, index) => {
  return `<li class="trip-days__item  day">
                <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="${shortFormatDate(new Date(date))}">
                ${shortFormatDate(new Date(date))}
                </time>
                </div>
                <ul class="trip-events__list"></ul>
              </li>`;
};

export default class TripDayItem extends Abstract {

  constructor(date, index) {
    super();

    this._index = index;
    this._date = date;
  }

  _getTemplate() {
    return createTripDayItem(
      this._date,
      this._index
    );
  }

  getDayEventContainer() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
