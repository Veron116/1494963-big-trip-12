import {createTripInfo} from './view/trip-info';
import {createTabsHeader} from './view/tabs-header';
import {createTabsFilters} from './view/tabs-filters';
import {createSort} from './view/sort';
import {createEventWrap} from './view/event-wrap';
import {createEventHeader} from './view/event-header';
import {createEventDetails} from './view/event-details';
import {createTripDaysWrap} from './view/trip-days-wrap';
import {createTripDayItem} from './view/trip-day-item';
import {createDayInfo} from './view/day-info';
import {createDayEvent} from './view/day-event';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tabsControlsElement = headerElement.querySelector(`.trip-controls`);
render(tripMainElement, createTripInfo(), `afterbegin`);
render(tabsControlsElement, createTabsHeader(), `afterbegin`);
render(tabsControlsElement, createTabsFilters(), `beforeend`);
const contentElement = document.querySelector(`.trip-events`);
render(contentElement, createSort(), `afterbegin`);
render(contentElement, createEventWrap(), `beforeend`);
const chooseEventWrapElement = contentElement.querySelector(`.trip-events__item`);
render(chooseEventWrapElement, createEventHeader(), `afterbegin`);
render(chooseEventWrapElement, createEventDetails(), `beforeend`);
render(contentElement, createTripDaysWrap(), `beforeend`);
const tripDayWrapElement = contentElement.querySelector(`.trip-days`);
render(tripDayWrapElement, createTripDayItem(), `afterbegin`);
const tripDayElement = tripDayWrapElement.querySelector(`.trip-days__item`);
render(tripDayElement, createDayInfo(), `afterbegin`);
const tripDayEvent = tripDayWrapElement.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(tripDayEvent, createDayEvent(), `afterbegin`);
}
