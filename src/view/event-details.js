import {isChecked} from '../utils';
import {generateDestinationInfo} from '../mock/event';

console.log(generateDestinationInfo());

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

export const createEventDetails = (offers) => {
  const offerTemplate = offers.map((offer) => createOfferTemplate(offer)).join(``);

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
                <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
              </div>
            </div>
          </section>
        </section>`;
};
