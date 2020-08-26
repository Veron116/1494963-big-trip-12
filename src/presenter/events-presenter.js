import Sort from "../view/sort";
import DayList from "../view/day-list";
import NoEvents from "../view/no-events";

import TripDayItem from "../view/trip-day-item";
import DayEvent from "../view/day-event";
import EventEdit from "../view/event-edit";

import {
  render,
  replace,
  RenderPosition
} from "../utils/render.js";
import {
  eventsArray,
  renderEventModel
} from "../utils/event-utils";
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES
} from "../const";
import {
  generatePhotoSrcs
} from "../utils/event-utils";

export default class EventsPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._SortComponent = new Sort();
    this._DayListComponent = new DayList();
    this._NoEventsComponent = new NoEvents();
    this._eventListeners = this._eventListeners.bind(this);
  }

  init() {
    this._renderSort();
    this._renderEvents();
  }

  _renderSort() {
    render(this._bodyContainer, this._SortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const contentElement = this._DayListComponent.getElement();
    render(this._SortComponent.getSortContainer(), contentElement, RenderPosition.BEFOREEND);

    if (eventsArray.length > 0) {
      this._getTripDayItems().forEach((item) => contentElement.appendChild(item.getElement()));
    } else {
      render(contentElement, this._NoEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  _getTripDayItems() {
    return renderEventModel().map((model) => {
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
}
