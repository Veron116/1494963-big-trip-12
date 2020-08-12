import {createEventEditTemplate} from './event-edit';
import {createDayEvent} from './day-event';

export const createTripDayItem = ({dateList}, events, transports, services, cities, offers, srcs) => {
  const dayInfoTemplate = dateList
    .map((day) => {
      return `<li class="trip-days__item  day">
                <div class="day__info">
                <span class="day__counter">${day.dateIndex}</span>
                <time class="day__date" datetime="2019-03-18">
                ${day.date.toLocaleString(`default`, {month: `short`})} ${day.date.getDate()}
                </time>
                </div>
                <ul class="trip-events__list">
                ${events
                  .map((event, index) => {
                    if (day.dateIndex === 1 && index === 0) {
                      return createEventEditTemplate(transports, services, cities, offers, srcs);
                    }
                    return createDayEvent(event);
                  })
                  .join(``)}
                </ul>
              </li>`;
    })
    .join(``);

  return `${dayInfoTemplate}`;
};
