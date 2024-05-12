import React from 'react';
import {Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useAppContext from '../../context/useAppContext';
import {FONT} from '../../constants';

const TitleHeader = ({title, description}: any) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyles}>{title}</Text>
      {description && (
        <Text style={styles.descriptionStyles}>{description}</Text>
      )}
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    margin: wp(1),
  },
  titleStyles: {
    fontFamily: FONT.notoSansBold,
    fontSize: wp(4.5),
    color: theme?.backColor,
  },
  descriptionStyles: {
    color: theme?.textColor,
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3),
  },
});

export default TitleHeader;
