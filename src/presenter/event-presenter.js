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
    this._eventComponent = null;
    this._eventEditComponent = null;
  }

  init() {

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new DayEvent(this._event);
    this._eventEditComponent = new EventEdit(this._event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, generatePhotoSrcs());

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventContainer, this._eventComponent, RenderPosition.AFTERBEGIN);
      this._eventListeners(this._eventComponent, this._eventEditComponent);
      return;
    }

    if (this._eventContainer.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
      this._eventListeners(this._eventComponent, this._eventEditComponent);
    }

    if (this._eventContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
      this._eventListeners(this._eventComponent, this._eventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
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
