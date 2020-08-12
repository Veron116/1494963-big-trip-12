import {createTripDayItem} from './trip-day-item';

export const createDayList = (dateList, events, transports, services, cities, offers, srcs) => {
  return `<ul class="trip-days">
            ${Array.from(dateList)
              .map((date, index) => {
                const dayEvents = events.filter((event) => {
                  const eventDate = `${new Date(event.startDate)}`.slice(4, 10);
                  return eventDate === date;
                });

                return createTripDayItem(index, date, dayEvents, events, transports, services, cities, offers, srcs);
              })
              .join(``)}
        </ul>`;
};
