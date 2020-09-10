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

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class EventPresenter {
  constructor(event, eventContainer, changeData, changeMode) {
    this._event = event;
    this._eventContainer = eventContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleResetForm = this._handleResetForm.bind(this);
  }

  init(event = this._event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new DayEvent(this._event);
    this._eventEditComponent = new EventEdit(this._event, TRANSPORT_TYPE, SERVICE_TYPE, CITIES, photoSrcs);

    this._eventComponent.setClickHandler(this._handleEditClick);
    this._eventEditComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setResetClickHandler(this._handleResetForm);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventContainer, this._eventComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }

  _handleResetForm() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToCard();
  }
}
