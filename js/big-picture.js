
import { isEscapeKey } from './util.js';
import { thumbnailsList, picturesContainer } from './thumbnail.js';
import { COMMENT_PER_PORTION } from './data.js';

const thumbnails = Array.from(document.querySelectorAll('.picture')); // Получаем массив из NodeList
const pictureContainer = document.querySelector('.big-picture');
const pictureImg = pictureContainer.querySelector('.big-picture__img img');
const pictureDescription = pictureContainer.querySelector('.social__caption');
const pictureLikes = pictureContainer.querySelector('.likes-count');
const pictureComments = document.querySelector('.social__comments');
const commentsCount = pictureContainer.querySelector('.comments-count');
const commentsCountList = pictureContainer.querySelector('.social__comment-count');
const buttonCommentsLoader = document.querySelector('.comments-loader');
const closeButtonPicture = pictureContainer.querySelector('.big-picture__cancel');
const picturePreview = document.querySelector('.big-picture__preview');
const pictureOverlay = document.querySelector('.overlay');
let commentsShowArray = [];

function onPictureEsc(evt) {
  if (isEscapeKey(evt)) {
    closePhoto();
  }
}

function onOverlayClick(evt) {
  if (!picturePreview.contains(evt.target)) {
    closePhoto();
  }
}

function closePhoto() {
  document.body.classList.remove('modal-open');
  pictureContainer.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEsc);
  pictureOverlay.removeEventListener('click', onOverlayClick);
  closeButtonPicture.removeEventListener('click', closePhoto);
  buttonCommentsLoader.removeEventListener('click', getLoadComments);
}

function createPictureComments(comments) {
  comments.forEach((comment) => {
    const element = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('p');
    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;
    element.append(img);
    element.append(text);
    pictureComments.append(element);
  });
}

function getLoadComments() {
  // Если длинна массива с комментариями равно 0 то ни чего не делаем
  if (!commentsShowArray.length) {
    return;
  }

  // Обрезаем наш массив комментариев на порции
  const additionalComments = commentsShowArray.slice(pictureComments.children.length, pictureComments.children.length + COMMENT_PER_PORTION);

  // Добовляем комментарии в уже существующий список
  createPictureComments(additionalComments);

  // Показываем кол-во отрисованных коментариев
  commentsCountList.textContent =
    `${pictureComments.children.length} из ${commentsShowArray.length} комментариев`;

  // Когда загрузили все комментарии
  if (commentsShowArray.length <= pictureComments.children.length) {
    buttonCommentsLoader.classList.add('hidden');
  }
}

function fillComments({ comments }) {
  const showFirstComments = comments.slice(0, COMMENT_PER_PORTION);

  createPictureComments(showFirstComments);

  commentsCountList.textContent = `${showFirstComments.length} из ${comments.length} комментариев`;

  // Если изначально у нас <= 5 комментариев
  if (showFirstComments.length >= comments.length) {
    commentsCountList.classList.add('hidden');
    buttonCommentsLoader.classList.add('hidden');
  }
}

function findPhoto() {
  picturesContainer.addEventListener('click', (thumbnail) => {
    const picture = thumbnail.target.parentNode;
    const thumbnailIndex = thumbnails.findIndex((item) => item === picture);
    const photo = thumbnailsList[thumbnailIndex];

    pictureComments.innerHTML = '';
    commentsCountList.classList.remove('hidden');
    buttonCommentsLoader.classList.remove('hidden');

    commentsShowArray = photo.comments;
    document.body.classList.add('modal-open');
    pictureContainer.classList.remove('hidden');
    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    pictureDescription.textContent = photo.description;

    buttonCommentsLoader.addEventListener('click', getLoadComments);
    fillComments(photo);

    document.addEventListener('keydown', onPictureEsc);
    pictureOverlay.addEventListener('click', onOverlayClick);
    closeButtonPicture.addEventListener('click', closePhoto);
  });
}

export { findPhoto };
