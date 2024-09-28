import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import useAppContext from '../../context/useAppContext';

const BottomSheets = ({refs, children, sheetHeight}: any) => {
  const {theme}: any = useAppContext();
  return (
    <RBSheet
      ref={refs}
      openDuration={5000}
      closeOnDragDown={true}
      closeOnPressBack={true}
      draggable={true}
      dragOnContent={true}
      useNativeDriver={true}
      customStyles={{
        container: {
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          height: sheetHeight,
          backgroundColor: theme?.backgroundColor,
          shadowColor: theme?.textColor,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        },
        wrapper: {
          backgroundColor: 'transparent',
        },
      }}
      animationType="slide"
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}>
      {children}
    </RBSheet>
  );
};

export default BottomSheets;
