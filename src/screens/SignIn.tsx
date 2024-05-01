import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Components
import InputText from '../components/InputText';
import SubmitButton from '../components/SubmitButton';
import useAppContext from '../context/useAppContext';
// Imports
import {IToggle} from '../types';
import {ROUTES} from '../routes/routes';
import {FONT, images} from '../constants';
import {signInValidation} from '../enums/validation';
import {getValueInAsync} from '../utils/AsyncStorage';
import {LABELS, STATIC_MESSAGE} from '../localization/labels';
import {getFCMToken, setCollectionData} from '../utils/Firebase';
import {COLLECTIONS, FEEDBACK, IN_APP_PURCHASE_SEEN} from '../enums';

const SignIn = () => {
  const {theme, signInUser, setFeedBack}: any = useAppContext();
  const styles: any = getStyles({theme});
  const navigation: any = useNavigation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [activeInputField, setActiveInputField] = useState<string>('');
  const [isSeenInApp, setIsSeenInApp] = useState<any>(null);
  const [handleToggle, setHandleToggle] = useState<IToggle>({
    loading: false,
    isClick: false,
  });

  useEffect(() => {
    alreadySeenInAppPurchase();
  }, []);

  const alreadySeenInAppPurchase = async () => {
    const isAlreadySeenInAppPurchase = await getValueInAsync(
      IN_APP_PURCHASE_SEEN.IN_APP_SEEN,
    );
    setIsSeenInApp(isAlreadySeenInAppPurchase === true ? true : false);
  };

  const signInHandler = async (values: any) => {
    setHandleToggle({
      loading: true,
      isClick: true,
    });
    const fcmToken = await getFCMToken();
    const confirmation = await signInUser(values?.email, values?.password);
    if (confirmation?.code) {
      setHandleToggle({
        loading: false,
        isClick: false,
      });
    } else {
      setFeedBack({
        show: true,
        message: STATIC_MESSAGE.SIGN_IN_SUCCESS,
        type: FEEDBACK.SUCCESS,
      });
      await setCollectionData({fcmToken: fcmToken}, COLLECTIONS.USERS);
      confirmation?.user?.uid &&
        navigation?.reset({
          index: 0,
          routes: [{name: isSeenInApp ? ROUTES.MAIN : ROUTES.INAPPPURCHASE}],
        });
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={signInValidation}
      onSubmit={signInHandler}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
        isValid,
        errors,
      }) => (
        <View style={styles.container}>
          {/* Heading container */}
          <View>
            <Text style={styles.headingText}>{LABELS.WELCOME}</Text>
            <Text style={styles.childText}>{LABELS.GREET_WELCOME}</Text>

            <LottieView
              source={images.anim_authSession}
              autoPlay
              loop
              style={styles.logoContainer}
            />
          </View>

          <View style={{marginTop: wp(20)}}>
            <InputText
              name="email"
              refs={emailRef}
              placeHolderText={LABELS.PLACEHOLDER_EMAIL}
              isNextFocus={passwordRef}
              isSecure={false}
              keyType={'email-address'}
              onBlurInput={handleBlur('email')}
              onChange={handleChange('email')}
              values={values.email.toLowerCase()}
              isTouch={touched.email}
              isError={touched.email && errors.email}
              isEditable={!handleToggle.loading}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
            />
            {touched.email && errors.email ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text></Text>
              </View>
            )}

            <InputText
              name="password"
              textContainer={styles.userInputContainer}
              refs={passwordRef}
              placeHolderText={LABELS.PLACEHOLDER_PASSWORD}
              isAutoFocus={false}
              isSecure={true}
              onBlurInput={handleBlur('password')}
              onChange={handleChange('password')}
              values={values.password}
              isError={touched.password && errors.password}
              isEditable={!handleToggle.loading}
              isTouch={touched.password}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
            />
            {touched.password && errors.password ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                style={styles.forgotContainer}>
                <Text style={styles.forgotText}>{LABELS.FORGOT_PASSWORD}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button Here */}
          <View style={styles.userInputContainer}>
            <SubmitButton
              isDisable={!isValid || handleToggle?.isClick}
              handleSubmitButton={handleSubmit}
              isLoading={handleToggle?.loading}
              title={LABELS.SUBMIT}
            />
          </View>

          <View style={{marginTop: wp(5)}}>
            <Text style={styles.signUpText}>
              {LABELS.DON_T_HAVE_ACCOUNT}{' '}
              <Text
                style={styles.register}
                onPress={() => navigation.navigate(ROUTES.SIGN_UP)}>
                {LABELS.SIGN_UP}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: wp(6),
    textAlign: 'center',
    color: theme?.textColor,
    fontFamily: FONT.notoSansExtraBold,
  },
  childText: {
    textAlign: 'center',
    marginTop: wp(2),
    marginHorizontal: wp(6),
    fontFamily: FONT.notoSansMedium,
    color: theme?.lightTextColor,
  },
  logoContainer: {
    marginTop: wp(10),
    height: hp(24),
    width: hp(24),
    alignSelf: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(1),
  },
  errorText: {
    fontSize: wp(3.3),
    color: theme?.danger,
    alignItems: 'center',
    marginStart: wp(1),
    fontFamily: FONT.notoSansRegular,
  },
  userInputContainer: {
    marginTop: wp(5),
  },
  forgotContainer: {
    marginTop: wp(1),
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansMedium,
  },
  signUpText: {
    textAlign: 'center',
    fontFamily: FONT.notoSansMedium,
    color: theme?.textColor,
    fontSize: wp(3.6),
  },
  register: {
    color: theme.link,
    fontFamily: FONT.notoSansExtraBold,
  },
});

export default SignIn;
