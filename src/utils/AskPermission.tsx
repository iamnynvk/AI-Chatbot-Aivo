import {Alert, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {initFirebase} from './Firebase';
import {IOS_DEVICE} from '../constants/theme';

export const checkMicrophonePermission = async () => {
  try {
    const result = await check(
      IOS_DEVICE
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (result === RESULTS.GRANTED) {
      return true;
    }
  } catch (error) {
    console.error('Error checking microphone permission:', error);
  }
};

export const requestMicrophonePermission = async () => {
  try {
    const result = await request(
      IOS_DEVICE
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Aivo',
        'We need micro phone permission for access to recorded audio.',
      );
    }
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
  }
};

export const checkCameraPermission = async () => {
  try {
    const cameraPermissionCheck = await check(
      IOS_DEVICE ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    );

    if (cameraPermissionCheck === RESULTS.GRANTED) {
      return cameraPermissionCheck;
    } else {
      await requestCameraPermission();
    }
  } catch (error) {
    console.error('Error checking Camera permission:', error);
    return false;
  }
};

export const requestCameraPermission = async () => {
  try {
    const result = await request(
      IOS_DEVICE ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    );
    if (result === RESULTS.GRANTED) {
      return result;
    } else {
      Alert.alert(
        'Aivo',
        'We need camera permission for access to the capture images.',
      );
    }
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

export const checkGalleryPermission = async () => {
  try {
    const galleryPermissionCheck = await check(
      IOS_DEVICE
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );

    if (galleryPermissionCheck === RESULTS.GRANTED) {
      return galleryPermissionCheck;
    } else {
      await requestStoragePermission();
    }
  } catch (error) {
    console.error('Error checking Gallery permission:', error);
    return false;
  }
};

export const requestStoragePermission = async () => {
  try {
    const result = await request(
      IOS_DEVICE
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    );
    if (result === RESULTS.GRANTED) {
      return result;
    } else {
      Alert.alert(
        'Aivo',
        'We need image and video permission for access to the store images and videos on storage.',
      );
    }
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

export const checkPushPermission = async () => {
  try {
    const pushPermissionCheck = await check(
      PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    );

    if (pushPermissionCheck === RESULTS.GRANTED) {
      return pushPermissionCheck;
    } else {
      await requestPushPermission();
    }
  } catch (error) {
    console.error('Error checking Gallery permission:', error);
    return false;
  }
};

export const requestPushPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    initFirebase();

    if (result === RESULTS.GRANTED || enabled) {
      return result;
    } else {
      Alert.alert(
        'Aivo',
        'We need notification permission for send messages and other information.',
      );
    }
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

export const requestMultiplePermissions = async () => {
  const permissions = await requestMultiple(
    IOS_DEVICE
      ? [
          PERMISSIONS.IOS.MICROPHONE,
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MEDIA_LIBRARY,
        ]
      : [
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ],
  );

  const audioRecPermission = IOS_DEVICE
    ? permissions['ios.permission.MICROPHONE'] === RESULTS.GRANTED
    : permissions['android.permission.RECORD_AUDIO'] === RESULTS.GRANTED;
  const cameraPermission = IOS_DEVICE
    ? permissions['ios.permission.CAMERA'] === RESULTS.GRANTED
    : permissions['android.permission.CAMERA'] === RESULTS.GRANTED;
  const storagePermission = IOS_DEVICE
    ? permissions['ios.permission.MEDIA_LIBRARY'] === RESULTS.GRANTED
    : permissions['android.permission.READ_MEDIA_IMAGES'] === RESULTS.GRANTED;
  const pushPermission =
    permissions['android.permission.POST_NOTIFICATIONS'] === RESULTS.GRANTED;

  if (
    audioRecPermission &&
    cameraPermission &&
    storagePermission &&
    pushPermission
  ) {
    return true;
  }
};
