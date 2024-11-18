import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {LABELS, STATIC_MESSAGE} from '../localization/labels';
import {Formik} from 'formik';
import {feedBackValidation} from '../enums/validation';
import {FONT} from '../constants';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import InputText from '../components/TextInput/InputText';
import {IToggle} from '../types';
import {storeData} from '../utils/Firebase';
import {COLLECTIONS, FEEDBACK} from '../enums';
import {useNavigation} from '@react-navigation/native';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import SubmitButton from '../components/Button/SubmitButton';

const Feedback = () => {
  const navigation: any = useNavigation();
  const notesRef: any = useRef();
  const {theme, setFeedBack}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [activeInputField, setActiveInputField] = useState<string>('');
  const [handleToggle, setHandleToggle] = useState<IToggle>({
    loading: false,
    isClick: false,
  });

  const submitFeedback = async (values: any) => {
    try {
      setHandleToggle({
        loading: true,
        isClick: true,
      });
      await storeData(
        {email: values?.email, notes: values?.notes},
        COLLECTIONS.FEEDBACK,
      );

      setFeedBack({
        show: true,
        message: STATIC_MESSAGE?.FEEDBACK_SUCCESS,
        type: FEEDBACK.SUCCESS,
      });
      navigation?.goBack();
    } catch (error) {
      console.log('Error while feedback send to server : ', error);
      setHandleToggle({
        loading: false,
        isClick: false,
      });
    }
  };

  return (
    <Formik
      initialValues={{email: '', notes: ''}}
      validateOnMount={true}
      validationSchema={feedBackValidation}
      onSubmit={submitFeedback}>
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
          <Header isBack={true} title={LABELS?.FEEDBACK} />
          <Text style={styles.feedbackHeading}>{LABELS?.FEEDBACK_HEADING}</Text>
          <Text style={styles.feedbackDescription}>
            {LABELS?.FEEDBACK_DESCRIPTION}
          </Text>

          <View
            style={{
              marginTop: wp(10),
            }}>
            <InputText
              name="email"
              placeHolderText={LABELS.PLACEHOLDER_EMAIL}
              isNextFocus={notesRef}
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
              name="notes"
              textContainer={styles.userInputContainer}
              refs={notesRef}
              placeHolderText={LABELS?.SUGGESTION}
              isAutoFocus={false}
              onBlurInput={handleBlur('notes')}
              onChange={handleChange('notes')}
              values={values.notes}
              isError={touched.notes && errors.notes}
              isEditable={!handleToggle.loading}
              isTouch={touched.notes}
              activeInputField={activeInputField}
              setActiveInputField={setActiveInputField}
              customStyle={{
                height: wp(80),
                paddingTop: wp(3),
                textAlignVertical: 'top',
              }}
              isMultiLine={true}
            />
            {touched.notes && errors.notes ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.notes}</Text>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text></Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <SubmitButton
              isDisable={!isValid || handleToggle?.isClick}
              handleSubmitButton={handleSubmit}
              isLoading={handleToggle?.loading}
              title={LABELS.SUBMIT}
            />
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
    alignItems: 'center',
  },
  feedbackHeading: {
    fontFamily: FONT.notoSansBold,
    marginTop: wp(3),
    fontSize: wp(4.5),
    color: theme?.textColor,
  },
  feedbackDescription: {
    fontFamily: FONT.notoSansRegular,
    textAlign: 'center',
    fontSize: wp(3),
    marginHorizontal: wp(4),
    marginTop: wp(1),
    color: theme?.lightTextColor,
  },
  userInputContainer: {
    marginTop: wp(5),
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
  buttonContainer: {
    position: 'absolute',
    bottom: wp(10),
  },
});

export default Feedback;
