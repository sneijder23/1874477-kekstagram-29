
import { isEscapeKey, removeEventListener } from './util.js';
import { thumbnailsList } from './thumbnail.js';
import { COMMENT_PER_PORTION } from './data.js';
import { picturesContainer } from './thumbnail.js';

const thumbnails = Array.from(document.querySelectorAll('.picture')); // Получаем массив из NodeList
const pictureContainer = document.querySelector('.big-picture');
const pictureComments = document.querySelector('.social__comments');
const buttonCommentsLoader = document.querySelector('.comments-loader');
const closeButtonPicture = pictureContainer.querySelector('.big-picture__cancel');

const openBigPicture = (picture) => {
  const pictureImg = pictureContainer.querySelector('.big-picture__img img');
  const pictureDescription = pictureContainer.querySelector('.social__caption');
  const pictureLikes = pictureContainer.querySelector('.likes-count');
  const pictureCommentsFinishCount = pictureContainer.querySelector('.comments-count');

  pictureImg.src = picture.url;
  pictureDescription.textContent = picture.description;
  pictureLikes.textContent = picture.likes;
  pictureCommentsFinishCount.textContent = picture.comments.length;

  // Открытие окна Big Picture
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const fillComments = ({ comments }) => {
  const commentsList = [];
  let startComment = 0; // Текущая позиция в массиве commentsList

  const showNextComments = () => {
    const nextPortion = commentsList.slice(startComment, startComment + COMMENT_PER_PORTION);
    nextPortion.forEach((comment) => {
      pictureComments.append(comment);
    });
    startComment += COMMENT_PER_PORTION;

    if (startComment >= commentsList.length) {
      startComment = commentsList.length;
      buttonCommentsLoader.classList.add('hidden'); // Скрываем кнопку, если все комментарии загружены
    }

    // Обновляем значения счетчика комментариев
    const commentsCountSpan = document.querySelector('.comments-count');
    const displayedCommentsCount = Math.min(startComment, commentsList.length);
    commentsCountSpan.textContent = displayedCommentsCount.toString();

    // Обновляем значение "из" в счетчике комментариев
    const commentCounter = document.querySelector('.social__comment-count');
    if (commentsList.length === 0) {
      commentCounter.innerHTML = 'Нет комментариев';
    } else {
      commentCounter.innerHTML = `${displayedCommentsCount} из <span class="comments-count">${commentsList.length}</span> комментариев`;
    }
  };

  const createCommentElement = ({ avatar, name, message }) => {
    const item = document.createElement('li');
    const itemImg = document.createElement('img');
    const itemText = document.createElement('p');

    item.classList.add('social__comment');
    itemImg.classList.add('social__picture');
    itemText.classList.add('social__text');

    itemImg.src = avatar;
    itemImg.alt = name;
    itemText.textContent = message;

    item.append(itemImg);
    item.append(itemText);

    return item; // Возвращает оформленный один коммент
  };

  const resetComments = () => {
    startComment = 0; // Сброс текущей позиции при открытии новой фотографии
    pictureComments.innerHTML = ''; // Очистка контейнера комментариев
    buttonCommentsLoader.classList.remove('hidden'); // Возвращаем кнопку загрузки, если на предыдущем фото она скрылась после прогрузки всех комментов
    showNextComments(); // Отображаем первую порцию комментариев
  };

  comments.forEach(({ avatar, name, message }) => {
    const comment = createCommentElement({ avatar, name, message });
    commentsList.push(comment);
  });
  console.log(comments);

  showNextComments(); // Отображаем первую порцию комментариев

  resetComments(); // Очиска после закрытия для открытия новой фотографии

  buttonCommentsLoader.addEventListener('click', showNextComments);
};

const findFullSizePicture = () => {
  picturesContainer.addEventListener('click', (thumbnail) => {
    const picture = thumbnail.target.parentNode;
    const thumbnailIndex = thumbnails.findIndex((item) => item === picture);

    openBigPicture(thumbnailsList[thumbnailIndex]);
    fillComments(thumbnailsList[thumbnailIndex]);

    const closeBigPicture = () => {
      pictureContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
    };

    // Закрытие окна большой фотографии по ESC
    const handleDocumentClick = (evt) => {
      const bigPicturePreview = document.querySelector('.big-picture__preview');
      if (!bigPicturePreview.contains(evt.target)) {
        closeBigPicture();
        removeEventListener(handleKeyDown,handleDocumentClick);
      }
    };

    function handleKeyDown(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        closeBigPicture();
        removeEventListener(handleKeyDown,handleDocumentClick);
      } else {
        handleDocumentClick(evt);
      }
    }

    // Закрытие окна большой фотографии
    closeButtonPicture.addEventListener('click', () => {
      closeBigPicture();
      removeEventListener(handleKeyDown,handleDocumentClick);
    });

    setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
      document.addEventListener('keydown', handleKeyDown);
    }, 0);
  });
};

export { findFullSizePicture };
