import Abstract from './abstract';

const createDayList = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class DayList extends Abstract {

  _getTemplate() {
    return createDayList();

  }
}
