import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS} from '../localization/labels';
import {RadioButton} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../constants';
import {storeValueInAsync} from '../utils/AsyncStorage';

const options = [
  {label: 'On', value: 'dark'},
  {label: 'Off', value: 'light'},
  {label: 'System Default', value: 'default'},
];

const Mode = ({route}: any) => {
  const {theme, systemScheme, setThemeMode, setColorScheme, themeMode}: any =
    useAppContext();
  const styles: any = getStyles({theme});
  const [selectedMode, setSelectedMode] = useState(themeMode?.value);

  useEffect(() => {
    if (selectedMode == 'default') {
      setColorScheme(systemScheme);
    } else {
      setColorScheme(selectedMode);
    }
  }, [selectedMode]);

  const onSelectMode = async (mode: any) => {
    setSelectedMode(mode?.value);
    setThemeMode(mode);
    await storeValueInAsync(LABELS?.DARK_MODE, mode);
  };

  return (
    <View style={styles.container}>
      <Header
        isBack={true}
        title={route?.params?.title ?? LABELS?.PREFERENCES}
      />
      <View style={styles.renderModeContainer}>
        {options.map((option: any, index: any) => (
          <View style={styles.labelContainer} key={index}>
            <Text style={styles.labelStyle}>{option?.label}</Text>
            <RadioButton
              color={theme?.link}
              value={option?.value}
              status={option?.value === selectedMode ? 'checked' : 'unchecked'}
              onPress={() => onSelectMode(option)}
            />
          </View>
        ))}
      </View>
      <Text style={styles.modeInstruction}>{LABELS.DARK_MODE_INSTRUCTION}</Text>
    </View>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor,
  },
  renderModeContainer: {
    marginTop: wp(2),
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(1),
  },
  labelStyle: {
    fontSize: wp(3.8),
    fontFamily: FONT?.notoSansMedium,
    color: theme?.textColor,
  },
  modeInstruction: {
    alignSelf: 'center',
    marginTop: wp(2),
    fontSize: wp(3),
    fontFamily: FONT?.notoSansRegular,
    color: theme?.feedbackText,
  },
});

export default Mode;
