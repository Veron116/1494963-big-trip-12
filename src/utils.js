export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.| Cras aliquet varius magna, non porta ligula feugiat eget.| Fusce tristique felis at fermentum pharetra.| Aliquam id orci ut lectus varius viverra.| Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.| Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.| Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.| Sed sed nisi sed augue convallis suscipit in sed felis.| Aliquam erat volutpat.| Nunc fermentum tortor ac porta dapibus.| In rutrum ac purus sit amet tempus.`;
  const descriptions = description.split('| ');

  shuffle(descriptions);
  return descriptions.slice(0, getRandomInteger(0, 5)).join(` `);
};

export const generatePhotoSrcs = () => {
  const srcs = [];

  for (let i = 0; i < 5; i++) {
    srcs.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 5000)}`);
  }
  return srcs;
};
