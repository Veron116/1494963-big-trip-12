import {getRandomInteger, generateDestinationInfo, generatePhotoSrcs, generateRandomDate} from '../utils';
import {TRANSPORT_TYPE, SERVICE_TYPE, CITIES, OFFERS, TRIP_DAYS_COUNT} from '../const';

const generateCheckinType = () => {
  let checkinTypes = TRANSPORT_TYPE.concat(SERVICE_TYPE);
  return checkinTypes[getRandomInteger(0, checkinTypes.length - 1)];
};

const generateCity = () => {
  return CITIES[getRandomInteger(0, CITIES.length - 1)];
};

const generateOffer = () => {
  return OFFERS[getRandomInteger(0, OFFERS.length - 1)];
};

export const generateEvent = () => {
  const startDate = generateRandomDate(TRIP_DAYS_COUNT);
  const msInd = getRandomInteger(20, 180) * 60 * 1000;
  //   const endDate = new Date(startDate + msInd);
  const endDate = startDate + msInd;
  const msIndInHours = msInd / 1000 / 60 / 60;
  const hours = Math.trunc(msIndInHours);
  const minutes = Math.trunc((msIndInHours - hours) * 60);
  const addDuration = () => {
    let duration = new Date(endDate - startDate).getMinutes();
    return duration > 60 ? hours + `H ` + minutes + `M` : minutes + `M`;
  };

  return {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    hours,
    minutes,
    duration: addDuration(),
    description: generateDestinationInfo(),
    photos: generatePhotoSrcs(),
    checkin_type: generateCheckinType(),
    city: generateCity(),
    offer: generateOffer(),
    isCheked: Boolean(getRandomInteger(0, 1)),
  };
};
