import {images} from '../../src/constants';
import {LABELS} from '../../src/localization/labels';

export const ON_BOARDING = [
  {
    id: 0,
    image: images.img_bot_say,
    title: 'Welcome to AI Chatbot AIVO',
    subtitle:
      'Experience the power of artificial intelligence at your fingertips with AIVO. Get ready to explore a world with AIVO!',
  },
  {
    id: 1,
    image: images.img_bot_chatlist,
    title: 'Engage with AI Conversations',
    subtitle:
      'Integrating ChatGPT and DALL-E to provide you with intelligent responses to your queries.',
  },
  {
    id: 2,
    image: images.img_bot_search,
    title: 'Break Language Barriers',
    subtitle:
      'AIVO goes beyond boundaries with its built-in translator feature. From English to Hindi and a variety of other languages',
  },
  {
    id: 3,
    image: images.img_bot_movies,
    title: 'Explore Endless Possibilities',
    subtitle:
      'Whether you are interested in art, coding tips, health advice, or entertainment recommendations, AIVO has you covered.',
  },
];

export const FEATURES = [
  {
    id: 0,
    featuresName: LABELS.GENERATED_AI_IMAGE,
    image: 'robot-love',
  },
  {
    id: 1,
    featuresName: LABELS.HIGHER_WORDS_LIMIT,
    image: 'file-word-box',
  },
  {
    id: 2,
    featuresName: LABELS.NO_ADS,
    image: 'advertisements-off',
  },
  {
    id: 3,
    featuresName: LABELS.NO_LIMITS,
    image: 'infinity',
  },
];

export const IN_APP_PURCHASE_DATA = [
  {
    id: 0,
    title: 'INR 400.00/Week',
    offers: '3 days free trial, Auto Renew',
  },
  {
    id: 1,
    title: 'INR 890.00/Month',
    offers: '3 days free trial, Auto Renew',
  },
  {
    id: 2,
    title: 'INR 5200.00/Lifetime',
    offers: 'Billed Once',
  },
];

export const POPULAR_FEATURES = [
  {
    id: 1,
    title: 'Chat With Aivo',
    images: images.img_bot_say,
  },
  {
    id: 2,
    title: 'Talk With Aivo',
    images: images.img_bot_say,
  },
  {
    id: 3,
    title: 'Image Search',
    images: images.img_bot_say,
  },
  {
    id: 4,
    title: 'History',
    images: images.img_bot_say,
  },
];
