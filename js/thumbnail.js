import { showAlert } from './utils.js';
import { getData } from './api.js';
import { findPhoto } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailFragment = document.createDocumentFragment();

const createThumbnails = (data) => {
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
    picturesContainer.append(thumbnailFragment);
  });
};

const renderThumbnails = () => {
  getData()
    .then((data) => {
      createThumbnails(data);
    }).catch((error) => {
      showAlert(error.message);
    });
};

export {
  renderThumbnails
};
