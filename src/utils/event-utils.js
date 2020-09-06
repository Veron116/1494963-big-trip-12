import {
  getRandomInteger
} from './common.js';
import {
  MS_IN_A_DAY,
  EVENT_COUNT
} from '../const';
import {
  generateEvent
} from '../mock/event';

export const isChecked = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const generateDestinationInfo = () => {
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
  const descriptions = description.split(/\.\s*/g).filter((s) => s);

  shuffle(descriptions);
  return `${descriptions.slice(0, getRandomInteger(0, 5)).join(`. `)}.`;
};

export const generatePhotoSrcs = () => {
  const srcs = [];

  for (let i = 0; i < 5; i++) {
    srcs.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 5000)}`);
  }
  return srcs;
};

export const generateRandomDate = (tripDays) => {
  return Date.now() + getRandomInteger(0, tripDays) * MS_IN_A_DAY;
};

export const countDates = (tripDaysCount) => {
  const startDate = new Date();
  const endDate = new Date(generateRandomDate(tripDaysCount));
  const diffTimeMs = Math.abs(endDate - startDate);
  const diffTime = Math.ceil(diffTimeMs / MS_IN_A_DAY);
  const fillDateList = () => {
    const result = [];
    let d = startDate;

    for (let i = 0; i < diffTime; i++) {
      result.push({
        dateIndex: i + 1,
        date: d,
      });
      d = new Date(d.getTime() + MS_IN_A_DAY);
    }
    return result;
  };

  return {
    startDate,
    endDate,
    dateList: fillDateList(),
  };
};

export const getRandomItem = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getRandomArray = (array) => {
  const randomArray = array.slice(0, getRandomInteger(1, array.length - 1));

  return randomArray;
};

export const eventsArray = new Array(EVENT_COUNT)
  .fill()
  .map(generateEvent)
  .sort((a, b) => a.startDate - b.endDate);
export const getDatesStart = (events) => {
  return events.map((event) => new Date(event.startDate));
};

export const renderEventModel = (events) => {
  const tripDaysDates = new Set(getDatesStart(events).map((date) => `${date}`.slice(4, 10)));
  return Array.from(tripDaysDates).map((date, index) => {
    const eventModel = {
      date,
      index,
      dayEvents: events.filter((event) => {
        const eventDate = `${new Date(event.startDate)}`.slice(4, 10);
        return eventDate === date;
      })
    };
    return eventModel;
  });
};

export const sortTime = (event1, event2) => {
  return event1.startDate > event2.startDate ? 1 : -1;
};

export const sortPrice = (event1, event2) => {
  return event1.price > event2.price ? 1 : -1;
};

export const sortEvents = (event1, event2) => {
  return event1.length > event2.length ? 1 : -1;
};
