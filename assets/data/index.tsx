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

export const EXPLORE_TYPES = [
  {
    id: 1,
    title: 'All',
    type: 'all',
  },
  {
    id: 2,
    title: 'Art and Creativity',
    type: 'artAndCreativity',
  },
  {
    id: 3,
    title: 'Programming and Development',
    type: 'programmingAndDevelopment',
  },
  {
    id: 4,
    title: 'Content Creation',
    type: 'contentCreation',
  },
  {
    id: 5,
    title: 'Entertainment',
    type: 'entertainment',
  },
  {
    id: 6,
    title: 'Education and Learning',
    type: 'educationAndLearning',
  },
  {
    id: 7,
    title: 'Health and Wellness',
    type: 'healthAndWellness',
  },
  {
    id: 8,
    title: 'Travel and Leisure',
    type: 'travelAndLeisure',
  },
];

export const RENDER_EXPLORE_TYPES = [
  {
    id: 1,
    title: 'Image Generation',
    type: 'all artAndCreativity',
    description: 'Create unique images and artworks using AI.',
    images: images.img_edit_image,
    useCases:
      'Generating artwork for personal projects, creating visuals for social media, designing custom graphics.',
  },
  {
    id: 2,
    title: 'Music Composition',
    type: 'all artAndCreativity',
    description: 'Compose original music tracks with the help of AI.',
    images: images.img_music,
    useCases:
      'Creating background music for videos, composing music for relaxation or study, generating new melodies for songs.',
  },
  {
    id: 3,
    title: 'Poetry Generation',
    type: 'all artAndCreativity',
    description: 'Generate creative and original poetry using AI.',
    images: images.img_text,
    useCases:
      'Writing poems for personal enjoyment, generating content for literature classes, creating poetry for special occasions.',
  },
  {
    id: 4,
    title: 'Code Generation',
    type: 'all programmingAndDevelopment',
    description: 'Automate the creation of code snippets and modules.',
    images: images.img_code_one,
    useCases:
      'Speeding up software development, generating boilerplate code, assisting with coding assignments.',
  },
  {
    id: 5,
    title: 'Programming Languages',
    type: 'all programmingAndDevelopment',
    description: 'Learn and get assistance with various programming languages.',
    images: images.img_javascript,
    useCases:
      'Learning new programming languages, getting help with syntax and errors, improving coding skills.',
  },
  {
    id: 6,
    title: 'Code Optimization',
    type: 'all programmingAndDevelopment',
    description: 'Enhance and optimize existing code for better performance.',
    images: images.img_inspect,
    useCases:
      'Improving the efficiency of code, reducing runtime and memory usage, refactoring code for readability.',
  },
  {
    id: 7,
    title: 'Code Debugging',
    type: 'all programmingAndDevelopment',
    description: 'Identify and fix bugs in your code with AI assistance.',
    images: images.img_debugging,
    useCases:
      'Debugging software, troubleshooting coding errors, ensuring code functionality.',
  },
  {
    id: 8,
    title: 'Blog Post Generation',
    type: 'all contentCreation',
    description: 'Create well-written blog posts on various topics.',
    images: images.img_article,
    useCases:
      'Generating content for blogs, writing articles for websites, creating posts for content marketing.',
  },
  {
    id: 22,
    title: 'YouTube Content Generation',
    type: 'all contentCreation',
    description:
      'Create engaging and high-quality content for YouTube channels using AI.',
    images: images.img_youtube,
    useCases:
      'Generating video ideas and scripts, optimizing content for SEO, creating thumbnails, planning content calendars, and enhancing video descriptions to attract more viewers.',
  },
  {
    id: 10,
    title: 'Social Media Content Creation',
    type: 'all contentCreation',
    description: 'Generate engaging content for social media platforms.',
    images: images.img_facebook,
    useCases:
      'Creating posts for Instagram, Facebook, and Twitter, developing social media campaigns, generating ideas for social media content.',
  },
  {
    id: 11,
    title: 'Video Scriptwriting',
    type: 'all contentCreation',
    description: 'Write scripts for videos with the help of AI.',
    images: images.img_video,
    useCases:
      'Creating scripts for YouTube videos, writing dialogues for short films, developing content for video marketing.',
  },
  {
    id: 12,
    title: 'Email Drafting',
    type: 'all contentCreation',
    description: 'Draft professional and personal emails quickly.',
    images: images.img_email,
    useCases:
      'Writing business emails, composing personal messages, generating email templates for marketing.',
  },
  {
    id: 13,
    title: 'Movie and TV Show Recommendations',
    type: 'all entertainment',
    description: 'Get personalized recommendations for movies and TV shows.',
    images: images.img_movies,
    useCases:
      'Finding new movies and shows to watch, getting recommendations based on viewing history, discovering content across different genres.',
  },
  {
    id: 14,
    title: 'Game Suggestions',
    type: 'all entertainment',
    description: 'Receive recommendations for video games.',
    images: images.img_game_one,
    useCases:
      'Finding new games to play, discovering games based on preferences, exploring different gaming genres.',
  },
  {
    id: 15,
    title: 'English Learning',
    type: 'all educationAndLearning',
    description: 'Learn and improve English language skills.',
    images: images.img_book,
    useCases:
      'Practicing English grammar and vocabulary, improving speaking and writing skills, preparing for English exams.',
  },
  {
    id: 16,
    title: 'Personalized Learning Plans',
    type: 'all educationAndLearning',
    description: 'Get customized learning plans tailored to individual needs.',
    images: images.img_content,
    useCases:
      'Creating study schedules, identifying learning goals, tracking academic progress.',
  },
  {
    id: 17,
    title: 'Fitness Advice',
    type: 'all healthAndWellness',
    description: 'Receive personalized fitness and exercise recommendations.',
    images: images.img_personal_trainer,
    useCases:
      'Planning workout routines, getting advice on exercises, setting and achieving fitness goals.',
  },
  {
    id: 18,
    title: 'Mental Health Support',
    type: 'all healthAndWellness',
    description:
      'Access resources and support for mental health and well-being.',
    images: images.img_mental_health,
    useCases:
      'Finding coping strategies for stress and anxiety, accessing mental health resources, getting support for emotional well-being.',
  },
  {
    id: 19,
    title: 'Medicine Details',
    type: 'all healthAndWellness',
    description:
      'Access detailed information about various medications, including uses, side effects, interactions, and more.',
    images: images.img_pharma,
    useCases:
      'Looking up information on prescribed medications, understanding potential side effects, checking drug interactions, finding dosage guidelines, and learning about alternative medications.',
  },
  {
    id: 20,
    title: 'Nutrition Planning',
    type: 'all healthAndWellness',
    description: 'Create customized nutrition and diet plans.',
    images: images.img_calories,
    useCases:
      'Planning balanced meals, managing dietary restrictions, setting and achieving nutrition goals.',
  },
  {
    id: 21,
    title: 'Travel Planning',
    type: 'all travelAndLeisure',
    description: 'Plan trips and create travel itineraries with AI assistance.',
    images: images.img_beach,
    useCases:
      'Finding travel destinations, planning itineraries, booking accommodations and activities.',
  },
  {
    id: 22,
    title: 'Language Translation',
    type: 'all educationAndLearning travelAndLeisure',
    description: 'Translate text and speech between different languages.',
    images: images.img_translation,
    useCases:
      'Communicating while traveling, translating documents and messages, learning new languages.',
  },
];
