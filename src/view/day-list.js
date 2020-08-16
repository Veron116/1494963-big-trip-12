import {createElement} from '../utils';
import TripDayItemView from './trip-day-item';
/**
 *
 * @todo переделать даты вместо slice на встроенные методы даты
 */

const createDayList = (dateList, events, transports, services, cities, offers, srcs) => {
  return `<ul class="trip-days"></ul>`;
};

export default class DayList {
  constructor(dateList, events, transports, services, cities, offers, srcs) {
    this._element = null;
    this._dateList = dateList;
    this._events = events;
    this._transports = transports;
    this._services = services;
    this._cities = cities;
    this._offers = offers;
    this._srcs = srcs;
  }

  getTemplate() {
    return createDayList(this._dateList, this._events, this._transports, this._services, this._cities, this._offers, this._srcs);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    this._createDayItem().forEach((item) => this._element.appendChild(item));
    return this._element;
  }

  _createDayItem() {
    return Array.from(this._dateList).map((date, index) => {
      const dayEvents = this._events.filter((event) => {
        const eventDate = `${new Date(event.startDate)}`.slice(4, 10);
        return eventDate === date;
      });
      return new TripDayItemView(
        index,
        date,
        dayEvents,
        this._events,
        this._transports,
        this._services,
        this._cities,
        this._offers,
        this._srcs
      ).getElement();
    });
  }

  removeElement() {
    return (this._element = null);
  }
}
