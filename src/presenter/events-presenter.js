import Sort from '../view/sort';
import DayList from '../view/day-list';
import NoEvents from '../view/no-events';
import {
  render,
  RenderPosition
} from "../utils/render.js";
import {
  eventsArray,
  tripDaysDates
} from '../utils/event-utils';
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES,
  OFFERS
} from '../const';
import {
  generatePhotoSrcs
} from '../utils/event-utils';

export default class EventsPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._SortComponent = new Sort();
    this._DayListComponent = new DayList(tripDaysDates, eventsArray, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs());
    this._NoEventsComponent = new NoEvents();
  }

  init() {
    this._renderSort();
    this._renderEvents();
  }

  _renderSort() {
    render(this._bodyContainer, this._SortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const contentElement = this._bodyContainer.querySelector(`.trip-events`);
    if (eventsArray.length > 0) {
      render(contentElement, this._DayListComponent, RenderPosition.BEFOREEND);
    } else {
      render(contentElement, this._NoEventsComponent, RenderPosition.BEFOREEND);
    }
  }
}
