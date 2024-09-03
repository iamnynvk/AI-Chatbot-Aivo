import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Text,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppContext from '../../context/useAppContext';

interface IZoomImage {
  imageUri: string;
  isDirectOpen?: boolean;
  onClose?: any;
}

const ZoomImage = ({imageUri, isDirectOpen = false, onClose}: IZoomImage) => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const image = [{url: imageUri}];
  const [isOpenImageView, setIsOpenImageView] = useState(isDirectOpen);
  const [valid, setValid] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isError, setIsError] = useState(false);
  const noImageUri =
    'https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg';

  const handleClose = () => {
    setIsOpenImageView(false);
    onClose();
  };

  return isOpenImageView ? (
    <View>
      <Modal visible={true} transparent={true}>
        <View>
          <Ionicons
            name="chevron-back"
            size={wp(6)}
            color={theme?.backColor}
            style={styles.backIcon}
            onPress={handleClose}
          />
        </View>
        <ImageViewer
          imageUrls={image}
          backgroundColor={theme?.backgroundColor}
          enablePreload={true}
          enableSwipeDown
          renderIndicator={() => null}
          onSwipeDown={handleClose}
          enableImageZoom={true}
        />
      </Modal>
    </View>
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.chatPhotoContainer}
      onPress={() => valid && imageUri && setIsOpenImageView(true)}>
      {loadingImage && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={theme?.textColor} />
        </View>
      )}

      <ImageBackground
        onError={e => {
          setValid(false);
          e?.nativeEvent?.error && setIsError(true);
        }}
        style={[
          styles.chatPhotoContainer,
          {height: '100%', width: '100%', position: 'relative'},
        ]}
        imageStyle={{borderRadius: 10}}
        source={{uri: !isError ? imageUri : noImageUri, cache: 'force-cache'}}
        resizeMode={'cover'}
        resizeMethod={'resize'}
        onLoadEnd={() => setLoadingImage(false)}
      />
    </TouchableOpacity>
  );
};

const getStyles = ({theme}: any) => ({
  chatPhotoContainer: {
    width: wp(50),
    height: hp(25),
  },
  loader: {
    zIndex: 99,
    flex: 1,
    top: hp(25) / 2,
  },
  backIcon: {
    top: wp(4),
    left: wp(5),
    zIndex: 999,
    position: 'absolute',
  },
  downloadIcon: {
    top: wp(3),
    right: wp(5),
    zIndex: 999,
    position: 'absolute',
  },
});
export default React.memo(ZoomImage);
