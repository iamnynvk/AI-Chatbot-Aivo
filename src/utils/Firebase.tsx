import auth, {firebase} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import perf from '@react-native-firebase/perf';
import storage from '@react-native-firebase/storage';
import PushNotification from 'react-native-push-notification';
import {COLLECTIONS} from '../enums';
import {ANDROID_DEVICE} from '../constants/theme';

const firebaseAuth: any = auth();
const db: any = firestore();
const dbStorage: any = storage();

const deleteLoop = [COLLECTIONS.USERS, COLLECTIONS.PROFILE];

/**
 * Returns a user identifier as specified by the authentication provider.
 */
export const getAuthUserId = () => firebaseAuth.currentUser?.uid;

/**
 * get FCM token
 */
export const getFCMToken = async () => {
  const fcmTrack = perf().newTrace('getFcmToken-Track');
  fcmTrack.start();
  const fcmToken = await messaging().getToken();
  fcmTrack.stop();
  return fcmToken;
};

/**
 * Returns document's identifier within its users collection.
 */
export const getImageDocId = () => db.collection(COLLECTIONS.USERS).doc().id;

/**
 * Returns a string pointing to users-> userId -> profile location path on the storage bucket.
 *
 * @param userId A slash-separated documentPath to a document.
 */
const imageStoragePath = (userId: any) =>
  `${COLLECTIONS.USERS}/${userId}/${COLLECTIONS.PROFILE}/`;

/**
 *
 * @param timestamp Provide date
 */
export const convertDate = (timestamp: any) => {
  if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
    return new firebase.firestore.Timestamp(
      timestamp.seconds,
      timestamp.nanoseconds,
    ).toDate();
  } else if (timestamp && typeof timestamp === 'string') {
    console.log('String');
    return new Date(timestamp);
  }
  return timestamp;
};

/**
 *
 * @param date Provide a date object
 */
export const convertDateToTimestamp = (date: any) =>
  firebase.firestore.Timestamp.fromDate(date).toDate();

/**
 *
 * @param email user email address to signUp and store in database
 * @param password user password to signUp and store in database
 * @returns list down in user in firebase and data store.
 */

export const signUpWithEmailPassword = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const signUpTrack = perf().newTrace('signUp-Track');
    signUpTrack.start();

    try {
      const confirmResult = firebaseAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      confirmResult?.user?.sendEmailVerification();
      signUpTrack.stop();
      resolve(confirmResult);
    } catch (error) {
      console.log('Error creating user -', error);
      signUpTrack.stop();
      reject(error);
    }
  });
};

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  return new Promise((resolve, reject) => {
    const signInTrack = perf().newTrace('signIn-Track');
    signInTrack.start();

    try {
      const confirmResult = firebaseAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      signInTrack.stop();
      resolve(confirmResult);
    } catch (error) {
      console.log('Error while login -', error);
      signInTrack.stop();
      reject(error);
    }
  });
};

export const getCollectedData = async (
  collectionName: string,
  docName?: string,
) => {
  try {
    const collection = docName
      ? await db.collection(collectionName).doc(docName).get()
      : await db.collection(collectionName).get();
    return docName ? collection?._data : collection;
  } catch (error) {
    console.log('Error while get User data -', error);
    return error;
  }
};

export const getUserData = async (userId: any) => {
  const getUserDataTrack = perf().startTrace('getUserData-Track');
  (await getUserDataTrack).start();

  try {
    const currentUserId = await getAuthUserId();
    const userDetails = await db
      .collection(COLLECTIONS.USERS)
      .doc(userId ? userId : currentUserId)
      .get();
    (await getUserDataTrack).stop();
    return userDetails;
  } catch (error) {
    console.log('Error while get User data -', error);
    (await getUserDataTrack).stop();
    return error;
  }
};

export const deleteUser = async () => {
  return new Promise(async (resolve: any, reject: any) => {
    const deleteUserTrack = perf().newTrace('deleteUser-Track');
    deleteUserTrack.start();

    deleteUserData().then(() => {
      firebaseAuth.currentUser
        .delete()
        .then(() => {
          deleteUserTrack.stop();
          resolve();
        })
        .catch((err: any) => {
          console.log(err);
          deleteUserTrack.stop();
          reject(err);
        });
    });
    deleteUserTrack.stop();
  });
};

