import HeaderPresenterView from './presenter/header-presenter';
import EventsPresenter from './presenter/events-presenter'


const bodyElement = document.querySelector(`.page-body`);

new HeaderPresenterView(bodyElement).init();
new EventsPresenter(bodyElement).init();
