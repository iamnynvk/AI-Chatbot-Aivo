import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Voice from '@react-native-voice/voice';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {AnimatePresence, MotiImage, MotiView} from 'moti';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {ROUTES} from '../routes/routes';
import {FONT, images} from '../constants';
import {STATIC_MESSAGE} from '../localization/labels';
import {requestMicrophonePermission} from '../utils/AskPermission';

const Chat = ({route}: any) => {
  const navigation: any = useNavigation();
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [isOnMic, setIsOnMic] = useState(false);
  const [dynamicLabel, setDynamicLabel] = useState(STATIC_MESSAGE.HELP_MESSAGE);
  const [dynamicImage, setDynamicImage] = useState(images.img_help);
  const [speechValue, setSpeechValue] = useState<string>('');

  useEffect(() => {
    let labelAndImageTimeOut = setTimeout(() => {
      if (!isOnMic) {
        setDynamicLabel(STATIC_MESSAGE.TAP_TO_SEARCH);
        setDynamicImage(images.img_speak);
      } else {
        setDynamicLabel(STATIC_MESSAGE.LISTENING);
        setDynamicImage(images.img_listening);
      }
    }, 2000);

    return () => clearTimeout(labelAndImageTimeOut);
  }, [isOnMic]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {};

  const onSpeechEndHandler = () => {
    setIsOnMic(false);
  };

  const onSpeechResultsHandler = (e: any) => {
    console.log('e ---<', e);
    setSpeechValue(e.value[0]);
  };

  const onSpeechErrorHandler = (e: any) => {
    console.log('Speech error handler', e);
    setIsOnMic(false);
  };

  const startRecording = async () => {
    const permission = await requestMicrophonePermission();
    if (permission) {
      try {
        setIsOnMic(true);
        setSpeechValue('');
        await Voice.start('en-GB');
      } catch (error) {
        console.log('Error when record audio :', error);
      }
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsOnMic(false);
    } catch (error) {
      console.log('Error when record audio OFF :', error);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Header isBack={true} />
      <View style={styles.bodyContainer}>
        {/* Title Container */}
        <MotiView
          key={dynamicLabel}
          from={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 1000}}
          style={styles.labelContainer}>
          <Text style={styles.label}>{dynamicLabel}</Text>
          <AnimatePresence>
            <MotiImage
              source={dynamicImage}
              style={styles.labelImage}
              resizeMode="contain"
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 1000}}
            />
          </AnimatePresence>
        </MotiView>

        {/* Wave Container */}
        <View style={styles.waveContainer}>
          {isOnMic ? (
            <LottieView
              source={images.anim_text_to_speech}
              autoPlay
              loop
              style={styles.animContainer}
            />
          ) : (
            <View
              style={{
                height: wp(50),
                justifyContent: 'center',
              }}>
              <View style={styles.voiceLine} />
            </View>
          )}
        </View>

        {/* Speak Content && Search Content */}
        <View style={styles.speechContainer}>
          <Text style={styles.speechText}>
            {truncateText(speechValue, 180)}
          </Text>
        </View>

        {/* Voice assistant */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={() => navigation.navigate(ROUTES.AIVO_CHAT)}>
            <Ionicons
              name="chatbox-ellipses"
              color={theme?.textColor}
              size={wp(4.8)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => (!isOnMic ? startRecording() : stopRecording())}
            style={[styles.dot, styles.center]}>
            {isOnMic &&
              [...Array(3).keys()].map(index => {
                return (
                  <MotiView
                    from={{opacity: 0.7, scale: 1}}
                    animate={{opacity: 0, scale: 2}}
                    key={index}
                    transition={{
                      type: 'timing',
                      duration: 1500,
                      delay: index * 400,
                      repeatReverse: false,
                      loop: true,
                    }}
                    style={[StyleSheet.absoluteFillObject, styles.dot]}
                  />
                );
              })}
            <Feather name="mic" color={theme?.wrapperColor} size={wp(5)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={stopRecording}>
            <Ionicons name="close" color={theme?.textColor} size={wp(5)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  bodyContainer: {
    flex: 1,
  },
  labelContainer: {
    marginVertical: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: FONT.notoSansExtraBold,
    fontSize: wp(5),
    color: theme?.textColor,
    textAlign: 'center',
  },
  labelImage: {
    marginTop: wp(2),
    width: wp(12),
    height: wp(12),
  },
  waveContainer: {
    marginVertical: wp(10),
  },
  animContainer: {
    height: wp(50),
    width: '100%',
    alignSelf: 'center',
  },
  voiceLine: {
    borderWidth: 0.7,
    width: wp(66),
    alignSelf: 'center',
    borderColor: theme?.voiceLine,
    backgroundColor: theme?.voiceLine,
  },
  speechContainer: {
    paddingHorizontal: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechText: {
    fontFamily: FONT.notoSansMedium,
    fontSize: wp(4.6),
    color: theme?.textColor,
    textAlign: 'center',
  },
  searchContainer: {
    position: 'absolute',
    bottom: wp(10),
    right: 0,
    left: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    borderWidth: 1,
    padding: wp(2.5),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.inputColor,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(17),
    backgroundColor: theme?.voiceLine,
  },
});

export default Chat;
