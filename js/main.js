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
  'Всё отлично!',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'
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
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
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

  const message = () => {
    const numberOfMessages = getRandomInteger(1, 2);
    if (numberOfMessages === 1) {
      return getRandomArrayElement(MESSAGES);
    } else {
      const firstMessage = getRandomArrayElement(MESSAGES);
      const secondMessage = getRandomArrayElement(MESSAGES.filter((msg) => msg !== firstMessage));
      return `${firstMessage} ${secondMessage}`;
    }
  };

  for (let i = 0; i < count; i++) {
    const generateRandomAvatarId = getRandomInteger(1, 6);

    const comment = {
      id: generateRandomCommentId(),
      avatar: `img/avatar-${generateRandomAvatarId}.svg`,
      message: message(),
      name: getRandomArrayElement(NAMES)
    };

    comments.push(comment);
  }

  return comments;
};


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
      comments: createComments(getRandomInteger(0, 30)),
    };

    photos.push(photo);
  }

  return photos;
};

createPhoto(25);
// console.log(createPhoto(25));
