import {render} from './utils';
import {createHeaderTemplate} from './view/header';
import {tripInfo} from './view/trip-info';
import {createTabsHeader} from './view/tabs-header';
import {createTabsFilters} from './view/tabs-filters';
import {sort} from './view/sort';
import {createTripDayItem} from './view/trip-day-item';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, TRIP_DAYS_COUNT} from './const';
import {generatePhotoSrcs, countDates} from './utils';
import {generateEvent} from './mock/event';
import {filterTabs, filterTypes} from './mock/filter';

const EVENT_COUNT = 7;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const bodyElement = document.querySelector(`.page-body`);
render(bodyElement, createHeaderTemplate(), `afterbegin`);
render(bodyElement, sort(), `beforeend`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
render(tripMainElement, tripInfo(), `afterbegin`);
const tabsControlsElement = bodyElement.querySelector(`.trip-controls`);
render(tabsControlsElement, createTabsHeader(filterTabs), `afterbegin`);
render(tabsControlsElement, createTabsFilters(filterTypes), `beforeend`);
const contentElement = bodyElement.querySelector(`.trip-events`);
const tripDayWrapElement = contentElement.querySelector(`.trip-days`);
render(
  tripDayWrapElement,
  createTripDayItem(countDates(TRIP_DAYS_COUNT), events, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs()),
  `afterbegin`
);
