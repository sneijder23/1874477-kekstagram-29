import { isEscapeKey } from './util.js';

const formUploadPhoto = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const photoEditor = document.querySelector('.img-upload__overlay');
const closeButtonEditor = document.querySelector('.img-upload__cancel');
const uploadButton = document.querySelector('.img-upload__submit');
const photoPreview = document.querySelector('.img-upload__preview img');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
let errorHashtagMessage = '';

const pristine = new Pristine(formUploadPhoto, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
}, false);

function validateComment(value) {
  return value.length <= 140;
}


function validateHashtags() {
  const hashtags = hashtagInput.value.trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags.map((item) => item.toLowerCase()));
  let isValid = true;

  if (hashtags.length === 0) {
    return true;
  }

  if (uniqueHashtags.size > 5) {
    isValid = false;
    errorHashtagMessage = 'Нельзя указать больше пяти хэш-тегов';
  } else {
    for (const hashtag of hashtags) {
      if (hashtag === '') {
        continue;
      }
      if (!hashtagRegExp.test(hashtag)) {
        isValid = false;
        errorHashtagMessage = `Хэш-тег "${hashtag}" некорректен`;
        break;
      }
      if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
        isValid = false;
        errorHashtagMessage = `Один и тот же хэш-тег "${hashtag}" не может быть использован дважды`;
        break;
      }
    }
  }

  return isValid;
}

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

function onPictureEsc(evt) {
  if (isEscapeKey(evt) && !hashtagInput.contains(evt.target) && !commentInput.contains(evt.target)) {
    evt.preventDefault();
    closePhotoEditor();
  }
}

function closePhotoEditor() {
  uploadInput.value = '';
  commentInput.value = '';
  errorHashtagMessage = '';
  photoPreview.src = '';
  uploadButton.disabled = false;
  URL.revokeObjectURL(photoPreview.src);
  photoEditor.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  pristine.reset();

  formUploadPhoto.removeEventListener('submit', onSubmitForm);
  hashtagInput.removeEventListener('input', validateHashtags);
  document.removeEventListener('keydown', onPictureEsc);
  closeButtonEditor.removeEventListener('click', closePhotoEditor);
}

function uploadPhoto() {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const url = URL.createObjectURL(file);

    photoEditor.classList.remove('hidden');
    document.body.classList.add('.modal-open');
    photoPreview.src = url;

    hashtagInput.addEventListener('input', validateHashtags);
    formUploadPhoto.addEventListener('submit', onSubmitForm);

    document.addEventListener('keydown', onPictureEsc);
    closeButtonEditor.addEventListener('click', closePhotoEditor);
  });
}

export { uploadPhoto };
