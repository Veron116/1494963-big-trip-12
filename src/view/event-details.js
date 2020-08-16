import {isChecked, generateDestinationInfo, createElement} from '../utils';

const createOfferTemplate = ({type, name, price}) => {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${type}-1"
      type="checkbox" name="event-offer-${type}"
      ${isChecked() ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const createPhotoTemplate = (src) => {
  return `<img class="event__photo" src=${src} alt="Event photo">`;
};

const createEventDetails = (offers, srcs) => {
  const offerTemplate = offers.map((offer) => createOfferTemplate(offer)).join(``);
  const photoTemplate = srcs.map((src) => createPhotoTemplate(src));

  return `<section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offerTemplate}
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

export default class EventDetails {
  constructor(offers, srcs) {
    this._element = null;
    this._offers = offers;
    this._srcs = srcs;
  }

  getTemplate() {
    return createEventDetails(this._offers, this._srcs);
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
