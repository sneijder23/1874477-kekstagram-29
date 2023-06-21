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

/**
 * Получение случайного числа с заданого интервала
 * @param {number} min - начало интервала
 * @param {number} max - конец интервала
 * @returns - Возвращает случайное целое число из интервала
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 *
 * @param {number} min - начало интервала
 * @param {number} max - конец интервала
 * @param {array} previousValues - вспомогательный массив, для исключения уже полученных уникальных чисел
 * @param if используется для остановки цикла, когда перебраны все числа из заданного диапозона min, max
 * @returns - Возвращает случайное уникальное целое число из интервала
 */
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

/**
 * Функция для получения случайного элемента из переданного массива
 * @param {array} elements - переданный массив
 * @param {number} getRandomInteger - генерация случайного числа в интервале от 0 до elements.length
 * @returns
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const COMMENT_COUNT = 30;

/**
 * Функция для создания комментариев
 * @param {number} count - количество уникальных комментариев
 * @param {array} comments - массив уникальных комментариев
 * @param {number} COMMENT_COUNT - количество комментариев
 * @returns в случае получения 1 сообщения возвращаем его
 * @returns в случае получения 2 сообщений проверяем методом filter на уникальность сообщения и возвращаем их
 * @param for цикл для создания уникальных комментариев
 * @returns возвращает готовый объект комментария
 */
const createComments = (count) => {
  const comments = [];

  const generateRandomCommentId = createRandomIdFromRangeGenerator(1, COMMENT_COUNT);

  /**
   * Функция для получения сообщения в комментарий
   * @param {number} numberOfMessages - рандомно получаем 1 или 2 сообщения
   * @returns в случае получения 1 сообщения возвращаем его
    * @returns в случае получения 2 сообщений проверяем методом filter на уникальность сообщения и возвращаем их
   */
  const createMessage = () => {
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
      message: createMessage(),
      name: getRandomArrayElement(NAMES)
    };

    comments.push(comment);
  }

  return comments;
};

/**
 * Функция для создания уникальных карточек фото
 * @param {number} count - количество уникальных фото
 * @param {number} generateRandomCardId - генерация уникального неповторяющего id для карточки
 * @param {number} generateRandomPhotoId - генерация уникального неповторяющего id для url фото
 * @returns возвращает массив с объектами уникальных карточек фото с описанием
 */
const createPhoto = (count) => {
  const photos = [];

  const generateRandomCardId = createRandomIdFromRangeGenerator(1, 25);
  const generateRandomPhotoId = createRandomIdFromRangeGenerator(1, 25);

  for (let i = 0; i < count; i++) {

    const photo = {
      id: generateRandomCardId(),
      url: `photos/${generateRandomPhotoId()}.jpg`,
      desctiption: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: createComments(getRandomInteger(0, COMMENT_COUNT)),
    };

    photos.push(photo);
  }

  return photos;
};

createPhoto(25);
// console.log(createPhoto(25));
