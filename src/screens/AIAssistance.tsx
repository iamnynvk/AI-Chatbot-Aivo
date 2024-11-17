import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import useAppContext from '../context/useAppContext';
import Header from '../components/Header/Header';
import {LABELS} from '../localization/labels';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../constants';
import FeaturesCard from '../components/Cards/FeaturesCard';
import {COLLECTIONS} from '../enums';
import ExploreTypeShimmer from '../components/Shimmer/ExploreTypeShimmer';
import FeaturesCardShimmer from '../components/Shimmer/FeaturesCardShimmer';
import {EmptyComponent} from '../components/EmptyComponent/EmptyComponent';
import {SCREEN_HEIGHT} from '../constants/theme';

const AIAssistance = () => {
  const {theme, getCollectionData}: any = useAppContext();
  const styles: any = getStyles({theme});
  const [selectedId, setSelectedId] = useState(1);
  const [exploreTypes, setExploreTypes] = useState<any>([]);
  const [aiAssistants, setAiAssistants] = useState<any>([]);
  const [aiAssistantData, setAiAssistantData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAiAssistantData();
  }, []);

  const getAiAssistantData = async () => {
    try {
      const exploreType = await fetchCollectionData(COLLECTIONS?.EXPLORE_TYPES);
      const aiAssistant = await fetchCollectionData(COLLECTIONS?.AI_ASSISTANTS);
      setExploreTypes(exploreType);
      setAiAssistants(aiAssistant);
      setAiAssistantData(aiAssistant);
    } catch (error) {
      console.error('Error assistant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollectionData = async (
    collectionName: string,
    limit?: number,
  ) => {
    const result = await getCollectionData(collectionName);
    const data = result?._docs
      ?.map((item: any) => item?._data)
      ?.sort((a: any, b: any) => a.id - b.id);
    return limit ? data?.slice(0, limit) : data;
  };

  const handlePress = (categories: any) => {
    setSelectedId(selectedId === categories?.id ? selectedId : categories?.id);
    const filterCategories = aiAssistantData.filter((singleItem: any) => {
      return singleItem.type.includes(categories?.type);
    });
    setAiAssistants(filterCategories);
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
            backgroundColor: isSelected ? theme?.tagColor : theme?.borderColor,
            borderWidth: 1,
            borderColor: isSelected ? theme?.tagColor : theme?.borderColor,
          },
        ]}
        onPress={() => handlePress(item)}>
        <Text
          style={{
            fontSize: wp(3.4),
            color: isSelected ? theme?.backgroundColor : theme?.backColor,
            fontFamily: isSelected ? FONT.notoSansBold : FONT.notoSansSemiBold,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderShimmerEffect = () => {
    return (
      <ScrollView>
        <ExploreTypeShimmer size={5} />
        <View style={styles.shimmerHandler}>
          <FeaturesCardShimmer size={8} />
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isLogo={true} title={LABELS.AI_ASSISTANTS} />
      {isLoading ? (
        <>{_renderShimmerEffect()}</>
      ) : exploreTypes.length === 0 && aiAssistants.length === 0 ? (
        <EmptyComponent contentStyles={{marginTop: SCREEN_HEIGHT / 2.6}} />
      ) : (
        <>
          <FlatList
            horizontal
            data={exploreTypes}
            renderItem={renderItem}
            initialNumToRender={20}
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
              data={aiAssistants}
              renderItem={({item}: any) => <FeaturesCard data={item} />}
              keyExtractor={(item: any) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
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
    marginHorizontal: wp(2),
  },
  item: {
    paddingHorizontal: wp(5),
    paddingVertical: wp(2),
    marginHorizontal: wp(2),
    borderRadius: wp(100),
  },
  shimmerHandler: {
    marginTop: wp(2),
    marginBottom: wp(7),
  },
});

export default AIAssistance;
