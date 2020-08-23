import {
  render,
  RenderPosition
} from "../utils/render.js";
import HeaderView from '../view/header';
import TripInfoView from '../view/trip-info';
import TabsHeaderView from '../view/tabs-header';
import TabsFiltersView from '../view/tabs-filters';
import {
  filterTabs,
  filterTypes
} from '../mock/filter';

export default class HeaderPresenter {
  constructor(bodyContainer) {
    this._bodyContainer = bodyContainer;
    this._headerElement = new HeaderView().getElement();
    this._TripInfoComponent = new TripInfoView();
    this._TabsHeaderComponent = new TabsHeaderView(filterTabs);
    this._TabsFiltersComponent = new TabsFiltersView(filterTypes);
  }

  init() {
    this._renderHeader();
    this._renderTripInfo();
    this._renderTabs();
  }

  _renderHeader() {
    render(this._bodyContainer, this._headerElement, RenderPosition.AFTERBEGIN);
  }

  _renderTripInfo() {
    render(this._headerElement.querySelector(`.trip-main`), this._TripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTabs() {
    const tabsWrap = this._headerElement.querySelector(`.trip-controls`);
    render(tabsWrap, this._TabsHeaderComponent, RenderPosition.AFTERBEGIN);
    render(tabsWrap, this._TabsFiltersComponent, RenderPosition.AFTERBEGIN);
  }
}
