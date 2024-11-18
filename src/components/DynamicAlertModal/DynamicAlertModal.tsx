import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import useAppContext from '../../context/useAppContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../../constants';
import {LABELS} from '../../localization/labels';

const DynamicAlertModal = ({
  isVisible,
  title,
  message,
  cancelButtonName,
  confirmButtonName,
  onConfirm,
  onCancel,
  cancelButtonStyles,
  confirmButtonStyles,
}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      useNativeDriver
      style={styles.modal}>
      <View style={styles.modalContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Message */}
        <Text style={styles.message}>{message}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.buttonStyles, {...cancelButtonStyles}]}
            onPress={onCancel}>
            <Text style={styles.buttonText}>
              {cancelButtonName || LABELS?.CANCEL}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.buttonStyles,
              {
                backgroundColor: theme?.danger,
                marginRight: 0,
                ...confirmButtonStyles,
              },
            ]}
            onPress={onConfirm}>
            <Text style={styles.buttonText}>
              {confirmButtonName || LABELS?.OKAY}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = ({theme}: any) => ({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: theme?.inputColor,
    borderRadius: wp(5),
    padding: wp(5),
  },
  title: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansBold,
    fontSize: wp(5),
    marginBottom: wp(3),
  },
  message: {
    color: theme?.lightTextColor,
    fontFamily: FONT.notoSansRegular,
    marginBottom: wp(8),
    fontSize: wp(3.4),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyles: {
    backgroundColor: theme?.borderLines,
    alignSelf: 'center',
    paddingVertical: wp(2.3),
    paddingHorizontal: wp(4),
    borderRadius: wp(100),
    marginRight: wp(2),
  },
  buttonText: {
    color: theme?.wrapperColor,
    fontFamily: FONT.notoSansBold,
    fontSize: wp(3.5),
  },
});

export default DynamicAlertModal;
