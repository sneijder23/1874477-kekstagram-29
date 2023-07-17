const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (text) {
    element.textContent = text;
  }
  return element;
};

const createComment = (comment) => {
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
  return element;
};

export { createElement, createComment };
