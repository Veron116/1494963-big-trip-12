import {
  v4 as uuidv4
} from 'uuid';
import {
  getRandomInteger
} from '../utils/common';
import {
  getRandomItem,
  generateDestinationInfo,
  generatePhotoSrcs,
  generateRandomDate,
  getRandomArray
} from '../utils/event-utils';
import {
  TRANSPORT_TYPE,
  SERVICE_TYPE,
  CITIES,
  OFFERS,
  TRIP_DAYS_COUNT
} from '../const';

const generateCheckinType = () => {
  let checkinTypes = TRANSPORT_TYPE.concat(SERVICE_TYPE);
  return getRandomItem(checkinTypes);
};

export const generateEvent = () => {
  const startDate = generateRandomDate(TRIP_DAYS_COUNT);
  const msInd = getRandomInteger(20, 180) * 60 * 1000;
  const endDate = startDate + msInd;
  const msIndInHours = msInd / 1000 / 60 / 60;
  const hours = Math.trunc(msIndInHours);
  const minutes = Math.trunc((msIndInHours - hours) * 60);

  return {
    id: uuidv4(),
    startDate,
    endDate,
    hours,
    minutes,
    description: generateDestinationInfo(),
    photos: generatePhotoSrcs(),
    checkinType: generateCheckinType(),
    city: getRandomItem(CITIES),
    offers: getRandomArray(OFFERS),
    price: getRandomInteger(10, 900),
  };
};
