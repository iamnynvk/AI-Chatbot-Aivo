import {Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import useAppContext from '../../context/useAppContext';
import {LABELS} from '../../localization/labels';
import {FONT, SCREEN_HEIGHT} from '../../constants/theme';

export const EmptyComponent = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  return (
    <View style={[styles.emptyContainer, {alignItems: 'center'}]}>
      <Text style={styles.errorMessage}>{LABELS?.EMPTY_MESSAGE}</Text>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  emptyContainer: {
    marginTop: SCREEN_HEIGHT / 3.8,
  },
  errorMessage: {
    color: theme?.backColor,
    fontFamily: FONT.notoSansRegular,
    fontSize: wp(3.6),
    textAlign: 'center',
  },
});
