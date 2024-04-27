import React, {useRef, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Components
import InputText from '../components/InputText';
import SubmitButton from '../components/SubmitButton';
import Header from '../components/Header';
// Imports
import useAppContext from '../context/useAppContext';
import {FONT, images} from '../constants';
import {LABELS} from '../localization/labels';
import {IToggle} from '../types';
import {forgotPasswordValidation} from '../enums/validation';
import {SCREEN_WIDTH} from '../constants/theme';

const ForgotPassword = () => {
  const {theme, sendResetLink}: any = useAppContext();
  const styles: any = getStyles({theme});
  const emailRef: any = useRef();
  const navigation: any = useNavigation();
  const [activeInputField, setActiveInputField] = useState('');
  const [handleToggle, setHandleToggle] = useState<IToggle>({
    loading: false,
    isClick: false,
  });

  const onForgotPasswordHandler = async (values: any) => {
    setHandleToggle({
      loading: true,
      isClick: true,
    });
    await sendResetLink(values?.email);
    Alert.alert('Aivo', 'Please check your email to reset your password.');
    setHandleToggle({
      loading: false,
      isClick: false,
    });
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validateOnMount={true}
      validationSchema={forgotPasswordValidation}
      onSubmit={(values: any) => onForgotPasswordHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        values,
        isValid,
        errors,
      }: any) => (
        <ScrollView style={styles.container}>
          <Header onPress={() => navigation?.goBack()} />
          <Text style={styles.headingText}>{LABELS.FORGOT_PASSWORD_LABEL}</Text>
          <Text style={styles.childText}>{LABELS.FORGOT_DESCRIPTION}</Text>
          <LottieView
            source={images.anim_forgot}
            autoPlay
            loop
            style={styles.animContainer}
          />

          <View style={styles.inputContainer}>
            <InputText
              name="email"
              refs={emailRef}
              placeHolderText={LABELS.PLACEHOLDER_EMAIL}
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
          </View>

          <View style={styles.userInputContainer}>
            <SubmitButton
              isDisable={!isValid || handleToggle?.isClick}
              handleSubmitButton={handleSubmit}
              isLoading={handleToggle?.loading}
              title={LABELS.SUBMIT}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
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
  animContainer: {
    marginTop: wp(6),
    height: hp(40),
    width: hp(30),
    alignSelf: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: wp(10),
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: wp(1),
    width: SCREEN_WIDTH / 1.2,
  },
  errorText: {
    fontSize: wp(3.3),
    color: theme?.danger,
    alignItems: 'center',
    marginStart: wp(1),
    fontFamily: FONT.notoSansRegular,
  },
  userInputContainer: {
    marginTop: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPassword;
