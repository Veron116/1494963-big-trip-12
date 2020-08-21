import {
  generateDestinationInfo
} from '../utils';
import AbstractView from './abstract';
import {
  OFFERS
} from '../const';

const createPhotoTemplate = (src) => {
  return `<img class="event__photo" src=${src} alt="Event photo">`;
};

const createEventDetails = ({
  offers
}, srcs) => {
  const photoTemplate = srcs.map((src) => createPhotoTemplate(src));

  return `<section class="event__details">
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
        </section>`;
};

export default class EventDetails extends AbstractView {
  constructor(event, srcs) {
    super();
    this._event = event;
    this._srcs = srcs;
  }

  _getTemplate() {
    return createEventDetails(this._event, this._srcs);
  }
}
