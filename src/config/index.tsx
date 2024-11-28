import axios from 'axios';

const CHATGPT_URL = 'https://api.openai.com/v1/chat/completions';
const DALLE_URL = 'https://api.openai.com/v1/images/generations';

export const getChatGPTResponse = async (
  chatGPTAPIKey: any,
  chatGPTModelName?: any,
  responseToken?: any,
  messageHint?: any,
  userPrompt?: any,
  firstLanguage?: any,
  secondLanguage?: any,
) => {
  try {
    const response: any = await axios.post(
      CHATGPT_URL,
      {
        model: chatGPTModelName || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: messageHint
              ? `${messageHint} : ${userPrompt}`
              : userPrompt,
          },
        ],
        // max_tokens: responseToken || 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${chatGPTAPIKey}`,
        },
      },
    );

    return response.data.choices[0]?.message.content.trim();
  } catch (error: any) {
    console.error(
      'Error fetching ChatGPT response:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getDallEResponse = async (
  chatGPTAPIKey: any,
  dalleModalName?: any,
  generatePhotoSize?: any,
  messageHint?: any,
  userPrompt?: any,
) => {
  try {
    const response = await axios.post(
      DALLE_URL,
      {
        model: dalleModalName || 'dall-e-2',
        prompt: messageHint ? `${messageHint} : ${userPrompt}` : userPrompt,
        n: 1,
        size: generatePhotoSize || '256x256',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${chatGPTAPIKey}`,
        },
      },
    );
    return response?.data;
  } catch (error: any) {
    console.error(
      'Error fetching ChatGPT response:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
