import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Imports
import {FONT, images} from '../constants';
import InputText from '../components/InputText';
import SubmitButton from '../components/SubmitButton';
import {LABELS} from '../localization/labels';
import {signInValidation} from '../enums/validation';
import useAppContext from '../context/useAppContext';
import {IToggle} from '../types';
import {ROUTES} from '../routes/routes';

const SignIn = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const navigation = useNavigation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [activeInputField, setActiveInputField] = useState('');
  const [handleToggle, setHandleToggle] = useState<IToggle>({
    loading: false,
    isClick: false,
  });

  const signInHandler = async (values: any) => {
    // Your sign in logic
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
            <Text style={styles.childText}>{LABELS.GREETWELCOME}</Text>

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
              placeHolderText={LABELS.PLACEHOLDEREMAIL}
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
              placeHolderText={LABELS.PLACEHOLDERPASSWORD}
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
                onPress={() => navigation.navigate(ROUTES.SIGNUP)}
                style={styles.forgotContainer}>
                <Text style={styles.forgotText}>{LABELS.FORGOTPASSWORD}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit Button Here */}
          <View style={styles.userInputContainer}>
            <SubmitButton
              isDisable={!isValid || handleToggle.isClick}
              handleSubmitButton={handleSubmit}
              isLoading={handleToggle.loading}
              title={LABELS.SUBMIT}
            />
          </View>

          <View style={{marginTop: wp(5)}}>
            <Text style={styles.signUpText}>
              {LABELS.DONTHAVEACCOUNT}{' '}
              <Text
                style={styles.register}
                onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
                {LABELS.SIGNUP}
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