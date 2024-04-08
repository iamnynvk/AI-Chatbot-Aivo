import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {Formik} from 'formik';
import {signUpValidation} from '../enums/validation';
import useAppContext from '../context/useAppContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONT, images} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import InputText from '../components/InputText';
import {IToggle} from '../types';
import SubmitButton from '../components/SubmitButton';
import {LABELS} from '../localization/labels';
import BottomSheets from '../components/BottomSheets';
import Header from '../components/Header';

const SignUp = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const confirmPassRef: any = useRef();
  const refRBSheet: any = useRef();
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [profileImage, setProfileImage] = useState<any>(null);
  const [activeInputField, setActiveInputField] = useState('');
  const [handleToggle, setHandleToggle] = useState<IToggle>({
    loading: false,
    isClick: false,
  });

  const onMediaPicker = data => {};

  // const signUpHandler = async (values: any) => {
  //   setHandleToggle({
  //     isClick: true,
  //     loading: true,
  //   });
  //   const userCollection = {
  //     ...values,
  //     userImageUrl: profileImage,
  //   };

  //   const confirmation = await signUpUser(values?.email, values?.password);
  //   if (confirmation.code) {
  //     setHandleToggle({
  //       isClick: false,
  //       loading: false,
  //     });
  //   } else {
  //     await createUser(userCollection, confirmation);
  //     navigation?.reset({
  //       index: 0,
  //       routes: [{name: 'Main'}],
  //     });
  //   }
  // };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validateOnMount={true}
      validationSchema={signUpValidation}
      onSubmit={(values: any) => {}}>
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
          <Text style={styles.heading}>{LABELS.SIGNUP}</Text>

          {/* Profile Photo */}
          <View style={styles.photoContainer}>
            <View>
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
                  size={45}
                  color={theme?.secondaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <InputText
              name="fullName"
              placeHolderText={'Enter the full name'}
              isNextFocus={emailRef}
              isSecure={false}
              keyType={'email-address'}
              onBlurInput={handleBlur('fullName')}
              onChange={handleChange('fullName')}
              values={values.fullName}
              isTouch={touched.fullName}
              isError={touched.fullName && errors.fullName}
              isEditable={!handleToggle.loading}
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

            <InputText
              name={'email'}
              refs={emailRef}
              textContainer={styles.userInputContainer}
              placeHolderText={'Enter the email address'}
              isNextFocus={passwordRef}
              isSecure={false}
              onBlurInput={handleBlur('email')}
              isTouch={touched.email}
              onChange={handleChange('email')}
              values={values?.email.toLowerCase()}
              isError={touched.email && errors.email}
              isEditable={!handleToggle?.loading}
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
              name={'Password'}
              textContainer={styles.userInputContainer}
              refs={passwordRef}
              placeHolderText={'Password'}
              isNextFocus={confirmPassRef}
              isSecure={true}
              onBlurInput={handleBlur('password')}
              onChange={handleChange('password')}
              isTouch={touched.password}
              values={values?.password}
              isError={touched.password && errors.password}
              isEditable={!handleToggle?.loading}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
            />
            {touched.password && errors.password ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text></Text>
              </View>
            )}

            <InputText
              name={'confirmPassword'}
              textContainer={styles.userInputContainer}
              refs={confirmPassRef}
              placeHolderText={'Confirm Password'}
              isAutoFocus={false}
              isSecure={true}
              onBlurInput={handleBlur('confirmPassword')}
              onChange={handleChange('confirmPassword')}
              isTouch={touched.confirmPassword}
              values={values?.confirmPassword}
              isError={touched.confirmPassword && errors.confirmPassword}
              isEditable={!handleToggle?.loading}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
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

          <View style={styles.signUpLinkContainer}>
            <Text style={styles.signUpText}>
              Have already an account?{' '}
              <Text
                style={styles.register}
                onPress={() => navigation?.goBack()}>
                Sign In
              </Text>
            </Text>
          </View>

          <BottomSheets refs={refRBSheet} sheetHeight={'12%'}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetBoxContainer}>
                <TouchableOpacity
                  style={styles.boxContainer}
                  activeOpacity={0.9}
                  onPress={() => onMediaPicker('camera')}>
                  <Ionicons name="camera" size={30} color={COLORS.white} />
                  <Text style={[styles.signUpText, {color: COLORS.white}]}>
                    Camera
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sheetBoxContainer}>
                <TouchableOpacity
                  style={styles.boxContainer}
                  activeOpacity={0.9}
                  onPress={() => onMediaPicker('gallery')}>
                  <Ionicons name="image" size={30} color={COLORS.white} />
                  <Text style={[styles.signUpText, {color: COLORS.white}]}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheets>
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
  heading: {
    marginTop: wp(2),
    color: theme.textColor,
    width: '90%',
    alignSelf: 'center',
    fontFamily: FONT.notoSansExtraBold,
    fontSize: wp(6),
  },
  photoContainer: {
    marginTop: wp(10),
    width: wp(40),
    height: wp(40),
    alignSelf: 'center',
    borderRadius: wp(20),
  },
  openModelStyles: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: wp(20),
  },
  imageStyles: {
    height: wp(40),
    width: wp(40),
    alignSelf: 'center',
    borderRadius: wp(20),
  },
  fieldContainer: {
    marginTop: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  userInputContainer: {
    marginTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontFamily: FONT.notoSansMedium,
    color: theme?.textColor,
    fontSize: wp(3.6),
  },
  register: {
    color: theme.link,
    fontWeight: 'bold',
  },
  sheetContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sheetBoxContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  signUpLinkContainer: {
    marginTop: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(5),
  },
  boxContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default SignUp;
