import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import InAppReview from 'react-native-in-app-review';
// Imports
import {logoutUser} from '../utils/Firebase';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS} from '../localization/labels';
import FastImage from 'react-native-fast-image';
import {FONT, images} from '../constants';
import ZoomImage from '../components/ZoomImage/ZoomImage';
import BottomSheets from '../components/BottomSheet/BottomSheets';
import {ROUTES} from '../routes/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import List from '../components/List/List';

const Profile = () => {
  const navigation: any = useNavigation();
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});
  const refRBSheet: any = useRef();
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>(authUser?.userImageUrl);

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

  const requestInAppReview = () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          console.log(
            'In-App review flow finished successfully:',
            hasFlowFinishedSuccessfully,
          );
        })
        .catch(error => {
          console.log('In-App review flow failed:', error);
        });
    }
  };

  const userLogOut = async () => {
    logoutUser().then(() => {
      navigation?.reset({
        index: 0,
        routes: [{name: ROUTES.SIGN_IN}],
      });
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        isLogo={true}
        title={LABELS.PROFILE}
        menuName={'log-out-outline'}
        onMenuPress={userLogOut}
      />
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.photoContainer}
          onPress={() => setIsZoomVisible(true)}>
          <FastImage
            source={profileImage ? {uri: profileImage} : images.img_user_logo}
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
          <Text style={styles.dayCalculation}>
            {authUser?.subscription == null
              ? `You’ve got ${authUser?.credit ?? '0'} credits available!`
              : `278 days of Premium perks left. Keep exploring!`}
          </Text>
          <View style={styles.purchaseContainer}>
            <Ionicons
              name={authUser?.subscription == null ? 'sparkles' : 'rocket'}
              size={wp(5)}
              color={theme?.wrapperColor}
              style={{marginHorizontal: wp(1)}}
            />
            <Text
              style={styles.freeAccountText}
              onPress={() => navigation?.navigate(ROUTES?.INAPPPURCHASE)}>
              {authUser?.subscription == null
                ? LABELS.FREE_ACCOUNT
                : LABELS.PREMIUM_ACCOUNT}
            </Text>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <List label={LABELS?.EMAIL_LABEL} title={authUser?.email} />
          <List
            label={LABELS?.THEME}
            title={'System Default'}
            onPress={() => navigation?.navigate(ROUTES?.SETTING)}
          />
          <List
            label={LABELS?.CHANGE_PASSWORD}
            onPress={() => navigation?.navigate(ROUTES?.CHANGE_PASSWORD)}
          />
          <List label={LABELS?.SEND_FEEDBACK} onPress={requestInAppReview} />
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
              <Ionicons name="camera" size={30} color={theme?.wrapperColor} />
              <Text style={[styles.pickerText, {color: theme?.wrapperColor}]}>
                {LABELS.CAMERA}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sheetBoxContainer}>
            <TouchableOpacity
              style={styles.boxContainer}
              activeOpacity={0.9}
              onPress={() => onMediaPicker('gallery')}>
              <Ionicons name="image" size={30} color={theme?.wrapperColor} />
              <Text style={[styles.pickerText, {color: theme?.wrapperColor}]}>
                {LABELS.GALLERY}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheets>
    </ScrollView>
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
    backgroundColor: theme.backgroundColor,
    borderRadius: wp(20),
  },
  imageStyles: {
    height: wp(30),
    width: wp(30),
    alignSelf: 'center',
    borderRadius: wp(15),
  },
  midContainer: {
    alignItems: 'center',
  },
  userName: {
    color: theme?.textColor,
    fontSize: wp(5),
    fontFamily: FONT.notoSansBold,
  },
  dayCalculation: {
    marginTop: wp(2),
    fontSize: wp(3.4),
    fontFamily: FONT.notoSansMedium,
    color: theme?.textColor,
  },
  purchaseContainer: {
    backgroundColor: theme?.tagColor,
    flexDirection: 'row',
    marginTop: wp(3),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
    alignSelf: 'center',
    borderRadius: wp(10),
  },
  freeAccountText: {
    alignSelf: 'center',
    fontSize: wp(3.4),
    fontFamily: FONT.notoSansMedium,
    color: theme?.wrapperColor,
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
  detailContainer: {
    marginTop: wp(6),
  },
});

export default Profile;
