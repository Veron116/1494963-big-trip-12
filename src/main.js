import HeaderView from './view/header';
import TripInfoView from './view/trip-info';
import TabsHeaderView from './view/tabs-header';
import TabsFiltersView from './view/tabs-filters';
import SortView from './view/sort';
import DayListView from './view/day-list';
import NoEventsView from './view/no-events';

import {
  generateEvent
} from './mock/event';
import {
  filterTabs,
  filterTypes
} from './mock/filter';

import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES,
  OFFERS
} from './const';
import {
  generatePhotoSrcs
} from './utils/event-utils';
import {
  render,
  RenderPosition
} from './utils/render';




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
const headerElement = new HeaderView().getElement();

render(bodyElement, headerElement, RenderPosition.AFTERBEGIN);
render(headerElement.querySelector(`.trip-controls`), new TabsHeaderView(filterTabs), RenderPosition.AFTERBEGIN);
render(headerElement.querySelector(`.trip-controls`), new TabsFiltersView(filterTypes), RenderPosition.BEFOREEND);

render(bodyElement, new SortView(), RenderPosition.BEFOREEND);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
render(tripMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
const contentElement = bodyElement.querySelector(`.trip-events`);
if (events.length > 0) {
  render(
    contentElement,
    new DayListView(tripDaysDates, events, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs()),
    RenderPosition.BEFOREEND
  );
} else {
  render(contentElement, new NoEventsView(), RenderPosition.BEFOREEND);
}
