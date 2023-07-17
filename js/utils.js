import { createElement } from './create-element.js';
import { ALERT_TIME, MAX_TEXT_LENGTH } from './config.js';

const body = document.querySelector('body');

const validateString = (value) => value.length <= MAX_TEXT_LENGTH;

const normalizeString = (str) => str.toLowerCase().trim();

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = createElement('div', 'alert-message', message);
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.padding = '15px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'tomato';
  alertContainer.style.transform = 'scale(1)';

  body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIME);
};

export {
  body,
  showAlert,
  isEscapeKey,
  validateString,
  normalizeString
};
