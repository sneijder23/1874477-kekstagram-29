const NAMES = [
  'Петя',
  'Вася',
  'Саша',
  'Паша',
  'Даша',
  'Юлия',
  'Люда',
  'Гоша',
  'Маша',
];

const MESSAGES = [
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
];

const DESCRIPTIONS = [
  'Я в космосе.Зацените моё селфи!!!',
  'Как проходит мой отпуск. Найди меня на фото!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComments = (count) => {
  const comments = [];

  const generateRandomCommentId = createRandomIdFromRangeGenerator(1, 30);

  for (let i = 0; i < count; i++) {
    const generateRandomAvatarId = getRandomInteger(1, 6);

    const comment = {
      id: generateRandomCommentId(),
      avatar: `img/avatar-${generateRandomAvatarId}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    };

    comments.push(comment);
  }

  return comments;
};

const allComments = createComments(30);

const createPhoto = (count) => {
  const photos = [];

  const generateRandomDescriptionId = createRandomIdFromRangeGenerator(1, 25);
  const generateRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);

  for (let i = 0; i < count; i++) {

    const photo = {
      id: generateRandomDescriptionId(),
      url: `photos/${generateRandomPhotoId()}.jpg`,
      desctiption: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: getRandomArrayElement(allComments),
    };

    photos.push(photo);
  }

  return photos;
};

createPhoto(25);
// console.log(createPhoto(25));
