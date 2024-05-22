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
    description:
      'Engage in text-based conversations with Aivo, our AI assistant.',
    images: images.img_chat,
    type: 'popular_features',
  },
  {
    id: 2,
    title: 'Talk With Aivo',
    description:
      'Have a voice-based interaction, Speak your queries, and provides relevant information and assistance.',
    images: images.img_mic,
    type: 'popular_features',
  },
  {
    id: 3,
    title: 'Image Search',
    description:
      'Search for images effortlessly using our Image Search feature.',
    images: images.img_search_image,
    type: 'popular_features',
  },
  {
    id: 4,
    title: 'History',
    description:
      'Access your interaction history with Aivo. Quickly review past conversations, searches.',
    images: images.img_history,
    type: 'popular_features',
  },
];

export const ASSISTANT_FEATURES_HOME = [
  {
    id: 5,
    title: 'Art',
    additionalTitle: 'Art',
    description:
      'Create digital arts, learn art, history and express bring your thoughts to life',
    images: images.img_art,
    type: 'assistant_features',
  },
  {
    id: 6,
    title: 'Code',
    additionalTitle: 'Code',
    description:
      'Generate programming codes or algorithms for complex work application and website',
    images: images.img_code,
    type: 'assistant_features',
  },
  {
    id: 7,
    title: 'Booking',
    additionalTitle: 'Booking',
    description:
      'Find tourist attraction, book flights, hotels and lean about more places',
    images: images.img_booking,
    type: 'assistant_features',
  },
  {
    id: 8,
    title: 'Content',
    additionalTitle: 'Content',
    description:
      'Write contents for your articles, websites and blogs and more.',
    images: images.img_content_search,
    type: 'assistant_features',
  },
];

export const FEATURES_FOR_HOME = [
  {
    id: Math.random(),
    title: LABELS.POPULAR,
    type: 'header_one',
  },
  ...POPULAR_FEATURES,
  {id: Math.random(), title: LABELS.EXPLORE, type: 'header_two'},
  ...ASSISTANT_FEATURES_HOME,
];
