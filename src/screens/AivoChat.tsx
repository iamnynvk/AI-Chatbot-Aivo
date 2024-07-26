import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header/Header';
import useAppContext from '../context/useAppContext';
import {FONT} from '../constants';
import {ActivityIndicator} from 'react-native-paper';
import ZoomImage from '../components/ZoomImage/ZoomImage';
import {requestMicrophonePermission} from '../utils/AskPermission';

const AivoChat = ({route}: any) => {
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});
  const inputRef: any = useRef();
  const [messages, setMessages] = useState<any>([]);
  const [speechValue, setSpeechValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isOnMic, setIsOnMic] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechError = onSpeechErrorHandler;

    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {};

  const onSpeechEndHandler = () => {
    setIsOnMic(false);
  };

  const onSpeechResultsHandler = (e: any) => {
    setSpeechValue(e.value[0]);
  };

  const onSpeechErrorHandler = (e: any) => {
    console.log('Speech error handler', e);
    setIsOnMic(false);
  };

  const Bubbles = useCallback((props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme?.senderChatColor,
          },
          left: {
            backgroundColor: theme?.receiveChatColor,
          },
        }}
        textStyle={{
          right: {
            fontFamily: FONT.notoSansMedium,
            fontSize: wp(3.6),
            color: theme?.wrapperColor,
          },
          left: {
            fontFamily: FONT.notoSansMedium,
            fontSize: wp(3.6),
            color: theme?.wrapperColor,
          },
        }}
      />
    );
  }, []);

  const customDownButton = () => {
    return (
      <View style={styles.customDown}>
        <Ionicons
          name={'chevron-down-outline'}
          size={26}
          color={theme?.dropDownColor}
        />
      </View>
    );
  };

  const startRecording = async () => {
    const permission = await requestMicrophonePermission();
    if (permission) {
      try {
        setIsOnMic(true);
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

  const onSend = useCallback(async (messages: any) => {}, []);

  const renderInput = (props: any) => {
    return (
      <InputToolbar
        textInputStyle={{color: theme?.textColor}}
        {...props}
        containerStyle={styles.inputContainerStyle}
        renderActions={() => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => (!isOnMic ? startRecording() : stopRecording())}
              style={[
                styles.actionButton,
                {marginStart: 10, backgroundColor: theme?.tabBorderColor},
              ]}>
              <Ionicons
                color={theme?.textColor}
                name={isOnMic ? 'mic-off' : 'mic'}
                size={wp(4.6)}
              />
            </TouchableOpacity>
          );
        }}
        renderSend={() => {
          return (
            <TouchableOpacity
              onPress={() =>
                onSend([
                  {
                    _id: Math.random(),
                    createdAt: new Date(),
                    text: props?.text.trim(),
                    user: {
                      _id: 1,
                      avatar: authUser?.userImageUrl,
                      name: authUser?.email,
                    },
                  },
                ])
              }
              disabled={props?.text.trim().length == 0 ? true : false}
              activeOpacity={0.8}
              style={[
                styles.actionButton,
                {
                  marginEnd: 10,
                  backgroundColor: theme?.textColor,
                },
              ]}>
              <Ionicons
                color={theme?.backgroundColor}
                name={'send'}
                size={wp(4.6)}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const RenderEmpty = (props: any) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {isLoader && (
          <ActivityIndicator color={theme?.textColor} size={'small'} />
        )}
      </View>
    );
  };

  const renderMessageImage = useCallback((props: any) => {
    const {currentMessage} = props;
    return <ZoomImage imageUri={currentMessage.image} />;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={route?.params?.title ? route?.params?.title : 'Chat With Aivo'}
        menuName={'Clear'}
        onMenuPress={() => console.log('Delete chat here')}
      />
      <View style={styles.messageContainer}>
        <GiftedChat
          textInputRef={inputRef}
          messages={messages}
          user={{
            _id: 1,
            avatar: authUser?.userImageUrl,
            name: authUser?.email,
          }}
          // text={speechValue}
          showUserAvatar={false}
          alwaysShowSend={true}
          isTyping={isTyping}
          infiniteScroll={true}
          inverted={messages?.length !== 0}
          messagesContainerStyle={
            messages?.length !== 0 ? null : {transform: [{scaleY: -1}]}
          }
          // onInputTextChanged={data => setSpeechValue(data)}
          renderMessageImage={renderMessageImage}
          scrollToBottom={true}
          scrollToBottomComponent={customDownButton}
          renderInputToolbar={(props: any) => renderInput(props)}
          renderChatEmpty={(props: any) => <RenderEmpty {...props} />}
          renderBubble={(props: any) => <Bubbles {...props} />}
          keyboardShouldPersistTaps={'handled'}
        />
      </View>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  messageContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: theme.inputColor,
  },
  customDown: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputContainerStyle: {
    backgroundColor: theme?.backgroundColor,
    borderColor: theme.inputColor,
    borderTopWidth: 1,
    minHeight: wp(12),
  },
  actionButton: {
    height: wp(8.6),
    width: wp(8.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(4.3),
    alignSelf: 'center',
  },
});

export default AivoChat;
