import {render} from './utils';
import {createHeaderTemplate} from './view/header';
import {tripInfo} from './view/trip-info';
import {createTabsHeader} from './view/tabs-header';
import {createTabsFilters} from './view/tabs-filters';
import {sort} from './view/sort';
import {createEventEditTemplate} from './view/event-edit';
import {createEventDetails} from './view/event-details';
import {createTripDayItem} from './view/trip-day-item';
// import {createDayEvent} from './view/day-event';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, TRIP_DAYS_COUNT} from './const';
import {generatePhotoSrcs, countDates} from './utils';
import {generateEvent} from './mock/event';
import {filterTabs, filterTypes} from './mock/filter';

const EVENT_COUNT = 7;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
console.log(events);

const bodyElement = document.querySelector(`.page-body`);
render(bodyElement, createHeaderTemplate(), `afterbegin`);
render(bodyElement, sort(OFFERS, generatePhotoSrcs()), `beforeend`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
render(tripMainElement, tripInfo(), `afterbegin`);
const tabsControlsElement = bodyElement.querySelector(`.trip-controls`);
render(tabsControlsElement, createTabsHeader(filterTabs), `afterbegin`);
render(tabsControlsElement, createTabsFilters(filterTypes), `beforeend`);
const contentElement = bodyElement.querySelector(`.trip-events`);

// const headerElement = document.querySelector(`.page-header`);
// const tripMainElement = headerElement.querySelector(`.trip-main`);
// render(tripMainElement, tripInfo(), `afterbegin`);

// render(contentElement, sort(), `afterbegin`);
render(contentElement, createEventEditTemplate(TRANSPORT_TYPE, SERVICE_TYPE, CITIES), `beforeend`);
// const chooseEventWrapElement = contentElement.querySelector(`.trip-events__item`);
// render(chooseEventWrapElement, createEventDetails(OFFERS, generatePhotoSrcs()), `beforeend`);
const tripDayWrapElement = contentElement.querySelector(`.trip-days`);
render(tripDayWrapElement, createTripDayItem(countDates(TRIP_DAYS_COUNT), events, TRANSPORT_TYPE, SERVICE_TYPE, CITIES), `afterbegin`);
// const tripDayEvent = tripDayWrapElement.querySelector(`.trip-events__list`);
// for (let i = 0; i < EVENT_COUNT; i++) {
//   render(tripDayEvent, createDayEvent(events[i]), `afterbegin`);
// }
