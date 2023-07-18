import { showAlert, debounce } from './utils.js';
import { getData } from './api.js';
import { findPhoto } from './big-picture.js';
import { initFilter } from './sorting-thumbnails.js';
import { RERENDER_DELAY } from './config.js';

const createThumbnails = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailFragment = document.createDocumentFragment();
  const filtersThumbnails = document.querySelector('.img-filters');
  filtersThumbnails.classList.remove('img-filters--inactive');

  data.forEach((picture) => {
    const thumbnailItem = thumbnailTemplate.cloneNode(true);
    const thumbnailImg = thumbnailItem.querySelector('.picture__img');
    const thumbnailComments = thumbnailItem.querySelector('.picture__comments');
    const thumbnailLikes = thumbnailItem.querySelector('.picture__likes');

    thumbnailImg.src = picture.url;
    thumbnailImg.alt = picture.description;
    thumbnailComments.textContent = picture.comments.length;
    thumbnailLikes.textContent = picture.likes;

    thumbnailItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      findPhoto(picture);
    });

    thumbnailFragment.append(thumbnailItem);
  });

  Array.from(picturesContainer.children).forEach((child) => {
    if (child.tagName === 'A') {
      child.remove();
    }
  });

  picturesContainer.append(thumbnailFragment);
};

const renderThumbnails = () => {
  getData()
    .then((data) => {
      const debouncedCreateThumbnails = debounce(createThumbnails, RERENDER_DELAY);
      createThumbnails(data);
      initFilter(data, debouncedCreateThumbnails);
    }).catch((error) => {
      showAlert(error.message);
    });
};

export { renderThumbnails };
