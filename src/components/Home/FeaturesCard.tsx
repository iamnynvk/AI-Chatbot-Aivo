import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useAppContext from '../../context/useAppContext';
import FastImage from 'react-native-fast-image';
import {COLORS, FONT} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {COLLECTIONS} from '../../enums';
import {ROUTES} from '../../routes/routes';

const FeaturesCard = ({data}: any) => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});

  const onCardPress = async () => {
    navigation?.navigate(
      data?.additionalTitle == COLLECTIONS?.HISTORY
        ? ROUTES?.HISTORY
        : data?.additionalTitle == COLLECTIONS?.AIVO_TALK
        ? ROUTES?.VOICE_CHAT
        : ROUTES?.AIVO_CHAT,
      data,
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onCardPress}>
      <View style={styles.imageContainer}>
        <FastImage
          source={data.images}
          style={styles.iconStyles}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>{data?.title}</Text>
        <Text style={styles.descriptionText}>{data?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    marginVertical: wp(1),
    marginHorizontal: wp(1),
    borderRadius: wp(3),
    backgroundColor: theme?.inputColor,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  imageContainer: {
    marginHorizontal: wp(4),
    marginVertical: wp(4),
  },
  iconStyles: {
    height: wp(10),
    width: wp(10),
  },
  titleText: {
    color: theme?.textColor,
    marginTop: wp(2),
    fontFamily: FONT.notoSansExtraBold,
  },
  descriptionText: {
    fontFamily: FONT.notoSansRegular,
    marginTop: wp(3),
    color: theme?.lightTextColor,
    fontSize: wp(3.5),
  },
});

export default FeaturesCard;
