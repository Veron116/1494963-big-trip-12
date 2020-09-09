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

const photoSrcs = generatePhotoSrcs();

export default class EventPresenter {
  constructor(event, eventContainer, changeData) {
    this._event = event;
    this._eventContainer = eventContainer;
    this._changeData = changeData;
    this._eventComponent = null;
    this._eventEditComponent = null;
  }

  init(event = this._event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new DayEvent(this._event);
    this._eventEditComponent = new EventEdit(this._event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, photoSrcs);

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
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _eventListeners(card, form) {
    card.setClickHandler(() => {
      replace(form, card);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    form.setEditSubmitHandler((event) => {
      replace(card, form);
      this._changeData(event);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    form.setResetClickHandler(() => {
      this._eventEditComponent.reset(this._event);
      replace(card, form);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || e.key === `Esc`) {
        e.preventDefault();
        this._eventEditComponent.reset(this._event);
        replace(card, form);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  }
}
