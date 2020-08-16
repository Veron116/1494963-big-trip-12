// import EventEditView from './event-edit';
import DayEventView from './day-event';
import {createElement} from '../utils';

/**
 *
 * @todo переделать даты вместо slice на встроенные методы даты
 */

const createTripDayItem = (index, date, dayEvents, events, transports, services, cities, offers, srcs) => {
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

export default class TripDayItem {
  constructor(index, date, dayEvents, events, transports, services, cities, offers, srcs) {
    this._element = null;
    this._index = index;
    this._date = date;
    this._dayEvents = dayEvents;
    this._events = events;
    this._transports = transports;
    this._services = services;
    this._cities = cities;
    this._offers = offers;
    this._srcs = srcs;
  }

  getTemplate() {
    return createTripDayItem(
      this._index,
      this._date,
      this._dayEvents,
      this._events,
      this._transports,
      this._services,
      this._cities,
      this._offers,
      this._srcs
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    const eventsList = this._element.querySelector(`.trip-events__list`);
    this._createDayEvents().forEach((dayEvent) => eventsList.appendChild(dayEvent));

    return this._element;
  }

  _createDayEvents() {
    return this._dayEvents.map((event, curIndex) => {
      // if (this._index === 0 && curIndex === 0) {
      //   return new EventEditView(event, this._transports, this._services, this._cities, this._offers, this._srcs).getElement();
      // }
      return new DayEventView(event).getElement();
    });
  }

  removeElement() {
    this._element = null;
  }
}
