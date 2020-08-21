import AbstractView from './abstract';
import TripDayItemView from './trip-day-item';

/**
 *
 * TODO переделать даты вместо slice на встроенные методы даты
 */

const createDayList = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class DayList extends AbstractView {
  constructor(dateList, events, transports, services, cities, offers, srcs) {
    super();
    this._dateList = dateList;
    this._events = events;
    this._transports = transports;
    this._services = services;
    this._cities = cities;
    this._offers = offers;
    this._srcs = srcs;
  }

  _getTemplate() {
    return createDayList(this._dateList, this._events, this._transports, this._services, this._cities, this._offers, this._srcs);
  }

  _addChildComponents() {

    this._createDayItem().forEach((item) => this._element.appendChild(item));

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
}
