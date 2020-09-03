import Sort from "../view/sort";
import DayList from "../view/day-list";
import NoEvents from "../view/no-events";

import TripDayItem from "../view/trip-day-item";
import EventPresenter from './event-presenter';

import {
  remove,
  render,
  RenderPosition
} from "../utils/render.js";
import {
  eventsArray,
  renderEventModel,
  sortTime,
  sortPrice,
  sortEvents
} from "../utils/event-utils";
import {
  SortType
} from "../const";

export default class TripPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._sortComponent = new Sort();
    this._dayListComponent = new DayList();
    this._noEventsComponent = new NoEvents();
    this._currentSortType = SortType.NO_SORT;
    this._eventsPresenters = [];
    this._unicEventsPresenters = {};

    this._handleSortChange = this._handleSortChange.bind(this);

    this._eventModel = renderEventModel();
    this._initialEvents = this._eventModel.slice();
  }

  init() {
    this._renderSort();
    this._renderEvents();
  }

  _sortEvents(sortType) {
    this._currentSortType = sortType;

    if (sortType === SortType.NO_SORT) {
      // console.log(`no sort`);

      this._eventModel = this._initialEvents;
      // console.log(this._eventModel);
      return;
    }

    this._eventModel.forEach((model) => {
      switch (sortType) {
        case SortType.TIME:
          model.dayEvents.sort(sortTime);
          break;
        case SortType.PRICE:
          model.dayEvents.sort(sortPrice);
          break;
        case SortType.EVENT:
          model.dayEvents.sort(sortEvents);
          break;
      }
    });
  }

  _handleSortChange(sortType) {
    // console.log(`click sort`, sortType);
    if (this._currentSortType === sortType) {
      sortType = SortType.NO_SORT;
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEvents();
  }

  _renderSort() {
    render(this._bodyContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortChangeHandler(this._handleSortChange);
  }

  _renderEvents() {
    const contentElement = this._dayListComponent.getElement();
    render(this._sortComponent.getSortContainer(), contentElement, RenderPosition.BEFOREEND);

    if (eventsArray.length > 0) {
      this._createTripDayItems().forEach((item) => contentElement.appendChild(item.getElement()));
    } else {
      render(contentElement, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  _createTripDayItems() {
    return this._eventModel.map((model) => {

      const tripDayItem = new TripDayItem(model.date, model.index);
      const eventContainer = tripDayItem.getDayEventContainer();

      model.dayEvents.forEach((event) => {
        let eventPresenter = new EventPresenter(event, eventContainer);
        this._eventsPresenters.push(eventPresenter);
        this._unicEventsPresenters[event.id] = eventPresenter;
      });

      this._eventsPresenters.forEach((eventPresenter) => eventPresenter.init());
      return tripDayItem;
    });
  }


  _clearEventList() {
    remove(this._dayListComponent);
    Object.values(this._unicEventsPresenters).forEach((presenter) => {
      presenter.destroy();
    });
    this._eventsPresenters = [];
    this._unicEventsPresenters = {};
  }
}
