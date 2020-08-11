import {generateRandomDate} from '../utils';
import {TRIP_DAYS_COUNT} from '../const';
import {createEventDetails} from './event-details';

const createWaypointTemplate = (waypoint) => {
  return `
    <div class="event__type-item">
        <input id="event-type-${waypoint}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${waypoint}">
        <label class="event__type-label  event__type-label--${waypoint.toLowerCase()}" for="event-type-${waypoint}-1">${waypoint.toLowerCase()}</label>
    </div>
    `;
};
const createCityTemplate = (city) => {
  return `
        <option value="${city}"></option>
    `;
};

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear() - 2000;

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

const countDates = () => {
  return {
    startDate: new Date(),
    endDate: new Date(generateRandomDate(TRIP_DAYS_COUNT)),
  };
};

export const createEventEditTemplate = (transports, services, cities, offers, srcs) => {
  const transportTemplate = transports.map((transport) => createWaypointTemplate(transport)).join(``);
  const serviceTemplate = services.map((service) => createWaypointTemplate(service)).join(``);
  const cityTemplate = cities.map((city) => createCityTemplate(city)).join(``);

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
                  value="${formatDate(countDates().startDate)} ${countDates().startDate.getHours()}:${countDates().startDate.getMinutes()}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">
                      To
                  </label>
                  <input 
                  class="event__input  event__input--time" 
                  id="event-end-time-1" 
                  type="text" 
                  name="event-end-time" 
                  value="${formatDate(countDates().endDate)} ${countDates().endDate.getHours()}:${countDates().endDate.getMinutes()}">
              </div>
  
              <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>
  
              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          ${createEventDetails(offers, srcs)}
          </form>`;
};
