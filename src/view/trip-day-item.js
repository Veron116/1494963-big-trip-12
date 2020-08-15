import {createEventEditTemplate} from './event-edit';
import {createDayEvent} from './day-event';

/**
 *
 * @todo переделать даты вместо slice на встроенные методы даты
 */

export const createTripDayItem = (index, date, dayEvents, events, transports, services, cities, offers, srcs) => {
  return `<li class="trip-days__item  day">
                <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="${new Date(date).toString().slice(4, 11)}">
                ${date}
                </time>
                </div>
                <ul class="trip-events__list">

                ${dayEvents
                  .map((event, curIndex) => {
                    if (index === 0 && curIndex === 0) {
                      return createEventEditTemplate(event, transports, services, cities, offers, srcs);
                    }
                    return createDayEvent(event);
                  })
                  .join(``)}
                </ul>
              </li>`;
};
