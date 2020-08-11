import {createEventEditTemplate} from './event-edit';
import {createDayEvent} from './day-event';

export const createTripDayItem = ({dateList}, events, transports, services, cities) => {
  console.log(events);
  const dayInfoTemplate = dateList
    .map((day) => {
      return `<span class="day__counter">${day.dateIndex}</span>
            <time class="day__date" datetime="2019-03-18">
            ${day.date.toLocaleString('default', {month: 'long'})} ${day.date.getDate()}
            </time>`;
    })
    .join(``);

  return `<li class="trip-days__item  day">
            <div class="day__info">
            ${dayInfoTemplate}
            </div>
          <ul class="trip-events__list">
          ${events
            .map((event, index) => {
              if (index === 0) {
                return createEventEditTemplate(transports, services, cities);
              }
              return createDayEvent(event);
            })
            .join(``)}
          </ul>
        </li>`;
};
