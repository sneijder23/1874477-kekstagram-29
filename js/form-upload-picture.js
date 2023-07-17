import { isEscapeKey } from './utils.js';
import { pristine, commentInput, hashtagInput, onFormSubmit } from './validate-form.js';
import { uploadScale, changePhotoScale, resetPhotoScale } from './scale-picture.js';
import { effectLevelSlider, effectsList, onFilterChange, init } from './filter-picture.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const uploadInput = formUploadPhoto.querySelector('.img-upload__input');
const uploadOverlay = formUploadPhoto.querySelector('.img-upload__overlay');
const closeButtonEditor = formUploadPhoto.querySelector('.img-upload__cancel');
const photoPreview = formUploadPhoto.querySelector('.img-upload__preview img');

const closeUploadPhoto = () => {
  uploadInput.value = '';
  commentInput.value = '';
  URL.revokeObjectURL(photoPreview.src);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  formUploadPhoto.reset();
  pristine.reset();
  effectLevelSlider.noUiSlider.destroy();

  resetPhotoScale();
  removeEvent();
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const url = URL.createObjectURL(file);

    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('.modal-open');
    photoPreview.src = url;

    init();
    addEvent();
  });
};

const onOverlayClick = (evt) => {
  if (evt.target === uploadOverlay || evt.target === closeButtonEditor) {
    closeUploadPhoto();
  }
};

const onPictureEsc = (evt) => {
  if (isEscapeKey(evt) && !hashtagInput.contains(evt.target) && !commentInput.contains(evt.target)) {
    evt.preventDefault();
    closeUploadPhoto();
  }
};

function addEvent() {
  uploadScale.addEventListener('click', changePhotoScale);
  effectsList.addEventListener('change', onFilterChange);
  closeButtonEditor.addEventListener('click', closeUploadPhoto);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onPictureEsc);
}

function removeEvent() {
  formUploadPhoto.removeEventListener('submit', onFormSubmit);
  uploadScale.removeEventListener('click', changePhotoScale);
  effectsList.removeEventListener('change', onFilterChange);
  closeButtonEditor.removeEventListener('click', closeUploadPhoto);
  document.removeEventListener('keydown', onPictureEsc);
  document.removeEventListener('click', onOverlayClick);
}

export {
  photoPreview,
  uploadPhoto,
  closeUploadPhoto
};
