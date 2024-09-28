import React, {useCallback, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
// Imports
import {getAuthUserId, logoutUser, updateUser} from '../utils/Firebase';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS, STATIC_MESSAGE} from '../localization/labels';
import FastImage from 'react-native-fast-image';
import {COLORS, FONT, images} from '../constants';
import ZoomImage from '../components/ZoomImage/ZoomImage';
import BottomSheets from '../components/BottomSheet/BottomSheets';
import {ROUTES} from '../routes/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateProfileValidation} from '../enums/validation';
import InputText from '../components/TextInput/InputText';
import {FEEDBACK} from '../enums';
import SubmitButton from '../components/Button/SubmitButton';
import {goBack} from '../routes/NavigationService';

const Profile = () => {
  const navigation: any = useNavigation();
  const {theme, authUser, fetchCurrentUserData, setFeedBack}: any =
    useAppContext();
  const styles: any = getStyles({theme});
  const userId = getAuthUserId();
  const refRBSheet: any = useRef();
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState('');
  const [profileImage, setProfileImage] = useState<any>(authUser?.userImageUrl);
  const [isLoadSignOut, setIsLoadSignOut] = useState(false);
  const [isLoadUpdate, setIsLoadUpdate] = useState(false);

  // plan - Only plan name store in firebase.
  // Subscription - Subscription plan all the details are stored on firebase.

  const onMediaPicker = useCallback((type: string) => {
    if (type === 'camera') {
      ImagePicker.openCamera({
        cropping: true,
        width: 500,
        height: 500,
        includeExif: true,
        compressImageQuality: 0.8,
      })
        .then((image: any) => {
          setProfileImage(image?.path);
          refRBSheet?.current?.close();
        })
        .catch(e => refRBSheet?.current?.close());
    } else {
      ImagePicker.openPicker({
        cropping: true,
        width: 500,
        height: 500,
        includeExif: true,
        compressImageQuality: 0.8,
      })
        .then((image: any) => {
          setProfileImage(image?.path);
          refRBSheet?.current?.close();
        })
        .catch(e => refRBSheet?.current?.close());
    }
  }, []);

  const updateHandler = async (values: any) => {
    setIsLoadUpdate(true);
    const userCollection = {
      fullName: values.fullName,
      userImageUrl: profileImage,
    };
    await updateUser(userCollection, userId);
    setFeedBack({
      show: true,
      message: STATIC_MESSAGE.PROFILE_UPDATE,
      type: FEEDBACK.SUCCESS,
    });
    fetchCurrentUserData();
    navigation?.goBack();
    setIsLoadUpdate(false);
  };

  const userSignOut = async () => {
    setIsLoadSignOut(true);
    logoutUser().then(() => {
      navigation?.reset({
        index: 0,
        routes: [{name: ROUTES.SIGN_IN}],
      });
    });
  };

  return (
    <Formik
      initialValues={{
        fullName: authUser?.fullName,
        email: authUser?.email,
      }}
      validateOnMount={true}
      validationSchema={updateProfileValidation}
      onSubmit={(values: any) => updateHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
        isValid,
        errors,
      }: any) => {
        const isSameName =
          authUser?.fullName?.toLowerCase() === values?.fullName?.toLowerCase();
        const isSameImage =
          authUser?.userImageUrl?.toLowerCase() === profileImage?.toLowerCase();

        return (
          <View style={styles.container}>
            <Header
              isBack={true}
              title={LABELS.PROFILE}
              menuName={!isValid || (isSameName && isSameImage) ? '' : 'Done'}
              menuStyles={{color: theme?.link}}
              isLoading={isLoadUpdate}
              onMenuPress={handleSubmit}
            />
            <View style={styles.bodyContainer}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.photoContainer}
                onPress={() => setIsZoomVisible(true)}>
                <FastImage
                  source={
                    profileImage ? {uri: profileImage} : images.img_user_logo
                  }
                  resizeMode="cover"
                  style={styles.imageStyles}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => refRBSheet.current.open()}
                  style={styles.openModelStyles}>
                  <Ionicons
                    name={'add-circle'}
                    size={wp(11)}
                    color={theme?.secondaryColor}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              <View style={styles.midContainer}>
                <Text style={styles.userName}>
                  {authUser?.fullName ?? LABELS.USER}
                </Text>
                <View style={styles.emailContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={wp(4.6)}
                    color={theme?.link}
                    style={{alignSelf: 'flex-end'}}
                  />
                  <Text style={styles.email}>{`  ${
                    authUser?.email ?? LABELS.EMAIL_LABEL
                  }`}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <InputText
                  name={'fullName'}
                  placeHolderText={'Enter the full name'}
                  isSecure={false}
                  onBlurInput={handleBlur('fullName')}
                  onChange={handleChange('fullName')}
                  values={values?.fullName}
                  isTouch={touched.fullName}
                  isError={touched.fullName && errors.fullName}
                  activeInputField={activeInputField}
                  setActiveInputField={setActiveInputField}
                />
                {touched.fullName && errors.fullName ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  </View>
                ) : (
                  <View style={styles.errorContainer}>
                    <Text></Text>
                  </View>
                )}
              </View>

              <View style={styles.signOutContainer}>
                <SubmitButton
                  handleSubmitButton={userSignOut}
                  isLoading={isLoadSignOut}
                  title={LABELS.SIGN_OUT}
                />
              </View>
            </View>

            {isZoomVisible && (
              <ZoomImage
                isDirectOpen={isZoomVisible}
                imageUri={profileImage}
                onClose={() => setIsZoomVisible(false)}
              />
            )}

            <BottomSheets refs={refRBSheet} sheetHeight={'12%'}>
              <View style={styles.sheetContainer}>
                <View style={styles.sheetBoxContainer}>
                  <TouchableOpacity
                    style={styles.boxContainer}
                    activeOpacity={0.9}
                    onPress={() => onMediaPicker('camera')}>
                    <Ionicons name="camera" size={30} color={theme?.link} />
                    <Text style={[styles.pickerText, {color: theme?.link}]}>
                      {LABELS.CAMERA}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.sheetBoxContainer}>
                  <TouchableOpacity
                    style={styles.boxContainer}
                    activeOpacity={0.9}
                    onPress={() => onMediaPicker('gallery')}>
                    <Ionicons name="image" size={30} color={theme?.link} />
                    <Text style={[styles.pickerText, {color: theme?.link}]}>
                      {LABELS.GALLERY}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheets>
          </View>
        );
      }}
    </Formik>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  bodyContainer: {
    flex: 1,
  },
  photoContainer: {
    marginTop: wp(5),
    marginBottom: wp(3),
    width: wp(30),
    alignSelf: 'center',
    borderRadius: wp(30),
  },
  openModelStyles: {
    position: 'absolute',
    bottom: wp(0),
    right: wp(-2),
    backgroundColor: theme?.backgroundColor,
    borderRadius: wp(20),
  },
  imageStyles: {
    height: wp(34),
    width: wp(34),
    alignSelf: 'center',
    borderRadius: wp(17),
  },
  midContainer: {
    alignItems: 'center',
  },
  userName: {
    color: theme?.textColor,
    fontSize: wp(5),
    fontFamily: FONT.notoSansBold,
  },
  emailContainer: {
    flexDirection: 'row',
  },
  email: {
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3.2),
    color: theme?.lightTextColor,
  },
  sheetContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sheetBoxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  boxContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: theme?.wrapperColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerText: {
    textAlign: 'center',
    fontFamily: FONT.notoSansMedium,
    color: theme?.textColor,
    fontSize: wp(3.6),
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: wp(10),
  },
  errorContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginHorizontal: wp(8),
    marginTop: wp(1),
  },
  errorText: {
    fontSize: wp(3.3),
    color: theme?.danger,
    alignItems: 'center',
    marginStart: wp(1),
    fontFamily: FONT.notoSansRegular,
  },
  signOutContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: wp(10),
  },
});

export default Profile;
