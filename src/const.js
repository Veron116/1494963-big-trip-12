export const TRANSPORT_TYPE = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const SERVICE_TYPE = [`Check-in`, `Sightseeing`, `Restaurant`];
export const CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Ganalulu`, `Karaganda`, `Zudilovo`];
export const OFFERS = new Map([
  [`Taxi`, [{
    name: `Order Uber`,
    price: 20,
  }]],
  [`Bus`, [{
    name: `Switch to comfort class`,
    price: 100,
  }]],
  [`Train`, [{
    name: `Switch to comfort class`,
    price: 100,
  }]],
  [`Ship`, []],
  [`Transport`, []],
  [`Drive`, [{
    name: `Rent a car`,
    price: 200,
  }]],
  [`Flight`, [{
    name: `Add luggage`,
    price: 30,
  },
  {
    name: `Switch to comfort class`,
    price: 100,
  },
  {
    name: `Add meal`,
    price: 15,
  },
  {
    name: `Choose seats`,
    price: 5,
  },
  {
    name: `Travel by train`,
    price: 40,
  }
  ]],
  [`Check-in`, [{
    name: `Add breakfast`,
    price: 50,
  }]],
  [`Sightseeing`, [{
    name: `Book tickets`,
    price: 40,
  },
  {
    name: `Lunch in city`,
    price: 30,
  }
  ]],
  [`Restaurant`, [{
    name: `Musical accompaniment`,
    price: 10,
  }]],
]);
export const EVENT_COUNT = 15;
export const TRIP_DAYS_COUNT = 10;
export const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  NO_SORT: `default`
};
