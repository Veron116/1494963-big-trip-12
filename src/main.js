import {render} from './utils';
import {tripInfo} from './view/trip-info';
import {createTabsHeader} from './view/tabs-header';
import {createTabsFilters} from './view/tabs-filters';
import {sort} from './view/sort';
import {createEventEditTemplate} from './view/event-edit';
import {createEventDetails} from './view/event-details';
import {tripDayItem} from './view/trip-day-item';
import {createDayEvent} from './view/day-event';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS} from './const';
import {generatePhotoSrcs} from './utils';
import {generateEvent} from './mock/event';
import {filterTabs, filterTypes} from './mock/filter';

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tabsControlsElement = headerElement.querySelector(`.trip-controls`);
render(tripMainElement, tripInfo(), `afterbegin`);
render(tabsControlsElement, createTabsHeader(filterTabs), `afterbegin`);
render(tabsControlsElement, createTabsFilters(filterTypes), `beforeend`);
const contentElement = document.querySelector(`.trip-events`);
render(contentElement, sort(), `afterbegin`);
render(contentElement, createEventEditTemplate(TRANSPORT_TYPE, SERVICE_TYPE, CITIES), `beforeend`);
const chooseEventWrapElement = contentElement.querySelector(`.trip-events__item`);
render(chooseEventWrapElement, createEventDetails(OFFERS, generatePhotoSrcs()), `beforeend`);
const tripDayWrapElement = contentElement.querySelector(`.trip-days`);
render(tripDayWrapElement, tripDayItem(), `afterbegin`);
const tripDayEvent = tripDayWrapElement.querySelector(`.trip-events__list`);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripDayEvent, createDayEvent(events[i]), `afterbegin`);
}
