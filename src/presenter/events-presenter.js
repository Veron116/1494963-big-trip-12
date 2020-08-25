import Sort from '../view/sort';
import DayList from '../view/day-list';
import NoEvents from '../view/no-events';

import TripDayItem from '../view/trip-day-item';
import DayEvent from '../view/day-event';
import EventEdit from '../view/event-edit';

import {
  render,
  replace,
  RenderPosition
} from "../utils/render.js";
import {
  eventsArray,
  renderEventModel
} from '../utils/event-utils';
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES
} from '../const';
// картинки почему-то беспокнечно грузятся, поэтому пока скрыла
// import {
//   generatePhotoSrcs
// } from '../utils/event-utils';

export default class EventsPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._SortComponent = new Sort();
    this._DayListComponent = new DayList();
    this._NoEventsComponent = new NoEvents();
    // this._EventEdit = new EventEdit(this._dayEvents, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, generatePhotoSrcs());
    this._eventListeners = this._eventListeners.bind(this);
  }

  init() {
    this._renderSort();
    this._renderEvents();
    this._renderDailyEvents();
    this._renderEvent();
  }

  _renderSort() {
    render(this._bodyContainer, this._SortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    const contentElement = this._DayListComponent.getElement();
    render(this._bodyContainer, contentElement, RenderPosition.BEFOREEND);

    if (eventsArray.length > 0) {
      this._getTripDayItems().forEach((item) => contentElement.appendChild(item.getElement()));
    } else {
      render(contentElement, this._NoEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  _getTripDayItems() {

    return renderEventModel().map((model) => {
      return new TripDayItem(
          model.date,
          model.index
      );
    });
  }

  _createDayEvents() {

    return renderEventModel().map((model) => {
      return model.dayEvents.map((dayEvent) => {
        return new DayEvent(dayEvent);
      });
    });
  }

  _renderDailyEvents() {
    this._getTripDayItems().forEach((dayItem) => {

      this._createDayEvents().forEach((dayEvents) => {
        dayEvents.forEach((dayEvent) => {
          dayItem.getDayEventContainer().appendChild(dayEvent.getElement());
        });
      });
    });

  }

  _createEventEdit() {
    return renderEventModel().map((model) => {
      return model.dayEvents.map((dayEvent) => {
        // картинки почему-то беспокнечно грузятся, поэтому пока удалила последний параметр в виде generatePhotoSrcs()
        return new EventEdit(dayEvent, TRANSPORT_TYPE, SERVICE_TYPE, CITIES);
      });
    });
  }

  _renderEvent() {

    const dayEvents = this._createDayEvents();
    const dayEventsEdit = this._createEventEdit();

    renderEventModel().forEach((item, index) => {

      dayEvents[index].forEach((dayEvent, dayEventIndex) => {
        this._eventListeners(dayEvent, dayEventsEdit[dayEventIndex]);
      });
    });
  }

  _eventListeners(card, form) {
    this._createDayEvents().forEach((dayEvents) => {
      dayEvents.forEach((dayEvent) => {
        dayEvent.setClickHandler(() => {
          replace(form, card);
          document.addEventListener(`keydown`, onEscKeyDown);
        });
      });
    });


    this._createEventEdit().forEach((dayEvents) => {
      dayEvents.forEach((dayEvent) => {
        dayEvent.setEditSubmitHandler(() => {
          replace(card, form);
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      });
    });

    this._createEventEdit().forEach((dayEvents) => {
      dayEvents.forEach((dayEvent) => {
        dayEvent.setResetClickHandler(() => {
          replace(card, form);
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      });
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
