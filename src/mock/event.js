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

const generateOffers = (type) => {
  return OFFERS.get(type).map((offer) => {
    return Object.assign({
        checked: Boolean(getRandomInteger())
      },
      offer
    );
  });
};

export const generateEvent = () => {
  const startDate = generateRandomDate(TRIP_DAYS_COUNT);
  const msInd = getRandomInteger(20, 180) * 60 * 1000;
  const endDate = startDate + msInd;
  const checkinType = generateCheckinType();

  return {
    id: uuidv4(),
    startDate,
    endDate,
    description: generateDestinationInfo(),
    photos: generatePhotoSrcs(),
    checkinType,
    city: getRandomItem(CITIES),
    offers: generateOffers(checkinType),
    price: getRandomInteger(10, 900),
    isFavorite: false,
  };
};
