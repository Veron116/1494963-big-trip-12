import {render} from './utils';
import {createHeaderTemplate} from './view/header';
import {tripInfo} from './view/trip-info';
import {createTabsHeader} from './view/tabs-header';
import {createTabsFilters} from './view/tabs-filters';
import {sort} from './view/sort';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS} from './const';
import {generatePhotoSrcs} from './utils';
import {generateEvent} from './mock/event';
import {filterTabs, filterTypes} from './mock/filter';
import {createDayList} from './view/day-list';

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.endDate);
const getDatesStart = () => {
  return events.map((event) => new Date(event.startDate));
};
const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

const bodyElement = document.querySelector(`.page-body`);
render(bodyElement, createHeaderTemplate(), `afterbegin`);
render(bodyElement, sort(), `beforeend`);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
render(tripMainElement, tripInfo(), `afterbegin`);
const tabsControlsElement = bodyElement.querySelector(`.trip-controls`);
render(tabsControlsElement, createTabsHeader(filterTabs), `afterbegin`);
render(tabsControlsElement, createTabsFilters(filterTypes), `beforeend`);
const contentElement = bodyElement.querySelector(`.trip-events`);
render(
  contentElement,
  createDayList(tripDaysDates, events, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs()),
  `beforeend`
);
