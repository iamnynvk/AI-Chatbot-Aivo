import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header/Header';
import useAppContext from '../context/useAppContext';
import {FONT} from '../constants';
import {ActivityIndicator} from 'react-native-paper';

const AivoChat = ({route}: any) => {
  const {theme, authUser}: any = useAppContext();
  const styles: any = getStyles({theme});
  const {title} = route?.params;
  const inputRef: any = useRef();
  const [messages, setMessages] = useState<any>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

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
              // onPress={() => (!isOnMic ? startRecording() : stopRecording())}
              style={[
                styles.actionButton,
                {marginStart: 10, backgroundColor: theme?.lightWhite},
              ]}>
              <Ionicons
                color={theme?.backgroundColor}
                name={'mic-off'}
                size={wp(4.6)}
              />
            </TouchableOpacity>
          );
        }}
        renderSend={() => {
          return (
            <TouchableOpacity
              // onPress={() =>
              //   onSend([
              //     {
              //       _id: Math.random(),
              //       createdAt: new Date(),
              //       text: props?.text.trim(),
              //       user: {
              //         _id: 1,
              //         avatar: authUser?.userImageUrl,
              //         name: authUser?.email,
              //       },
              //     },
              //   ])
              // }
              disabled={props?.text.trim().length == 0 ? true : false}
              activeOpacity={0.8}
              style={[
                styles.actionButton,
                {
                  marginEnd: 10,
                  backgroundColor: theme?.lightBlue,
                },
              ]}>
              <Ionicons color={theme?.textColor} name={'send'} size={wp(4.6)} />
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

  return (
    <View style={styles.container}>
      <Header
        title={title}
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
          // renderMessageImage={renderMessageImage}
          scrollToBottom={true}
          scrollToBottomComponent={customDownButton}
          // renderInputToolbar={(props: any) => renderInput(props)}
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
    borderTopWidth: 0.4,
    borderColor: theme?.borderColor,
  },
  customDown: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default AivoChat;
