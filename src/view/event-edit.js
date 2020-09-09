import Smart from './smart';
import {
  OFFERS
} from '../const';
import {
  generateDestinationInfo
} from '../utils/event-utils';

/**
 *
 * TODO переделать даты вместо slice на встроенные методы даты
 */

const createWaypointTemplate = (waypoint) => {
  return `<div class="event__type-item">
        <input id="event-type-${waypoint}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypoint}">
        <label class="event__type-label  event__type-label--${waypoint.toLowerCase()}" for="event-type-${waypoint}-1">${waypoint.toLowerCase()}</label>
    </div>`;
};
const createCityTemplate = (city) => {
  return `<option value="${city}"></option>`;
};

const createPhotoTemplate = (src) => {
  return `<img class="event__photo" src="${src}" alt="Event photo">`;
};

const createEventEditTemplate = ({
  id,
  startDate,
  endDate,
  price,
  offers,
  isFavorite
}, transports, services, cities, srcs) => {
  const transportTemplate = transports.map((transport) => createWaypointTemplate(transport)).join(``);
  const serviceTemplate = services.map((service) => createWaypointTemplate(service)).join(``);
  const cityTemplate = cities.map((city) => createCityTemplate(city)).join(``);
  const photoTemplate = srcs.map((src) => createPhotoTemplate(src));

  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
          <header class="event__header">
              <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                      <fieldset class="event__type-group">
                      <legend class="visually-hidden">Transfer</legend>
                        ${transportTemplate}
                      </fieldset>

                      <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>
                      ${serviceTemplate}
                      </fieldset>
                  </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                      Flight to
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                  <datalist id="destination-list-1">
                      ${cityTemplate}
                  </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">
                      From
                  </label>
                  <input
                  class="event__input  event__input--time"
                  id="event-start-time-1"
                  type="text"
                  name="event-start-time"
                  value="${new Date(startDate).toString().slice(4, 21)}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">
                      To
                  </label>
                  <input
                  class="event__input  event__input--time"
                  id="event-end-time-1"
                  type="text"
                  name="event-end-time"
                  value="${new Date(endDate).toString().slice(4, 21)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>

              <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
                <label class="event__favorite-btn" for="event-favorite-${id}">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </label>
          </header>

          <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
            ${OFFERS.map(
      (OFFER) => `
                      <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${
  OFFER.name
}" ${Array.from(offers).filter((offer) => offer.type === OFFER.type).length > 0 ? `checked` : ``}>
                        <label class="event__offer-label" for="event-offer-${OFFER.type}-1">
                          <span class="event__offer-title">${OFFER.name}</span>
                            &plus;
                            &euro;&nbsp;<span class="event__offer-price">${OFFER.price}</span>
                        </label>
                      </div>
                      `
  ).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${generateDestinationInfo()}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photoTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>`;
};

export default class EventEdit extends Smart {
  constructor(event, transports, services, cities, srcs, changeData) {
    super();

    this._data = EventEdit.parseEventToData(event);
    this._transports = transports;
    this._services = services;
    this._cities = cities;
    this._srcs = srcs;
    this._changeData = changeData;

    this._eventSubmitHandler = this._eventSubmitHandler.bind(this);
    this._eventResetClickHandler = this._eventResetClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);

    this.setInnerHandlers();
  }

  _getTemplate() {
    return createEventEditTemplate(this._data, this._transports, this._services, this._cities, this._srcs);
  }

  setInnerHandlers() {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`change`, this._favoriteClickHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceInputHandler);
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._eventResetClickHandler);
  }

  restoreHandlers() {
    this.setInnerHandlers();
    this.setEditSubmitHandler(this._callback.eventSubmit);

  }

  _eventSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.eventSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setEditSubmitHandler(callback) {
    this._callback.eventSubmit = callback;
    this.getElement().addEventListener(`submit`, this._eventSubmitHandler);
  }

  setResetClickHandler(callback) {
    this._callback.eventClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._eventResetClickHandler);
  }

  _eventResetClickHandler(evt) {
    evt.preventDefault();
    this._callback.eventClick();
  }

  _favoriteClickHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  static parseEventToData(event) {
    return Object.assign({},
      event, {
        isFavorite: event.isFavorite,
        price: event.price,
      }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    if (!data.isFavorite) {
      data.isFavorite = false;
    }

    return data;
  }

  reset(event) {
    this.updateData(
      EventEdit.parseEventToData(event)
    );
  }
}
