import {createComments, createCardPhoto} from './functions.js';

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

const COMMENT_COUNT = 30;
const PHOTO_COUNT = 25;
const COMMENT_PER_PORTION = 5;

createComments(COMMENT_COUNT);
createCardPhoto(PHOTO_COUNT);

export {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  COMMENT_COUNT,
  PHOTO_COUNT,
  createCardPhoto,
  COMMENT_PER_PORTION
};
