import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Imports
import {logoutUser} from '../utils/Firebase';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS} from '../localization/labels';
import FastImage from 'react-native-fast-image';
import {FONT, images} from '../constants';
import ZoomImage from '../components/ZoomImage/ZoomImage';
import {ROUTES} from '../routes/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const navigation: any = useNavigation();
  const {theme, authUser}: any = useAppContext();
  const styles = getStyles({theme});
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  // plan - Only plan name store in firebase.
  // Subscription - Subscription plan all the details are stored on firebase.

  const userLogOut = async () => {
    navigation?.reset({
      index: 0,
      routes: [{name: ROUTES.SIGN_IN}],
    });
  };

  return (
    <View style={styles.container}>
      <Header
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
            source={
              authUser?.userImageUrl
                ? {uri: authUser?.userImageUrl}
                : images.img_user_logo
            }
            resizeMode="cover"
            style={styles.imageStyles}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}
            style={styles.openModelStyles}>
            <Ionicons
              name={'add-circle'}
              size={45}
              color={theme?.secondaryColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.midContainer}>
          <Text style={styles.userName}>
            {authUser?.fullName ?? LABELS.USER}
          </Text>
          {authUser?.subscription == null ? (
            <>
              <Text style={styles.dayCalculation}>
                You’ve got {authUser?.credit ?? '0'} credits available!
              </Text>
              <Text style={styles.freeAccountText}>{LABELS.FREE_ACCOUNT}</Text>
            </>
          ) : (
            <Text style={styles.dayCalculation}>
              278 days of Premium perks left. Keep exploring!
            </Text>
          )}
        </View>
      </View>

      {isZoomVisible && (
        <ZoomImage
          isDirectOpen={isZoomVisible}
          imageUri={authUser?.userImageUrl}
          onClose={() => setIsZoomVisible(false)}
        />
      )}
    </View>
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
    right: wp(-4),
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
  freeAccountText: {
    backgroundColor: theme?.tagColor,
    marginTop: wp(2),
    fontSize: wp(3),
    padding: wp(1.5),
    alignSelf: 'center',
    borderRadius: wp(10),
    fontFamily: FONT.notoSansMedium,
    color: theme?.wrapperColor,
  },
});

export default Profile;
