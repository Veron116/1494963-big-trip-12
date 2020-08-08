import {getRandomInteger} from '../utils';

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
  //   const startIndex = getRandomInteger(0, descriptions.length);
  //   const endIndex = getRandomInteger(0, descriptions.length);
  //   console.log(startIndex);
  //   console.log(endIndex);

  //   if (endIndex > startIndex && endIndex - startIndex < 5) {
  //     return descriptions.slice(startIndex, endIndex).join(``);
  //   }
  shuffle(descriptions);
  return descriptions.slice(0, getRandomInteger(0, 5)).join(` `);
};
