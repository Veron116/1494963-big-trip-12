import DayEvent from "../view/day-event";
import EventEdit from "../view/event-edit";

import {
  render,
  replace,
  remove,
  RenderPosition
} from "../utils/render.js";
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES
} from "../const";
import {
  generatePhotoSrcs,
} from "../utils/event-utils";

export default class EventPresenter {
  constructor(event, eventContainer) {
    this._event = event;
    this._eventContainer = eventContainer;
    this._eventComponent = new DayEvent(event);
    this._eventEditComponent = new EventEdit(event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, generatePhotoSrcs());
  }

  init() {
    this._eventContainer.appendChild(this._eventComponent.getElement());
    this._eventListeners(this._eventComponent, this._eventEditComponent);
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