export const deleteUserData = async () => {
  return new Promise(async (resolve: any, reject: any) => {
    const deleteUserDataTrack = perf().newTrace('deleteUserData-Track');
    deleteUserDataTrack.start();

    try {
      const currentUsers = await getAuthUserId();
      deleteLoop.map(async (collection: any) => {
        const singleDelete = await db
          .collection(collection)
          .doc(collection === 'users' ? currentUsers : `${currentUsers}-AI`);
        await singleDelete.delete();
        const querySnapshot = await singleDelete
          .collection(`${currentUsers}-AI`)
          .get();

        const batch = db.batch();
        querySnapshot.forEach((snapshot: any) => {
          batch.delete(snapshot.ref);
        });
        await batch.commit();
      });
      deleteUserDataTrack.stop();

      resolve();
    } catch (error) {
      console.log('Error deleteUserData -', error);
      deleteUserDataTrack.stop();
      reject(error);
    }
    deleteUserDataTrack.stop();
  });
};

export const uploadImage = async (userId: any, imgResponse: any) => {
  return new Promise(async (resolve, reject) => {
    const uploadImageTrack = perf().newTrace('uploadImage-Track');
    uploadImageTrack.start();

    try {
      const storageRef = createImageStorageRef(userId, imgResponse);
      const imagePath = getFileLocalPath(imgResponse);
      const uploadTask = storageRef.putFile(imagePath);
      uploadTask.on('state_changed', null, reject, async () => {
        try {
          const downloadedURL = await storageRef.getDownloadURL();
          uploadImageTrack.stop();
          resolve(downloadedURL);
        } catch (error) {
          uploadImageTrack.stop();
          reject(error);
        }
      });
    } catch (error) {
      uploadImageTrack.stop();
      reject(error);
    }
    uploadImageTrack.stop();
  });
};

export const initFirebase = async () => {
  // Performance measure
  await firebase.perf().setPerformanceCollectionEnabled(true);
  // Firebase push-notification
  messaging().onMessage(localNotifications);
  messaging()
    .getInitialNotification()
    .then(notificationOpen => {
      if (notificationOpen) {
        console.log(notificationOpen);
      }
    });
};

export const createUser = async (userCollection: any, confirmation: any) => {
  return new Promise(async (resolve, reject) => {
    const createUserTrack = perf().newTrace('createUser-Track');
    createUserTrack.start();

    try {
      const fcmToken = await getFCMToken();
      const url: string =
        userCollection?.userImageUrl &&
        (await uploadImage(
          confirmation?.user?.uid,
          userCollection?.userImageUrl,
        ));
      await db
        .collection(COLLECTIONS.USERS)
        .doc(confirmation?.user?.uid)
        .set({
          email: userCollection?.email,
          password: userCollection?.password,
          fullName: userCollection?.fullName,
          userImageUrl: url,
          fcmToken: fcmToken,
          subscription: null,
          credit: 10,
          currentPlan: null,
          createdAt: new Date(),
        })
        .then((response: any) => {
          createUserTrack.stop();
          resolve(response);
        })
        .catch((err: any) => {
          createUserTrack.stop();
          reject(err);
        });
    } catch (error) {
      createUserTrack.stop();
      reject(error);
    }
    createUserTrack.stop();
  });
};

export const updateUser = async (userDetails: any, userId: any) => {
  const updateUserTrack = perf().newTrace('updateUser-Track');
  updateUserTrack.start();

  try {
    var url;
    if (userDetails?.userImageUrl?.includes('file://')) {
      url = await uploadImage(userId, userDetails?.userImageUrl);
    } else {
      url = userDetails?.userImageUrl;
    }
    const docRef = db.collection(COLLECTIONS.USERS).doc(userId);
    const res = await docRef.update({...userDetails, userImageUrl: url});
    updateUserTrack.stop();
    return res;
  } catch (error) {
    console.log('Error for update profile  ---', error);
    updateUserTrack.stop();
    return error;
  }
};

export const setCollectionData = async (
  storeData: any,
  collectionName: string,
  docName?: any,
) => {
  const collectionDataTrack = perf().newTrace('collectionData-Track');
  collectionDataTrack.start();

  try {
    const currentUserId = await getAuthUserId();
    await db
      .collection(collectionName)
      .doc(docName ? docName : currentUserId)
      .update(storeData);
    collectionDataTrack.stop();
  } catch (error) {
    console.log('Error while to update document', error);
    collectionDataTrack.stop();
  }
  collectionDataTrack.stop();
};

