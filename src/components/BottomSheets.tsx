import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from '../constants';

const BottomSheets = ({refs, children, sheetHeight}: any) => {
  return (
    <RBSheet
      ref={refs}
      openDuration={5000}
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          height: sheetHeight,
          backgroundColor: COLORS.secondary,
        },
        wrapper: {
          backgroundColor: 'transparent',
        },
      }}
      animationType="slide"
      closeOnPressBack={true}>
      {children}
    </RBSheet>
  );
};

export default BottomSheets;
