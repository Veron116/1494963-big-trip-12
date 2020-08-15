import HeaderView from './view/header';
import TripInfoView from './view/trip-info';
import TabsHeaderView from './view/tabs-header';
import TabsFiltersView from './view/tabs-filters';
import SortView from './view/sort';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS} from './const';
import {generatePhotoSrcs, renderTemplate, renderElement, renderPosition} from './utils';
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
const headerElement = new HeaderView();
renderElement(bodyElement, headerElement.getElement(), renderPosition.AFTERBEGIN);
renderElement(
  headerElement.getElement().querySelector(`.trip-controls`),
  new TabsHeaderView(filterTabs).getElement(),
  renderPosition.AFTERBEGIN
);
renderElement(
  headerElement.getElement().querySelector(`.trip-controls`),
  new TabsFiltersView(filterTypes).getElement(),
  renderPosition.BEFOREEND
);

renderElement(bodyElement, new SortView().getElement(), renderPosition.BEFOREEND);
const tripMainElement = bodyElement.querySelector(`.trip-main`);
renderElement(tripMainElement, new TripInfoView().getElement(), renderPosition.AFTERBEGIN);
// renderTemplate(tripMainElement, tripInfo(), `afterbegin`);
// const tabsControlsElement = new HeaderView().getElement().querySelector(`.trip-controls`);
// renderTemplate(tabsControlsElement, createTabsHeader(filterTabs), `afterbegin`);
// renderTemplate(tabsControlsElement, createTabsFilters(filterTypes), `beforeend`);
// const contentElement = bodyElement.querySelector(`.trip-events`);
// renderTemplate(
//   contentElement,
//   createDayList(tripDaysDates, events, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs()),
//   `beforeend`
// );
