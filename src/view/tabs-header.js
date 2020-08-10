const createTabHeaderTemplate = (tab) => {
  return `
    <a class="trip-tabs__btn ${tab.isActive ? `trip-tabs__btn--active` : ``}" href="#">${tab.name}</a>  
  `;
};

export const createTabsHeader = (tabs) => {
  const tabHeaderTemplate = tabs.map((tab) => createTabHeaderTemplate(tab)).join(``);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${tabHeaderTemplate}
          </nav>`;
};