/**
 * Create reference of the bucket for uploading user image to the bucket at the reference location.
 * Returns a reference to a image storage path.
 *
 * @param userId A slash-separated path(documentPath) to a document.
 * @param imgResponse An object containing image's fields and values with which to upload to the bucket.
 */
export const createImageStorageRef = (userId: any, imgResponse: any) => {
  const extension = imgResponse.split('.').pop();
  const path = `${imageStoragePath(userId)}/${'user_pic'}.${extension}`;
  return dbStorage.ref(path);
};

/**
 * Returns a local storage file path.
 */
export const getFileLocalPath = (response: any) => {
  return ANDROID_DEVICE ? response : `file:///${response}`;
};

/**
 * Sign the user out of their current authentication state.
 */
export const logoutUser = () => {
  return new Promise((resolve: any, reject: any) => {
    const signOutTrack = perf().newTrace('signOut-Track');
    signOutTrack.start();

    firebaseAuth
      .signOut()
      .then(() => {
        signOutTrack.stop();
        resolve();
      })
      .catch((err: any) => {
        console.log(err);
        signOutTrack.stop();
        reject(err);
      });
    signOutTrack.stop();
  });
};

/**
 * Push-notification set-up
 */
PushNotification.createChannel(
  {
    channelId: 'Aivo',
    channelName: 'Aivo channel',
    channelDescription: 'A channel to categories your notifications',
    playSound: true,
    importance: 4,
    vibrate: true,
  },
  (created: any) => console.log(`createChannel returned '${created}'`),
);

PushNotification.configure({
  onRegister: function (token: any) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification: any) {
    console.log('NOTIFICATION ------:', notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification: any) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err: any) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const localNotifications = (remoteMessage: any) => {
  const {notification, data, messageId} = remoteMessage;

  PushNotification.localNotification({
    channelId: 'Aivo',
    largeIcon: '',
    smallIcon: notification?.android?.smallIcon,
    bigPictureUrl: notification.imageUrl,
    bigText: notification.body || '',
    subText: notification.title,
    title: notification.title,
    message: notification.body || '',
    userInfo: data,
    messageId,
    priority: 'high',
    importance: 'high',
    visibility: 'public',
    allowWhileIdle: true,
    invokeApp: false,
    ignoreInForeground: false,
    usesChronometer: true,
    vibration: 300,
  });
};

/**
 * Firebase authentication error handler.
 *
 * @param error An Object containing FirebaseAuthTypes.PhoneAuthError.
 * @param errorHandler A callback to be called if the authentication fails.
 */
export function handleAuthError(error: any, errorHandler: any) {
  switch (error.code) {
    case 'auth/account-exists-with-different-credential':
    case 'auth/email-already-in-use':
      errorHandler('There already exists an account with this email address.');
      break;
    case 'auth/invalid-email':
      errorHandler('Please enter a valid email address.');
      break;
    case 'auth/invalid-credential':
      errorHandler('Your credentials are invalid or expired.');
      break;
    case 'auth/user-disabled':
      errorHandler('Your account has been disabled.');
      break;
    case 'auth/operation-not-allowed':
      console.info(
        'The type of account corresponding to the credential is not enabled. Enable the account type in the Firebase Console, under the Auth tab.',
      );
      errorHandler(
        'These type of accounts are not enabled for this app by the developer. More info is available in the console output.',
      );
      break;
    case 'auth/user-disabled':
      errorHandler('This account has been disabled.');
      break;
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      errorHandler('No user found or wrong password.');
      break;
    case 'auth/invalid-verification-code':
      errorHandler(
        'Unable to sign you in, the verification code is invalid. Please try again.',
      );
      break;
    case 'auth/invalid-verification-id':
      errorHandler(
        'Unable to sign you in, the verification ID is invalid. Please try again.',
      );
      break;
    case 'auth/invalid-phone-number':
      errorHandler('Please enter a valid phone number.');
      break;
    case 'auth/requires-recent-login':
      errorHandler('Please re-login.');
      break;
    case 'auth/missing-phone-number':
      errorHandler('Please enter a phone number.');
      break;
    case 'auth/quota-exceeded':
      errorHandler('This app has exceeded its SMS quota.');
      break;
    case 'auth/network-request-failed':
      errorHandler('Please check your network connection and try again');
      break;
    default:
      errorHandler(error.message);
      console.log(error);
      break;
  }
}
