import Abstract from './abstract';

/**
 *
 * TODO переделать даты вместо slice на встроенные методы даты
 */

const createDayList = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class DayList extends Abstract {

  _getTemplate() {
    return createDayList();

  }
}
