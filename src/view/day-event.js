import Abstract from './abstract';
import {
  formatDate
} from '../utils/event-utils';

const createDayEvent = ({
  checkinType,
  city,
  startDate,
  endDate,
  // hours,
  // minutes,
  offers,
  price
}) => {
  // console.log(Math.abs(startDate - endDate));
  // console.log('hours', hours);
  // console.log('minutes', minutes);
  const hours = new Date(Math.abs(startDate - endDate)).getHours();
  const minutes = new Date(Math.abs(startDate - endDate)).getMinutes();
  // console.log('day: ', startDate, endDate);


  return `<li class="trip-days__item  day">
            <div class="event">
              <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${checkinType.toLowerCase()}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${checkinType} to ${city}</h3>
              <div class="event__schedule">
                  <p class="event__time">
                      <time class="event__start-time" datetime="${formatDate(new Date(startDate))}">${formatDate(new Date(startDate))}</time>
                      &mdash;
                      <time class="event__end-time" datetime="${formatDate(new Date(endDate))}">${formatDate(new Date(endDate))}</time>
                  </p>
                  <p class="event__duration">${hours}H ${minutes}M</p>
              </div>
              <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                  ${Array.from(offers).map((item) =>
    `<li class="event__offer">
                  <span class="event__offer-title">${item.name}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
              </li>`).join(``)}
              </ul><button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button></div></li>`;
};

export default class DayEvent extends Abstract {
  constructor(event) {
    super();
    this._event = event;
    this._clickHandler = this._clickHandler.bind(this);
    console.log('day: ', this._event);
  }

  _getTemplate() {
    return createDayEvent(this._event);
  }

  getEventCard() {
    return this.getElement().querySelector(`.event`);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
}
