import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS} from '../localization/labels';
import {FlatList} from 'react-native';
import {EXPLORE_TYPES, RENDER_EXPLORE_TYPES} from '../../assets/data';
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../constants';
import FeaturesCard from '../components/Home/FeaturesCard';

const AIAssistance = () => {
  const {theme}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [selectedId, setSelectedId] = useState(1);
  const [ExploreData, setExploreData] = useState(RENDER_EXPLORE_TYPES);

  const handlePress = (categories: any) => {
    setSelectedId(selectedId === categories?.id ? selectedId : categories?.id);
    const filterCategories = RENDER_EXPLORE_TYPES.filter((singleItem: any) => {
      return singleItem.type.includes(categories?.type);
    });
    setExploreData(filterCategories);
  };

  const renderItem = ({item}: any) => {
    const isSelected: any = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={isSelected}
        style={[
          styles.item,
          {
            backgroundColor: isSelected ? theme.tagColor : theme.borderColor,
            borderWidth: 1,
            borderColor: isSelected ? theme.tagColor : theme.borderColor,
          },
        ]}
        onPress={() => handlePress(item)}>
        <Text
          style={{
            fontSize: wp(3.4),
            color: isSelected ? theme?.backgroundColor : theme.backColor,
            fontFamily: isSelected ? FONT.notoSansBold : FONT.notoSansSemiBold,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isBack={false} title={LABELS.EXPLORE} />
      <FlatList
        horizontal
        data={EXPLORE_TYPES}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedId}
        contentContainerStyle={styles.flatListContentContainer}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          height: '88%',
          width: '100%',
          paddingTop: wp(5),
        }}>
        <FlatList
          numColumns={2}
          data={ExploreData}
          renderItem={({item}: any) => <FeaturesCard data={item} />}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = ({theme}: any) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContentContainer: {
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: wp(5),
    paddingVertical: wp(2),
    marginHorizontal: wp(2),
    borderRadius: wp(100),
  },
});

export default AIAssistance;
