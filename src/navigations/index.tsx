import * as React from 'react';
import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
  TabActions,
} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export const navigate = (
  name: string,
  params?: Record<string, unknown>,
): void => {
  // @ts-ignore
  navigationRef?.current?.navigate(name, params);
};

export const setParams = (params: Partial<unknown>): void => {
  navigationRef.current?.setParams(params);
};

export const goBack = (): void => {
  navigationRef.current?.goBack();
};

export const jumpTo = (name: string, params?: object): void => {
  navigationRef.current?.dispatch(TabActions.jumpTo(name, params));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#replace
 * @param name
 * @param params
 */
export const replace = (name: string, params?: object): void => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#push
 * @param name
 * @param params
 */
export const push = (name: string, params?: object): void => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#pop
 * @param totalScreen
 */
export const pop = (totalScreen?: number): void => {
  let popScreen = 1;
  if (totalScreen) {
    popScreen = totalScreen;
  }
  navigationRef.current?.dispatch(StackActions.pop(popScreen));
};

/**
 * https://reactnavigation.org/docs/stack-actions/#poptotop
 */
export const popToHome = (): void => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

/**
 * Go back to previous screen without destroying all stack, appending current payload
 * to existing screen payload
 * @param name
 * @param payload
 */
export const reset = (payload: any): void => {
  navigationRef.current?.dispatch(() => {
    return CommonActions.reset(payload);
  });
};
