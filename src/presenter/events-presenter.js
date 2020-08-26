import Sort from "../view/sort";
import DayList from "../view/day-list";
import NoEvents from "../view/no-events";

import TripDayItem from "../view/trip-day-item";
import DayEvent from "../view/day-event";
import EventEdit from "../view/event-edit";

import {
  render,
  replace,
  remove,
  RenderPosition
} from "../utils/render.js";
import {
  eventsArray,
  renderEventModel
} from "../utils/event-utils";
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES,
  SortType
} from "../const";
import {
  generatePhotoSrcs,
  sortTime,
  sortPrice,
  sortEvents
} from "../utils/event-utils";

export default class EventsPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._sortComponent = new Sort();
    this._dayListComponent = new DayList();
    this._noEventsComponent = new NoEvents();
    this._currentSortType = SortType.NO_SORT;
    this._eventListeners = this._eventListeners.bind(this);
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

    // console.log(sortType);
    if (sortType === SortType.NO_SORT) {
      this._eventModel = this._initialEvents;
      return;
    }

    this._eventModel.forEach((model) => {
      switch (sortType) {
        case SortType.TIME:
          model.dayEvents.sort(sortTime);
          // console.log(sortType);
          break;
        case SortType.PRICE:
          model.dayEvents.sort(sortPrice);
          // console.log(sortType);
          break;
        case SortType.EVENT:
          model.dayEvents.sort(sortEvents);
          // console.log(sortType);
          break;
      }
    });
  }

  _handleSortChange(sortType) {
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
      this._getTripDayItems().forEach((item) => contentElement.appendChild(item.getElement()));
    } else {
      render(contentElement, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  _getTripDayItems() {
    return this._eventModel.map((model) => {
      const tripDayItem = new TripDayItem(model.date, model.index);
      const dayEvents = this._createDayEvents(model.dayEvents);
      const container = tripDayItem.getDayEventContainer();
      dayEvents.forEach((event) => container.appendChild(event.getElement()));
      return tripDayItem;
    });
  }

  _createDayEvents(dayEvents) {
    return dayEvents.map((event) => {
      const dayEvent = new DayEvent(event);
      const dayEditEvent = new EventEdit(event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, generatePhotoSrcs());
      this._eventListeners(dayEvent, dayEditEvent);
      return dayEvent;
    });
  }

  _eventListeners(card, form) {
    card.setClickHandler(() => {
      replace(form, card);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    form.setEditSubmitHandler(() => {
      replace(card, form);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    form.setResetClickHandler(() => {
      replace(card, form);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        e.preventDefault();
        replace(card, form);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }

  _clearEventList() {
    remove(this._dayListComponent);
    this._getTripDayItems();
  }
}
