import * as React from 'react';
import {View, Text, Modal, TextStyle, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../../constants';
import useAppContext from '../../context/useAppContext';

export interface LoadingOverlayPropTypes {
  cancelable?: boolean;
  animation?: 'none' | 'slide' | 'fade';
  size?: 'small' | 'large' | number;
  textContent?: string;
  textStyle?: TextStyle;
  visible?: boolean;
  indicatorStyle?: ViewStyle;
  customIndicator?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const LoadingOverlay = ({
  cancelable = false,
  animation = 'none',
  size = 'small',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
}: LoadingOverlayPropTypes) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible);

  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  React.useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);

  const _renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator
            color={theme?.wrapperColor}
            size={size}
            style={[styles.activityIndicator, {...indicatorStyle}]}
          />
        )}
        <View style={[styles.textContainer, {...indicatorStyle}]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={styles.container}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  };

  return _renderSpinner();
};

const getStyles = ({theme}: any) => ({
  activityIndicator: {
    flex: 1,
  },
  background: {
    backgroundColor: theme?.loadingOverlayBackground,
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.9,
  },
  container: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    fontSize: wp(3.6),
    top: wp(10),
    color: theme?.wrapperColor,
    fontFamily: FONT.notoSansMedium,
    textAlign: 'center',
  },
});

export default LoadingOverlay;
