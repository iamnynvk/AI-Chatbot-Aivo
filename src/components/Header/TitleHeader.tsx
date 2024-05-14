import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useAppContext from '../../context/useAppContext';
import {FONT} from '../../constants';

const TitleHeader = ({title, description, isShowAll, showAllAction}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleStyles}>{title}</Text>
        {description && (
          <Text style={styles.descriptionStyles}>{description}</Text>
        )}
      </View>
      <View style={styles.actionContainer}>
        {isShowAll && (
          <TouchableOpacity activeOpacity={0.8} onPress={showAllAction}>
            <Text style={styles.actionText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    margin: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyles: {
    fontFamily: FONT.notoSansBold,
    fontSize: wp(4.5),
    color: theme?.backColor,
  },
  headingContainer: {
    alignContent: 'center',
  },
  actionContainer: {
    alignSelf: 'center',
  },
  descriptionStyles: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3),
  },
  actionText: {
    fontSize: wp(3.5),
    color: theme?.textColor,
    fontFamily: FONT.notoSansExtraBold,
    textDecorationLine: 'underline',
  },
});

export default TitleHeader;
