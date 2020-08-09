const createFiterTemplate = ({name, isChecked}) => {
  return `<div class="trip-filters__filter">
                <input 
                id="filter-${name.toLowerCase()}" 
                class="trip-filters__filter-input  
                visually-hidden" type="radio" name="trip-filter" 
                value="${name.toLowerCase()}" 
                ${isChecked ? `checked` : ``}>
                <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
            </div>`;
};

export const createTabsFilters = (filters) => {
  const filterTemplate = filters.map((filter) => createFiterTemplate(filter)).join(``);
  return `<form class="trip-filters" action="#" method="get">
              
        ${filterTemplate}
  
        <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`;
};
