import {Image, View} from 'react-native';
import {images} from '../../src/constants';
import {onBoardingImageStyles} from '../../src/styles/globalStyles';

export const ON_BOARDING = [
  {
    id: 1,
    backgroundColor: '#222831',
    image: (
      <Image
        resizeMode="contain"
        style={onBoardingImageStyles.imageStyles}
        source={images.img_bot_say}
      />
    ),
    title: 'Welcome to AI Chatbot AIVO',
    subtitle:
      'Experience the power of artificial intelligence at your fingertips with AIVO. Get ready to explore a world with AIVO!',
  },
  {
    id: 2,
    backgroundColor: '#393E46',
    image: (
      <Image
        resizeMode="contain"
        style={onBoardingImageStyles.imageStyles}
        source={images.img_bot_chatlist}
      />
    ),
    title: 'Engage with AI Conversations',
    subtitle:
      'Integrating ChatGPT and DALLE APIs to provide you with intelligent responses to your queries.',
  },
  {
    id: 3,
    backgroundColor: '#112D4E',
    image: (
      <Image
        resizeMode="contain"
        style={onBoardingImageStyles.imageStyles}
        source={images.img_bot_search}
      />
    ),
    title: 'Break Language Barriers',
    subtitle:
      'AIVO goes beyond boundaries with its built-in translator feature. From English to Hindi and a variety of other languages',
  },
  {
    id: 4,
    backgroundColor: '#27374D',
    image: (
      <Image
        resizeMode="contain"
        style={onBoardingImageStyles.imageStyles}
        source={images.img_bot_movies}
      />
    ),
    title: 'Explore Endless Possibilities',
    subtitle:
      'Whether you are interested in art, coding tips, health advice, or entertainment recommendations, AIVO has you covered.',
  },
];
