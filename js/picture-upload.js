import { isEscapeKey } from './util.js';
import { errorHashtagMessage, validateComment, validateHashtags } from './validate-form.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButtonEditor = document.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview img');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
// let errorHashtagMessage = '';

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
}, false);

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  () => errorHashtagMessage || 'Хэш-тег некорректен'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

function onSubmitForm(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  pristine.validate();
}

function onOverlayClick(evt) {
  if (evt.target.matches('.img-upload__overlay') || evt.target.closest('.img-upload__cancel')) {
    closePhotoEditor();
  }
}

function onPictureEsc(evt) {
  if (isEscapeKey(evt) && !hashtagInput.contains(evt.target) && !commentInput.contains(evt.target)) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

function addEvent() {
  hashtagInput.addEventListener('input', validateHashtags);
  formUploadPhoto.addEventListener('submit', onSubmitForm);
  document.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onPictureEsc);
  closeButtonEditor.addEventListener('click', closePhotoEditor);
}

function removeEvent() {
  formUploadPhoto.removeEventListener('submit', onSubmitForm);
  hashtagInput.removeEventListener('input', validateHashtags);
  document.removeEventListener('keydown', onPictureEsc);
  document.removeEventListener('click', onOverlayClick);
  closeButtonEditor.removeEventListener('click', closePhotoEditor);
}

function closePhotoEditor() {
  uploadInput.value = '';
  commentInput.value = '';
  photoPreview.src = '';
  URL.revokeObjectURL(photoPreview.src);
  photoEditor.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  pristine.reset();

  removeEvent();
}

function uploadPhoto() {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const url = URL.createObjectURL(file);

    photoEditor.classList.remove('hidden');
    document.body.classList.add('.modal-open');
    photoPreview.src = url;

    addEvent();
  });
}

export {
  errorHashtagMessage,
  hashtagInput,
  commentInput,
  uploadPhoto
};
