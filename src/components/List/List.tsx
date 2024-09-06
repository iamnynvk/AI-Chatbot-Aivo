import React from 'react';
import {Text, View} from 'react-native';
import useAppContext from '../../context/useAppContext';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LABELS} from '../../localization/labels';

const List = ({label, title, onPress}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  return (
    <React.Fragment>
      <View
        style={[
          styles.container,
          {borderBottomWidth: LABELS?.SEND_FEEDBACK == label ? 0 : 0.8},
        ]}>
        <View>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.titleText} onPress={onPress}>
            {title}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons
            name={'arrow-up-outline'}
            size={wp(5)}
            color={theme?.textColor}
            style={[styles.iconStyle, {transform: [{rotate: '40deg'}]}]}
            onPress={onPress}
          />
        </View>
      </View>
      {LABELS?.SEND_FEEDBACK == label && (
        <Text style={styles.feedbackText}>{LABELS.FEEDBACK_MESSAGE}</Text>
      )}
    </React.Fragment>
  );
};

export default List;

const getStyles = ({theme}: any) => ({
  container: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    paddingVertical: wp(6),
    borderColor: theme?.borderColor,
  },
  labelContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: wp(4.2),
    color: theme?.textColor,
    fontFamily: FONT.notoSansExtraBold,
  },
  titleText: {
    fontFamily: FONT.notoSansMedium,
    color: theme?.lightTextColor,
    fontSize: wp(3.8),
  },
  arrowContainer: {
    flex: 0.15,
  },
  iconStyle: {
    marginHorizontal: wp(1),
    alignSelf: 'flex-end',
  },
  feedbackText: {
    marginHorizontal: wp(4),
    color: theme?.feedbackText,
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(3.1),
  },
});
