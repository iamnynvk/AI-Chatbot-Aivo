import * as React from 'react';
import {StackActions} from '@react-navigation/native';

const isReadyRef: any = React.createRef();

const navigationRef: any = React.createRef();

const routeNameRef: any = React.createRef();

/**
 * Navigate to a route in current navigation tree.
 *  @param name — Name of the route to navigate to.
 *  @param params — Params object for the route.
 */
export const navigate = (name: any, params: any) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const push = (name: any, params: any) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current &&
      navigationRef.current?.dispatch(StackActions.push(name, params));
  }
};

/**
 * Go back to the previous route in history.
 */
export const goBack = () => {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
};

export const pop = (n: any) => {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.dispatch(StackActions.pop(n));
  }
};

/**
 * Check if dispatching back action will be handled by navigation. Note that this method doesn't re-render screen when the result changes. So don't use it in render.
 */
export const canGoBack = () => navigationRef.current?.canGoBack();

function getCurrentRouteName() {
  return routeNameRef;
}
/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName: any, params: any) {
  navigationRef.current.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

/**
 * Dispatch an action or an update function to the router.
 * The update function will receive the current state,
 *
 * @param action Action object or update function.
 */
export const dispatch = (action: any) =>
  navigationRef.current?.dispatch(action);

/**
 * Get the rehydrate navigation state of the navigation tree.
 */
export const getRootState = () => navigationRef.current?.getRootState();

/**
 *
 * @param name string
 * @param params object
 */
export const replace = (name: any, params: any) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

export const changeStack = (stackName: any) => {
  resetRoot(stackName);
};

const resetRoot = (routeName: any) => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: routeName}],
  });
};

export default {
  isReadyRef,
  routeNameRef,
  navigationRef,
  navigate,
  push,
  goBack,
  pop,
  getCurrentRouteName,
  changeStack,
  replace,
};
