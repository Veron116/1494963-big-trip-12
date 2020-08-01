import {tripInfo} from './view/trip-info';
import {tabsHeader} from './view/tabs-header';
import {tabsFilters} from './view/tabs-filters';
import {sort} from './view/sort';
import {eventWrap} from './view/event-wrap';
import {eventHeader} from './view/event-header';
import {eventDetails} from './view/event-details';
import {tripDaysWrap} from './view/trip-days-wrap';
import {tripDayItem} from './view/trip-day-item';
import {dayInfo} from './view/day-info';
import {dayEvent} from './view/day-event';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tabsControlsElement = headerElement.querySelector(`.trip-controls`);
render(tripMainElement, tripInfo(), `afterbegin`);
render(tabsControlsElement, tabsHeader(), `afterbegin`);
render(tabsControlsElement, tabsFilters(), `beforeend`);
const contentElement = document.querySelector(`.trip-events`);
render(contentElement, sort(), `afterbegin`);
render(contentElement, eventWrap(), `beforeend`);
const chooseEventWrapElement = contentElement.querySelector(`.trip-events__item`);
render(chooseEventWrapElement, eventHeader(), `afterbegin`);
render(chooseEventWrapElement, eventDetails(), `beforeend`);
render(contentElement, tripDaysWrap(), `beforeend`);
const tripDayWrapElement = contentElement.querySelector(`.trip-days`);
render(tripDayWrapElement, tripDayItem(), `afterbegin`);
const tripDayElement = tripDayWrapElement.querySelector(`.trip-days__item`);
render(tripDayElement, dayInfo(), `afterbegin`);
const tripDayEvent = tripDayWrapElement.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(tripDayEvent, dayEvent(), `afterbegin`);
}
