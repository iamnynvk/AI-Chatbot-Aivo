import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// Imports
import {ROUTES} from '../routes';
// Screens
import Home from '../../screens/Home';
import AivoChat from '../../screens/AivoChat';
import Profile from '../../screens/Profile';
import AIAssistance from '../../screens/AIAssistance';
import History from '../../screens/History';
import useAppContext from '../../context/useAppContext';

const TabNavigation = () => {
  const {theme}: any = useAppContext();
  const styles = getStyles({theme});
  const Tab = createBottomTabNavigator();

  const tabList = [
    {
      name: ROUTES.HOME,
      component: Home,
    },
    {
      name: ROUTES.AI_ASSISTANCE,
      component: AIAssistance,
    },
    {
      name: ROUTES.CHAT,
      component: AivoChat,
    },
    {
      name: ROUTES.HISTORY,
      component: History,
    },
    {
      name: ROUTES.PROFILE,
      component: Profile,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="Home">
      <Tab.Group>
        {tabList?.map((item: any, index: any) => {
          return (
            <Tab.Screen
              key={item?.name}
              name={item?.name}
              component={item?.component}
              options={{
                tabBarShowLabel: false,
                tabBarStyle: [
                  styles.tabStyles,
                  {
                    borderTopWidth: item?.name == ROUTES.CHAT ? 0 : 1,
                  },
                ],
                tabBarIcon: ({color, size, focused}): any => {
                  if (focused) {
                    return (
                      <Ionicons
                        name={
                          item?.name == ROUTES.HOME
                            ? 'home'
                            : item?.name == ROUTES.AI_ASSISTANCE
                            ? 'grid'
                            : item?.name == ROUTES.HISTORY
                            ? 'library'
                            : item?.name == ROUTES.CHAT
                            ? 'chatbubble'
                            : 'person'
                        }
                        size={wp(6)}
                        color={theme?.backgroundColor}
                        style={styles.focusTabStyles}
                      />
                    );
                  }

                  return (
                    <Ionicons
                      name={
                        item?.name == ROUTES.HOME
                          ? 'home-outline'
                          : item?.name == ROUTES.AI_ASSISTANCE
                          ? 'grid-outline'
                          : item?.name == ROUTES.HISTORY
                          ? 'library-outline'
                          : item?.name == ROUTES.CHAT
                          ? 'chatbubble-outline'
                          : 'person-outline'
                      }
                      size={wp(5)}
                      color={color}
                    />
                  );
                },
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};

const getStyles = ({theme}: any) => ({
  tabStyles: {
    // Styles-1
    // backgroundColor: theme?.inputColor,
    // borderWidth: 0,
    // borderColor: theme?.inputColor,
    // elevation: 0,
    // height: wp(16),
    // borderRadius: wp(4),

    // Styles-2
    backgroundColor: theme?.backgroundColor,
    borderColor: theme?.inputColor,
    elevation: 0,
    height: wp(16),
  },
  focusTabStyles: {
    backgroundColor: theme?.textColor,
    padding: hp(1),
    borderRadius: wp(10),
  },
});

export default TabNavigation;
