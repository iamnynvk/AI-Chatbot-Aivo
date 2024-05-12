import React from 'react';
import {TextInput, View} from 'react-native';
import {FONT} from '../../constants';
import {IPropsTypes} from '../../types';
import {SCREEN_WIDTH} from '../../constants/theme';
import useAppContext from '../../context/useAppContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const InputText = ({
  placeHolderText,
  refs,
  isSecure,
  onChange,
  isAutoFocus,
  isNextFocus,
  keyType,
  textContainer,
  maxLength,
  values,
  onBlurInput,
  numOfLine,
  isMultiLine,
  isError,
  isEditable,
  customStyle,
  setActiveInputField,
  name,
  activeInputField,
}: IPropsTypes) => {
  const {theme}: any = useAppContext();
  const styles = getStyles({theme});

  let isPrimaryColor = activeInputField === name;

  return (
    <View style={textContainer}>
      <TextInput
        ref={refs}
        style={[
          styles.textInputStyles,
          {
            borderColor: isError
              ? theme?.danger
              : isPrimaryColor
              ? theme?.lightBorder
              : theme?.borderLines,
            backgroundColor: theme?.inputColor,
          },
          customStyle,
        ]}
        placeholder={placeHolderText}
        autoFocus={isAutoFocus}
        onFocus={() => setActiveInputField(name)}
        value={values}
        onChangeText={onChange}
        onSubmitEditing={() => {
          setActiveInputField('');
          setTimeout(() => {
            isNextFocus?.current?.focus();
          }, 300);
        }}
        onBlur={onBlurInput}
        secureTextEntry={isSecure}
        maxLength={maxLength}
        placeholderTextColor={'#979292'}
        keyboardType={keyType}
        numberOfLines={numOfLine}
        multiline={isMultiLine}
        editable={isEditable}
      />
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  textInputStyles: {
    borderWidth: 1,
    borderColor: theme?.borderLines,
    width: SCREEN_WIDTH / 1.2,
    height: wp(12),
    borderRadius: wp(2.4),
    paddingHorizontal: 12,
    color: theme?.textColor,
    padding: 0,
    fontFamily: FONT.notoSansMedium,
  },
});

export default InputText;
