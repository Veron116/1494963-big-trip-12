import HeaderPresenter from './presenter/header-presenter';
// import EventsPresenter from './presenter/events-presenter';
import TripPresenter from './presenter/trip-presenter';


const bodyElement = document.querySelector(`.page-body`);

new HeaderPresenter(bodyElement).init();
new TripPresenter(bodyElement).init();
