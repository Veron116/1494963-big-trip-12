import {createElement, replaceNewToOld} from '../utils';
import EventEditView from './event-edit';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS} from '../const';
//импортнуть константы для формы
/**
 *
 * @todo - переделать даты вместо slice на встроенные методы даты
 * - переделать логику с офферами и прайсом
 */
const createDayEvent = ({checkinType, city, startDate, endDate, hours, minutes, offers, price}) => {
  return `<li class="trip-days__item  day">
            <div class="event">
              <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${checkinType.toLowerCase()}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${checkinType} to ${city}</h3>
              <div class="event__schedule">
                  <p class="event__time">
                      <time class="event__start-time" datetime="${new Date(startDate).toString().slice(4, 21)}">${new Date(startDate)
    .toTimeString()
    .slice(0, 5)}</time>
                      &mdash;
                      <time class="event__end-time" datetime="${new Date(endDate).toString().slice(4, 21)}">${new Date(endDate)
    .toTimeString()
    .slice(0, 5)}</time>
                  </p>
                  <p class="event__duration">${hours}H ${minutes}M</p>
              </div>
              <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                  ${Array.from(offers)
                    .map(
                      (item) => `<li class="event__offer">
                  <span class="event__offer-title">${item.name}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
              </li>`
                    )
                    .join(
                      ``
                    )}</ul><button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button></div></li>`;
};

export default class DayEvent {
  constructor(event, srcs) {
    this._event = event;
    this._editElement = null;
    this._element = null;
    this._srcs = srcs;
  }

  getTemplate() {
    return createDayEvent(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._editElement = new EventEditView(this._event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, this._srcs).getElement();
    }

    this._eventListeners(this._element, this._element.querySelector(`.event`), this._editElement);
    return this._element;
  }

  _eventListeners(container, card, form) {
    this._element.querySelector(`.event__rollup-btn`).addEventListener(`click`, (e) => {
      replaceNewToOld(container, form, card);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._editElement.addEventListener(`submit`, (e) => {
      e.preventDefault();
      replaceNewToOld(container, card, form);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._editElement.querySelector(`.event__reset-btn`).addEventListener(`click`, (e) => {
      e.preventDefault();
      replaceNewToOld(container, card, form);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        e.preventDefault();
        replaceNewToOld(container, card, form);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  removeElement() {
    return (this._element = null);
  }
}
