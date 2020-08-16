import {createElement} from '../utils';
/**
 *
 * @todo переделать даты вместо slice на встроенные методы даты
 */
const createDayEvent = ({checkinType, city, offer, startDate, endDate, hours, minutes}) => {
  return `<div class="event">
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
              &euro;&nbsp;<span class="event__price-value">${offer.price}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                  <li class="event__offer">
                      <span class="event__offer-title">${offer.name}</span>
                      &plus;
                      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                  </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
              </button>
          </div>`;
};

export default class DayEvent {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createDayEvent(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    return (this._element = null);
  }
}
